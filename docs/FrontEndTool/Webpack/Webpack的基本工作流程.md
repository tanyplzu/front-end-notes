---
sidebarDepth: 0
---

# Webpack 的基本工作流程

在项目中有两种运行 Webpack 的方式：基于命令行的方式或基于代码的方式。

```JS
//第一种：基于命令行的方式
webpack --config webpack.config.js
//第二种：基于代码的方式
var webpack = require('webpack')
var config = require('./webpack.config')
webpack(config, (err, stats) => {})
```

## webpack.js 中的基本流程

无论用哪种方式运行 Webpack，本质上都是 webpack.js 中的 Webpack 函数。这一函数的核心逻辑是：根据配置生成编译器实例 compiler，然后处理参数，执行 WebpackOptionsApply().process，根据参数加载不同内部插件。在有回调函数的情况下，根据是否是 watch 模式来决定要执行 compiler.watch 还是 compiler.run。

```js
const webpack = (options, callback) => {
  options = ... //处理options默认值
  let compiler = new Compiler(options.context)
  ... //处理参数中的插件等
  compiler.options = new WebpackOptionsApply().process(options, compiler);
  //分析参数，加载各内部插件
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

## Webpack 中的插件

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

初始化阶段:

- environment、afterEnvironment：在创建完 compiler 实例且执行了配置内定义的插件的 apply 方法后触发。
- entryOption、afterPlugins、afterResolvers：在 WebpackOptionsApply.js 中，这 3 个 Hooks 分别在执行 EntryOptions 插件和其他 Webpack 内置插件，以及解析了 resolver 配置后触发。

构建过程阶段:

- normalModuleFactory、contextModuleFactory：在两类模块工厂创建后触发。
- beforeRun、run、watchRun、beforeCompile、compile、thisCompilation、compilation、make、afterCompile：在运行构建过程中触发。

产物生成阶段:

- shouldEmit、emit、assetEmitted、afterEmit：在构建完成后，处理产物的过程中触发。
- failed、done：在达到最终结果状态时触发。

### Compilation Hooks

构建阶段:

- addEntry、failedEntry、succeedEntry：在添加入口和添加入口结束时触发（Webpack 5 中移除）。
- buildModule、rebuildModule、finishRebuildingModule、failedModule、succeedModule：在构建单个模块时触发。
- finishModules：在所有模块构建完成后触发。

优化阶段

优化阶段在 seal 函数中共有 12 个主要的处理过程:

- 优化依赖项
- 生成 Chunk
- 优化 Module
- 优化 Chunk
- 优化 tree
- 优化 ChunkModules
- 生成 Module ids
- 生成 Chunk ids
- 生成 hash 等
- 生成 moduleAssets
- 生成 chunkAssets
- 优化 Assets

## 编写一个简单的统计插件

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