---
sidebarDepth: 0
---

# ESLint 与 Prettier

[[toc]]

## 构建工具

### ESLint 与 Prettier 配合使用

区别：eslint 能帮助我们提高代码质量；prettier 能统一的编码风格；

```
npm i -D eslint
npm i -D prettier
npm i -D eslint-plugin-prettier
```

eslint-plugin-prettier 插件会调用 prettier 对你的代码风格进行检查，其原理是先使用 prettier 对你的代码进行格式化，然后与格式化之前的代码进行对比，如果过出现了不一致，这个地方就会被 prettier 进行标记。

```js
//.eslintrc.js
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

借助 ESLint 的 autofix 功能，在保存代码的时候，自动将抛出 error 的地方进行 fix。因为我们项目是在 webpack 中引入 eslint-loader 来启动 eslint 的，所以我们只要稍微修改 webpack 的配置，就能在启动 webpack-dev-server 的时候，每次保存代码同时自动对代码进行格式化。

```js
const path = require('path')
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
    	loader: 'eslint-loader',
    	enforce: 'pre',
    	include: [path.join(__dirname, 'src')],
    	options: {
          fix: true
    	}
      }
    ]
}
```

如果你的 eslint 是直接通过 cli 方式启动的，那么只需要在后面加上 fix 即可，如：eslint --fix。

### 如何对 Prettier 进行配置

- 根目录创建.prettierrc 文件，能够写入 YML、JSON 的配置格式，并且支持.yaml/.yml/.json/.js 后缀；
- 根目录创建.prettier.config.js 文件，并对外 export 一个对象；
- 在 package.json 中新建 prettier 属性。

下面我们使用 prettierrc.js 的方式对 prettier 进行配置，同时讲解下各个配置的作用。

```js
module.exports = {
  printWidth: 80, //一行的字符数，如果超过会进行换行，默认为80
  tabWidth: 2, //一个tab代表几个空格数，默认为80
  useTabs: false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
  singleQuote: false, //字符串是否使用单引号，默认为false，使用双引号
  semi: true, //行位是否使用分号，默认为true
  trailingComma: 'none', //是否使用尾逗号，有三个可选值"<none|es5|all>"
  bracketSpacing: true, //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  parser: 'babylon', //代码的解析引擎，默认为babylon，与babel相同。
};
```

注意一点，parser 的配置项官网列出了如下可选项：

- babylon
- flow
- typescript Since v1.4.0
- postcss Since v1.4.0
- json Since v1.5.0
- graphql Since v1.5.0
- markdown Since v1.8.0

如果你使用了 vue 的单文件组件形式，记得将 parser 配置为 vue，目前官方文档没有列出来。当然如果你自己写过 AST 的解析器，也可以用你自己的写的 parser: require("./my-parser")。
