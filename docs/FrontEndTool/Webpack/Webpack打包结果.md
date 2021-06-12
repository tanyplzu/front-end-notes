---
sidebarDepth: 0
---

# Webpack 打包结果

示例代码：

```js
// index.js
import createHeading from './heading.js';
const heading = createHeading();
document.body.append(heading);

// heading.js
export default () => {
  const element = document.createElement('h2');
  element.textContent = 'Hello webpack';
  element.addEventListener('click', () => alert('Hello webpack'));
  return element;
};
```

none 模式下的打包结果如下：

删除了`/******/`后的代码。

```js
(function(modules) {
  // webpackBootstrap
  // The module cache 缓存加载过的模块
  var installedModules = {}; // The require function 用于加载指定模块的函数

  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    } // Create a new module (and put it into the cache)
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    }); // Execute the module function

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__); // Flag the module as loaded

    module.l = true; // Return the exports of the module

    return module.exports;
  } // 挂载了一些其他数据和工具函数 // expose the modules object (__webpack_modules__)

  __webpack_require__.m = modules; // expose the module cache

  __webpack_require__.c = installedModules; // define getter function for harmony exports

  __webpack_require__.d = function(exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  }; // define __esModule on exports

  __webpack_require__.r = function(exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require

  __webpack_require__.t = function(value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key];
          }.bind(null, key)
        );
    return ns;
  }; // getDefaultExport function for compatibility with non-harmony modules

  __webpack_require__.n = function(module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module['default'];
          }
        : function getModuleExports() {
            return module;
          };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  }; // Object.prototype.hasOwnProperty.call

  __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__

  __webpack_require__.p = ''; // Load entry module and return exports

  return __webpack_require__((__webpack_require__.s = 0));
})(
  /************************************************************************/
  [
    /* 0 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__);
      /* harmony import */ var _heading_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

      const heading = Object(_heading_js__WEBPACK_IMPORTED_MODULE_0__['default'])();
      document.body.append(heading);

      /***/
    },
    /* 1 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */ __webpack_exports__['default'] = () => {
        const element = document.createElement('h2');
        element.textContent = 'Hello webpack';
        element.addEventListener('click', () => alert('Hello webpack'));
        return element;
      };

      /***/
    },
  ]
);
```

整体生成的代码其实就是一个立即执行函数，这个函数是 Webpack 工作入口（webpackBootstrap），它接收一个 modules 参数，调用时传入了一个数组。

```js
(function(modules) {
  // webpackBootstrap
})([]);
```

展开这个传入的数组，里面的元素均是参数列表相同的函数。这里的函数对应的就是我们源代码中的模块，也就是说每个模块最终被包裹到了这样一个函数中，从而实现模块私有作用域。

```js
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
  'use strict';
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _heading_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

  const heading = Object(_heading_js__WEBPACK_IMPORTED_MODULE_0__['default'])();
  document.body.append(heading);

  /***/
},
  /* 1 */
  /***/ function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */ __webpack_exports__['default'] = () => {
      const element = document.createElement('h2');
      element.textContent = 'Hello webpack';
      element.addEventListener('click', () => alert('Hello webpack'));
      return element;
    };

    /***/
  });
```

## 工作模式 mode

Webpack 4 新增了一个工作模式的用法：

- production 模式下，启动内置优化插件，自动优化打包结果，打包速度偏慢；
- development 模式下，自动优化打包速度，添加一些调试过程中的辅助插件；
- none 模式下，运行最原始的打包，不做任何额外处理。

Webpack 默认使用 production 模式去工作，修改 Webpack 工作模式的方式有两种：

- 通过 CLI --mode 参数传入；
- 通过配置文件设置 mode 属性。

### production 模式

在 production 会做优化，会做代码的合并

```js
[
  function(e, t, n) {
    'use strict';
    n.r(t);
    const r = (() => {
      const e = document.createElement('h2');
      return (
        (e.textContent = 'Hello webpack'),
        e.addEventListener('click', () => alert('Hello webpack')),
        e
      );
    })();
    document.body.append(r);
  },
];
```

### development 模式

在 development 模式下，传入的是对象，不是数组。

```js
(function(modules) {
  // webpackBootstrap
})({
  './src/heading.js': function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    eval(
      "__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n  const element = document.createElement('h2')\n  element.textContent = 'Hello webpack'\n  element.addEventListener('click', () => alert('Hello webpack'))\n  return element\n});\n\n//# sourceURL=webpack:///./src/heading.js?"
    );
  },

  './src/index.js': function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    eval(
      '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _heading_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./heading.js */ "./src/heading.js");\n\nconst heading = Object(_heading_js__WEBPACK_IMPORTED_MODULE_0__["default"])()\ndocument.body.append(heading)\n\n//# sourceURL=webpack:///./src/index.js?'
    );
  },
});
```
