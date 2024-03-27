---
title: DI
sidebarDepth: 0
---

## 一个简单的 DI

```js
var DI = {
  /**
   * 保存能够被注入的服务
   */
  providerCache: {},
  /**
   * 注册一个新的服务时，以key: value形式保存在providerCache map中
   * @param key
   * @param value
   */
  register: function (key, value) {
    this.providerCache[key] = value;
  },
  /**
   * 实现依赖注入
   * @param fn
   * @param self
   * @returns {*}
   */
  inject: function (fn, self) {
    var $inject = this.annotate(fn), //获得函数的参数（被注入的对象key值）
      args = [];

    //遍历providerCache获得所有注入的对象，用一个数组记录
    for (var i = 0, len = $inject.length; i < len; i++) {
      args.push(this.providerCache[$inject[i]]);
    }
    if (isArray(fn)) {
      fn = fn[len];
    }
    //注入
    return fn.apply(self, args);
  },
  /**
   * 提取函数的参数
   * @param fn
   * @returns {Array}
   */
  annotate: function (fn) {
    var fnString = fn.toString(),
      args = [],
      FUNC_ARGS = /^function\s*[^(]*\(\s*([^)]*)\s*\)/m,
      FUNC_ARG_SPLIT = /,\s*/;
    if (isFunction(fn)) {
      args = fnString.match(FUNC_ARGS)[1].split(FUNC_ARG_SPLIT);
    } else if (isArray(fn)) {
      args = fn.slice(0, fn.length - 1);
    }
    return args;
  },
};

function isFunction(fn) {
  return typeof fn === "function";
}
function isArray(arr) {
  return Object.prototype.toString.call(arr) === "[object Array]";
}

/**
 * provider定义方法
 * @param name
 * @param fn
 */
function registerProvider(name, fn) {
  var obj = DI.inject(fn);
  DI.register(name, obj);
}

/**
 * controller定义方法
 * @param name
 * @param fn
 */
function registerController(name, fn) {
  DI.inject(fn);
}

registerProvider("provider1", function () {
  return {
    provider1: "foo",
  };
});

registerProvider("provider2", function (provider1) {
  return {
    provider2: provider1.provider1 + " bar",
  };
});

registerController("controller", [
  "provider2",
  function (provider2) {
    console.log(provider2.provider2);
  },
]);
```

在 Angular 中，这个注册表就叫作 module。

根据 DI 的原理，一个自然的推论就是：被注入的对象都是单例对象，因为创建了一个，就可以始终使用它了，不需要多次创建。因此，如果你需要在 Angular 中跨 Controller 共享数据或者通讯，那么就可以创建一个 Service/Value/Constant 等，然后把它们分别注入到两个 Controller 中，这两个 Controller 就自然会共享同一个对象了。

另外，由于实现 DI 需要容器进行处理，因此，只有少数几种函数可以使用依赖注入，它们是：controller、service/factory/provider、directive、filter、animation、config、run、decorator。简单地说，通过 module 注册进来的函数都可以，因为 module 会负责管理它们。

有一种场合不能使用依赖注入，那就是循环依赖。我们就使用手动注入的方式解决循环依赖问题，\$injector.get（'$http'）。
