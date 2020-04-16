---
sidebarDepth: 2
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

## 提升 webpack 的打包速度方法

- loader：使用 include 和 exclude 指定搜索文件的范围。
- babel-loader: 配置后面加上 loader:'babel-loader?cacheDirectory=true'将编译过的文件缓存起来，下次只需要编译更改过的代码文件即可。
- HappyPack：使用这个插件开启 loader 多线程打包。
- DllPlugin：将特定的类库提前打包然后引入，减少打包类库的次数，只有当类库更新版本才进行重新打包。
- resolve.alias：配置别名，更快找到路径。
- module.noParse：确定这个文件没有其他依赖时，让 webpack 打包时不扫描该文件。

## 减小 webpack 的打包后的体积的方法

- Scope Hoisting：分析模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数里。
- Tree Shaking：删除项目中未被引用的代码。
