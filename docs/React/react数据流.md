---
sidebarDepth: 0
---

# React 数据流

[[toc]]

## 数据驱动视图

```js
UI = render(data);
// 或者
UI = f(data);
```

## props

- 父-子组件通信
- 通过函数传参的形式，可以实现子-父组件通信
- 兄弟组件传参，可以从子组件到父组件，再到子组件

## 发布-订阅模式

跨组件之间的传参，可以使用发布订阅模式，类似于 Vue 的 eventBus

```js
class myEventEmitter {
  constructor() {
    // eventMap 用来存储事件和监听函数之间的关系
    this.eventMap = {};
  }
  // type 这里就代表事件的名称
  on(type, handler) {
    // hanlder 必须是一个函数，如果不是直接报错
    if (!(handler instanceof Function)) {
      throw new Error('哥 你错了 请传一个函数');
    }
    // 判断 type 事件对应的队列是否存在
    if (!this.eventMap[type]) {
      // 若不存在，新建该队列
      this.eventMap[type] = [];
    }
    // 若存在，直接往队列里推入 handler
    this.eventMap[type].push(handler);
  }
  // 别忘了我们前面说过触发时是可以携带数据的，params 就是数据的载体
  emit(type, params) {
    // 假设该事件是有订阅的（对应的事件队列存在）
    if (this.eventMap[type]) {
      // 将事件队列里的 handler 依次执行出队
      this.eventMap[type].forEach((handler, index) => {
        // 注意别忘了读取 params
        handler(params);
      });
    }
  }
  off(type, handler) {
    if (this.eventMap[type]) {
      this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1);
    }
  }
}
```

在组价中使用

```jsx
// 注意这个 myEvent 是提前实例化并挂载到全局的，此处不再重复示范实例化过程
const globalEvent = window.myEvent;
class B extends React.Component {
  // 这里省略掉其他业务逻辑
  state = {
    newParams: '',
  };
  handler = (params) => {
    this.setState({
      newParams: params,
    });
  };
  bindHandler = () => {
    globalEvent.on('someEvent', this.handler);
  };
  render() {
    return (
      <div>
        <button onClick={this.bindHandler}>点我监听A的动作</button>
        <div>A传入的内容是[{this.state.newParams}]</div>
      </div>
    );
  }
}
```

```jsx
class A extends React.Component {
  // 这里省略掉其他业务逻辑
  state = {
    infoToB: '哈哈哈哈我来自A',
  };
  reportToB = () => {
    // 这里的 infoToB 表示 A 自身状态中需要让 B 感知的那部分数据
    globalEvent.emit('someEvent', this.state.infoToB);
  };
  render() {
    return <button onClick={this.reportToB}>点我把state传递给B</button>;
  }
}
```

组件

```JSX
export default function App() {
  return (
    <div className="App">
      <B />
      <A />
    </div>
  );
}
```

## Context

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。Context API 有 3 个关键的要素：React.createContext 创建数据容器；Provider 为数据的提供者；Consumer 为数据的消费者。

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据,使用 context, 我们可以避免通过中间元素传递 props。

```jsx
const AppContext = React.createContext()
// const AppContext = React.createContext(defaultValue)

const { Provider, Consumer } = AppContext

<Provider value={title: this.state.title, content: this.state.content}>
  <Title />
  <Content />
 </Provider>

 <Consumer>
  {value => <div>{value.title}</div>}
</Consumer>
```


## Redux

Redux 主要由三部分组成：store、reducer 和 action。在 Redux 的整个工作过程中，数据流是严格单向的。

对于一个 React 应用来说，视图（View）层面的所有数据（state）都来自 store（再一次诠释了单一数据源的原则）。

如果你想对数据进行修改，只有一种途径：派发 action。action 会被 reducer 读取，进而根据 action 内容的不同对数据进行修改、生成新的 state（状态），这个新的 state 会更新到 store 对象里，进而驱动视图层面做出对应的改变。

## dva

```js
app.model({
  namespace: 'count',
  state: {
    record: 0,
    current: 0,
  },
  reducers: {
    add(state) {
      const newCurrent = state.current + 1;
      return { ...state,
        record: newCurrent > state.record ? newCurrent : state.record,
        current: newCurrent,
      };
    },
    minus(state) {
      return { ...state, current: state.current - 1};
    },
  },
  effects: {
    *add(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'minus' });
    },
  },
  subscriptions: {
    keyboardWatcher({ dispatch }) {
      key('⌘+up, ctrl+up', () => { dispatch({type:'add'}) });
    },
  },
});
```

即便 DVA 、Redux 下，也需要限制 connect 的使用，最好只有 App 和一些需要很多个页面共享的内聚型业务组件才可以去 connect store，所有的展示组件尽可能做成 PureComponent。