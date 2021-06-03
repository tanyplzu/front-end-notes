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

## useWindowSize

```js
const useWindowSize = () => {
  const [size, setSize] = useState(getSize());
  useEffect(() => {
    const handler = () => {
      setState(window.innerWidth);
    };
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);
  return size;
};
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
