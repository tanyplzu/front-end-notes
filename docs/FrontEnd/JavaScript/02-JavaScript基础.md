---
sidebarDepth: 1
---

# JavaScript 基础(二)

[[toc]]

## DOM API

### DOM 事件的级别

- DOM0 element.onclick = function(){};
- DOM2 element.addEventListener('click',function(){},false);
- DOM3 element.addEventListener('keyup',function(){},false);

有 DOM1 级标准，但没有事件；DOM3 只是增加了一些事件类型。

### 什么是事件流 / 模型

当某一个事件被触发时，分为三个阶段：

1. 事件通过捕获从 window => document => body => 目标元素
2. 事件到达注册的目标上
3. 目标元素通过冒泡返回到 window，沿途触发相同类型的事件

### JS 事件的几种绑定方式

- 在 dom 元素中直接绑定，`<div class="an" onclick="aa()">aaaa</div>`
- js 中绑定 document.getElementById("demo").οnclick = function(){}
- 添加监听事件 document.addEventListener('name',()=>{})

### Event 对象常见的应用

- event.preventDefault() 阻止默认事件
- event.stopPropagation() 阻止冒泡
- event.stopImmediatePropagation() 事件的优先级
- event.currentTaget 当前绑定事件，就是那个父级元素
- event.target 当前被点击的元素

后面两种是事件委托。

### 自定义事件

```js
var event = new Event('custome');
ev.addEventListener('custome', function() {
  console.log(custome);
});
ev.dispathEvent(event);
```

addEventListener 最后一个参数： true 为捕获； false 为冒泡。

### DOM 节点的 Attribute 和 property 有何区别

- property 只是一个 JS 属性的修改。prototype 不是一个 api，只是一种操作形式；不会添加本身没有的属性。
- attr 是对 html 标签属性的修改。可以添加新的属性；

### DOM 树操作（api）

- 查找元素：querySelector、querySelectorAll、getElementById、getElementsByTagName、getElementsByClassName
- parentElement、childNodes、firstChild、lastChild
- createElement、removeChild、appendChild、insertBefore
- getElementById、getElementsByName、getElementsByTagName、getElementsByClassName，这几个 API 的性能高于 querySelector。
- getElementsByName、getElementsByTagName、getElementsByClassName 获取的集合并非数组，而是一个能够动态更新的集合。
- 虚拟 DOM 中最后还是通过以上 api 创建、和更新了 DOM。

### document load 和 ready 的区别

```js
window.addEventListener('load', function() {
  // 页面的全部资源加载完才会执行，包括图片、视频等
});
document.addEventListener('DOMContentLoaded', function() {
  // DOM 渲染完即可执行，此时图片、视频还可能没有加载完
});
```

这连个 API 对现代的单页应用不太适用。

### 浏览器或元素的一些距离属性

- document.documentElement.clientHeight：当前窗口内容区 + 内边距的高度
- window.innerHeight: 当前窗口内容区 + 内边距 + 边框 + 滚动条高度
- window.outerHeight：整个浏览器的高度（包括工具栏）
- clientHeight: 当前元素内容区 + 内边距的高度
- clientTop: 当前元素上边框的宽度
- offsetHeight: 当前元素内容区 + 内边距 + 边框 + 滚动条的高度
- offsetTop: 当前元素的边框距离父元素上外边距的距离
- scrollHeight: 当前内部可以滚动区域的高度，如果不能滚动则为自己内容区 + 内边距的高度
- scrollTop: 当前元素滚动离顶部的距离

```js
// 判断元素是否超出设定区域
elm.scrollWidth > elm.offsetWidth;
// 获取盒模型的大小
```

### 怎么确定当前浏览器的类型

通过`navigator.userAgent`获取浏览器信息，根据里面的关键字来确定浏览器类型。microMessenger、dingtalk、alipay、qq、iPhone 都可以获取判断。

## 原型和面向对象

### 描述 new 一个对象的过程

```javascript
function Foo(name) {
  this.name = name;
  this.type = 'foo';
}
var foo = new Foo('beijing');
```

- 创建一个新对象，继承 Foo.prototype
- `this` 指向这个新对象
- 执行代码，即对 `this` 赋值
- 返回 `this`

```js
var newFunc = function(func) {
  var o = Object.create(func.prototype);
  var k = func.call(o); // 执行func  *****
  if (typeof k === 'object') {
    return k;
  } else {
    return o;
  }
};

var p = { name: 'p' };
var o4 = Object.create(p);
```

### 如何实现继承

**1. 借助构造函数实现继承：**

```js
function Parent1() {
  this.name = 'parent1';
}
function Child1() {
  Parent1.call(this);
  this.type = 'child1';
}
console.log(new Child1(), new Child1().say());
```

::: warning 缺点：

Parent1 原型链上的东西没有被继承，只实现了部分继承

:::

**2. 借助原型链实现继承：**

```js
function Parent2() {
  this.name = 'parent2';
  this.play = [1, 2, 3];
}
function Child2() {
  this.type = 'child2';
}
Child2.prototype = new Parent2();
var s1 = new Child2();
var s2 = new Child2();
console.log(s1.play, s2.play);
s1.play.push(4);
```

::: warning 缺点：

原型链较长。如果实例化多个对象，修改一个中的属性，另一个也会变化。

:::

**3. 组合方式：**

```js
function Parent3() {
  this.name = 'parent3';
  this.play = [1, 2, 3];
}
function Child3() {
  Parent3.call(this); // 执行1次
  this.type = 'child3';
}
Child3.prototype = new Parent3(); // 执行2次
var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play);
```

::: warning 缺点：

原型链较长，Parent3 执行了两次。`Parent3.call(this)`、`new Parent3()`

:::

**4. 组合继承的优化 1：**

```js
function Parent4() {
  this.name = 'parent4';
  this.play = [1, 2, 3];
}
function Child4() {
  Parent4.call(this);
  this.type = 'child4';
}
Child4.prototype = Parent4.prototype;
```

**5. 组合继承的优化 2：**

```js
function Parent5() {
  this.name = 'parent5';
  this.play = [1, 2, 3];
}
function Child5() {
  Parent5.call(this);
  this.type = 'child5';
}
Child5.prototype = Object.create(Parent5.prototype);
```

推荐使用 5。

**6. Class 继承：**

```js
class Parent {
  constructor(value) {
    this.val = value;
  }
  getValue() {
    console.log(this.val);
  }
}
class Child extends Parent {
  constructor(value) {
    super(value);
  }
}
let child = new Child(1);
child.getValue(); // 1
child instanceof Parent; // true
```

`class` 实现继承的核心在于使用 `extends` 表明继承自哪个父类，并且在子类构造函数中必须调用 `super`，因为这段代码可以看成 `Parent.call(this, value)`。

## JavaScript 的执行机制

### 说一下对变量提升的理解

函数执行时会先创建当前的上下文环境，其中这两点会产生“变量提升”的效果

- 变量定义
- 函数声明

### 谈谈对 this 的理解

this 表示为当前的函数调用方，在运行时才能决定。如谁调用了某个方法，谁就是这个方法执行时的 this。

### 说明 this 几种不同的使用场景

- 作为构造函数执行
- 作为对象属性执行
- 作为普通函数执行
- call apply bind

> 李兵 [从 JavaScript 执行上下文的视角讲清楚 this](https://time.geekbang.org/column/article/128427)
>
> 阮一峰 [Javascript 的 this 用法](http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)

**全局环境下的 this**

```js
const foo = {
  bar: 10,
  fn: function() {
    console.log(this);
    console.log(this.bar);
  },
};
let fn1 = foo.fn;

fn1(); // 输出 window 和 undefined
```

**上下文对象调用中的 this**

```js
const student = {
  name: 'Lucas',
  fn: function() {
    return this;
  },
};

console.log(student.fn() === student); // true
```

```js
const person = {
  name: 'Lucas',
  brother: {
    name: 'Mike',
    fn: function() {
      return this.name;
    },
  },
};

console.log(person.brother.fn()); // Mike
```

```js
const o1 = {
  text: 'o1',
  fn: function() {
    return this.text;
  },
};

const o2 = {
  text: 'o2',
  fn: function() {
    return o1.fn();
  },
};

const o3 = {
  text: 'o3',
  fn: function() {
    var fn = o1.fn;
    return fn();
  },
};

console.log(o1.fn());
console.log(o2.fn());
console.log(o3.fn());

// o1、o1、undefined
```

**箭头函数中的 this 指向**

```js
const foo = {
  fn: function() {
    setTimeout(function() {
      console.log(this);
    });
  },
};

console.log(foo.fn());
```

### 改变当前调用 this 的方式

- call：会立即执行调用 call 方法的函数，不过是以第一个参数为 this 的情况下调用，方法内可以传递不等的参数，作为调用 call 方法的参数。
- apply：运行方式和 call 是一致的，只是接受的参数不同，不能是不定参数，得是一个数组。
- bind：会改变当前的 this，接受不定参数，不过不会马上执行调用 bind 方法的函数，而是返回一个函数作为结果，执行后才是调用函数的结果。

### 谈谈对闭包的理解

### 闭包的应用场景

- 封装，将与外部无关的变量封装在函数自身内部。如 function 中 return 一个 function，将变量私有化。如函数防抖的例子。
- 模块设计，使用立即执行函数实现，将变量私有化，只开放必要的 api。
- 函数柯里化

## 页面循环系统

### 函数防抖和节流的区别

函数防抖指一定时间内没有再次触发函数，就执行该函数，否则重新计时；节流是规定某个时间内只能执行一次函数。

**防抖的应用场景：**

- 搜索框输入查询，如果用户一直在输入中，没有必要不停地调用去请求服务端接口，等用户停止输入的时候，再调用，设置一个合适的时间间隔，有效减轻服务端压力。
- 表单验证
- 按钮提交事件。
- 浏览器窗口缩放，resize 事件（如窗口停止改变大小之后重新计算布局）等。

```js
let input1 = document.getElementById('inputId');
let timeoutId = null;
input1.addEventListener('keyup', function() {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    // 执行操作
    timeoutId = null;
  }, 500);
});
```

**节流的应用场景：**

- 按钮点击事件
- 拖拽事件
- onScoll
- 计算鼠标移动的距离 (mousemove)

```js
function throttle(fn, deley = 100) {
  let timeoutId = null;
  return function() {
    if (timeoutId) {
      return;
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, arguments);
      timeoutId = null;
    }, deley);
  };
}
dev.addEventListener(
  'drag',
  throttle(function() {
    // 执行事件
  })
);
```

不管是防抖还是节流，上面方法都有个问题，就是延时执行，有些场景下需要的不是延时，比如对于提交数据，需要的是防连击，不重复提交数据。对上面代码修改如下：

```js
function throttle(fn, deley = 100) {
  let timeoutId = null;
  return function() {
    if (timeoutId) {
      return;
    }
    fn.apply(this, arguments);
    timeoutId = setTimeout(() => {
      timeoutId = null;
    }, deley);
  };
}
dev.addEventListener(
  'click',
  throttle(function() {
    // 执行事件
  })
);
```

### 浏览器的 Event Loop

3 个异步队列是：

- Tasks (in `setTimeout`)
- Animation callbacks (in `requestAnimationFrame`)
- Microtasks (in `Promise.then`)

他们的执行特点是:fire:：

- Tasks 只执行一个。执行完了就进入主进程，主进程可能决定进入其他两个异步队列，也可能自己执行到空了再回来。 补充：对于“只执行一个”的理解，可以考虑设置 2 个相同时间的 `timeout`，两个并不会一起执行，而依然是分批的。
- Animation callbacks 执行队列里的全部任务，但如果任务本身又新增 Animation callback 就不会当场执行了，因为那是下一个循环补充：同 Tasks，可以考虑连续调用两句 `requestAnimationFrame`，它们会在同一次事件循环内执行，有别于 Tasks
- Microtasks 直接执行到空队列才继续。因此如果任务本身又新增 Microtasks，也会一直执行下去。所以上面的例子才会产生阻塞。 补充：因为是当次执行，因此如果既设置了 `setTimeout(0)` 又设置了 `Promise.then()`，优先执行 Microtasks。

> 连接：[浏览器的 Event Loop](https://mp.weixin.qq.com/s/N5G3RKTkEG4CMtOwBWkm3g)

## 浏览器渲染

### URL 输入到渲染的过程

1. 域名解析，找到服务地址
2. 构建 TCP 连接，若有 https，则多一层 TLS 握手，
3. 特殊响应码处理 301 302
4. 解析文档
5. 构建 dom 树和 csscom
6. 生成渲染树：从 DOM 树的根节点开始遍历每个可见节点，对于每个可见的节点，找到 CSSOM 树中对应的规则，并应用它们，根据每个可见节点以及其对应的样式，组合生成渲染树
7. Layout（回流）：根据生成的渲染树，进行回流（Layout），得到节点的集合信息
8. Painting（重绘）：根据渲染树及其回流得到的集合信息，得到节点的绝对像素。
9. 绘制，在页面上展示，这一步还涉及到绘制层级、GPU 相关的知识点
10. 加载 js 脚本，加载完成解析 js 脚本

### 触发回流的场景

- 添加或删除可见的 DOM 元素
- 元素的位置发生变化
- 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
- 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代。
- 页面一开始渲染的时候（这肯定避免不了）
- 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）
- 获取位置信息，因为需要回流计算最新的值

**获取位置信息相关属性**

- offsetTop offsetLeft offsetWidth offsetHeight 相对于父级容器的偏移量
- scrollTop scrollLeft scrollWidth scrollHeight 相对于父级容器滚动上去的距离
- clientTop clientLeft clientWidth clientHeight 元素边框的厚度
- getComputedStyle()
- getBoundingClientRect

### 回流的优化

对树的局部甚至全局重新生成是非常耗性能的，所以要避免频繁触发回流

- 现代浏览器已经帮我们做了优化，采用队列存储多次的回流操作，然后批量执行，但获取布局信息例外，因为要获取到实时的数值，浏览器就必须要清空队列，立即执行回流。
- 编码上，避免连续多次修改，可通过合并修改，一次触发
- 对于大量不同的 dom 修改，可以先将其脱离文档流，比如使用绝对定位，或者 display:none ，在文档流外修改完成后再放回文档里中
- 通过节流和防抖控制触发频率
- css3 硬件加速，transform、opacity、filters，开启后，会新建渲染层

### 开启 GPU 加速的方法

开启后，会将 dom 元素提升为独立的渲染层，它的变化不会再影响文档流中的布局。

- transform: translateZ(0)
- opacity
- filters
- Will-change

### CSS 加载问题

- css 加载不会阻塞 DOM 树的解析；
- css 加载会阻塞 DOM 树的渲染；
- css 加载会阻塞后面 js 语句的执行

### 介绍下资源预加载 prefetch/preload async/defer

#### prefetch

其利用浏览器空闲时间来下载或预取用户在不久的将来可能访问的文档。

```html
<link href="/js/xx.js" rel="prefetch" />
```

#### preload

可以指明哪些资源是在页面加载完成后即刻需要的，浏览器在主渲染机制介入前就进行预加载，这一机制使得资源可以更早的得到加载并可用，且更不易阻塞页面的初步渲染，进而提升性能。

```html
<link href="/js/xxx.js" rel="preload" as="script" />
```

#### async(异步) 模式

加载脚本和渲染后续文档元素并行进行，脚本加载完成后，暂停 html 解析，立即解析 js 脚本

#### defer(延缓) 模式

加载脚本和渲染后续文档元素并行进行，但脚本的执行会等到 html 解析完成后执行。

- 具有 defer 特性的脚本不会阻塞页面。
- 具有 defer 特性的脚本总是要等到 DOM 解析完毕，但在 DOMContentLoaded 事件之前执行。

```html
<script src="/front-end/assets/js/3.efb9cd95.js" defer></script>
```

#### 正常模式

JS 会阻塞浏览器，浏览器必须等待 index.js 加载和执行完毕才能去做其它事情。

```html
<script src="index.js"></script>
```

## 通信类

### 如何创建一个 Ajax

```js
var xhr = XMLHttpRequest
  ? new XMLHttpRequest()
  : new ActiveXObject('Microsoft.XMLHTTP');
xhr.onreadystatechange = function() {
  // 通信成功时，状态值为4
  if (xhr.readyState === 4) {
    if (xhr.status === 200 || 304 || 206) {
      console.log(xhr.responseText);
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.onerror = function(e) {
  console.error(xhr.statusText);
};
xhr.open('GET', '/endpoint', true);
xhr.send(null);
```

### cookie 和 session 分别是什么

- cookie 是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器发起请求时被携带并发送到服务器，它通常是告知服务端两个请求是否来自同一浏览器，保持用户的登录状态。
- session 代表着服务器在和客户端一次会话的过程，存储着用户会话所需的属性及配置信息，当用户在不同页面之间跳转时，使整个用户会话一直存在。

### cookie 和 session 有什么不同

- 作用范围不同：cookie 存储在客户端，session 保存在服务器端。
- 存取的方式不同：cookie 只能保存 ASCⅡ，session 可以存取任意数据类型。
- 有效期不同：cookie 可设置长时间保持，session 一般失效时间较短，或客户端关闭就会失效。
- 存储大小不同：单个 cookie 保存的数据不能超过 4k，session 可存储数据远高于 cookie。

### cookie 和 session

浏览器发起第一次请求后服务端会返回一个 sessionID 存储到 cookie 中，当再次发起请求时服务端根据携带的 cookie 里的 sessionID 来查找对应的 session 信息，没有找到就说明没登录或登录失效，找到说明已经登录，可以进行之后的操作。

### Session 及第三方 Cookie 的工作原理

#### Http 请求状态

有状态的请求：服务端保留以前的请求信息，每个请求可以使用以前保留的请求；

- 服务器的 session 机制

无状态的请求：服务器不会保留任何请求信息；

- 服务不会保存 session

#### 第三方 Cookie 的工作原理

### JWT

- JSON Web Token（简称 [JWT](https://mp.weixin.qq.com/s?__biz=Mzg5NjAzMjI0NQ==&mid=2247485345&idx=2&sn=e283bc6e5d06f7eb455eef9072d6c7d6&chksm=c0060b3bf771822d436839c197447ff79c5fa02852234ae52f3649b88b7fc2580faed89ddf92&mpshare=1&scene=1&srcid=&sharer_sharetime=1584990198210&sharer_shareid=795858004e38dcd8f62de82c587a19e9#rd)，其实就是一个 token）是目前最流行的跨域认证解决方案。
- JWT 由三部分组成：Header，Payload，Signature 三个部分组成，并且最后由。拼接而成。
- Payload 中包含 exp 过期时间等登录信息。
- Signature 部分是对前两部分的签名，防止数据篡改。

### 前后端实现登录的方式有哪些

- cookie + session：前端登录后，后端会种一个 httpOnly 的 cookie 在前端，里面就有这个用户对应的 sessionId，以后每一次前端发起请求会携带上这个 cookie，后端从里面解析到 sessionId 后找到对应的 session 信息，就知道是谁再操作了。缺点是后端需要空间存储 session，用户多了，服务器多了都不方便，这种方式基本属于淘汰边缘。
- jwt + token：前端登录后，后端会返回一个包括用户信息加密的 token 字符串（可能还有过期时间，手机端有设备唯一码等信息），客户端自己保存了，将这个 token 设置到 header 里的 Authorization，之后每次请求都带上，服务器解码这个 token 之后就知道是谁在访问了。优点是不占存储空间，后端解码即可。

## 浏览器存储

### 浏览器实现本地存储的方式有哪几种

- cookie：存储大小 4kb，会随请求发送到服务端，可设置过期时间。
- localStorage: 存储大小为 5M，不参与请求，除非被清理，否则一直存在。
- sessionStorage：存储大小为 5M，不参与请求，页面关闭清除。
- indexDB：存储大小没限制，不参与请求，除非被清理，否则一直存在，运行在浏览器上的非关系型数据库。

