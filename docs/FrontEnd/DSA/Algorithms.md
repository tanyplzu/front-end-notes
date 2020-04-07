---
sidebarDepth: 2
---

# 数据结构与算法

[[toc]]

## 算法相关

一般做算法复杂度分析的时候，遵循下面的技巧：

1. 看看有几重循环，一般来说一重就是`O(n)`，两重就是 `O(n^2)`，以此类推
2. 如果有二分，则为`O(logN)`
3. 保留最高项，去除常数项

### 浅拷贝

- `[...arr]`
- `Object.assign()`
- `map`
- `reduce`

> 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

### 深拷贝

#### 1. `JSON.parse(JSON.stringify(object))`

- 会忽略 `undefined`
- 会忽略 `symbol`
- 不能序列化函数
- 不能解决循环引用的对象

#### 2. 递归

```js
function deepCopy(p, c) {
  var c = c || {}
  for (var i in p) {
    if (typeof p[i] === 'object' && p[i] !== null) {
      c[i] = p[i].constructor === Array ? [] : {}
      deepCopy(p[i], c[i])
    } else {
      c[i] = p[i]
    }
  }
  return c
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

递归容易造成爆栈，尾部调用可以解决递归的这个问题，Chrome 的 V8 引擎做了尾部调用优化，我们在写代码的时候也要注意尾部调用写法。《你不知道的 JavaScript(下)》的一段代码：

```js
function trampoline(res) {
  // while会一直循环res，条件是typeof res == 'function'
  while (typeof res == 'function') {
    res = res()
  }
  return res
}

function _foo(acc, x) {
  if (x <= 1) return acc
  return function partial() {
    return _foo(x / 2 + acc, x - 1)
  }
}

var foo = function(x) {
  return trampoline(_foo(1, x))
}
```

### 如何用正则实现 string.trim()

trim() 方法用于删除字符串的头尾空格。trim() 方法不会改变原始字符串。

```js
// jQuery中封装有trim()
String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/g, '')
}
```

### 请实现 plus(1)(2)(3)(4)等于 10

```js {8}
// 方法1：
function plus(n) {
  let sum = n
  const _plus = function(n) {
    sum += n
    return _plus
  }
  _plus.toString = function() {
    return sum
  }
  return _plus
}

let num = plus(1)(2)(3)(4)
typeof num // 'function'
```

```js
// 方法2：
function multi() {
  const args = [].slice.call(arguments)
  const fn = function() {
    const newArgs = args.concat([].slice.call(arguments))
    return multi.apply(this, newArgs)
  }
  fn.toString = function() {
    return args.reduce(function(a, b) {
      return a + b
    })
  }
  return fn
}
```

### 找出 Array 中的最大元素

1.自己实现一个冒泡算法，只遍历一遍；

2.利用 Math 的 max 方法

```js
var list = [1, 100, 23, 65, 43, 2, 9]
Math.max.apply(null, list) //[1, 2, 9, 23, 43, 65, 100]
```

3.利用 Array 的 sort 方法先排序再取值

```js
var list = [1, 100, 23, 65, 43, 2, 9]
list.sort((a, b) => {
  return a - b
}) //[1, 2, 9, 23, 43, 65, 100]
```

4.使用 reduce()方法，记录每次比较的最大值

## 栈

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

## 排序

### 冒泡排序

```js
function swap(array, left, right) {
  let rightValue = array[right]
  array[right] = array[left]
  array[left] = rightValue
  // [array[left], array[right]] = [array[right], array[left]];  // ES6 解构
}
// 从小到大
function bubbleSort(array) {
  let lenth = array.length
  for (let i = lenth - 1; i > 0; i--) {
    // 从 0 到 `length - 1` 遍历
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1) // 也可以直接用解构
      }
    }
  }
  return array
}
```

> 第一个 for 循环是控制遍历次数的

该算法的操作次数是一个等差数列 n + (n - 1) + (n - 2) + 1 ，去掉常数项以后得出时间复杂度是 O(n \* n)

### 选择排序

每次遍历数组，选出最小值或最大值从新组成数组即可。

```js
function selectSort(array) {}
```

### 插入排序

### 归并排序

::: tip JavaScript Sort 方法

- Firefox 采用的归并排序；
- Chrome 采用的是快速排序

:::

```js{4}
function mergeSort(array) {
  var length = array.length
  // 终止拆分，开始合并
  if (length === 1) {
    return array
  }
  var mad = Math.floor(length / 2)
  var left = array.slice(0, mad)
  var right = array.slice(mad, length)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  var result = []
  var il = 0,
    ir = 0
  while (il < left.length && ir < right.length) {
    if (left[il] < right[ir]) {
      result.push(left[il])
      il++
    } else {
      result.push(right[ir])
      ir++
    }
  }
  while (il < left.length) {
    result.push(left[il])
    il++
  }
  while (ir < right.length) {
    result.push(right[ir])
    ir++
  }
  return result
}
```

主要采用分治和递归的思想。

### 快速排序

随便找一个基准数，将小于基准数的数字放在左边，将大于基准数的数字放于右边。

```js
var quickSort = function(array) {
  quick(array, 0, array.length - 1)
  return array
}

function quick(array, left, right) {
  var index
  if (array.length > 1) {
    index = partition(array, left, right)
    if (left < index - 1) {
      quick(array, left, index - 1)
    }
    if (index < right) {
      quick(array, index, right)
    }
  }
}

function partition(array, left, right) {
  var pivot = array[Math.floor((right + left) / 2)]
  var i = left
  var j = right
  while (i <= j) {
    while (array[i] < pivot) {
      i++
    }
    while (array[j] > pivot) {
      j--
    }
    if (i <= j) {
      swap(array, i, j)
      i++
      j--
    }
  }
  return i
}

function swap(array, left, right) {
  let rightValue = array[right]
  array[right] = array[left]
  array[left] = rightValue
  // [array[left], array[right]] = [array[right], array[left]];  // ES6 解构
}
```

## 搜索

### 二分查找法

数组是有序的，无序的无法做

```js
function show(arr, randomNum) {
  let first = 0
  let last = arr.length - 1
  while (first <= last) {
    let oindex = Math.floor((first + last) / 2)
    if (randomNum < oindex) {
      last = randomNum
    } else if (randomNum > oindex) {
      first = randomNum
    } else {
      return arr[oindex]
    }
  }
}
```

## 二叉树

部分代码

```js
class Node {
  constructor(key) {
    this.key = key
    this.left = undefined
    this.right = undefined
  }
  toString() {
    return `${this.key}`
  }
}
class BinarySearchTree {
  constructor() {
    this.root = undefined
  }
  insert(key) {}
  getRoot() {
    return this.root
  }
  search(key) {}
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback)
  }
  inOrderTraverseNode(node, callback) {
    if (node != null) {
      this.inOrderTraverseNode(node.left, callback)
      callback(node.key)
      this.inOrderTraverseNode(node.right, callback)
    }
  }
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }
  preOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node.key)
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback)
  }
  postOrderTraverseNode(node, callback) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, callback)
      this.postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }
  min() {
    return this.minNode(this.root)
  }
  minNode(node) {
    let current = node
    while (current != null && current.left != null) {
      current = current.left
    }
    return current
  }
  max() {
    return this.maxNode(this.root)
  }
  remove(key) {}
}
```

遍历：采用递归的方式进行遍历

- 中序遍历 inOrderTraverseNode;
- 先序遍历 preOrderTraverseNode;
- 后序遍历 postOrderTraverseNode

## 算法题

> [LeetCode](https://leetcode-cn.com/explore/)

- [爬楼梯](https://leetcode-cn.com/explore/interview/card/tencent/226/dynamic-programming/921/)

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if (n == 1) {
        return 1;
    }
    if (n == 2) {
        return 2;
    }
    const arr = [];
    arr[1] = 1;
    arr[2] = 2;
    for(let i = 3; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr[n];
```

- 标签：动态规划
- 本问题其实常规解法可以分成多个子问题，爬第 n 阶楼梯的方法数量，等于 2 部分之和
- 倒数第二步爬上 n-1 阶楼梯的方法数量。因为再爬 1 阶就能到第 n 阶
- 倒数第二步爬上 n-2 阶楼梯的方法数量，因为再爬 2 阶就能到第 n 阶
- 所以我们得到公式 arr[n] = arr[n-1] + arr[n-2]
- 同时需要初始化 arr[1]=1 和 arr[2]=2
- 时间复杂度：O(n)
