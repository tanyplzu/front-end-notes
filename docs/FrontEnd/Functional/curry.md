---
sidebarDepth: 1
---

# 柯里化（curry）

## 面试题：

实现 add 方法，要求：

```js
add(1)(2) == 3; // true

add(1)(2)(3) == 6; // true
```

实现方式：

```js
const add = (arg1) => {
  const fn = (arg2) => {
    return fn;
  };
  fn.toString = function() {};
  return fn;
};
```

## 通用 curry 化

从中感受到 curry 化的优势：

- 提高复用性
- 减少重复传递不必要的参数
- 动态根据上下文创建函数

```js
const curry = (fn, length) => {
  length = length || fn.length;
  return function(...args) {
    if (args.length < length) {
      return curry(fn.bind(this, ...args), length - args.length);
    } else {
      return fn.call(this, ...args);
    }
  };
};
```

如果不想使用 bind，另一种常规思路是对每次调用时产生的参数进行存储：

```js
const curry = (fn) => {
  return (tempFn = (...arg1) => {
    if (arg1.length >= fn.length) {
      return fn(...arg1);
    } else {
      return (...arg2) => tempFn(...arg1, ...arg2);
    }
  });
};
```

简化为：

```js
const curry = (fn) =>
  (judge = (...arg1) =>
    arg1.length >= fn.length
      ? fn(...arg1)
      : (...arg2) => judge(...arg1, ...arg2));
```
