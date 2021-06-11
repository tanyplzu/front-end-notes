---
sidebarDepth: 0
---

# React 高级特性(二)

[[toc]]

## 高阶组件 HOC

HOC（Higher Order Component，高阶组件），React 的官方文档将高阶组件称为 React 中复用组件逻辑的高级技术。高阶组件本身并不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。简而言之，高阶组件的参数是组件，返回值为函数。

```js
// 高阶组件
const withMouse = (Component) => {
  class withMouseComponent extends React.Component {
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
          {/* 1. 透传所有 props 2. 增加 mouse 属性 */}
          <Component {...this.props} mouse={this.state} />
        </div>
      );
    }
  }
  return withMouseComponent;
};

const App = (props) => {
  const a = props.a;
  const { x, y } = props.mouse; // 接收 mouse 属性
  return (
    <div style={{ height: '500px' }}>
      <h1>
        The mouse position is ({x}, {y})
      </h1>
      <p>{a}</p>
    </div>
  );
};

export default withMouse(App); // 返回高阶函数
```

高阶组件的作用：

### 抽取公共逻辑

如权限判断，登录状态判断，埋点等，memo 组件也是一个高阶组件。下面是登录状态判断组件：

一般的思路类似于：

```jsx
const checkLogin = () => {
  return !!localStorage.getItem('token')
}
class CartPage extends React.Component {
   ...
}
class UserPage extends  React.Component {
  componentDidMount() {
    if(!checkLogin) {
      // 重定向跳转登录页面
    }
  }
  ...
}
class OrderPage extends  React.Component {
  componentDidMount() {
    if(!checkLogin) {
      // 重定向跳转登录页面
    }
  }
  ...
 }
```

采用高阶组件：

```js
const checkLogin = () => {
  return !!localStorage.getItem('token')
}
const checkLogin = (WrappedComponent) => {
  return (props) => {
    return checkLogin() ? <WrappedComponent {...props} /> : <LoginPage />;
  }
}
// 函数写法
class RawUserPage extends  React.Component {
  ...
}
const UserPage = checkLogin(RawUserPage)

// 装饰器写法
@checkLogin
class UserPage extends  React.Component {
  ...
}
@checkLogin
class OrderPage extends  React.Component {
  ...
}
```

还有一个非常经典的场景就是页面埋点统计。

```js
const trackPageView = (pageName) = {
   // 发送埋点信息请求
   ...
}
const PV = (pageName) => {
  return (WrappedComponent) => {
    return class Wrap extends Component {
      componentDidMount() {
        trackPageView(pageName)
      }

      render() {
        return (
          <WrappedComponent {...this.props} />
        );
      }
    }
  };
}
@PV('用户页面')
class UserPage extends  React.Component {
  ...
}
@PV('购物车页面')
class CartPage extends  React.Component {
  ...
}
@PV('订单页面')
class OrderPage extends  React.Component {
  ..
}
```

### 链式调用

由于高阶组件返回的是一个新的组件，所以链式调用是默认支持的。基于 checkLogin 与 PV 两个例子，链式使用是这样的：

```js
// 函数调用方式
class RawUserPage extends React.Component {
  ...
}
const UserPage = checkLogin(PV('用户页面')(RawUserPage))
// 装饰器调用方式
@checkLogin
@PV('用户页面')
class UserPage extends  React.Component {
  ...
}
```

### 渲染劫持

渲染劫持可以通过控制 render 函数修改输出内容，常见的场景是显示加载元素，如下情况所示：

```js
function withLoading(WrappedComponent) {
  return class extends WrappedComponent {
    render() {
      if (this.props.isLoading) {
        return <Loading />;
      } else {
        return super.render();
      }
    }
  };
}
```

### 缺陷

**丢失静态函数**

```js
// UserPage.jsx
@PV('用户页面')
export default class UserPage extends  React.Component {
  static getUser() {
      ...
  }
}
// page.js
import UserPage from './UserPage'
UserPage.checkLogin() // 调用失败，并不存在。
```

如果希望外界能够被调用，那么可以在 PV 函数中将静态函数复制出来。

```js
const PV = (pageName) => {
  return (WrappedComponent) => {
    class Wrap extends Component {
      componentDidMount() {
        trackPageView(pageName);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
    Wrap.getUser = WrappedComponent.getUser;
    return Wrap;
  };
};
```

通过 hoist-non-react-statics 来处理，可以自动复制所有静态函数。

```js
import hoistNonReactStatics from 'hoist-non-react-statics';
const PV = (pageName) => {
  return (WrappedComponent) => {
    class Wrap extends Component {
      componentDidMount() {
        trackPageView(pageName);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
    hoistNonReactStatics(Wrap, WrappedComponent);
    return Wrap;
  };
};
```

**refs 属性不能透传**

ref 属性由于被高阶组件包裹了一次，所以需要进行特殊处理才能获取。React 为我们提供了一个名为 React.forwardRef 的 API 来解决这一问题，以下是官方文档中的一个案例：

```js
function withLog(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }
    render() {
      const { forwardedRef, ...rest } = this.props;
      // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }
  // 注意 React.forwardRef 回调的第二个参数 “ref”。
  // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
  // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
```

资料：

- 前端面试宝典之 React 篇
