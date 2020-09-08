# React Router

### 引入和路由模式

```js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
```

React Router 被拆分成三个包：`react-router` , `react-router-dom` 和 `react-router-native`。

```js
// v3 的写法
import { Router, Route, IndexRoute } from 'react-router';
```

### 路由配置

```js
<Route path='/detail/:id' component={ProductDetail} />
// 用 macth 获取
```

### 路由匹配

- exact 完全相同才会被匹配成功
- Switch 第一个命中后，不会匹配后面的路由

```js
<Route exact path='/' component={Home} />
```

### 渲染组件的方式

```js
<Router>
  <div>
    <Nav />
    <Route path='/' exact component={Home} />
    <Route path='/about' render={(props) => <About {...props} />} />
    <Route path='/contact' children={(props) => <div>{props.match ? 'active' : 'inactive'}</div>} />
    <Route path='/user' component={User} />
  </div>
</Router>
```

### withRouter

- 高阶组件中的 withRouter, 作用是将一个组件包裹进 Route 里面, 然后 react-router 的三个对象 history, location, match 就会被放进这个组件的 props 属性中。
- 如果我们某个东西不是一个 Router, 但是我们要依靠它去跳转一个页面, 比如点击页面的 logo, 返回首页, 这时候就可以使用 withRouter 来做。

```jsx
import { withRouter } from 'react-router-dom';
const Header = (props) => {
  return <header>{props.match.projectId}</header>;
};
export default withRouter(Header);
```

### react router 4

- 一切皆组件
- 动态路由的离散式声明

以前的路由都是定义在一个 router.js 文件中的，是集中式的定义。react router 4 可以再任意组件中去定义路由

```js
class User extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <Route path={`${match.path}/:user`} component={UserDetail} />
      </div>
    );
  }
}
```

### main

```jsx
import { BrowserRouter, Route } from 'react-router-dom';

const PrimaryLayout = () => (
  <div className='primary-layout'>
    <header>Our React Router 4 App</header>
    <main>
      <Route path='/' exact component={HomePage} />
      <Route path='/users' component={UsersPage} />
    </main>
  </div>
);

const HomePage = () => <div>Home Page</div>;
const UsersPage = () => <div>Users Page</div>;

const App = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
);

render(<App />, document.getElementById('root'));
```

生成的页面会渲染在 main 中。

### locations

```js
// 一个基本的location对象
{ pathname: '/', search: '', hash: '', key: 'abc123' state: {} }
```

### 资料

- [All About React Router 4](https://css-tricks.com/react-router-4/)
