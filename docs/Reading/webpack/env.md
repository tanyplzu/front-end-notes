---
sidebarDepth: 0
---

# env 文件与环境设置

### 环境注入

webpack 通过 DefinePlugin 内置插件将 process.env 注入到客户端代码中。

```js
plugins: [
  new webpack.DefinePlugin({
  // window.ENV = 'development'
    ENV: JSON.stringify('development')
  })
],
```

### 项目中使用

process.env 属性返回包含用户环境的对象。

```js
/* main.js */

// 如果是非正式环境，加载 VConsole
if (process.env.NODE_ENV !== 'production') {
  var VConsole = require('vconsole/dist/vconsole.min.js')
  var vConsole = new VConsole()
}
```

另外我们还可以使用配置中的 BASE_URL 来设置路由的 base 参数：

```js
let base = `${process.env.BASE_URL}` // 获取二级目录
```

### 有关问题

- webpack 通过 DefinePlugin 内置插件将 process.env 注入到客户端代码中时，process.env.NODE_ENV 为什么要进行 JSON.stringify 处理？
- process.env 中如何获取 package.json 中 name 的值？
- 如何在 package.json 中的 scripts 字段中定义一些自定义脚本来切换不同的环境？
- 开发中 NODE_ENV、cross-env、和 ENV 的区别

```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```
