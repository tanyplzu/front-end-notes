---
sidebarDepth: 1
---

# npm script

## npm 切换镜像

```shell
npm get registry
npm config set registry https://registry.npm.taobao.org/
npm config set registry https://registry.npmjs.org/

yarn config get registry
yarn config set registry https://registry.npm.taobao.org/
yarn config set registry https://registry.yarnpkg.com
```

## npm init

npm init 的过程

```text
package name: (hello-npm-script)
version: (0.1.0)
description: hello npm script
entry point: (index.js)
test command:
git repository:
keywords: npm, script
license: (MIT)
```

package.json

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "description": "my app",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["npm", "script"],
  "author": "",
  "license": "MIT"
}
```

### 常用命令

更新安装包

```sh
npm outdated         # 先查询有哪些包有更新
npm update <package> # 更新指定包
```

## package.json 说明

### 注释

```shell
"//":"注释"
"# 注释"
```

### version

[语义化版本 2.0.0](https://semver.org/lang/zh-CN/)

版本格式：主版本号.次版本号.修订号，版本号递增规则如下：

- 主版本号：当你做了不兼容的 API 修改，
- 次版本号：当你做了向下兼容的功能性新增，
- 修订号：当你做了向下兼容的问题修正。

先行版本号及版本编译元数据可以加到“主版本号.次版本号.修订号”的后面，作为延伸。

### browser module main

- Webpack 在 Web 浏览器环境配置下，优先选择：browser > module > main，
- 在 Node.js 环境下 module > main。

### homepage

```js
"homepage": "https://github.com/owner/project#readme"
```

### bugs

```js
{
  "url" : "https://github.com/owner/project/issues",
  "email" : "project@hostname.com"
}
```

### license

- [五种开源协议(GPL,LGPL,BSD,MIT,Apache)](https://www.oschina.net/question/54100_9455)

MIT 协议可能是几大开源协议中最宽松的一个，核心条款是：该软件及其相关文档对所有人免费，可以任意处置，包括使用，复制，修改，合并，发表，分发，再授权，或者销售。唯一的限制是，软件中必须包含上述版 权和许可提示。

这意味着：你可以自由使用，复制，修改，可以用于自己的项目。可以免费分发或用来盈利。唯一的限制是必须包含许可声明。MIT 协议是所有开源许可中最宽松的一个，除了必须包含许可声明外，再无任何限制。

### files

需要上传到 npm 的文件，没有设置默认采用.npmignore or .gitignore.中的配置；

### bin

### man

### repository

### scripts

### config

### peerDependencies

```json
"peerDependencies": {
  "react": "^16.8.0"
}
```

### bundledDependencies

### optionalDependencies

### engines

## 模块化相关

### UMD 规范的代码示例

```js
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['b'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node.
    module.exports = factory(require('b'));
  } else {
    // Browser globals (root is window)
    root.returnExports = factory(root.b);
  }
})(typeof self !== 'undefined' ? self : this, function(b) {
  // Use b in some fashion.

  // Just return a value to define the module export.

  // This example returns an object, but the module

  // can return a function as the exported value.

  return {};
});
```

### 文件的输出

[simple-date-format](https://github.com/riversun/simple-date-format)

```js
// 入口配置
entry: {
  'simple-date-format': ['./src/simple-date-format.js'],
},
// 产出配置
output: {
  path: path.join(__dirname, 'lib'),
  publicPath: '/',
  // 根据环境产出不同的文件名
  filename: argv.mode === 'production' ? `[name].js` : `[name].js`,  //`[name].min.js`
  library: 'SimpleDateFormat',
  libraryExport: 'default',
  // umd 模块化方式
  libraryTarget: 'umd',
  globalObject: 'this',//for both browser and node.js
  umdNamedDefine: true,
  // 在和 output.library 和 output.libraryTarget 一起使用时，auxiliaryComment 选项允许用户向导出文件中插入注释
  auxiliaryComment: {
    root: 'for Root',
    commonjs: 'for CommonJS environment',
    commonjs2: 'for CommonJS2 environment',
    amd: 'for AMD environment'
  }
},
```

跟新到最新版本

```sh
yarn upgrade-interactive  --latest
npm i --save vue@latest
yarn add vue@latest
```
