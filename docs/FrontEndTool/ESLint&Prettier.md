---
sidebarDepth: 0
---

# ESLint 与 Prettier

[[toc]]

## ESLint

### 安装

```bash
npm install eslint --save-dev
npx eslint --init
# 或
yarn eslint --init
```

生成.eslintrc.js 文件的过程

```bash
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript
Checking peerDependencies of eslint-config-airbnb@latest
Local ESLint installation not found.
The config that you've selected requires the following dependencies:

eslint-plugin-react@^7.20.0
eslint-config-airbnb@latest
eslint@^5.16.0 || ^6.8.0 || ^7.2.0
eslint-plugin-import@^2.21.2
eslint-plugin-jsx-a11y@^6.3.0
eslint-plugin-react-hooks@^4 || ^3 || ^2.3.0 || ^1.7.0
? Would you like to install them now with npm? › No / Yes
```

### Eslint 主要的作用

- 代码质量问题：语法层面检测代码使用方式是否有问题
- 代码风格问题：代码风格是否符合一定规则

### 配置文件

```js
module.exports = {
  // 根据环境判断全局变量是否可用
  env: {
    browser: false, // 浏览器环境
    es6: true,
  },
  // 继承共享配置
  extends: ['standard'],
  // 全局配置直接引用会报错
  globals: {
    API_BASE_URL: true,
    API_LOGIN_URL: true
  },
   // 设置语法解析器的相关配置 控制是否可以使用某个ES版本的语法
  parserOptions: {
    ecmaVersion: 6,
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

```bash
yarn add --dev --exact prettier
echo module.exports = {} > .prettierrc.js
```

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

在编码风格方面，eslint --fix 能够修复的规范问题比较有限，prettier 具有比 eslint --fix 更加强大的代码规范性修复能力。

```
npm i -D eslint
npm i -D prettier
npm i -D eslint-plugin-prettier
```

eslint-plugin-prettier 的作用：

- 关闭 eslint 没有必要或和 prettier 有冲突的配置。
- 可以在 eslint 的 extends 配置中使用 prettier。

```js
//.eslintrc.js
module.exports = {
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
```

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
  "scripts": {},
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": ["eslint", "git add"]
  }
}
```

## editorconfig

编辑器配置。用于覆盖编辑器默认配置，以确保不同编辑器之间，代码格式的统一。如果没有约定，不同的编辑器，或者相同编辑器、不同开发者的配置存在差异，可能出现，有的人是 tab 缩进、有的人是 space 缩进的情况，造成代码风格的差异。

## vscode 插件

- vscode ESLint 插件的报错规则采用本地项目中的.eslintrc.js 的配置；黄色为警告，红色为错误
- vscode prettier 插件使用.prettierrc.js 中的配置

## 资料

- [搞懂 ESLint 和 Prettier](https://zhuanlan.zhihu.com/p/80574300)
- [eslint 官方文档](https://eslint.org/docs/user-guide/getting-started)
- [prettier 官方文档](https://prettier.io/docs/en/index.html)
- [eslint.rules](https://eslint.bootcss.com/docs/rules/)
