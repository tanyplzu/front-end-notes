# setState

- 不可变值
- 可以是异步更新
- 可能会被合并

## 不可变值

```js
// 不可变值
this.state.count++ // 错误代码

this.setState({
  count: this.state.count + 1
})
```

不可变值（函数式编程，纯函数） - 数组

```js
const list5Copy = this.state.list5.slice() // 先生生成一个副本
list5Copy.splice(2, 0, 'a') // 中间插入/删除

this.setState({
  list1: this.state.list1.concat(100), // 追加
  list2: [...this.state.list2, 100], // 追加
  list3: this.state.list3.slice(0, 3), // 截取
  list4: this.state.list4.filter(item => item > 100), // 筛选
  list5: list5Copy // 其他操作
})
```

::: danger 注意

不能直接对 this.state.list 进行 push pop splice 等，这样违反不可变值

:::

不可变值 - 对象

```js
this.setState({
  obj1: Object.assign({}, this.state.obj1, { a: 100 }),
  obj2: { ...this.state.obj2, a: 100 }
})
// 注意，不能直接对 this.state.obj 进行属性设置，这样违反不可变值
```

## 可以是异步更新

setState 是一个异步函数，不会立即执行； setState 的第二个参数是回调函数,可以拿到最新的值。类似 vue nextTick。但在 setTimeout 或自定义事件中是一个同步值。

```js
setTimeout(() => {
  console.log(this.state.count) // 1
  this.setState({ count: this.state.count + 1 })
  console.log(this.state.count) // 2
})
```

## 可能会被合并

```js
this.setState({
  count: this.state.count + 1
})
this.setState({
  count: this.state.count + 1
})
this.setState({
  count: this.state.count + 1
})
```

上面代码只加了一次。

传入函数，执行结果不会合并

```js
this.setState((preState, props) => {
  return {
    count: this.state.count + 1
  }
})
this.setState((preState, props) => {
  return {
    count: this.state.count + 1
  }
})
```

函数没法合并
