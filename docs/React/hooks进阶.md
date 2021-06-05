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

## 获取组件宽高

```js
function getSize(el) {
  if (!el) {
    return {};
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
}

function useComponentSize(ref) {
  let [ComponentSize, setComponentSize] = useState(getSize(ref.current));

  function handleResize() {
    if (ref && ref.current) {
      setComponentSize(getSize(ref.current));
    }
  }

  useLayoutEffect(() => {
    handleResize();

    let resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect(ref.current);
      resizeObserver = null;
    };
  }, []);

  return ComponentSize;
}

function App() {
  const ref = useRef(null);
  const componentSize = useComponentSize(ref);
  return (
    <>
      {componentSize.width}
      <textArea ref={ref} />
    </>
  );
}
```

ResizeObserver:是一个实验性的功能。

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
