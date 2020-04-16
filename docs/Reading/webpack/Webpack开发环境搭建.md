# Webpack 开发环境搭建

## 加载器(Loader)

本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图和最终的 bundle 可以直接引用的模块。

对一个单独的 module 对象定义了 rules 属性，里面包含两个必须属性：test 和 use。

- test: 表示需要检索的文件类型
- use: 指定配置文件 loader 选项，可以通过数组关联多个。

### 常见的 Loader

- css-loader: 解释 (interpret) @import 和 url() ，会 import/require 后再解析 (resolve) 它们，推荐和 style-loader 一起配合使用。
- babel-loader: 让 webpack 可以使用 babel 代码编译能力。并在 .babelrc 或者 package.json 的 "babel: {"plugin": []}

### Loader原理

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中 “任务(task)”，并提供了处理前端构建步骤的强大方法。

loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL，loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！

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
