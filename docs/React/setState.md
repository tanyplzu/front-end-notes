---
sidebarDepth: 0
---

# setState

[[toc]]

## 不可变值

```js
// 不可变值
this.state.count++; // 错误代码

this.setState({
  count: this.state.count + 1,
});
```

不可变值（函数式编程，纯函数） - 数组

```js
const list5Copy = this.state.list5.slice(); // 先生生成一个副本
list5Copy.splice(2, 0, 'a'); // 中间插入/删除

this.setState({
  list1: this.state.list1.concat(100), // 追加
  list2: [...this.state.list2, 100], // 追加
  list3: this.state.list3.slice(0, 3), // 截取
  list4: this.state.list4.filter((item) => item > 100), // 筛选
  list5: list5Copy, // 其他操作
});
```

::: warning 注意

不能直接对 this.state.list 进行 push pop splice 等，这样违反不可变值

:::

不可变值 - 对象

```js
this.setState({
  obj1: Object.assign({}, this.state.obj1, { a: 100 }),
  obj2: { ...this.state.obj2, a: 100 },
});
// 注意，不能直接对 this.state.obj 进行属性设置，这样违反不可变值
```

## 可以是异步更新

setState 是一个异步函数，不会立即执行； setState 的第二个参数是回调函数,可以拿到最新的值。类似 vue nextTick。但在 setTimeout 或自定义事件中是一个同步值。

```js
setTimeout(() => {
  console.log(this.state.count); // 1
  this.setState({ count: this.state.count + 1 });
  console.log(this.state.count); // 2
});
```

## 可能会被合并

```js
this.setState({
  count: this.state.count + 1,
});
this.setState({
  count: this.state.count + 1,
});
this.setState({
  count: this.state.count + 1,
});
```

上面代码只加了一次。

传入函数，执行结果不会合并

```js
this.setState((preState, props) => {
  return {
    count: this.state.count + 1,
  };
});
this.setState((preState, props) => {
  return {
    count: this.state.count + 1,
  };
});
```

函数没法合并

## 原因

setState 并非真异步，只是看上去像异步。在源码中，**通过 `isBatchingUpdates` 来判断 setState 是先存进 state 队列还是直接更新，如果值为 true 则执行异步操作，为 false 则直接更新**。

那么什么情况下 isBatchingUpdates 会为 true 呢？在 React 可以控制的地方，就为 true，比如在 React 生命周期事件和合成事件中，都会走合并操作，延迟更新的策略。

但在 React 无法控制的地方，比如原生事件，具体就是在 addEventListener 、setTimeout、setInterval 等事件中，就只能同步更新。

**一般认为，通过异步的操作方式，累积更新后，批量合并处理，减少渲染次数，提升性能**，React 团队还补充了两点:

- **保持内部一致性。** 如果将 state 改为同步更新，那尽管 state 的更新是同步的，但是 props 不是。
- **启用并发更新，完成异步渲染。** 为了完成异步渲染，React 会在 setState 时，根据它们的数据来源分配不同的优先级，这些数据来源有：事件回调句柄、动画效果等，再根据优先级并发处理，提升渲染性能。

## 进阶

```js
class Test extends React.Component {
  state = {
    count: 0,
  };

  componentDidMount() {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);

    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);

    setTimeout(() => {
      this.setState({ count: this.state.count + 1 });
      console.log(this.state.count);

      this.setState({ count: this.state.count + 1 });
      console.log(this.state.count);
    }, 0);
  }

  render() {
    return null;
  }
}
```

我们可以进行如下的分析：

首先第一次和第二次的 console.log，都在 React 的生命周期事件中，所以是异步的处理方式，则输出都为 0；

而在 setTimeout 中的 console.log 处于原生事件中，所以会同步的处理再输出结果，但需要注意，虽然 count 在前面经过了两次的 this.state.count + 1，但是每次获取的 this.state.count 都是初始化时的值，也就是 0；

所以此时 count 是 1，那么后续在 setTimeout 中的输出则是 2 和 3。

所以完整答案是 0,0,2,3。

资料：

- [setState 是同步更新还是异步更新？](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=566#/detail/pc?id=5796)
