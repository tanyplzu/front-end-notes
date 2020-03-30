# 数组的一些操作方法

### 打平数组

```js
// flat
ary = ary.flat(Infinity);
// replace
ary = str.replace(/(\[|\])/g, '').split(',');
// concat
arr = Array.prototype.concat.apply([], arr);
```

```js
str = str.replace(/(\[|\])/g, '');
str = '[' + str + ']';
ary = JSON.parse(str);
```

```js
function flatten(ary) {
  return ary.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}
let ary = [1, 2, [3, 4], [5, [6, 7]]];
console.log(flatten(ary));
```

```js
//只要有一个元素有数组，那么循环继续
while (ary.some(Array.isArray)) {
  ary = [].concat(...ary);
}
```

concat 的使用：

例子：[1], [2, 3], 4] -> [1, 2, 3, 4]

```js
function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}
```

深度打平：

```js
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]
```

```js
const flatten = (arr, depth = 1) =>
  arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);
```

Array.from

```js
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
```

创建一个长为 100 的数组

```js
Array.from({ length: 100 });
```

```
let a = [];
a.length=100;
// (100) [empty × 100]
```

```js
const initializeArrayWithValues = (n, val = 0) => Array(n).fill(val);
initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]
```

empty: **空语句**用来表明没有语句，尽管 JavaScript 语法希望有语句。

```js
const compact = arr => arr.filter(Boolean);
compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]);
// [ 1, 2, 3, 'a', 's', 34 ]
```

**array.reduce**

```
array.reduce(function(accumulator, currentValue, currentIndex, array ), initialValue)
```

1. `accumulator 累计器`
2. `currentValue 当前值`
3. `currentIndex 当前索引`
4. `array 数组`

```js
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3
```

```js
const bifurcateBy = (arr, fn) =>
  arr.reduce((acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [[], []]);
```

找不同：

```js
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};
```

数组去重

```js
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
```

reduce

```js
const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]
indexOfAll([1, 2, 3], 4); // []
```

```js
const longestItem = (...vals) => vals.reduce((a, x) => (x.length > a.length ? x : a));
```

```js
const partition = (arr, fn) =>
  arr.reduce(
    (acc, val, i, arr) => {
      acc[fn(val, i, arr) ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );
const users = [
  { user: 'barney', age: 36, active: false },
  { user: 'fred', age: 40, active: true }
];
partition(users, o => o.active);
// [[{ 'user': 'fred', 'age': 40, 'active': true }],[{ 'user': 'barney',  'age': 36, 'active': false }]]
```

reduce 之所以强大，一是可以记录他前一步的值，二是可以不用重新定义变量，三是可以初始化多个变量，四是具有遍历器的各种特性

```
[...'asdas'] //["a", "s", "d", "a", "s"]
```

```
null >>> 0  //0
undefined >>> 0  //0
void(0) >>> 0  //0
function a (){};  a >>> 0  //0
[] >>> 0  //0
var a = {}; a >>> 0  //0
123123 >>> 0  //123123
45.2 >>> 0  //45
0 >>> 0  //0
-0 >>> 0  //0
-1 >>> 0  //4294967295
-1212 >>> 0  //4294966084
```

## 能不能实现一个 call/apply 函数？

引自`冴羽`大佬的代码，可以说比较完整了。

```js
Function.prototype.call = function(context) {
  let context = context || window;
  let fn = Symbol('fn');
  context.fn = this;

  let args = [];
  for (let i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }

  let result = eval('context.fn(' + args + ')');

  delete context.fn;
  return result;
};
```

不过我认为换成 ES6 的语法会更精炼一些：

```js
Function.prototype.call = function(context, ...args) {
  let context = context || window;
  let fn = new Symbol('fn');
  context.fn = this;

  let result = eval('context.fn(...args)');

  delete context.fn;
  return result;
};
```

类似的，有 apply 的对应实现：

```js
Function.prototype.apply = function(context, args) {
  let context = context || window;
  context.fn = this;
  let result = eval('context.fn(...args)');

  delete context.fn;
  return result;
};
```
