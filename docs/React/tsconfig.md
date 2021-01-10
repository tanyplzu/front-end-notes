---
sidebarDepth: 0,
title: tsconfig.json
---

# tsconfig.json 编译器配置文档

[[toc]]

## 编译器

ts-loader、awesome-typescript-loader 以及 bable-loader。creater-react-app 中默认的编译器 bable-loader，tsconfig.json 是它的配置文件。

## tsconfig.json

```json
{
  "compilerOptions": {
    // "noImplicitAny": true,
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

- noImplicitAny:false

可以省略 any

- target: "es5"

这个属性定义了你编译后的目标 javascript 版本，一般来说，我们需要让他编译为 es5，这样就可以被主流浏览器解读了。当然，你说我的 react 代码不是给浏览器看的，比如说，你使用的是 react-native 做作手机 app，那么这里的选项可以选择 es6。除了 es5 和 es6，我们还有很多其他常见的选项，ES5, ES6/ES2015, ES2016, ES2017, ES2018, ES2019, ES2020, ESNext 等

- lib: `["dom", "dom.iterable", "esnext"]`

这个属性列出了编译期间需要被包括进来的库文件，通过这些库文件，告诉 typescript 编译器可以使用哪些功能。比如说，我们这里有一个 dom 的库文件，这个文件会告诉编译器 dom api 的接口，所以当我们在 ts 代码中使用 dom 的时候，比如说执行“document.getElementById("root")”这句话的时候，编译器就会知道该如何进行检查。如果我们不设置这个选项，那么编译器也有自己默认的库文件列表，一般来说是["dom", "es6","DOM.Iterable"]等等

- allowJs: true

允许混合编译 JavaScript 文件

- esModuleInterop: true

这个选项允许我们使用 commonjs 的方式 import 默认文件。比如说，在没有开启这个选项时，我们需要这样写才能引用 react:

```js
import * as React from 'react';
```

但是当我们开启了这个选项以后，import 方式就与普通的 JavaScript 没有区别了，可以写为:

```js
import React from 'react';
```

这样处理项目引入会更自然。

- module: "esnext"

这里配置的是我们代码的模块系统，比较常见的有 Node.js 的 CommonJS 系统，ES6 标准的 esnext 系统，以及 requirejs 的 AMD 系统。我们这里使用的是 ES6 标准的 esnext 系统，不过如果把这里换成 CommonJS 也是可以的。

- moduleResolution: "node"

这个选项决定了我们编译器的工作方式，也决定了我们各个文件之间调用、import 的工作流程。这里曾经有两个选项，"node" and "classic"，但是"classic"这个选项在 2019 年 12 月就已经废弃了。

- moduleResolution: "node"

开启这个选项以后，编译器会将每个文件作为单独的模块来使用。

- noEmit: true,

开启这个选项表示当发生错误的时候，编译器不会生成 JavaScript 代码。

- jsx: "react",

显而易见，这个选项允许编译器支持编译 react 代码

- include: `["src/**/*"]`

使用此选项列出我们需要编译的文件， “文件路径”选项需要文件的相对或绝对路径，例如：
"\*_" - 任意子目录
"_" - 任意文件名
"?" - 只要字符跟随“?”，这个字符就会被视为可忽略字符 (e.g., "src/_.tsx?"则同时指代"src/_.tsx"与"src/\*.ts")

- files: `["./file1.ts", "./file2.d.ts", …]`

使用此选项列出编译器应始终包含在编译中的文件。无论是否使用“exclude”选项，都将会编译使用此选项内包括的所有文件。

- exclude: `["node_modules", "**/*/*.test.ts"]`

此选项将会列出从编译中排除的文件。它与“include”选项采取相同的模式，我们以使用此选项来过滤使用“include”选项指定的文件。 但是, “exclude”选项不会影响“files”选项。

通常，我们会排除 node_modules、测试文件、和编译输出目录。

如果省略此选项，编译器将使用"outDir"选项指定的文件夹。

如果没有同时指定"files"和"include"这两个选项，则编译器将编译根目录和任何子目录中的所有 TS 文件，但不包括使用“exclude”选项指定的文件。
