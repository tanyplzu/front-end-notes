---
sidebarDepth: 1
---

# JavaScript 基础(三)

[[toc]]

## ES6 有关

### 箭头函数和普通函数的区别

解决了 this 指向的问题。

- 没有自己的 this，使用的是外层函数的 this;
- 不能使用 call bind 等；
- 不能 new;

### 为什么要使用模块化

- 解决命名冲突
- 提供复用性
- 提高代码可维护性

### Symbol

- 作用是表示独一无二的值；
- 传入字符串作为描书文件 Symbol('bar')
- 因为无法创建一个相同的键，在外部是无法访问的，可以作为对象的私有属性。
- 如果获取相同的 Symbol 值，可以使用 Symbol.for('bar')

```js
Symbol('bar') === Symbol('bar'); // false
Symbol.for('bar') === Symbol.for('bar'); // true
Symbol.for(true) === Symbol.for('true'); // true 字符串的对应关系
```

- 自定义对象的 toString 标签

```js
class Bar {
  constructor() {
    this[Symbol.toStringTag] = 'Bar';
  }
}
let bar = new Bar();
console.log(bar.toString()); // [Object Bar]
bar[Symbol.toStringTag]; // bar
Object.prototype.toString.call(bar); // "[object Bar]"
```

```js
const obj = {
  [Symbol.toStringTag]: 'XObject',
};

const __webpack_require__ = {};
__webpack_require__.r = function(exports) {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  }
  Object.defineProperty(exports, '__esModule', { value: true });
};
```

- 在 `for...in` 和 `Object.keys()`、`JSON.sringify()`会忽略 Symbol 属性
- 如果要获取 Symbol 的属性名，`Object.getOwnPropertySymbols`

### Map、WeakMap

map 和 Object 比，主要的特性：

- Object 是无序列表，Map 是有序列表
- Map 有迭代器属性 `Symbol(Symbol.iterator)`
- 可以用非字符串做键
- 有 size 属性，可以取到长度
- Object 有快属性和慢属性，不建议直接 delete 一个属性，map 可以直接 delete
- map 中的 keys、values、entries 返回迭代器属性

WeakMap 是 map 的变体，二者的外部行为基本一致，区别在于内部内存分配的工作方式。

### Proxy 可以实现什么功能

语法：

```js
const p = new Proxy(target, handler);
```

例子：

```js
const person = {
  name: 'typ',
};

const personProxy = new Proxy(person, {
  get(target, property) {
    return property in target ? target[property] : 'default';
    // target 指被访问的对象 person
    // property 表示外部要访问的属性
  },
  set(target, property, value) {
    target[property] = value;
  },
});
```

handler 对象的方法：

- handler.getPrototypeOf()
- handler.setPrototypeOf()

Vue3.0 使用 Proxy 替换原本的 API 原因在于 Proxy 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好，对数组也不用单独处理，Proxy 可以完美监听到任何方式的数据改变，唯一缺陷可能就是浏览器的兼容性不好了

### Reflect

其成员方法就是 Proxy 处理对象的默认实现

```js
const proxy = new Proxy(obj, {
  get(target, property) {
    return Reflect.get(target, property);
  },
});
```

它的作用是，统一了对象的操作的方式

`Reflect`对象与`Proxy`对象一样，也是 ES6 为了操作对象而提供的新 API。`Reflect`对象的设计目的有这样几个。

- 将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法

- 修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`

```js
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```

- 让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。

```js
// 老写法
'assign' in Object; // true
const myObj = { foo: 'bar' };
delete myObj.foo;

// 新写法
Reflect.has(Object, 'assign'); // true
Reflect.deleteProperty(myObj, 'foo');
```

#### 静态方法

- Reflect.get
- Reflect.set
- Reflect.has
- Reflect.deleteProperty

### async 和 await

Async/await 是以更舒适的方式使用 promise 的一种特殊语法。

#### Async function

```js
async function foo() {
  return 1;
}
// 等价于
function foo() {
  return Promise.resolve(1);
}
```

- async 函数的函数体可以被看作是由 0 个或者多个 await 表达式分割开来的。
- 从第一行代码直到（并包括）第一个 await 表达式（如果有的话）都是同步运行的。这样的话，一个不含 await 表达式的 async 函数是会同步运行的。然而，如果函数体内有一个 await 表达式，async 函数就一定会异步执行。

```js
async function foo() {
  await 1;
}
// 等价于
function foo() {
  return Promise.resolve(1).then(() => undefined);
}
```

在 await 表达式之后的代码可以被认为是存在在链式调用的 then 回调中，多个 await 表达式都将加入链式调用的 then 回调中，返回值将作为最后一个 then 回调的返回值。如下面例子的 async3。

```js
async function async1() {
  console.log('async1 start');
  await async2();
  await async3();
  console.log('asnyc1 end'); // 其实是下一个promise
}
async function async2() {
  console.log('async2');
}
async function async3() {
  console.log('async3');
}
console.log('script start');
setTimeout(() => {
  console.log('setTimeOut');
}, 0);
async1();
Promise.resolve(console.log('Promise.resolve'));
new Promise(function(reslove) {
  console.log('promise1');
  reslove();
}).then(function() {
  console.log('promise2');
});
console.log('script end');
// script start
// async1 start
// async2
// Promise.resolve
// promise1
// script end
// async3
// promise2
// asnyc1 end
// setTimeOut
```

#### await

await 操作符用于等待一个 Promise 对象。它只能在异步函数 async function 中使用。
