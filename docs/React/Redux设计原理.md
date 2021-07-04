---
sidebarDepth: 0
---

# Redux 设计原理

[[toc]]

## createStore

```js
function createStore(reduce, preloadedState, enhancer) {
  let currentState = preloadedState; // 当前数据（状态）
  let currentReducer = reducer; // 计算新数据（状态）
  let isDispatching = false; // 是否在 dispatch

  // 获取 state
  function getState() {
    if (isDispatching) {
      throw new Error('还在 dispatching 呢，获取不了 state 啊');
    }
    return currentState;
  }

  // 分发 action 的函数
  function dispatch(action) {
    if (isDispatching) {
      throw new Error('还在 dispatching 呢，dispatch 不了啊');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    return action;
  }

  return {
    getState,
    dispatch,
  };
}
```

## compose

```ts
function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((prev, curt) => (...args: any) => prev(curt(...args)));
}

export default compose;
```

## applyMiddlewares

```ts
import compose from './compose';

function applyMiddlewares(...middlewares: Middleware[]) {
  return (createStore) => (reducer: Reducer, preloadState) => {
    const store = createStore(reducer, preloadState);

    let dispatch = (action) => {
      throw new Error('还在构建 middlewares，不要 dispatch');
    };

    const middlewareAPI: MiddlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(args), // 最初使用上面的 dispatch，等下面 compose 好了，再用下面的 dispatch
    };

    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return { ...store, dispatch };
  };
}

export default applyMiddlewares;
```
