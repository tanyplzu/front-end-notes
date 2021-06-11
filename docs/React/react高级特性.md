---
sidebarDepth: 0
---

# React 高级特性

[[toc]]

## Portals

使用场景：

- 组件会按照既定层次嵌套渲染
- 如何让组件渲染到父组件以外

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // // 正常渲染
    // return <div className="modal">
    //     {this.props.children} {/* vue slot */}
    // </div>

    // 使用 Portals 渲染到 body 上。
    // fixed 元素要放在 body 上，有更好的浏览器兼容性。
    return ReactDOM.createPortal(
      <div className='modal'>{this.props.children}</div>,
      document.body // DOM 节点
    );
  }
}
```

## 异步组件

组件比较大，路由懒加载时需要异步组件

- lazy
- import
- Suspense

```js
import React from 'react';
const ContextDemo = React.lazy(() => import('./ContextDemo'));
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p>引入一个动态组件</p>
        <hr />
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContextDemo />
        </React.Suspense>
      </div>
    );
    // 1. 强制刷新，可看到 loading （看不到就限制一下 chrome 网速）
    // 2. 看 network 的 js 加载
  }
}
```

## 性能优化

### shouldComponentUpdate

```js
shouldComponentUpdate(nextProps, nextState) {
  if (nextProps.text !== this.props.text
    || nextProps.length !== this.props.length) {
    return true // 可以渲染
  }
  return false // 不重复渲染
}
```

- react 中默认，父组件更新，子组件无条件更新。SCU 默认返回 true
- 性能优化对 react 更加重要，Vue 不存在这种状况
- SCU 不一定要用

### PureComponent 和 memo

- PureComponent 中实现了浅比较

```js
class List extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { list } = this.props;

    return (
      <ul>
        {list.map((item, index) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
    );
  }
  shouldComponentUpdate() {
    /*浅比较*/
  }
}
```

memo 类似

### immutable.js

- 共享数据的方式（不是深拷贝），性能较好
- 有一定的学习成本和迁移成本

## render props

```js
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render() {
    return (
      <div style={{ height: '500px' }} onMouseMove={this.handleMouseMove}>
        {/* 将当前 state 作为 props ，传递给 render （render 是一个函数组件） */}
        {this.props.render(this.state)}
      </div>
    );
  }
}
Mouse.propTypes = {
  render: PropTypes.func.isRequired, // 必须接收一个 render 属性，而且是函数
};

const App = (props) => (
  <div style={{ height: '500px' }}>
    <p>{props.a}</p>
    <Mouse
      render={
        /* render 是一个函数组件 */
        ({ x, y }) => (
          <h1>
            The mouse position is ({x}, {y})
          </h1>
        )
      }
    />
  </div>
);

/**
 * 即，定义了 Mouse 组件，只有获取 x y 的能力。
 * 至于 Mouse 组件如何渲染，App 说了算，通过 render prop 的方式告诉 Mouse 。
 */

export default App;
```
