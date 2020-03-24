---
title: "- Node"
sidebarDepth: 2
---

### 怎么看 nodejs 可支持高并发

1. nodejs 的单线程架构模型

nodejs 其实并不是真正的单线程架构，因为 nodejs 还有 I/O 线程存在（网络 I/O、磁盘 I/O），这些 I/O 线程是由更底层的 libuv 处理，这部分线程对于开发者来说是透明的。 JavaScript 代码永远运行在 V8 上，是单线程的。
所以从开发者的角度上来看 nodejs 是单线程的。

优势：

单线程就一个线程在玩，省去了线程间切换的开销
还有线程同步的问题，线程冲突的问题的也不需要担心

劣势：

劣势也很明显，现在起步都是 4 核，单线程没法充分利用 cpu 的资源
单线程，一旦崩溃，应用就挂掉了，大家调试脚本也知道一旦执行过程报错了，本次调试就直接结束了
因为只能利用一个 cpu ，一旦 cpu 被某个计算一直占用， cpu 得不到释放，后续的请求就会一直被挂起，直接无响应了

> 当然这些劣势都已经有成熟的解决方案了，使用 PM2 管理进程，或者上 K8S 也可以

2. 核心：事件循环机制

那你个单线程怎么支持高并发呢？
核心就要在于 js 引擎的事件循环机制（我觉得这个开场还挺不错）
浏览器和 nodejs 的事件循环是稍有区别的，先给面试官简单说下事件循环的核心，执行栈、宏队列和微队列，具体的介绍可以看我以前写的一篇总结 js 事件循环
然后重点说 nodejs 事件循环的差异点，因不想把两个问题混在一起，所以独立成一个问题，具体讲解大家稍微往下翻看下一个问题的解答。

### Node 事件轮询中的几个阶段

> event loop 首先会在内部维持多个事件队列，比如 时间队列、网络队列等等，而libuv会执行一个相当于 while true的无限循环，不断的检查各个事件队列上面是否有需要处理的pending状态事件，如果有则按顺序去触发队列里面保存的事件，同时由于libuv的事件循环每次只会执行一个回调，从而避免了 竞争的发生

事件循环必须跑完这六个阶段才算一个轮回

每个阶段都有一个回调函数 FIFO（先进先出）队列。EL 进入一个阶段会执行里面所有的操作，然后执行回调函数，直到队列消耗尽，或是回调函数执行数量达到最大限制。清理 nextTickQueue/microtasks 之后进入下一个阶段

阶段里的执行队列：

- Timers Queue `setTimeout()` `setInterval()`设定的回调函数
- I/O Queue 几乎所有的回调，除了 timers、close callbacks、check 阶段的回调
- Check Queue `setImmediate()` 设定的回调函数
- Close Queue 比如 `socket.on('close', ...)`

```
   ┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
```

#### timers

在这个阶段检查是否有到达阈值的 timer(setTimeout/setInterval)，有的话就执行他们的回调

但 timer 设定的阈值不是执行回调的确切时间（只是最短的间隔时间），node 内核调度机制和其他的回调函数会推迟它的执行

由 poll 阶段来控制什么时候执行 timers callbacks

#### I/O callbacks

处理异步事件的回调，比如网络 I/O，比如文件读取 I/O。当这些 I/O 动作都结束的时候，在这个阶段会触发它们的回调。

#### ~~idle, prepare 内部使用，忽略~~

#### poll

获取新的 I/O 事件，node 会在适当的情况下阻塞在这里

为防止 poll phase 耗尽 event loop，libuv 也有一个最大值（基于系统），会在超过最大值之后停止轮询更多的事件

由于其它各个阶段的操作都有可能导致新的事件发生，并使得内核向 poll queue 中添加事件，所以在 poll 阶段处理事件的时候可能还会有新的事件产生，最终，长时间的调用回调函数将会导致定时器过期，所以在 poll 阶段与定时器会有"合作"

poll 阶段主要的两个功能：

- 处理 poll queue 的 callbacks
- 回到 timers phase 执行 timers callbacks（当到达 timers 指定的时间时）

进入 poll 阶段，timer 的设定有下面两种情况：

1. event loop 进入了 poll 阶段，**未设定 timer**
   - poll queue 不为空：
     - event loop 将同步的执行 queue 里的 callback，直到清空或执行的 callback 到达系统上限
   - poll queue 为空
     - 如果有设定 setImmediate() callback, event loop 将结束 poll 阶段进入 check 阶段，并执行 check queue (check queue 是 setImmediate 设定的）
     - 如果代码没有设定 setImmediate() callback，event loop 将阻塞在该阶段等待 callbacks 加入 poll queue
2. event loop 进入了 poll 阶段，**设定了 timer**
   - 如果 poll 进入空闲状态，event loop 将检查 timers，如果有 1 个或多个 timers 时间时间已经到达，event loop 将回到 timers 阶段执行 timers queue

#### check

- 一旦 poll 队列闲置下来或者是代码被 setImmediate 调度，EL 会马上进入 check phase
- check 是特殊的 timer

#### close callbacks

- 关闭 I/O 的动作，比如文件描述符的关闭，连接断开等
- 如果 socket 突然中断，close 事件会在这个阶段被触发

#### 看个例子~

```js
var fs = require('fs');
function someAsyncOperation (callback) {
    // 假设用了95ms
    fs.readFile('/path/to/file', callback);
}

var timeoutScheduled = Date.now();
setTimeout(function () {
    var delay = Date.now() - timeoutScheduled;
    console.log(delay + "ms have passed since I was scheduled");
}, 100);

someAsyncOperation(function () {
    var startCallback = Date.now();
    while (Date.now() - startCallback < 10) {
        ;
    }
});

// log: 105ms have passed since I was scheduled
```

1. timers：定时器加入到timers queue中，定时的时间设置为100ms，进入下阶段
2. I/O callbacks：没有回调队列
3. poll：执行I/O操作，由于读取文件要耗费95ms的时间，这时它的任务队列为空，poll将会阻塞在这里循环相应的回调函数。大约在95ms时相应的文件读取I/O操作执行完毕，对应的回调函数又耗费了10ms。这时poll queue为空，此时poll会检查有没有到达阈值到期的timer。发现存在一个已经超时近5ms的定时器
4. timers：回到timers阶段执行回调函数，打log

**优先级：`nextTick` > `microtask` | `setTimeout/setInterval` > `setImmediate`**

上面介绍的都是 macrotask 的执行情况，对于 microtask 来说，它会在以上每个阶段完成前清空 microtask 队列

### process.nextTick()

process.nextTick() 不是Node的EL中的一部分（虽然它也是异步API），它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会**清空队列中的所有回调函数**，并且优先于其他 microtask 执行。
