---
sidebarDepth: 2
---

# JavaScript 进阶

[[toc]]

### 手写 promise

实现一个简易版 Promise

```js
(function () {
    const PENDING = "pending";
    const RESOLVED = "resolved";
    const REJECTED = "rejected";

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
                console.log(33, that.resolvedCallbacks);
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

    MyPromise.prototype.then = function (onFulfilled, onRejected) {
        const that = this;
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
        onRejected =
            typeof onRejected === "function"
                ? onRejected
                : r => {
                    throw r;
                };
        if (that.state === PENDING) {
            console.log('cccc')
            that.resolvedCallbacks.push(onFulfilled);
            that.rejectedCallbacks.push(onRejected);
        }
        // 下面两个if是为了实现透传
        if (that.state === RESOLVED) {
            console.log('aaaa')
            onFulfilled(that.value);
        }
        if (that.state === REJECTED) {
            console.log('bbbb')
            onRejected(that.value);
        }
    };

    window.Promise = MyPromise;
})();
```

### 手写 call、apply 及 bind 函数

```js
Function.prototype.myCall = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}
```

### 函数式编程

