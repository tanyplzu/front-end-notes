---
sidebarDepth: 0
---

# webpack 优化

[[toc]]

## 优化打包速度

### babel-loader

配置后面加上`loader:'babel-loader? cacheDirectory = true'`将编译过的文件缓存起来，下次只需要编译更改过的代码文件即可。

使用 include 和 exclude 指定搜索文件的范围

### IngorePlugin

避免引入无用模块。

```js
new webpack.IgnorePlugin({ resourceRegExp, contextRegExp })
```

- `resourceRegExp`：匹配(test)资源请求路径的正则表达式。
- `contextRegExp`：（可选）匹配(test)资源上下文（目录）的正则表达式。

```js
plugins: [
  // 忽略 moment 下的 /locale 目录
  new webpack.IgnorePlugin(/\.\/locale/, /moment/),
]
```

手动引入语言包：`require('./locale/' + name);`

### noParse

避免重复打包

```js
module.exports = {
  //...
  module: {
    noParse: /jquery|lodash/,
  },
}

module.exports = {
  //...
  module: {
    noParse: (content) => /jquery|lodash/.test(content),
  },
}
```

noParse 和 IngorePlugin 区别：

- IngorePlugin 直接不引入，代码中没有；
- noParse 引入，但不打包；

### HappyPack

Happypack 只是作用在 loader 上，使用多个进程同时对文件进行编译。

- 开启多进程打包
- 提高构建速度，特别是多进程 cpu

```js
const HappyPack = require('happypack');
module.exports = {
  module: {
    rules: [
      test: /\.js$/,
      // use: ['babel-loader?cacheDirectory'] 之前是使用这种方式直接使用 loader
      // 现在用下面的方式替换成 happypack/loader，并使用 id 指定创建的 HappyPack 插件
      use: ['happypack/loader?id=babel'],
      // 排除 node_modules 目录下的文件
      exclude: /node_modules/
    ]
  }
  plugins: [
    new HappyPack({
      // 必须配置
      // id 标识符，要和 rules 中指定的 id 对应起来
      id: 'babel',
      // 需要使用的 loader，用法和 rules 中 Loader 配置一样
      // 可以直接是字符串，也可以是对象形式
      loaders: ['babel-loader?cacheDirectory']
    })
  ]
}
```

> [使用 happypack 提升 Webpack 项目构建速度](https://juejin.im/post/5c6e0c3a518825621f2a6f45)

### ParallelUglifyPlugin

多进程压缩 js

```js
module.exports = {
  plugins: [
    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS 的参数
      // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
      uglifyJS: {
        output: {
          beautify: false, // 最紧凑的输出
          comments: false, // 删除所有的注释
        },
        compress: {
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        },
      },
    }),
  ],
}
```

- 项目较大，开启多进程会提高打包速度
- 项目较小，开启多进程反而降低打包速度（进程开销）

### 自动刷新

- 开启 dev-server 时会默认开启。
- 整个网页全部刷新，速度比较慢。
- 自动刷新时状态会丢失
- 热更新，代码更新，网页不更新，状态不丢失

### HotModuleReplacementPlugin 热更新

热更新，代码更新，网页不更新，状态不丢失

```js
module.exports = {
  plugins: [new HotModuleReplacementPlugin()],
  devServer: {
    hot: true,
  },
}
```

需要配置热跟新的范围

```js
// index.js
// 增加，开启热更新之后的代码逻辑
if (module.hot) {
  module.hot.accept(['./math'], () => {
    const sumRes = sum(10, 30)
    console.log('sumRes in hot', sumRes)
  })
}
```

### DllPlugin

动态链接库

使用场景

- 前端框架，如 Vue，和 react,体积大，构建慢
- 较稳定，不长升级版本
- 同一版本只需构建一次就行，不用每次都去构建

webpack 已经内置该插件

- DllPlugin，打出 dll 文件
- DllReferencePlugin 使用该 dll

简单来说 DllPlugin 和 DllReferencePlugin 主要是缓存编译后的内容，对不变的文件减少二次编译。webpack.dll.lib.js 为生成缓存文件，配置静态文件。

> [webpack dllPlugin 打包体积和速度优化](https://zhuanlan.zhihu.com/p/39727247)

## 产出代码

和线上产品有关

目标：

- 体积更小
- 合理分包，不重复加载
- 速度更快，内存更小

### 小图 base64 位编码

### Bundle 加 hash

### 懒加载

```js
// non-esm.js
module.exports = {
  sayHello: () => {
    console.log('hello world')
  },
}

function sayHello() {
  import('./non-esm.js').then((module) => {
    module.default.sayHello()
  })
}
```

### 提取公共代码

<!-- ### IngorePlugin -->

### 使用 CND 加速

主要配置 CDN 的前缀

### 使用 production

```js
module.exports = {
  mode: 'production',
}
```

- 会自动做代码压缩
- Vue 和 react 会自动删除调试代码
- 启用 tree-shaking

> tree-shaking 删除没有用的代码。必须用 ES6 module 才能生效
