---
sidebarDepth: 2
---

# JavaScript 进阶

[[toc]]

## 浏览器缓存

### 强缓存

#### Expires

Expires 是 HTTP/1.0 的标准，现在更倾向于用 HTTP/1.1 中定义的 Cache-Control。两个同时存在时也是 Cache-Control 的优先级更高。时区不同也可能造成缓存生命周期出错。

#### Cache-Control

1. max-age 单位是 s，标准中规定 max-age 值最大不能超过一年 31536000
2. s-maxage 同 max-age，覆盖 max-age、Expires，但仅适用于共享缓存，在私有缓存中被忽略。
3. public 表明响应可以被任何对象（发送请求的客户端、代理服务器等等）缓存。
4. private 表明响应只能被单个用户（可能是操作系统用户、浏览器用户）缓存，是非共享的，不能被代理服务器缓存。
5. no-cache 强制所有缓存了该响应的用户，在使用已缓存的数据前，发送带验证器的请求到服务器。不是字面意思上的不缓存。
6. no-store 禁止缓存，每次请求都要向服务器重新获取数据。

### 协商缓存

#### Last-modified/If-Modified-Since

Last-modified: 服务器端资源的最后修改时间，响应头部会带上这个标识。第一次请求之后，浏览器记录这个时间，再次请求时，请求头部带上 If-Modified-Since 即为之前记录下的时间。若修改过就返回最新资源，状态码 200，若没有修改过则返回 304。

::: tip 注意：

如果响应头中有 Last-modified 而没有 Expire 或 Cache-Control 时，浏览器会有自己的算法来推算出一个时间缓存该文件多久，不同浏览器得出的时间不一样，所以 Last-modified 要记得配合 Expires/Cache-Control 使用。

:::

#### Etag/If-None-Match

由服务器端上生成的一段 hash 字符串，第一次请求时响应头带上 ETag: abcd，之后的请求中带上 If-None-Match: abcd，服务器检查 ETag，返回 304 或 200。

关于 last-modified 和 Etag 区别，已经有很多人总结过了：

- 某些服务器不能精确得到资源的最后修改时间，这样就无法通过最后修改时间判断资源是否更新。
- Last-modified 只能精确到秒。
- 一些资源的最后修改时间改变了，但是内容没改变，使用 Last-modified 看不出内容没有改变。
- Etag 的精度比 Last-modified 高，属于强验证，要求资源字节级别的一致，优先级高。如果服务器端有提供 ETag 的话，必须先对 ETag 进行 Conditional Request。

::: tip 注意

实际使用 ETag/Last-modified 要注意保持一致性，做负载均衡和反向代理的话可能会出现不一致的情况。计算 ETag 也是需要占用资源的，如果修改不是过于频繁，看自己的需求用 Cache-Control 是否可以满足。

:::

### 最佳实践

1. HTML：使用协商缓存
2. CSS&JS&图片：使用强缓存，文件命名带上 hash 值
3. 可能经常需要变动的文件：Cache-Control: no-cache / max-age=0
4. 不要对变化的资源添加较短的 max-age。如果页面有嵌套层次，会造成混乱。

> [HTTP 缓存机制一二三](https://zhuanlan.zhihu.com/p/29750583)
>
> [设计一个无懈可击的浏览器缓存方案](https://zhuanlan.zhihu.com/p/28113197)

## 手写 promise

实现一个简易版 Promise

```js
(function() {
  const PENDING = 'pending';
  const RESOLVED = 'resolved';
  const REJECTED = 'rejected';

  function MyPromise(fn) {
    const that = this;
    that.state = PENDING;
    that.value = null;
    that.resolvedCallbacks = [];
    that.rejectedCallbacks = [];

    function resolve(value) {
      if (that.state === PENDING) {
        that.state = RESOLVED;
        that.value = value;
        that.resolvedCallbacks.map(cb => cb(that.value));
      }
    }
    function reject(value) {
      if (that.state === PENDING) {
        that.state = REJECTED;
        that.value = value;
        that.rejectedCallbacks.map(cb => cb(that.value));
      }
    }
    try {
      fn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  MyPromise.prototype.then = function(onFulfilled, onRejected) {
    const that = this;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : r => {
            throw r;
          };
    if (that.state === PENDING) {
      that.resolvedCallbacks.push(onFulfilled);
      that.rejectedCallbacks.push(onRejected);
    }
    // 下面两个if是为了实现透传
    if (that.state === RESOLVED) {
      onFulfilled(that.value);
    }
    if (that.state === REJECTED) {
      onRejected(that.value);
    }
  };

  window.Promise = MyPromise;
})();
```

```js
```

## 手写 call、apply 及 bind 函数

```js
Function.prototype.myCall = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
```

## 函数式编程

[函数式编程入门教程](http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html) [JS 函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)
