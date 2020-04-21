# Redux 基本用法

## 使用场景

这些情况，都不需要使用 Redux

- 用户的使用方式非常简单
- 用户之间没有协作
- 不需要与服务器大量交互，也没有使用 WebSocket
- 视图层（View）只从单一来源获取数据

Redux 的适用场景：

- 用户的使用方式复杂
- 不同身份的用户有不同的使用方式（比如普通用户和管理员）
- 多个用户之间可以协作
- 与服务器大量交互，或者使用了 WebSocket
- View 要从多个来源获取数据

## 设计思想

1. Web 应用是一个状态机，视图与状态是一一对应的。
2. 所有的状态，保存在一个对象里面。

## 基本概念和 API

### Store

Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。

```js
import { createStore } from 'redux'
const store = createStore(fn)
```

### State

```js
import { createStore } from 'redux'
const store = createStore(fn)

const state = store.getState()
```

Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。

### Action

State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。

```js
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux',
}
```

### Action Creator

View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。

```js
const ADD_TODO = '添加 TODO'
function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
  }
}
const action = addTodo('Learn Redux')
```

### store.dispatch()

store.dispatch()是 View 发出 Action 的唯一方法。

```js
import { createStore } from 'redux'
const store = createStore(fn)

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux',
})
```

结合 Action Creator，这段代码可以改写如下

```js
store.dispatch(addTodo('Learn Redux'))
```

Reducer

Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

```js
const reducer = function(state, action) {
  // ...
  return new_state
}
```

下面是一个实际的例子。

```js
const defaultState = 0
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload
    default:
      return state
  }
}

const state = reducer(1, {
  type: 'ADD',
  payload: 2,
})
```

## Store 的实现

可以发现 Store 提供了三个方法:

- store.getState()
- store.dispatch()
- store.subscribe()

```js
import { createStore } from 'redux'
let { subscribe, dispatch, getState } = createStore(reducer)
```

## 资料

- [Redux 中文文档](https://www.redux.org.cn/)
- [Redux 入门教程](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
