---
title: "- JavaScript 基础"
sidebarDepth: 2
---
## 目录

[[toc]]

## JavaScript 基础

### JavaScript 的变量有哪些类型？

- 分为两种：基础类型和引用类型。基础类型目前有六种，分别是`boolean`、`null`、`undefined`、`number`、`string`、`symbol`。
- 除了以上的基础类型之外，其他就是引用类型了，有`Array`、`Object`、`Function`。

### typeo 和 instanceof 的区别？

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

### 是否`===`就完全靠谱？

也是不一定的，例如`0 === -0`就为`true`，`NaN === NaN`为`false`，判断两个变量是否完全相等可以使用`ES6`新增的`API`，`Object.is(0, -0)`，`Object.is(NaN, NaN)`就可以准确区分。

### 在类型转换中哪些值会被转为`true`？

除了`undefined`、`null`、`false`、`NaN`、`''`、`0`、`-0`以外的值都会被转为`true`，包括所有引用类型，即使是空的。

### toString()和valueOf的区别？
- null和undefined没有以上两个方法。
- toString：值类型时返回自身的字符串形式；当是引用类型时，无论是一维或多维数组，将他们拍平成一个字符串，里面的null和undefined转为空字符串''，对象转为[object Object]，函数的原样返回字符串形式。
- valueOf无论是值类型还是引用类型，大部分情况下都是原样返回，当是Date类型时，返回时间戳。
- 在进行字符串强转的时候，toString会优先于valueOf；在进行数值运算时，valueOf会优先于toString。
- 当执行toString的变量是一个整数类型时，支持传参，表示需要转为多少进制的字符串。


### JS中有哪些内置函数

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

### Array.prototype的类型是什么吗？

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

**flat方法：**

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

### 字符串的 test、match、search 之间的区别？

```js
// test 是检测字符串是否匹配某个正则，返回布尔值
/[a-z]/.test(1);  // false

// match 是返回检测字符匹配正则的数组结果集合，没有返回 null
'1AbC2d'.match(/[a-z]/ig);  // ['A', 'b', 'C', 'd']

// search 是返回正则匹配到的下标，没有返回-1
'1AbC2d'.search(/[a-z]/);  // 2
```

### 字符串的 slice、substring、substr 之间的区别？

```js
//  slice 是返回字符串开始至结束下标减去开始下标个数的新字符串，下标是负数为倒数；
'abcdefg'.slice(2,3);  // c  // 3 - 2
'abcdefg'.slice(3,2);  // ''  // 2 - 3
'abcdefg'.slice(-2,-1);  // f  // -1 - -2

// substring 和 slice 正常截取字符串时相同，负数为0，且下标值小的为开始下标；
'abcdefg'.substring(2,3);  //c  // 3 - 2
'abcdefg'.substring(3,2);  // c  // 3 - 2 
'abcdefg'.substring(3,-3);  // abc  // 3 - 0

// substr 返回开始下标开始加第二个参数(不能为负数)个数的新字符串。
'abcdefg'.substr(2, 3);  // cde
'abcdefg'.substr(3, 2);  // de
'abcdefg'.substr(-3, 2); // ef

```

### Number('123') 和 new Number('123')有什么区别？

- `Number('123')`是一个转换函数，会尝试把参数转为整数类型；而`new Number('123')`则不同，这是一个构造函数，它的结果是实例化出来一个对象。
- 同样的情况也适用用`String`和`new String`；`Boolean`和`new Boolean`的情况。

```js
typeof Number('123') // number
typeof new Number('123') // object
```



## DOM API

### DOM事件的级别

### 什么是事件流/模型？

当某一个事件被触发时，分为三个阶段：
1. 事件通过捕获从window => document => body => 目标元素
2. 事件到达注册的目标上
3. 目标元素通过冒泡返回到window，沿途触发相同类型的事件

### DOM 节点的 Attribute 和 property 有何区别

- property 只是一个 JS 属性的修改。prototype不是一个api，只是一种操作形式；不会添加本身没有的属性。
- attr 是对 html 标签属性的修改。可以添加新的属性；

### DOM 树操作（api）

- 查找元素：querySelector、querySelectorAll、getElementById、getElementsByTagName、getElementsByClassName
- parentElement、childNodes、firstChild、lastChild
- createElement、removeChild、appendChild、insertBefore
- getElementById、getElementsByName、getElementsByTagName、getElementsByClassName，这几个 API 的性能高于 querySelector。
- getElementsByName、getElementsByTagName、getElementsByClassName 获取的集合并非数组，而是一个能够动态更新的集合。
- 虚拟DOM中最后还是通过以上api创建、和更新了DOM。

### document load 和 ready 的区别

```js
window.addEventListener('load', function () {
    // 页面的全部资源加载完才会执行，包括图片、视频等
})
document.addEventListener('DOMContentLoaded', function () {
    // DOM 渲染完即可执行，此时图片、视频还可能没有加载完
})
```
原生中没有ready这api，jQuery中有ready



## BOM 

### 对浏览器或元素的各种距离参数你知道哪些？
- document.documentElement.clientHeight：当前窗口内容区 + 内边距的高度
- window.innerHeight: 当前窗口内容区 + 内边距 + 边框 + 滚动条高度
- window.outerHeight：整个浏览器的高度(包括工具栏)

- clientHeight: 当前元素内容区 + 内边距的高度
- clientTop: 当前元素上边框的宽度
- offsetHeight: 当前元素内容区 + 内边距 + 边框 + 滚动条的高度
- offsetTop: 当前元素的边框距离父元素上外边距的距离
- scrollHeight: 当前内部可以滚动区域的高度，如果不能滚动则为自己内容区 + 内边距的高度
- scrollTop: 当前元素滚动离顶部的距离

### 怎么确定当前浏览器的类型？

通过`navigator.userAgent`获取浏览器信息，根据里面的关键字来确定。
microMessenger|dingtalk|alipay|qq|iPhone 都可以判断。



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

推荐使用5。



## JavaScript的执行机制

### 说一下对变量提升的理解

函数执行时会先创建当前的上下文环境，其中这两点会产生“变量提升”的效果

- 变量定义
- 函数声明

### 谈谈对 this 的理解？

this表示为当前的函数调用方，在运行时才能决定。如谁调用了某个方法，谁就是这个方法执行时的this。

### 说明 this 几种不同的使用场景

- 作为构造函数执行
- 作为对象属性执行
- 作为普通函数执行
- call apply bind

### 改变当前调用this的方式

- call：会立即执行调用call方法的函数，不过是以第一个参数为this的情况下调用，方法内可以传递不等的参数，作为调用call方法的参数。
- apply：运行方式和call是一致的，只是接受的参数不同，不能是不定参数，得是一个数组。
- bind：会改变当前的this，接受不定参数，不过不会马上执行调用bind方法的函数，而是返回一个函数作为结果，执行后才是调用函数的结果。

### 谈谈对闭包的理解？

### 什么是垃圾回收机制？

- 在程序执行的过程中，解释器会为创建出来的变量分配内存来存储这些变量的实体，执行环境会负责管理代码执行过程中使用到的内存，而何时划出新的内存以及何时把占用的内存释放出来的这样一套内存自动管理机制就是垃圾回收机制。这种周期性的回收策略主要有两种。
- 标记清除：当变量进入环境时，就将这个变量标记为'进入环境'，而当这个变量离开环境时，则将其标记为'离开环境'。垃圾收集器会给内存中的每个变量都做上标记，然后它会去掉环境中的变量以及被环境中变量引用的变量的标记。而在此之后再被加上标记的变量将被视为准备删除的变量，最后垃圾收集器完成内存清除工作。
- 引用计数：追踪记录每个值被引用的次数，当声明了一个变量并将一个引用类型赋给该变量时，这个变量的引用次数就是1。相反如果包含这个值引用的变量又取得了另外一个值，则这个值的引用次数减1。当为0时，这说明没有办法再访问这个值了，因此垃圾收集器下次运行时，就会释放该值占用的内存。





## 页面循环系统

### 函数防抖和节流的区别？

函数防抖指一定时间内没有再次触发函数，就执行该函数，否则重新计时；节流是规定某个时间内只能执行一次函数。

**防抖的应用场景**
- 搜索框输入查询，如果用户一直在输入中，没有必要不停地调用去请求服务端接口，等用户停止输入的时候，再调用，设置一个合适的时间间隔，有效减轻服务端压力。
- 表单验证
- 按钮提交事件。
- 浏览器窗口缩放，resize事件(如窗口停止改变大小之后重新计算布局)等。

```js
let input1 = document.getElementById('inputId')
let timeoutId = null;
input1.addEventListener('keyup', function() {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    // 执行操作
    timeoutId = null
  }, 500)
})
```

**节流的应用场景**
- 按钮点击事件
- 拖拽事件
- onScoll
- 计算鼠标移动的距离(mousemove)

```js
function throttle(fn, deley = 100) {
  let timeoutId = null;
  return function() {
    if (timeoutId) {
      return;
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, arguments);
      timeoutId = null;
    }, deley)
  }
}
dev.addEventListener('drag', throttle(function() {
  // 执行事件
}))
```

不管是防抖还是节流，上面方法都有个问题，就是延时执行，有些场景下需要的不是延时，比如对于提交数据，需要的是防连击，不重复提交数据。对上面代码修改如下：
```js
function throttle(fn, deley = 100) {
  let timeoutId = null;
  return function() {
    if (timeoutId) {
      return;
    }
    fn.apply(this, arguments);
    timeoutId = setTimeout(() => {
      timeoutId = null;
    }, deley)
  }
}
dev.addEventListener('click', throttle(function() {
  // 执行事件
}))
```


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

**JSONP: 利用script标签不受同源策略限制**

```html
<script src="http://www.abc.com/?data=name&callback=jsonp" charset="utf-8"></script>
<script type="text/javascript">
    jsonp({
        data: {
        },
    });
</script>
```

**WebSocket**

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

**CORS：新出的通信标准，支持跨域的 Ajax**

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

**fetch**

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



## 性能优化

**原则**

- 多使用内存、缓存或者其他方法
- 减少 CPU 计算、较少网络

### 加载资源优化

- 静态资源的压缩合并（JS代码压缩合并、CSS代码压缩合并、雪碧图）
- 静态资源缓存（资源名称加 MD5 戳）
- 使用 CND 让资源加载更快
- 使用 SSR 后端渲染，数据直接突出到 HTML 中

> 雪碧图现在基本没有用了
>
> CDN加载的原理

### 渲染优化

- CSS 放前面 JS 放后面
- 懒加载（图片懒加载、下拉加载更多）
- 减少DOM 查询，对 DOM 查询做缓存
- 减少DOM 操作，多个操作尽量合并在一起执行（`DocumentFragment`）
- 事件节流
- 尽早执行操作（`DOMContentLoaded`）

###事件节流 

例如要在文字改变时触发一个 change 事件，通过 keyup 来监听。使用节流。

```js
var textarea = document.getElementById('text')
var timeoutId
textarea.addEventListener('keyup', function () {
    if (timeoutId) {
        clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(function () {
        // 触发 change 事件
    }, 100)
})
```

### 尽早执行操

```js
window.addEventListener('load', function () {
    // 页面的全部资源加载完才会执行，包括图片、视频等
})
document.addEventListener('DOMContentLoaded', function () {
    // DOM 渲染完即可执行，此时图片、视频还可能没有加载完
})
```









