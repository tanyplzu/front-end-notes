---
sidebarDepth: 0
---

# myPromise

[[toc]]

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
        that.resolvedCallbacks.map((cb) => cb(that.value));
      }
    }
    function reject(value) {
      if (that.state === PENDING) {
        that.state = REJECTED;
        that.value = value;
        that.rejectedCallbacks.map((cb) => cb(that.value));
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
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (r) => {
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

## Promise.all

- 如果传入的所有 promise 实例的状态均变为 fulfilled，那么返回的 promise 实例的状态就是 fulfilled，并且其 value 是传入的所有 promise 的 value 组成的数组。
- 如果有一个 promise 实例状态变为了 rejected，那么返回的 promise 实例的状态立即变为 rejected。

```js
Promise.myAll = function(iterators) {
  const promises = Array.from(iterators);
  const num = promises.length;
  const resolvedList = new Array(num);
  let resolvedNum = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          // 保存这个promise实例的value
          resolvedList[index] = value;
          // 通过计数器，标记是否所有实例均 fulfilled
          if (++resolvedNum === num) {
            resolve(resolvedList);
          }
        })
        .catch(reject);
    });
  });
};
```

## Promise.any

- 如果传入的实例中，有任一实例变为 fulfilled，那么它返回的 promise 实例状态立即变为 fulfilled；
- 如果所有实例均变为 rejected，那么它返回的 promise 实例状态为 rejected。

```js
Promise.any = function(iterators) {
  const promises = Array.from(iterators);
  const num = promises.length;
  const rejectedList = new Array(num);
  let rejectedNum = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => resolve(value))
        .catch((error) => {
          rejectedList[index] = error;
          if (++rejectedNum === num) {
            reject(rejectedList);
          }
        });
    });
  });
};
```

## Promise.allSettled

```js
const formatSettledResult = (success, value) =>
  success ? { status: 'fulfilled', value } : { status: 'rejected', reason: value };

Promise.allSettled = function(iterators) {
  const promises = Array.from(iterators);
  const num = promises.length;
  const settledList = new Array(num);
  let settledNum = 0;

  return new Promise((resolve) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          settledList[index] = formatSettledResult(true, value);
          if (++settledNum === num) {
            resolve(settledList);
          }
        })
        .catch((error) => {
          settledList[index] = formatSettledResult(false, error);
          if (++settledNum === num) {
            resolve(settledList);
          }
        });
    });
  });
};
```

## Promise.race

```js
Promise.myRace = function(iterators) {
  const promises = Array.from(iterators);

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch(reject);
    });
  });
};
```

## Promise.prototype.finally

```js
Promise.prototype.finally = function(cb) {
  return this.then(
    (value) => Promise.resolve(cb()).then(() => value),
    (error) =>
      Promise.resolve(cb()).then(() => {
        throw error;
      })
  );
};
```
