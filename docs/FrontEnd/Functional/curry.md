---
sidebarDepth: 0
---

# 柯里化（curry）

[[toc]]

## 面试题：

实现 add 方法，要求：

```js
add(1)(2) == 3; // true

add(1)(2)(3) == 6; // true
```

实现方式：

```js
function add(a) {
  function sum(b) {
    // 使用闭包
    a = a + b; // 累加
    return sum;
  }
  sum.toString = function() {
    // 重写toSting() 方法
    return a;
  };
  return sum; // 返回一个函数
}
```

## 通用 curry 化

curry 化的优势：

- 提高复用性，可以生成新的函数
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

## lodash 中的 curry

使用：

```js
const _ = require('lodash');

function getSum(a, b, c) {
  return a + b + c;
}

const curried = _.curry(getSum);

console.log(curried(1, 2, 3));
console.log(curried(1)(2, 3));
console.log(curried(1, 2)(3));
```

实现：

```js
function curry(func) {
  return function curriedFn(...args) {
    // 判断实参和形参的个数
    if (args.length < func.length) {
      return function() {
        return curriedFn(...args.concat(Array.from(arguments)));
      };
    }
    return func(...args);
  };
}
```

## 柯里化例子

```js
const _ = require('lodash');

const match = _.curry(function(reg, str) {
  return str.match(reg);
});

const haveSpace = match(/\s+/g);
const haveNumber = match(/\d+/g);

const filter = _.curry(function(func, array) {
  return array.filter(func);
});

const findSpace = filter(haveSpace);

// console.log(haveSpace('helloworld'))
// console.log(haveNumber('abc'))

console.log(filter(haveSpace, ['John Connor', 'John_Donne']));
console.log(findSpace(['John Connor', 'John_Donne']));
```
