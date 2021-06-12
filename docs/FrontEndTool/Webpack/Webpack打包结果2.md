---
sidebarDepth: 0
---

# Webpack 打包结果 2

[[toc]]

## api 介绍

webpack.config.js 配置

```js
// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

js 代码

```js
const hello = 'hello';
export default hello;
```

打包结果

```js
var __webpack_modules__ = {
  './src/hello.js': (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */
    __webpack_require__.d(__webpack_exports__, {
      /* harmony export */
      default: () => __WEBPACK_DEFAULT_EXPORT__,
      /* harmony export */
    });
    const hello = 'hello';
    /* harmony default export */
    const __WEBPACK_DEFAULT_EXPORT__ = hello;
  },
};
```

```js
import hello from './hello';
const world = 'world';
const helloWorld = () => `${hello} ${world}`;
export default helloWorld;
```

打包结果：

```js{11,14}
var __webpack_modules__ = {
  './src/helloWorld.js': (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */
    __webpack_require__.d(__webpack_exports__, {
      /* harmony export */
      default: () => __WEBPACK_DEFAULT_EXPORT__,
      /* harmony export */
    });
    /* harmony import */
    var _hello__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hello */ './src/hello.js');

    const world = 'world';
    const helloWorld = () => `${_hello__WEBPACK_IMPORTED_MODULE_0__.default} ${world}`;

    /* harmony default export */
    const __WEBPACK_DEFAULT_EXPORT__ = helloWorld;

    /***/
  },
};
```

### `__webpack_modules__`

**存了所有的模块代码**，其实对于模块代码的保存，在不同版本的 webpack 里面实现的方式并不一样，我这个版本是 5.4.0，在 4.x 的版本里面好像是作为数组存下来，然后在最外层的立即执行函数里面以参数的形式传进来的。但是不管是哪种方式，都只是转换然后保存一下模块代码而已。

### `__unused_webpack_module`

### `__webpack_exports__`

### `__webpack_require__`

其实就是用来加载模块的

```js
// The require function
function __webpack_require__(moduleId) {
  // Check if module is in cache
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  // Create a new module (and put it into the cache)
  var module = (__webpack_module_cache__[moduleId] = {
    // no module.id needed
    // no module.loaded needed
    exports: {},
  });

  // Execute the module function
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

  // Return the exports of the module
  return module.exports;
}
```

这个流程跟 Node.js 的 CommonJS 实现思路一模一样。

### `__webpack_require__.d`

核心是 Object.defineProperty，主要是用来将我们模块导出的内容添加到全局的 webpack_module_cache 缓存上。

```js
/* webpack/runtime/define property getters */
(() => {
  // define getter functions for harmony exports
  __webpack_require__.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
```

如果一个文件有 export default，需要添加一个 webpack_require.d 的辅助方法调用。

### `__webpack_require__.o`

```js
/* webpack/runtime/hasOwnProperty shorthand */
(() => {
  __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
```

其实就是 Object.prototype.hasOwnProperty 的一个简写而已。

### `__webpack_require__.r`

```js
/* webpack/runtime/make namespace object */
(() => {
  // define __esModule on exports
  __webpack_require__.r = (exports) => {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };
})();
```

这个方法就是给每个模块添加一个属性\_\_esModule，来表明他是一个 ES6 的模块。
