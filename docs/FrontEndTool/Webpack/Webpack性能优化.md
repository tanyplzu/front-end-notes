---
sidebarDepth: 0
---

# webpack 性能优化

[[toc]]

## 优化前的准备工作

### 优化方向

- 减少执行编译的模块。
- 提升单个模块构建的速度。
- 并行构建以提升总体效率。

### 两个工具

- 基于时间的分析工具：[speed-measure-webpack-plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin)
- 基于产物内容的分析工具：[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

```js
export default merge(prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8009,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info',
    }),
  ],
});
```

umijs 不支持`speed-measure-webpack-plugin`

## 优化打包速度

### 减少 resolve 的解析

```js
resolve: {
  modules: [
    path.resolve(__dirname, 'node_modules'), // 使用绝对路径指定 node_modules，不做过多查询
  ],

  alias: {
    '@': path.resolve(__dirname, 'src'),
  },

  // 删除不必要的后缀自动补全，少了文件后缀的自动匹配，即减少了文件路径查询的工作
  // 其他文件可以在编码时指定后缀，如 import('./index.scss')
  extensions: [".js"],

  // 避免新增默认文件，编码时使用详细的文件路径，代码会更容易解读，也有益于提高构建速度
  mainFiles: ['index'],
},
```

- **resolve.modules** 用于告诉 webpack 去哪些目录下查找引用的模块，默认值是`["node_modules"]`，意思是在`./node_modules`查找模块，找不到再去`../node_modules`，以此类推。
- `resolve.extensions`：用来表明文件后缀列表，默认查找顺序是 `['.js', '.json']`，如果你的导入文件没有添加后缀就会按照这个顺序查找文件。我们应该尽可能减少后缀列表长度，然后将出现频率高的后缀排在前面。
- `resolve.alias`：可以通过别名的方式来映射一个路径，能让 Webpack 更快找到路径。

### loader 缓存

#### cacheDirectory

配置后面加上`loader:'babel-loader? cacheDirectory = true'`将编译过的文件缓存起来，下次只需要编译更改过的代码文件即可。可以在`/node_modules/.cache/babel-loader`中查看。

umi 中可以在`src/.umi/.cache/babel-loader`查看。
#### Cache-loader

在编译过程中利用缓存的第二种方式是使用 Cache-loader。在使用时，需要将 cache-loader 添加到对构建效率影响较大的 Loader（如 babel-loader 等）之前，如下面的代码所示：

```js
module: {
  rules: [
    {
      test: /\.js$/,
      use: ['cache-loader', 'babel-loader'],
    },
  ],
}
```

#### include 和 exclude

使用 include 和 exclude 指定搜索文件的范围。

```js
rules: [
  {
    test: /\.jsx?/,
    include: [
      path.resolve(__dirname, 'src'),
      // 限定只在 src 目录下的 js/jsx 文件需要经 babel-loader 处理
      // 通常我们需要 loader 处理的文件都是存放在 src 目录
    ],
    use: 'babel-loader',
  },
  // ...
],
```

### IngorePlugin

避免引入无用模块。

```js
new webpack.IgnorePlugin({ resourceRegExp, contextRegExp });
```

- `resourceRegExp`：匹配(test)资源请求路径的正则表达式。
- `contextRegExp`：（可选）匹配(test)资源上下文（目录）的正则表达式。

```js
plugins: [
  // 忽略 moment 下的 /locale 目录
  new webpack.IgnorePlugin(/\.\/locale/, /moment/),
];
```

手动引入语言包：`require('./locale/' + name);`

### noParse

- `module.noParse`：如果你确定一个文件下没有其他依赖，就可以使用该属性让 Webpack 不扫描该文件，这种方式对于大型的类库很有帮助
  一般使用.min.js 结尾的文件。

```js
module.exports = {
  module:{
		noParse:/jquery|lodash/,//不去解析jquery|lodash中的依赖库
    // noParse:function(contentPath){
    //   return /jquery|lodash/.test(contentPath);
    // },
		rules:[
			{
				test:/\.js$/,
				use:{
					loader:'babel-loader',
					options:{
						presets:[
							'@babel/preset-env',
							'@babel/preset-react'
						]
					}
				}
			}
		]
	}
```

noParse 和 IngorePlugin 区别：

- IngorePlugin 直接不引入，代码中没有；
- noParse 引入，但不打包；

### HappyPack 和 thread-loader

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

#### thread-loader

每个 worker 都是一个独立的 node.js 进程，其开销大约为 600ms 左右。同时会限制跨进程的数据交换。
请仅在耗时的操作中使用此 loader！

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        use: [
          'thread-loader',
          // 耗时的 loader （例如 babel-loader）
        ],
      },
    ],
  },
};
```

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
};
```

- 项目较大，开启多进程会提高打包速度
- 项目较小，开启多进程反而降低打包速度（进程开销）

### 减少 plugin 的消耗

区分 mode 会让 webpack 的构建更加有针对性，更加高效。

例如当 mode 为 development 时，webpack 会避免使用一些提高应用代码加载性能的配置项，如 UglifyJsPlugin，ExtractTextPlugin 等，这样可以更快地启动开发环境的服务.

而当 mode 为 production 时，webpack 会避免使用一些便于 debug 的配置，来提升构建时的速度，例如极其消耗性能的 Source Maps 支持。

### 选择合适的 devtool

开发环境时一般选用 `eval-cheap-source-map`

### Externals

希望 webpack 不会对其进行打包，此时就可以配置 externals。

```js
moudles.export = {
  plugins: [
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: '//11.url.cn/now/lib/16.2.0/react.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: '//11.url.cn/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDom',
        },
      ],
    }),
  ],
};
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

```js
module.exports = {
  name: 'vendor',
  entry: ['react', 'react-dom'], // 这个例子我们打包 react & react-dom 作为公共类库

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vendor.js',
    library: 'vendor_[hash]', // 打包后对外暴露的类库名称
  },

  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_[hash]',
      path: path.resolve(__dirname, 'dist/manifest.json'), // 使用 DLLPlugin 在打包的时候生成一个 manifest 文件
    }),
  ],
};
```

> [webpack dllPlugin 打包体积和速度优化](https://zhuanlan.zhihu.com/p/39727247)

Externals 和 DLLPlugin 区别：

- 1.在 Webpack 的配置方面，externals 更简单，而 DllPlugin 需要独立的配置文件。
- 2.DllPlugin 包含了依赖包的独立构建流程，而 externals 配置中不包含依赖框架的生成方式，通常使用已传入 CDN 的依赖包。
- 3.externals 配置的依赖包需要单独指定依赖模块的加载方式：全局对象、CommonJS、AMD 等。
- 4.在引用依赖包的子模块时，DllPlugin 无须更改，而 externals 则会将子模块打入项目包中。

## 开发体验

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
};
```

需要配置热跟新的范围

```js
// index.js
// 增加，开启热更新之后的代码逻辑
if (module.hot) {
  module.hot.accept(['./math'], () => {
    const sumRes = sum(10, 30);
    console.log('sumRes in hot', sumRes);
  });
}
```

## 优化产出代码

和线上产品有关

目标：

- 体积更小
- 合理分包，不重复加载
- 速度更快，内存更小

### Scope Hoisting

如果在 Webpack4 中你希望开启这个功能，只需要启用 `optimization.concatenateModules` 就可以了。

```
module.exports = {
  optimization: {
    concatenateModules: true
  }
}
```

### Tree Shaking

而 lodash 还是基于 CommonJS ，需要替换为 lodash-es 才能生效。

第三方提供的插件（例如 babel-plugin-lodash 等)

### 小图 base64 位编码

### Bundle 加 hash

### 懒加载

```js
// non-esm.js
module.exports = {
  sayHello: () => {
    console.log('hello world');
  },
};

function sayHello() {
  import('./non-esm.js').then((module) => {
    module.default.sayHello();
  });
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
};
```

- 会自动做代码压缩
- Vue 和 react 会自动删除调试代码
- 启用 tree-shaking

> tree-shaking 删除没有用的代码。必须用 ES6 module 才能生效

## 一些小的优化点

### terser-webpack-plugin

- [uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) 换成了 [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin)，可以更好地针对 ES6 的代码进行处理。速度更快。

```js
export default merge(_config, {
  optimization: {
    // 线上环境才需要代码压缩
    minimizer: [
      new TerserPlugin({
        cache: true, // 开启缓存，未变更模块无需重复工作, 默认配置
        parallel: true, // 开启多个进程，加速压缩, 默认配置
        extractComments: false, // 关掉默认的license等注释抽取
        terserOptions: {
          compress: {
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,
            booleans: true,
            if_return: true,
            sequences: true,
            unused: true,
            conditionals: true,
            dead_code: true,
            evaluate: true,
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log'],
          },
        },
      }),
    ],
  },
});
```

### ⽂件指纹

- Hash：和整个项⽬的构建相关，只要项⽬⽂件有修改，整个项⽬构建的 hash 值就会更改
- Chunkhash：和 webpack 打包的 chunk 有关，不同的 entry 会⽣成不同的 chunkhash 值
- Contenthash：根据⽂件内容来定义 hash ，⽂件内容不变，则 contenthash 不变

如何使用：

- 项目级别，有任一地方改动 则哈希值都会发生变化。filename: '[name]-[hash].bundle.css'
- 同一路打包的文件 hash 值都是相同的 控制更精确。filename: '[name]-[chunkhash].bundle.css'
- 根据输出文件的内容生成的 hash 值解决缓存问题的 -- '最好方式'
- 可以在哈希末尾配置哈希值的长度。filename: '[name]-[contenthash:8].bundle.css'

```js
module.export = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name][hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
};
```

```js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    sreach: './src/hellowWebpack.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name][chunkhash:8].js',
  },
  // 注意在这里配置的loader
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // css 解析配置
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name][contenthash:8].css',
    }),
  ],
};
```

### 按需加载

react 中配置：

```js
const TimelineChart = React.lazy(() =>
  import(/* webpackChunkName: 'TimelineChart' */ './TimelineChart')
);

<Suspense fallback={null}>
  <TimelineChart size={size} />
</Suspense>;
```

魔法注释：如果使用 webpackchunkname 魔法注释来命名，需要注意 .babelrc 中 comment 必须为 true。

### prefetch/preload module

webpack v4.6.0+ 增加了对预获取和预加载的支持。

- prefetch(预获取)：将来某些导航下可能需要的资源
- preload(预加载)：当前导航下可能需要资源

```js
import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
```

这会生成 <link rel="prefetch" href="login-modal-chunk.js"> 并追加到页面头部，指示着浏览器在闲置时间预取 login-modal-chunk.js 文件。

### externals

```js
externals: {
  'react': 'window.React',
  'react-dom': 'window.ReactDOM',
}
```

### babel-preset-env

## 参考资料
[An in-depth guide to performance optimization with webpack](https://blog.logrocket.com/guide-performance-optimization-webpack/)

[How to React with Webpack 5 - Setup Tutorial](https://www.robinwieruch.de/minimal-react-webpack-babel-setup#react-with-webpack)

https://kaiwu.lagou.com/course/courseInfo.htm?courseId=88#/detail/pc?id=2269

彻底解决 Webpack 打包性能问题  
https://zhuanlan.zhihu.com/p/21748318

Webpack 4 教程 - 第八部分 使用 prefetch 和 preload 进行动态加载  
https://cloud.tencent.com/developer/article/1432717

webpack 中，webpackPrefetch、webpackPreload 和 webpackChunkName 的区别是什么？  
https://www.cnblogs.com/skychx/p/webpack-webpackChunkName-webpackPreload-webpackPreload.html

让你的 Webpack 起飞—考拉会员后台 Webpack 优化实战  
https://zhuanlan.zhihu.com/p/42465502

https://www.kancloud.cn/cyyspring/webpack/1836682
