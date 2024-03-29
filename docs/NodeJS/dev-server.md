---
sidebarDepth: 1
---

# dev-server

https://blog.csdn.net/xiaoxiao520c/article/details/77771217

开发模式：把构建的数据放到内存中。

这样我们可以在 nodejs 的执行环境中拿到 webpack 打包的上下文，就可以不重启服务但每次文件更新都可以拿到最新的 bundle。

```js
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
  /* ...处理结果 */
});
// or
compiler.watch(
  {
    // watch options
  },
  (err, stats) => {
    /* ...处理结果 */
  }
);
```

webpack-dev-middleware:

```js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const complier = webpack(config); //webpack的编译器，使用webpack和配置项可以对代码进行编译

const app = express(); //使用express创建一个app的服务器实例。
app.use(
  webpackDevMiddleware(complier, {
    publicPath: config.output.publicPath,
  })
);
app.listen(3000, () => {
  console.log('server is running');
});
```

```js
// webpack.config.js
module.exports = {
  output: {
    // publicPath: 'http://cdn.com.cn',
    // filename: 'bundle.js',
    publicPath: '/',
    filename: '[name].js', //会根据entry的键名来生成打包后的文件名
    path: path.resolve(__dirname, 'dist'), //生成了bundle的绝对路径，位于webpack.config.js的所在当前目录的路径
  },
};
```

## vuex examples server 中的例子

```js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.config');

const app = express();
const compiler = webpack(WebpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false,
    },
  })
);

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname));

app.use((req, res, next) => {
  res.redirect('/');
});

const port = process.env.PORT || 8080;
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
});
```
