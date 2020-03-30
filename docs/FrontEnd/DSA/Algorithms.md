---
title: "数据结构与算法"
sidebarDepth: 2
---
## 目录

[[toc]]

## 常见数据结构

### 栈

```JS
class Stack {
  constructor() {
    this.stack = []
  }
  push(item) {
    this.stack.push(item)
  }
  pop() {
    this.stack.pop()
  }
  peek() {
    return this.stack[this.getCount() - 1]
  }
  getCount() {
    return this.stack.length
  }
  isEmpty() {
    return this.getCount() === 0
  }
}
```

## 算法相关

一般做算法复杂度分析的时候，遵循下面的技巧：

1. 看看有几重循环，一般来说一重就是`O(n)`，两重就是 `O(n^2)`，以此类推
2. 如果有二分，则为`O(logN)`
3. 保留最高项，去除常数项

### 浅拷贝
- `[...arr]`
- `Object.assign()`

> 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

### 深拷贝
####  1. `JSON.parse(JSON.stringify(object))` 

- 会忽略 `undefined`
- 会忽略 `symbol`
- 不能序列化函数
- 不能解决循环引用的对象

#### 2. 递归

```js
function deepCopy(p, c) {
  var c = c || {};
  for (var i in p) {
    if (typeof p[i] === 'object' && p[i] !== null) {
      c[i] = (p[i].constructor === Array) ? [] : {};
      deepCopy(p[i], c[i]);
    } else {
      c[i] = p[i];
    }
  }
  return c;
}
```

判断数组的方法：

```js
arr instanceof Array
Array.prototype.isPrototypeOf(arr)
Array.isArray(arr)
Object.prototype.toString.call(arr) === '[object Array]'
arr.constructor === Array
```

### 尾递归

递归容易造成爆栈，尾部调用可以解决递归的这个问题，Chrome 的 V8 引擎做了尾部调用优化，我们在写代码的时候也要注意尾部调用写法。《你不知道的JavaScript(下)》的一段代码：

```js
function trampoline(res) {
  // while会一直循环res，条件是typeof res == 'function'
  while (typeof res == 'function') {
    res = res();
  }
  return res;
}

function _foo(acc, x) {
  if (x <= 1) return acc;
  return function partial() {
    return _foo(x / 2 + acc, x - 1);
  };
}

var foo = function(x) {
  return trampoline(_foo(1, x));
};
```

### 如何用正则实现 string.trim() 

trim() 方法用于删除字符串的头尾空格。trim() 方法不会改变原始字符串。

```js
// jQuery中封装有trim()
String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
```

### 请实现plus(1)(2)(3)(4)等于8？
```js
// 方法1：
function plus(n) {
  let sum = n;
  const _plus = function (n) {
    sum += n;
    return _plus;
  };
  _plus.toString = function () {
    return sum;
  };
  return _plus;
}

// 方法2：
function multi() {
  const args = [].slice.call(arguments);
  const fn = function () {
    const newArgs = args.concat([].slice.call(arguments));
    return multi.apply(this, newArgs);
  }
  fn.toString = function () {
    return args.reduce(function (a, b) {
      return a + b;
    })
  }
  return fn;
}
```

### 找出Array中的最大元素，你能说出几种方法？
1.自己实现一个冒泡算法，只遍历一遍；
2.利用Math的max方法

```js
var list = [1,100,23,65,43,2,9];
Math.max.apply(null, list); //[1, 2, 9, 23, 43, 65, 100]
```

3.利用Array的sort方法先排序再取值
```js
var list = [1,100,23,65,43,2,9];
list.sort((a, b) => {return a-b;}) //[1, 2, 9, 23, 43, 65, 100]
```

4.使用reduce()方法，记录每次比较的最大值


### 冒泡排序

![sf-maopao](./imgs/sf-maopao.gif)

```js
function swap(array, left, right) {
  let rightValue = array[right]
  array[right] = array[left]
  array[left] = rightValue
}
function bubbleSort(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // 从 0 到 `length - 1` 遍历
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) swap(array, j, j + 1)
    }
  }
  return array;
}
```
该算法的操作次数是一个等差数列 n + (n - 1) + (n - 2) + 1 ，去掉常数项以后得出时间复杂度是 O(n * n)

### 二分查找法

数组是有序的，无序的无法做

```js
function show(arr, randomNum) {
  let first = 0;
  let last = arr.length - 1;
  while (first <= last) {
    let oindex = Math.floor((first + last) / 2);
    if (randomNum < oindex) {
      last = randomNum;
    } else if (randomNum > oindex) {
      first = randomNum;
    } else {
      return arr[oindex];
    }
  }
}
```









