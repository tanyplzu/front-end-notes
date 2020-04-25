# React Router

### 引入和路由模式

```js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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

### react router 4

- 一切皆组件
- 动态路由的离散式声明

以前的路由都是定义在一个 router.js 文件中的，是集中式的定义。react router 4 可以再任意组件中去定义路由

```js
class User extends Component {
  render() {
    const { match } = this.props
    return (
      <div>
        <Route path={`${match.path}/:user`} component={UserDetail} />
      </div>
    )
  }
}
```
