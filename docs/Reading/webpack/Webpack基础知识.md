---
sidebarDepth: 1
---

# Webpack 基础知识

[[toc]]

## 拆分配置和 merge

- webpack.base.conf.js
- webpack.dev.conf.js
- webpack.test.conf.js
- webpack.prod.conf.js

```json
"devDependencies": {
  "webpack-merge": "^4.2.2",
}
```

```js
const { smart } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
module.exports = smart(baseWebpackConfig, {
  module: {},
  plugins: [],
}
```

## path

```js
const path = require('path')
const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')
module.exports = {
  srcPath,
  distPath,
}
```

> [path](https://juejin.im/book/5bc1bf3e5188255c3272e315/section/5be7bda9f265da617369d025)

```text
./            当前文件所在目录，是个相对路径
              - 如：/Users/black/juejin/index.js
              - index.js 的 ./ 是 /Users/black/juejin/
__dirname     当前文件所在目录的完整目录名，也就是绝对路径
              - 如：/Users/black/juejin/node/
__filename    当前文件所在目录的完整目录路径，含文件名
              - 如：/Users/black/juejin/node/package.json
process.cwd() 当前执行 Node 命令时候的文件夹目录名
              - 如：node index.js 就是 index.js 文件夹目录
              - 如：node ./lib/index.js 就是 lib 这一级的目录
```

## autoprefixer

PostCSS 插件 autoprefixer ⾃动补⻬ CSS3 前缀

```css
.box {
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  -o-border-radius: 10px;
  border-radius: 10px;
}
```

配置：

```js
{
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      require('autoprefixer')({
        browsers: ['last 2 version', '> 1%', 'iOS 7'],
      }),
    ],
  },
}
```

## rem

使⽤ px2rem-loader

⻚⾯渲染时计算根元素的 font-size 值。也可以使⽤⼿淘的[lib-flexible 库](https://github.com/amfe/lib-flexible)

## npm scripts

```json
"scripts": {
  "start": " cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js",
  "build": "cross-env NODE_ENV=production  webpack --config webpack.config.js --progress",
  "lint": "npx eslint --config .eslintrc src --fix",
  "size": " cross-env NODE_ENV=analyzer webpack --config webpack.config.js --progress"
}
```

## 抽离 css

线上环境需要对 css 进行抽离和压缩

```js
plugins: [
  new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
  // 抽离 css 文件
  new MiniCssExtractPlugin({
    filename: 'css/main.[contentHash:8].css'
  })
],

optimization: {
  // 压缩 css
  minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
}
```

```js
module: {
  rules: [
    // 抽离 css
    {
      test: /\.css$/,
      loader: [
        MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
        'css-loader',
        'postcss-loader',
      ],
    },
    // 抽离 less
    {
      test: /\.less$/,
      loader: [
        MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
        'css-loader',
        'less-loader',
        'postcss-loader',
      ],
    },
  ]
}
```

webpack 的打包有一个打包入口，css 也是引到入口文件里的，通常情况会将 css 打入 js 文件中，所以需要做 css 抽离。

```js
// index.js
// 引入 css
import './style/style1.css'
import './style/style2.less'
```

## 抽离公共代码

```js
optimization: {
  // 压缩 css
  minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],

  // 分割代码块
  splitChunks: {
    chunks: 'all',
    /**
     * initial 入口 chunk，对于异步导入的文件不处理
        async 异步 chunk，只对异步导入的文件处理
        all 全部 chunk
      */

    // 缓存分组
    cacheGroups: {
        // 第三方模块
      vendor: {
        name: 'vendor', // chunk 名称
        priority: 1, // 权限更高，优先抽离，重要！！！
        test: /node_modules/,
        minSize: 0,  // 大小限制
        minChunks: 1  // 最少复用过几次
      },

      // 公共的模块
      common: {
        name: 'common', // chunk 名称
        priority: 0, // 优先级
        minSize: 0,  // 公共模块的大小限制
        minChunks: 2  // 公共模块最少复用过几次
      }
    }
  }
}

```

## Mode

Mode ⽤来指定当前的构建环境是：production、development 还是 none。设置 mode 可以使⽤ webpack 内置的函数，默认值为 production

## 解析 ES6

- 使⽤ babel-loader
- babel-loader 依赖于 babel 的配置⽂件是：.babelrc
- 增加 ES6 的 babel preset 配置

> 解析 es6 需要安装@bable/core @bable/preset-env @bable-loader

## webpack 中的⽂件监听

webpack 开启监听模式，有两种⽅式：

- 启动 webpack 命令时，带上 --watch 参数
- 在配置 webpack.config.js 中设置 watch: true

```json{3}
"scripts": {
  "build": "webpack ",
+ "watch": "webpack --watch"
}
```

**⽂件监听的原理分析**

轮询判断⽂件的最后编辑时间是否变化。某个⽂件发⽣了变化，并不会⽴刻告诉监听者，⽽是先缓存起来，等 aggregateTimeout

```js
module.export = {
  //默认 false，也就是不开启
  watch: true,
  //只有开启监听模式时，watchOptions才有意义
  wathcOptions: {
    //默认为空，不监听的文件或者文件夹，支持正则匹配
    ignored: /node_modules/,
    //监听到变化发生后会等300ms再去执行，默认300ms
    aggregateTimeout: 300,
    //判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
    poll: 1000,
  },
}
```

## webpack 跨域请求

使用 webpack-dev-server

- 在 webpack-dev-server 中配置跨域代理
- The dev-server makes use of the powerful http-proxy-middleware package.

```js
module.exports = smart(webpackCommonConf, {
  devServer: {
    port: 8080,
    progress: true,  // 显示打包的进度条
    contentBase: distPath,  // 根目录
    open: true,  // 自动打开浏览器
    compress: true,  // 启动 gzip 压缩
    // 设置代理
    proxy: {
      // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
      '/api': 'http://localhost:3000',

      // 将本地 /api2/xxx 代理到 localhost:3000/xxx
      '/api2': {
          target: 'http://localhost:3000',
          pathRewrite: {
              '/api2': ''
          }
      }
    }
  }
}
```

## 热更新

### webpack-dev-server

- WDS 不刷新浏览器
- WDS 不输出⽂件，⽽是放在内存中
- 使⽤ HotModuleReplacementPlugin 插件
- webpack-dev-server 的 proxy 功能是使用 `http-proxy-middleware` 来实现的

### webpack-dev-middleware(使用比较多)

webpack-dev-middleware 就是在 Express 中提供 webpack-dev-server 静态服务能力的一个中间件，我们可以很轻松地将其集成到现有的 Express 代码中去，就像添加一个 Express 中间件那么简单。

### HMR

> 没有看懂，有待研究

HMR 全称是 Hot Module Replacement，即模块热替换。HMR 既避免了频繁手动刷新页面，也减少了页面刷新时的等待。局部替换掉部分模块代码并且使其生效。

安装好 webpack-dev-server， 添加一些简单的配置，即在 webpack 的配置文件中添加启用 HMR 需要的两个插件：

```js
  new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
  new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
```

首先我们要知道一个概念：webpack 内部运行时，会维护一份用于管理构建代码时各个模块之间交互的表数据，webpack 官方称之为 Manifest，其中包括入口代码文件和构建出来的 bundle 文件的对应关系。可以使用 WebpackManifestPlugin 插件来输出这样的一份数据。

- Webpack Compile: 将 JS 编译成 Bundle
- HMR Server: 将热更新的⽂件输出给 HMR Rumtime
- Bundle server: 提供⽂件在浏览器的访问
- HMR Rumtime: 会被注⼊到浏览器，
- 更新⽂件的变化
- bundle.js: 构建输出的⽂件。

## 文件指纹

- Hash：和整个项⽬的构建相关，只要项⽬⽂件有修改，整个项⽬构建的 hash 值就会更改
- Chunkhash：和 webpack 打包的 chunk 有关，不同的 entry 会⽣成不同的 chunkhash 值。一般 js 会用 Chunkhash
- Contenthash：根据⽂件内容来定义 hash ，⽂件内容不变，则 contenthash 不变。css 文件一般用 Contenthash

```js{2,7}
output: {
  filename: '[name][chunkhash:8].js',
  path: __dirname + '/dist'
},
plugins: [
  new MiniCssExtractPlugin({
    filename: `[name][contenthash:8].css`
  })
]
```
