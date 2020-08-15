# 配置 loader

常用的 loader:

- bable-loader
- css-loader
- less-loader
- ts-loader
- file-loader
- raw-loader
- thread-loader

常见的 Loader

- css-loader: 解释 (interpret) @import 和 url() ，会 import/require 后再解析 (resolve) 它们，推荐和 style-loader 一起配合使用。
- babel-loader: 让 webpack 可以使用 babel 代码编译能力。并在 .babelrc 或者 package.json 的 "babel: {"plugin": []}

```js
const path = require('path')
module.exports = {
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
}
```
