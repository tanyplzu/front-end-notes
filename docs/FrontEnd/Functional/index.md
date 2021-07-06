---
sidebarDepth: 0
---

# 函数式编程

[[toc]]

## 为什么要学习函数式编程

- 函数式编程是随着 React 的流行受到越来越多的关注
- Vue 3 也开始拥抱函数式编程
- 函数式编程可以抛弃 this
- 打包过程中可以更好的利用 tree shaking 过滤无用代码
- 方便测试、方便并行处理
- 函数式开发库：lodash、underscore、ramda

## 什么是高阶函数

- 可以把函数作为参数传递给另一个函数
- 可以把函数作为另一个函数的返回结果

使用高阶函数的意义

- 抽象可以帮我们屏蔽细节，只需要关注与我们的目标
- 高阶函数是用来抽象通用的问题

比如，将运算过程抽象成函数。

## 数组高阶函数方法

```js
// forEach
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i]);
  }
}
```

```js
// map
const map = (array, fn) => {
  let results = [];
  for (let value of array) {
    results.push(fn(value));
  }
  return results;
};
```

```js
// filter
function filter(array, fn) {
  let results = [];
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i])) {
      results.push(array[i]);
    }
  }
  return results;
}
```

```js
// some
const some = (array, fn) => {
  let result = false;
  for (let value of array) {
    result = fn(value);
    if (result) {
      break;
    }
  }
  return result;
};
```

## 纯函数的好处

- 可缓存
- 可自动化测试
- 并行处理

## 资料

- 《JavaScript ES6 函数式编程入门经典》
- 阮一峰[函数式编程入门教程](https://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html)
