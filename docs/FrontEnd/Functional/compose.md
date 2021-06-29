---
sidebarDepth: 1
---

# 代码组合（compose）

compose 实现的几种方案:

[[toc]]

compose 其实和前面提到的 pipe 一样，就是执行一连串不定长度的任务（方法），比如：

```js
let funcs = [fn1, fn2, fn3, fn4];
let composeFunc = compose(...funcs);
composeFunc(args);

// 就相当于：
fn1(fn2(fn3(fn4(args))));
```

实际上，compose 和 pipe 的差别只在于调用顺序的不同：

```js
// compose
fn1(fn2(fn3(fn4(args))));

// pipe
fn4(fn3(fn2(fn1(args))));
```

## 使用 reduce

```js
const reduceFunc = (f, g) => (...arg) => g.call(this, f.apply(this, arg));
const compose = (...args) => args.reverse().reduce(reduceFunc, args.shift());
```

## 使用 Promise

```js
const compose = (...args) => {
  let init = args.pop();
  return (...arg) =>
    args
      .reverse()
      .reduce(
        (sequence, func) => sequence.then((result) => func.call(null, result)),
        Promise.resolve(init.apply(null, arg))
      );
};
```

## lodash 版本

```js
var compose = function(funcs) {
  var length = funcs.length;
  var index = length;
  while (index--) {
    if (typeof funcs[index] !== 'function') {
      throw new TypeError('Expected a function');
    }
  }
  return function(...args) {
    var index = 0;
    var result = length ? funcs.reverse()[index].apply(this, args) : args[0];
    while (++index < length) {
      result = funcs[index].call(this, result);
    }
    return result;
  };
};
```

## Redux 版本

```js
// Redux 版本
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
```

##
