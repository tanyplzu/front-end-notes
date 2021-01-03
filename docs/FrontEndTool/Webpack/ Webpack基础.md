---
sidebarDepth: 0
---

# Webpack 基础

[[toc]]

## webpack 模块加载方式

- ES Modules 标准的 import 声明
- CommonJS 标准的 require, 载入 ES Modules 的模块是需要加 default
- AMD 标准的 difine 和 require

## plugin

[webpack-contrib/awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#webpack-plugins)

- copy-webpack-plugin
- html-webpack-plugin
- mini-css-extract-plugin
- DefinePlugin

```js
module.exports = {
  // ...
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true), // const PRODUCTION = true
      VERSION: JSON.stringify('5fa3b9'), // const VERSION = '5fa3b9'
      BROWSER_SUPPORTS_HTML5: true, // const BROWSER_SUPPORTS_HTML5 = 'true'
      TWO: '1+1', // const TWO = 1 + 1,
      CONSTANTS: {
        APP_VERSION: JSON.stringify('1.1.2'), // const CONSTANTS = { APP_VERSION: '1.1.2' }
      },
    }),
  ],
};
```

- TerserPlugin

```js
module.exports = {
  // ...
  // TerserPlugin 的使用比较特别，需要配置在 optimization 字段中，属于构建代码优化的一部分
  optimization: {
    minimize: true, // 启用代码压缩
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i, // 只处理 .js 文件
        cache: true, // 启用缓存，可以加速压缩处理
      }),
    ], // 配置代码压缩工具
  },
};
```

在以前的版本 webpack 是使用 UglifyWebpackPlugin 来压缩 JS 代码，后边更换为 TerserPlugin 了，可以更好地处理新的 JS 代码语法。

- IgnorePlugin

```js
module.exports = {
  // ...
  plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
};
```

- webpack-bundle-analyzer

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  // ...
  plugins: [new BundleAnalyzerPlugin()],
};
```

### development

development 下会启用 NamedChunksPlugin 和 NamedModulesPlugin，这两个 plugin 官方文档并没有详细的介绍，主要作用是在 Hot Module Replacement（热模块替换，后续简称 HMR）开启时，模块变化时的提示内容显示 chunk 或者 module 名称

### production

production 下会启动多个 plugins，分别是：

- FlagDependencyUsagePlugin 在构建时给使用的依赖添加标识，用于减少构建生成的代码量。
- FlagIncludedChunksPlugin 在构建时给 chunk 中所包含的所有 chunk 添加 id，用于减少不必要的 chunk。
- ModuleConcatenationPlugin 构建时添加作用域提升的处理，用于减少构建生成的代码量，详细参考：module-concatenation-plugin。
- NoEmitOnErrorsPlugin 编译时出错的代码不生成，避免构建出来的代码异常。
- OccurrenceOrderPlugin 按使用的次数来对模块进行排序，可以进一步减少构建代码量。
- SideEffectsFlagPlugin 在构建时给带有 Side Effects 的代码模块添加标识，用于优化代码量时使用。
- TerserPlugin 压缩 JS 代码，参考：Terser。

## 性能

webpack 如何进一步来减小 JS 代码的体积大小，其中包括了 Tree shaking，sideEffects 和 concatenateModules 这些优化配置选项。这些优化选项在 production mode 中都已经是开箱即用，无须用户设置便会默认开启，我们深入了解其细节以便于更好地把握 webpack 构建出来的内容。

## 拆分代码文件

 mini-css-extract-plugin 来将 CSS 代码单独拆分出来