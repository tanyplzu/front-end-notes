---
sidebarDepth: 0
---

# Webpack 的基本工作流程

[[toc]]

## Webpack 解决的问题

- 能够将散落的模块打包到一起；
- 能够编译代码中的新特性；
- 能够支持不同种类的前端资源模块。

## Webpack 的核心原理

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)，当 webpack 处理应用程序时，通常以一个 js文件为入口，根据代码中的 import 或 require 语句，解析推断出文件所依赖的所有资源模块，递归地构建出一个依赖关系图(dependency graph)，然后将所有这些模块打包成一个或多个 bundle。

对那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以其转换为 webpack 能够处理的有效模块。

## Webpack 的运行方式

在项目中有两种运行 Webpack 的方式：基于命令行的方式或基于代码的方式。

```JS
//第一种：基于命令行的方式
webpack --config webpack.config.js

//第二种：基于代码的方式
var webpack = require('webpack')
var config = require('./webpack.config')
webpack(config, (err, stats) => {})
```

不同环境下的配置

```js
// ./webpack.config.js
module.exports = (env, argv) => {
  const config = {
    // ... 不同模式下的公共配置
  };

  if (env === 'development') {
    // 为 config 添加开发模式下的特殊配置
    config.mode = 'development';
    config.devtool = 'cheap-eval-module-source-map';
  } else if (env === 'production') {
    // 为 config 添加生产模式下的特殊配置
    config.mode = 'production';
    config.devtool = 'nosources-source-map';
  }

  return config;
};
```

不同环境的配置文件

```text
.
├── webpack.common.js ···························· 公共配置
├── webpack.dev.js ······························· 开发模式配置
└── webpack.prod.js ······························ 生产模式配置
```

使用 Object.assign 方法把公共配置对象复制到具体环境的配置对象中

```js
// ./webpack.common.js
module.exports = {
  // ... 公共配置
};
// ./webpack.prod.js
const merge = require('webpack-merge');
const common = require('./webpack.common');
module.exports = merge(common, {
  // 生产模式配置
});
// ./webpack.dev.jss
const merge = require('webpack-merge');
const common = require('./webpack.common');
module.exports = merge(common, {
  // 开发模式配置
});
```

- 为什么不用 Object.assign 方法？这个方法会完全覆盖掉前一个对象中的同名属性。但是像配置中的 plugins 这种数组，我们只是希望在原有公共配置的插件基础上添加一些插件，那 Object.assign 就做不到了。
- 可以使用 Lodash 提供的 merge 函数来实现，不过社区中提供了更为专业的模块 webpack-merge

## webpack.js 的基本流程

无论用哪种方式运行 Webpack，本质上都是 webpack.js 中的 Webpack 函数。这一函数的核心逻辑是：根据配置生成编译器实例 compiler，然后处理参数，执行 WebpackOptionsApply().process，根据参数加载不同内部插件。在有回调函数的情况下，根据是否是 watch 模式来决定要执行 compiler.watch 还是 compiler.run。

```js
const webpack = (options, callback) => {
  options = ... //处理options默认值
  let compiler = new Compiler(options.context)
  ... //处理参数中的插件等
  compiler.options = new WebpackOptionsApply().process(options, compiler);//分析参数，加载各内部插件
  ...
  if (callback) {
    ...
    compiler.run(callback)
  }
  return compiler
}
```

- 创建编译器 Compiler 实例。
- 根据 Webpack 参数加载参数中的插件，以及程序内置插件。
- 执行编译流程：创建编译过程 Compilation 实例，从入口递归添加与构建模块，模块构建完成后冻结模块，并进行优化。
- 构建与优化过程结束后提交产物，将产物内容写到输出文件中。

## Loader 机制

Webpack 是用 Loader（加载器）来处理每个模块的，而内部默认的 Loader 只能处理 JS 模块，如果需要加载其他类型的模块就需要配置不同的 Loader。

loader 用来转换模块的源代码。loader 在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中 task，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS 文件！

常见的 Loader 有三类：

- 编译转换类
- 文件操作类
- 代码检查类

每个 Webpack 的 Loader 都需要导出一个函数，这个函数就是我们这个 Loader 对资源的处理过程，它的输入就是加载到的资源文件内容，输出就是我们加工后的结果。我们通过 source 参数接收输入，通过返回值输出。

实现一个 markdown-loader.js

```js
// markdown-loader.js
const marked = require('marked');

module.exports = (source) => {
  // 1. 将 markdown 转换为 html 字符串
  const html = marked(source);
  // 2. 将 html 字符串拼接为一段导出字符串的 JS 代码
  const code = `module.exports = ${JSON.stringify(html)}`;
  return code;
  // code => 'export default "<h1>About</h1><p>this is a markdown file.</p>"'
};
```

除了 module.exports 这种方式，Webpack 还允许我们在返回的代码中使用 ES Modules 的方式导出，例如，我们这里将 module.exports 修改为 export default，然后运行打包，结果同样是可以的，Webpack 内部会自动转换 ES Modules 代码。

## 插件机制

### Webpack 中的插件

```js
class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.run.tap('HelloWorldPlugin', (compilation) => {
      console.log('hello world');
    });
  }
}
module.exports = HelloWorldPlugin;
```

### Hooks

- [Compiler Hooks](https://webpack.docschina.org/api/compiler-hooks/)；
- [Compilation Hooks](https://webpack.docschina.org/api/compilation-hooks/)；
- [JavascriptParser Hooks](https://webpack.docschina.org/api/parser/)。

Hook 的使用分为四步：

- 在构造函数中定义 Hook 类型和参数，生成 Hook 对象。
- 在插件中注册 Hook，添加对应 Hook 触发时的执行函数。
- 生成插件实例，运行 apply 方法。
- 在运行到对应生命周期节点时调用 Hook，执行注册过的插件的回调函数。

```js
lib/Compiler.js
this.hooks = {
  ...
  make: new SyncHook(['compilation', 'params']), //1. 定义Hook
  ...
}
...
this.hooks.compilation.call(compilation, params); //4. 调用Hook
...
lib/dependencies/CommonJsPlugin.js
//2. 在插件中注册Hook
compiler.hooks.compilation.tap("CommonJSPlugin", (compilation, { contextModuleFactory, normalModuleFactory }) => {
  ...
})
lib/WebpackOptionsApply.js
//3. 生成插件实例，运行apply方法
new CommonJsPlugin(options.module).apply(compiler);
```

### Compiler Hooks

**初始化阶段:**

- environment、afterEnvironment：在创建完 compiler 实例且执行了配置内定义的插件的 apply 方法后触发。
- entryOption、afterPlugins、afterResolvers：在 WebpackOptionsApply.js 中，这 3 个 Hooks 分别在执行 EntryOptions 插件和其他 Webpack 内置插件，以及解析了 resolver 配置后触发。

**构建过程阶段:**

- normalModuleFactory、contextModuleFactory：在两类模块工厂创建后触发。
- beforeRun、run、watchRun、beforeCompile、compile、thisCompilation、compilation、make、afterCompile：在运行构建过程中触发。

**产物生成阶段:**

- shouldEmit、emit、assetEmitted、afterEmit：在构建完成后，处理产物的过程中触发。
- failed、done：在达到最终结果状态时触发。

### Compilation Hooks

**构建阶段:**

- addEntry、failedEntry、succeedEntry：在添加入口和添加入口结束时触发（Webpack 5 中移除）。
- buildModule、rebuildModule、finishRebuildingModule、failedModule、succeedModule：在构建单个模块时触发。
- finishModules：在所有模块构建完成后触发。

**优化阶段:**

优化阶段在 seal 函数中共有 12 个主要的处理过程:

- 优化依赖项
- 生成 Chunk
- 优化 Module
- 优化 Chunk
- 优化 tree
- 优化 ChunkModules
- 生成 Module ids
- 生成 Chunk ids
- 生成 hash
- 生成 moduleAssets
- 生成 chunkAssets
- 优化 Assets

**Webpack 为每一个工作环节都预留了合适的钩子，我们在扩展时只需要找到合适的时机去做合适的事情就可以了。**

这种钩子机制又叫作面向切面编程（AOP），是软件工程中实现插件机制最常见的方式，如果你在以后的开发工作中有类似的需求，那钩子机制一定是最好的选择。而且对于使用 JavaScript 的开发者而言，实现面向切面编程其实也很容易，很多时候我们都会采用事件机制去实现这种编程模式。

### 编写一个简单的统计插件

```js
class SamplePlugin {
  apply(compiler) {
    var start = Date.now()
    var statsHooks = ['environment', 'entryOption', 'afterPlugins', 'compile']
    var statsAsyncHooks = [
      'beforeRun',
      'beforeCompile',
      'make',
      'afterCompile',
      'emit',
      'done',
    ]

    statsHooks.forEach((hookName) => {
      compiler.hooks[hookName].tap('Sample Plugin', () => {
        console.log(`Compiler Hook ${hookName}, Time: ${Date.now() - start}ms`)
      })
    })
    ...
  }
})
module.exports = SamplePlugin;
```
