---
sidebarDepth: 1
---

# Webpack

[[toc]]

Webpack 需要理解四个核心概念：入口(entry)， 输出(output)，加载器(loader)，插件(plugins)

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

## 启动本地服务

```shell
webpack-dev-server
```

## webpack 跨域请求

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

## 加载器(Loader)

本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图和最终的 bundle 可以直接引用的模块。

对一个单独的 module 对象定义了 rules 属性，里面包含两个必须属性：test 和 use。

- test: 表示需要检索的文件类型
- use: 指定配置文件 loader 选项，可以通过数组关联多个。

### 常见的 Loader

- css-loader: 解释 (interpret) @import 和 url() ，会 import/require 后再解析 (resolve) 它们，推荐和 style-loader 一起配合使用。
- babel-loader: 让 webpack 可以使用 babel 代码编译能力。并在 .babelrc 或者 package.json 的 "babel: {"plugin": []}

### Loader 原理

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中 “任务(task)”，并提供了处理前端构建步骤的强大方法。

loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL，loader 甚至允许你直接在 JavaScript 模块中 import CSS 文件！

## 插件(Plugins)

插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量，插件接口功能极其强大，可以用来处理各种各样的任务。想要使用一个插件，你只需要 require 进来，然后把它添加到 plugins 数组中。

多数插件可以通过选项 (option) 自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。

### Plugin 原理

## npm scripts

```json
"scripts": {
  "start": " cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js",
  "build": "cross-env NODE_ENV=production  webpack --config webpack.config.js --progress",
  "lint": "npx eslint --config .eslintrc src --fix",
  "size": " cross-env NODE_ENV=analyzer webpack --config webpack.config.js --progress"
}
```

## 构建性能优化策略

### 合理配置 CommonsChunkPlugin

### 通过 externals 配置来提取常用库

简单来说 external 就是把我们的依赖资源声明为一个外部依赖，然后通过 script 外链脚本引入。告知 Webapck 遇到此类变量名时就可以不用解析和编译至模块的内部文件中，而改用从外部变量中读取，这样能极大的提升编译速度，同时也能更好的利用 CDN 来实现缓存。

### 利用 DllPlugin 和 DllReferencePlugin

我们的项目依赖中通常会引用大量的 npm 包，而这些包在正常的开发过程中并不会进行修改，但是在每一次构建过程中却需要反复的将其解析。DllPlugin 的作用是预先编译一些模块，而 DllReferencePlugin 则是把这些预先编译好的模块引用起来。简单来说 DllPlugin 和 DllReferencePlugin 主要是缓存编译后的内容，对不变的文件减少二次编译。 配置如下：

webpack.dll.lib.js 为生成缓存文件，配置静态文件。

### 使用 Happypack 加速你的代码构建

happypack 的处理思路是将原有的 Webpack 对 loader 的执行过程从单一进程的形式扩展多进程模式，原本的流程保持不变，这样可以在不修改原有配置的基础上来完成对编译过程的优化

## 打包文件性能优化

### 提取公共文件

相同的资源被重复的加载，浪费用户的流量和服务器的成本，每个页面需要加载的资源太大，导致网页首屏加载缓慢，影响用户体验，将多个入口重复加载的公共资源提取出来, 基本配置如下。

> 在 webpack4.0 optimization.splitChunks 替代了 CommonsChunkPlugin

## 多入口

```js
entry: {
  // 两个入口代表打出来的两个包
  index: path.join(srcPath, 'index.js'),
  other: path.join(srcPath, 'other.js')
},
output: {
  filename: '[name].[contentHash:8].js', // name 即多入口时 entry 的 key
},
plugins: [
  // 多入口 - 生成 index.html
  new HtmlWebpackPlugin({
    template: path.join(srcPath, 'index.html'),
    filename: 'index.html',
    // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
    chunks: ['index']  // 只引用 index.js
  }),
  // 多入口 - 生成 other.html
  new HtmlWebpackPlugin({
    template: path.join(srcPath, 'other.html'),
    filename: 'other.html',
    chunks: ['other']  // 只引用 other.js
  })
]
```

如果 html 文件没有需要引入的 js，不需要配置多入口，只需要 HtmlWebpackPlugin 插件即可。

```js
new HtmlWebpackPlugin({
    filename: 'app-download.html',
    template: 'app-download.ejs',
    inject: false
}),
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

## 懒加载

```js
// non-esm.js
module.exports = {
  sayHello: () => {
    console.log('hello world');
  }
};

function sayHello() {
  import('./non-esm.js').then(module => {
    module.default.sayHello();
  });
}
```

##  module chunk bundle 的区别

- module 是各源码文件，webpack中一切皆模块；

- chunk 多模块的合成的，entry、import()、splitchunk。（类似于一个内存中的概念，还没输出）
- bundle 最终输出的文件

> 首页图中的左中右三个部分对应module chunk bundle