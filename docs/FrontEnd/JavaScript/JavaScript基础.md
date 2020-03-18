---
sidebarDepth: 1
---
## JavaScript 基础

[[toc]]

### JavaScript 的变量有哪些类型？

- 分为两种：基础类型和引用类型。基础类型目前有六种，分别是`boolean`、`null`、`undefined`、`number`、`string`、`symbol`。
- 除了以上的基础类型之外，其他就是引用类型了，有`Array`、`Object`、`Function`。

### typeo 和 instanceof 判断变量类型的区别？

- typeof对于基础类型除了null以外都可以显示正确的类型，对于数组和对象都会显示object，对于函数会显示function。
- instanceof主要是用来判断引用类型，它的原理是根据原型链来查找。

::: tip
函数也是一个对象，有prototype属性；函数实例的instanceof可以是构造函数本身；也可以是Object对象；
:::

### 何时使用`===` 何时使用`==`

首先得明白两者的区别，`==`会先试图类型转换，然后再比较，而`===`不会类型转换，直接比较。如下例子：

```javascript
1 == '1' // true
1 === '1' // false
0 == false // true
0 === false // false
null == undefined // true
null === undefined // false
```

根据 jQuery 源码中的写法，只推荐在一个地方用`==`，其他地方都必须用`===`。这个用`==`的地方就是：

```javascript
if (obj.a == null) {}
// 这里相当于 obj.a === null || obj.a === undefined ，简写形式
```

编程是需要绝对严谨的态度，我们只在这一个地方让它进行类型转换，来简化我们的写法，因为这个场景非常简单和固定。而其他场景下，我们都必须使用`===`，除非有特殊的业务需要。

### JS中有哪些内置函数 —— 数据封装类对象

`Object` `Array` `Boolean` `Number` `String` `Function` `Date` `RegExp` `Error`

对于这种问题，回复时能把基本常用的回答上来就可以，没必要背书把所有的都写上。

### 创建对象有几种方法

- 字面量，{}；
- 构造函数，构造函数的实例是一个对象；
- Object.create；

### 有没有更好的判断变量类型的方法？

可以使用`Object.prototype.toString.call(var)`，可以更加准确的判断某个变量的类型。

### 如何判断一个变量是否是数组？

```js
arr instanceof Array
Array.prototype.isPrototypeOf(arr)
Array.isArray(arr)
Object.prototype.toString.call(arr) === '[object Array]'
arr.constructor === Array
```

### 你知道Array.prototype的类型是什么吗？

很多人都不知道，其实Array.prototype是一个数组，只不过length为0

### 类数组转为数组的方式有哪些？

```js
[].slice.call(arguments)
Array.from(arguments)
[...arguments]
```

### 将多维数组扁平化

```js
function flatten(arr) {
  return [].concat(...arr.map(v => {
    return Array.isArray(v) ? flatten(v) : v;
  }))
}

function flatten(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, [])
}

function flatten(arr) {
  return arr.flat(Infinity);
}

function flatten(arr) {  // 纯数字
  return arr.toString().split(',').map(Number);
}

function flatten(arr) {
  const ret = [];
  while (arr.length) {
    const item = arr.shift();
    if (Array.isArray(item)) {
      arr.unshift(...item);
    } else {
      ret.push(item);
    }
  }
  return ret;
}
```

flat方法：

- 指定要提取嵌套数组的结构深度，默认值为 1。一般会这样写：arr.flat(Infinity)。
- `flat()` 方法会移除数组中的空项;
- 使用 `reduce` 与 `concat`等

用递归的话，代码会比较复杂。还可以用以下方法来解决这个问题：

**利用Array.prototype.toString()方法**

```js
var list = [1,[2,[3]],4,[5]];
console.log(list.toString()); //1,2,3,4,5
```

原理：toString 方法返回一个字符串，该字符串由数组中的每个元素的 toString() 返回值经调用 join() 方法连接（由逗号隔开）组成。

**利用Array.prototype.join()方法**

```js
var list = [1,[2,[3]],4,[5]];
console.log(list.join()); //1,2,3,4,5
```


原理：join方法会让所有的数组元素转换成字符串，再用一个分隔符将这些字符串连接起来。如果元素是undefined 或者null， 则会转化成空字符串。

### 数组去重

```js
function unique(arr) {
  return [...new Set(arr)];
}

function unique(arr) {
  return arr.filter((v, i, a) => {
    return a.indexOf(v) === i;
  })
}

function unique(arr) {
  const tmp = new Map();
  return arr.filter(v => {
    return !tmp.has(v) && tmp.set(v);
  })
}
```



## DOM事件

### DOM事件的级别

### 什么是事件流/模型？

当某一个事件被触发时，分为三个阶段：
1. 事件通过捕获从window => document => body => 目标元素
2. 事件到达注册的目标上
3. 目标元素通过冒泡返回到window，沿途触发相同类型的事件



## 原型和面向对象

### 描述 new 一个对象的过程-------------

```javascript
function Foo(name) {
    this.name = name
    this.type = 'foo'
}
var foo = new Foo('beijing')
```

- 创建一个新对象，继承Foo.prototype
- `this` 指向这个新对象
- 执行代码，即对 `this` 赋值
- 返回 `this`

```js
var newFunc = function (func) {
    var o = Object.create(func.prototype);
    var k = func.call(o);   // 执行func  ***** 
    if (typeof k === 'object') {
    	return k;
    } else {
    	return o;
    }
};

var p = {name: 'p'};
var o4 = Object.create(p);
```



### 如何实现继承

1. 借助构造函数实现继承

```js
function Parent1 () {
	this.name = 'parent1';
}
function Child1 () {
	Parent1.call(this);
	this.type = 'child1';
}
console.log(new Child1(), new Child1().say());
```

::: danger Note
缺点：Parent1原型链上的东西没有被继承，只实现了部分继承
::: 

2. 借助原型链实现继承

```js
function Parent2 () {
  this.name = 'parent2';
  this.play = [1, 2, 3];
}
function Child2 () {
  this.type = 'child2';
}
Child2.prototype = new Parent2();
var s1 = new Child2();
var s2 = new Child2();
console.log(s1.play, s2.play);
s1.play.push(4);
```

::: danger Note
缺点：原型链较长。如果实例化多个对象，修改一个中的属性，另一个也会变化。
::: 

3. 组合方式

```js
function Parent3 () {
  this.name = 'parent3';
  this.play = [1, 2, 3];
}
function Child3 () {
  Parent3.call(this); // 执行1次
  this.type = 'child3';
}
Child3.prototype = new Parent3(); // 执行2次
var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play);
```
::: danger Note
缺点：原型链较长，Parent3执行了两次。`Parent3.call(this)`、`new Parent3()`
::: 

4. 组合继承的优化1

```js
function Parent4 () {
	this.name = 'parent4';
	this.play = [1, 2, 3];
}
function Child4 () {
	Parent4.call(this);
	this.type = 'child4';
}
Child4.prototype = Parent4.prototype;
```

5. 组合继承的优化2

```js
function Parent5 () {
	this.name = 'parent5';
	this.play = [1, 2, 3];
}
function Child5 () {
	Parent5.call(this);
	this.type = 'child5';
}
Child5.prototype = Object.create(Parent5.prototype);
```



## JavaScript的执行机制

### 说一下对变量提升的理解

函数执行时会先创建当前的上下文环境，其中这两点会产生“变量提升”的效果

- 变量定义
- 函数声明

### 说明 this 几种不同的使用场景

- 作为构造函数执行
- 作为对象属性执行
- 作为普通函数执行
- call apply bind

### 实际开发中闭包的应用

闭包的实际应用，主要是用来封装变量。即把变量隐藏起来，不让外面拿到和修改。

## 页面循环系统

## V8工作原理

## 浏览器渲染



## 通信类


### 如何创建一个Ajax

```js
var xhr = XMLHttpRequest
	? new XMLHttpRequest()
	: new ActiveXObject('Microsoft.XMLHTTP');
xhr.onreadystatechange = function(){
  // 通信成功时，状态值为4
  if (xhr.readyState === 4){
    if (xhr.status === 200||304||206){
      console.log(xhr.responseText);
    } else {
      console.error(xhr.statusText);
    }
  }};
xhr.onerror = function (e) {
  console.error(xhr.statusText);
};
xhr.open('GET', '/endpoint', true);
xhr.send(null);
```



### 你知道的解决跨域的方式有几种？

- JSONP: 利用script标签不受同源策略限制。

```html
<script src="http://www.abc.com/?data=name&callback=jsonp" charset="utf-8"></script>
<script type="text/javascript">
    jsonp({
        data: {
        },
    });
</script>
```

- WebSocket

```js
var ws = new WebSocket('wss://echo.websocket.org');
ws.onopen = function (evt) {
	console.log('Connection open ...');
	ws.send('Hello WebSockets!');
};

// 接收
ws.onmessage = function (evt) { 
  console.log('Received Message: ', evt.data);
	ws.close();
};
ws.onclose = function (evt) {
	console.log('Connection closed.');
};
```

- CORS：新出的通信标准，支持跨域的Ajax。

CORS预请求

在跨域时允许的方法只有GET、POST、HEAD；

允许的 Content-Type 也是有限制的，只允许 

text-plain：

multipart/form-data:

application/x-www-form-urlencoded:

其他限制：请求头的限制

对于跨域请求的限制，在跨域时需要做预请求，options

Access-Control-Expose-Headers 可以自定义头

Access-Control-Request-Method 自定义方法

Access-Control-Max-Age 设置时间后，在该时间段里不需要再发请求验证了

其实Response Hearders中设计的一系列属性都是给浏览器解析请求的配置项，告诉浏览器去如何解析。

- fetch

```js
fetch('/some/url/', {
	method: 'get',
}).then(function (response) {

}).catch(function (err) {
	// 出错了，等价于 then 的第二个参数，但这样更好用更直观
});
```



### cookie 和 session 分别是什么？

- cookie是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器发起请求时被携带并发送到服务器，它通常是告知服务端两个请求是否来自同一浏览器，保持用户的登录状态。
- session代表着服务器在和客户端一次会话的过程，存储着用户会话所需的属性及配置信息，当用户在不同页面之间跳转时，使整个用户会话一直存在。

### cookie和session有什么不同？

- 作用范围不同：cookie 存储在客户端，session 保存在服务器端。
- 存取的方式不同：cookie 只能保存ASCⅡ，session 可以存取任意数据类型。
- 有效期不同：cookie可设置长时间保持，session一般失效时间较短，或客户端关闭就会失效。
- 存储大小不同：单个 cookie 保存的数据不能超过4k，session 可存储数据远高于 cookie。

### cookie 和 session ？

浏览器发起第一次请求后服务端会返回一个 sessionID 存储到 cookie 中，当再次发起请求时服务端根据携带的 cookie 里的 sessionID 来查找对应的 session 信息，没有找到就说明没登录或登录失效，找到说明已经登录，可以进行之后的操作。

### 前后端实现登录的方式有哪些？

- cookie + session：前端登录后，后端会种一个httpOnly的cookie在前端，里面就有这个用户对应的sessionId，以后每一次前端发起请求会携带上这个 cookie，后端从里面解析到sessionId后找到对应的session 信息，就知道是谁再操作了。缺点是后端需要空间存储 session，用户多了，服务器多了都不方便，这种方式基本属于淘汰边缘。
- jwt + token：前端登录后，后端会返回一个包括用户信息加密的token字符串(可能还有过期时间，手机端有设备唯一码等信息)，客户端自己保存了，将这个 token 设置到 header 里的 Authorization，之后每次请求都带上，服务器解码这个token之后就知道是谁在访问了。优点是不占存储空间，后端解码即可。

### 浏览器实现本地存储的方式有哪几种？

- cookie：存储大小4kb，会随请求发送到服务端，可设置过期时间。
- localStorage:存储大小为5M，不参与请求，除非被清理，否则一直存在。
- sessionStorage：存储大小为5M，不参与请求，页面关闭清除。
- indexDB：存储大小没限制，不参与请求，除非被清理，否则一直存在，运行在浏览器上的非关系型数据库。















