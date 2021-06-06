---
sidebarDepth: 0
---

# 自定义 hooks

[[toc]]

## 防抖和节流 hooks

```javascript
function useDebounce(fn, delay, dep = []) {
  const { current } = useRef({ fn, timer: null });
  useEffect(
    function() {
      current.fn = fn;
    },
    [fn]
  );

  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }, dep);
}
```

```js
function useThrottle(fn, delay, dep = []) {
  const { current } = useRef({ fn, timer: null });
  useEffect(
    function() {
      current.fn = fn;
    },
    [fn]
  );

  return useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn.call(this, ...args);
    }
  }, dep);
}
```

节流和防抖 ahooks 版

```js
//  useCreation 文件
export default function useCreation(factory, deps) {
  const { current } = useRef({
    deps,
    obj: undefined,
    initialized: false,
  });
  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }
  return current.obj;
}

function depsAreSame(oldDeps, deps) {
  if (oldDeps === deps) return true;
  // eslint-disable-next-line no-restricted-syntax
  for (const i in oldDeps) {
    if (oldDeps[i] !== deps[i]) return false;
  }
  return true;
}
```

```js
//  useDebounceFn 文件
function useDebounceFn(fn, options) {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const wait = options?.wait ?? 1000;

  const debounced = useCreation(
    () =>
      debounce(
        (...args) => {
          return fnRef.current(...args);
        },
        wait,
        options
      ),
    []
  );

  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}
```

## useCounter

```js
function useCounter() {
  let [count, setCount] = useState(0);
  let decrement = () => setCount(count - 1);
  let increment = () => setCount(count + 1);
  return { count, decrement, increment };
}

let Counter = createContext(null);

function CounterDisplay() {
  let counter = useContext(Counter);
  return (
    <div>
      <button onClick={counter.decrement}>-</button>
      <p>You clicked {counter.count} times</p>
      <button onClick={counter.increment}>+</button>
    </div>
  );
}

function App() {
  let counter = useCounter();
  return (
    <Counter.Provider value={counter}>
      <CounterDisplay />
      <CounterDisplay />
    </Counter.Provider>
  );
}
```

## 获取上一个 props

```js
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return (
    <h1>
      Now: {count}, before: {prevCount}
    </h1>
  );
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

通过 useEffect 在组件渲染完毕后再执行的特性，再利用 useRef 的可变特性，让 usePrevious 的返回值是 “上一次” Render 时的。

## 修改页面 title

```js
function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
    return () => (document.title = '前端精读');
  }, [title]);
}
```

## useWindowSize

```js
function getSize() {
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth,
  };
}
const useWindowSize = () => {
  const [size, setSize] = useState(getSize());
  useEffect(() => {
    const handler = () => {
      setState(getSize());
    };
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);
  return size;
};
```

```js
import { useState, useEffect } from 'react';

// 获取横向，纵向滚动条位置
const getPosition = () => {
  return {
    x: document.body.scrollLeft,
    y: document.body.scrollTop,
  };
};
const useScroll = () => {
  // 定一个 position 这个 state 保存滚动条位置
  const [position, setPosition] = useState(getPosition());
  useEffect(() => {
    const handler = () => {
      setPosition(getPosition(document));
    };
    // 监听 scroll 事件，更新滚动条位置
    document.addEventListener('scroll', handler);
    return () => {
      // 组件销毁时，取消事件监听
      document.removeEventListener('scroll', handler);
    };
  }, []);
  return position;
};
```

## 拿到组件 onChange 抛出的值

```js
function App() {
  function useInputValue(initialValue) {
    let [value, setValue] = useState(initialValue);
    let onChange = useCallback(function(event) {
      setValue(event.currentTarget.value);
      // react中的的事件
    }, []);
    return {
      value,
      onChange,
    };
  }

  let name = useInputValue('Jamie');
  // name = { value: 'Jamie', onChange: [Function] }
  return <input {...name} />;
}
```

## useAsync

```js
import { useState } from 'react';

const useAsync = (asyncFunction) => {
  // 设置三个异步逻辑相关的 state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // 定义一个 callback 用于执行异步逻辑
  const execute = useCallback(() => {
    // 请求开始时，设置 loading 为 true，清除已有数据和 error 状态
    setLoading(true);
    setData(null);
    setError(null);
    return asyncFunction()
      .then((response) => {
        // 请求成功时，将数据写进 state，设置 loading 为 false
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        // 请求失败时，设置 loading 为 false，并设置错误状态
        setError(error);
        setLoading(false);
      });
  }, [asyncFunction]);

  return { execute, loading, data, error };
};
```

使用

```js
import React from "react";
import useAsync from './useAsync';

export default function UserList() {
  // 通过 useAsync 这个函数，只需要提供异步逻辑的实现
  const {
    execute: fetchUsers,
    data: users,
    loading,
    error,
  } = useAsync(async () => {
    const res = await fetch("https://reqres.in/api/users/");
    const json = await res.json();
    return json.data;
  });

  return (
    // 根据状态渲染 UI...
  );
}
```

## 模拟生命周期

### componentDidMount

```js
useEffect(() => {
  // 组件首次渲染时执行，等价于 class 组件中的componentDidMount
  console.log('did mount');
}, []);
```

### componentDidUpdate

```js
const mounting = useRef(true);
useEffect(() => {
  if (mounting.current) {
    mounting.current = false;
  } else {
    fn();
  }
});

useUpdate(() => {
  // quite similar to `componentDidUpdate`
});
```

### isMounted

```js
const [isMount, setIsMount] = useState(false);
useEffect(() => {
  if (!isMount) {
    setIsMount(true);
  }
  return () => setIsMount(false);
}, []);
return isMount;
```

## 资料

- [精读《怎么用 React Hooks 造轮子》](https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/80.%E7%B2%BE%E8%AF%BB%E3%80%8A%E6%80%8E%E4%B9%88%E7%94%A8%20React%20Hooks%20%E9%80%A0%E8%BD%AE%E5%AD%90%E3%80%8B.md)
- [React Hooks 核心原理与实战](https://time.geekbang.org/column/intro/416)
