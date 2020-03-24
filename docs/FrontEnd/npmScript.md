---
title: "npm script 前端工作流"
sidebarDepth: 2
---

## 目录

[[toc]]

### 开始 npm script

npm script 相比 grunt、gulp 之类的构建工具简单很多，因为它消除了这些构建工具所带来的抽象层，并带给我们更大的自由度。

其实，npm 在执行指定 script 之前会把 node_modules/.bin 加到环境变量 $PATH 的前面，这意味着任何内含可执行文件的 npm 依赖都可以在 npm script 中直接调用，换句话说，你不需要在 npm script 中加上可执行文件的完整路径，比如 `./node_modules/.bin/eslint **.js`。

### 用 cross-env 设置环境变量

我们在运行测试时，需要加上 NODE_ENV=test，或者在启动静态资源服务器时自定义端口号。因为不同平台的环境变量语法不同，我们可以使用 cross-env 来实现 npm script 的跨平台兼容，具体步骤如下：

添加 cross-env 到开发依赖：

```shell
npm i cross-env -D
# npm install cross-env --save-dev
# yarn add cross-env -D
```

改写使用了环境变量的 npm script：

```path
  "scripts": {
-    "test": "NODE_ENV=test mocha tests/",
+    "test": "cross-env NODE_ENV=test mocha tests/",
  },
```
