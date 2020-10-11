---
sidebarDepth: 1
---

# ESLint 与 Prettier

[[toc]]

## ESLint

> 中文文档太滞后，尽量看[官方文档 ](https://eslint.org/docs/user-guide/getting-started)

安装

```bash
npm install eslint --save-dev
npx eslint --init
# 或
yarn eslint --init
```

`--init` 时可以按项目配置校验规则

- eslint 既可以校验，又可以修复

### 配置文件

```js
module.exports = {
  // 根据环境判断全局变量是否可用
  env: {
    browser: false, // 浏览器环境
    es6: false,
  },
  // 继承共享配置
  extends: ['standard'],
  // 设置语法解析器的相关配置 控制是否可以使用某个ES版本的语法
  parserOptions: {
    ecmaVersion: 2015,
  },
  // 配置每个校验规则的开启关闭 0 1 2 -> off warn error
  rules: {
    'no-alert': 'error', // off warning
  },
};
```

### 配置注释

- [configuring-rules](http://eslint.cn/docs/user-guide/configuring#configuring-rules)

```js
/* eslint-disable */
/* eslint-enable */

/* eslint-disable no-alert, no-console */
/* eslint-enable no-alert, no-console */

/* eslint-disable-line */
/* eslint-disable-next-line */

// eslint-disable-line no-alert
// eslint-disable-next-line no-alert
```

### ESLint 结合 webpack

使用 load 机制集成到 webpack 中，安装 eslint-loader 模块

```js
module.exports = {
  mode: 'production',
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
        enforce: 'pre',
      },
    ],
  },
};
```

如果使用 react

```js
module.exports = {
  env: {},
  extends: [],
  parserOptions: {
    ecmaVersion: 2015,
  },
  rules: {
    'react/jsx-uses-react': 2,
    'react/jsx-uses-var': 2,
  },
  plugins: ['react'],
};
```

或

```js
module.exports = {
  env: {},
  extends: ['plugins:react/recoomended'],
  parserOptions: {
    ecmaVersion: 2015,
  },
  rules: {},
};
```

## Stylelint

- 提供了 CLI 工具，快速调用
- 需要配置文件
- 通过插件支持 Sass、Less 和 PostCss
- 支持 Webpack 集成
- stylelint-config-standard stylelint-config-sass-guidelines

## Prettier

> [官方文档](https://prettier.io/docs/en/index.html)

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

## ESLint 与 Prettier 配合使用

区别：eslint 能帮助我们提高代码质量；prettier 能统一的编码风格；

```
npm i -D eslint
npm i -D prettier
npm i -D eslint-plugin-prettier
```

eslint-plugin-prettier 插件会调用 prettier 对你的代码风格进行检查，其原理是先使用 prettier 对你的代码进行格式化，然后与格式化之前的代码进行对比，如果过出现了不一致，这个地方就会被 prettier 进行标记。

```js
//.eslintrc.js
module.exports = {
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
```

借助 ESLint 的 autofix 功能，在保存代码的时候，自动将抛出 error 的地方进行 fix。因为我们项目是在 webpack 中引入 eslint-loader 来启动 eslint 的，所以我们只要稍微修改 webpack 的配置，就能在启动 webpack-dev-server 的时候，每次保存代码同时自动对代码进行格式化。

```js
const path = require('path');
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.join(__dirname, 'src')],
        options: {
          fix: true,
        },
      },
    ],
  },
};
```

如果 eslint 是直接通过 cli 方式启动的，那么只需要在后面加上 fix 即可，如：eslint --fix。

## GitHooks

Husky 在不编写 Shell 脚本使用 GitHooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run ***"
    }
  }
}
```

lint-staged 配合 husky 做更多

```json
{
  "scripts": {
    "precommit": "lint-staged"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run precommit"
    }
  },
  "lint-staged": {
    "*.js": ["eslint", "git add"]
  }
}
```
