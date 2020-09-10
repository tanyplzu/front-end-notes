# HOOKS

- [英文文档](https://reactjs.org/docs/hooks-intro.html)
- [中文文档](https://zh-hans.reactjs.org/docs/hooks-intro.html)
- [useeffect 极客时间](https://time.geekbang.org/dailylesson/detail/100028442)
- [useeffect](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
- [React-Redux Hooks: useSelector and useDispatch](https://levelup.gitconnected.com/react-redux-hooks-useselector-and-usedispatch-f7d8c7f75cdd)
- [写 React Hooks 前必读](https://zhuanlan.zhihu.com/p/113216415)
- Dan 的 [《useEffect 完全指南》](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
- 衍良同学的 [《React Hooks 完全上手指南》](https://zhuanlan.zhihu.com/p/92211533)
- 阮一峰 [React Hooks 入门教程](http://www.ruanyifeng.com/blog/2019/09/react-hooks.html)

## Hooks

React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。

```js
useState(); //状态钩子
useContext(); //共享状态钩子
useReducer(); //action 钩子
useEffect(); //副作用钩子
```

## 使用方法

```jsx
import React from 'react';
import { connect } from 'react-redux';
import { addCount } from './store/counter/actions';

export const Count = ({ count, addCount }) => {
  return (
    <main>
      <div>Count: {count}</div>
      <button onClick={addCount}>Add to count</button>
    </main>
  );
};

const mapStateToProps = (state) => ({
  count: state.counter.count,
});

const mapDispatchToProps = { addCount };

export default connect(mapStateToProps, mapDispatchToProps)(Count);
```

Now, with the new React Redux Hooks instead of connect:

```jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCount } from './store/counter/actions';

export const Count = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <main>
      <div>Count: {count}</div>
      <button onClick={() => dispatch(addCount())}>Add to count</button>
    </main>
  );
};
```

## useEffect

基本用法

```jsx
useEffect(() => {
  // Async Action
}, [dependencies]);
```

### useEffect 是如何起作用的

```jsx
function ErrorDemo() {
  const [count, setCount] = useState(0);
  const dom = useRef(null);
  useEffect(() => {
    dom.current.addEventListener('click', () => setCount(count + 1));
  }, []);
  return <div ref={dom}>{count}</div>;
}
```

结果：`{count}` 到`1`以后就加不上了,原因是 useEffect 中的 count 一直是 0

可以用下面的例子验证一下。

```jsx
function ErrorDemo() {
  const [count, setCount] = useState(0);
  const dom = useRef(null);
  useEffect(() => {
    dom.current.addEventListener('click', () => {
      console.log(count);
      setCount(count + 1);
    });
  }, []);
  return <div ref={dom}>{count}</div>;
}
```

每次点击时 console.log(count)都是 1

```jsx
function ErrorDemo() {
  const [count, setCount] = useState(0);
  const dom = useRef(null);
  useEffect(() => {
    dom.current.addEventListener('click', () => {
      console.log(count);
      setCount(count + 1);
    });
  }, [count]);
  useEffect(() => {
    console.log(2, count);
  }, [count]);
  return <div ref={dom}>{count}</div>;
}
```

如果将 count 传入 useEffect，每次会重新绑定点击事件。

**结论：**每次 count 都是重新声明的变量，指向一个全新的数据；每次的 setCount 虽然是重新声明的，但指向的是同一个引用。

- 并不是 count 的值在“不变”的 effect 中发生了改变，而是 effect 函数本身在每一次渲染中都不相同。
- effects 会在每次渲染后运行，并且概念上它是组件输出的一部分，可以“看到”属于某次特定渲染的 props 和 state。


```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(count) // 一直是0
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}
```

开始例子中的问题的处理方式:

#### Functional updates

```jsx
function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </>
  );
}
```

#### 重新绑定事件

```JSX
useEffect(() => {
  const $dom = dom.current;
  const event = () => {
    console.log(count);
    setCount(prev => ++prev);
  };
  $dom.addEventListener('click', event);
  return () => $dom.removeEventListener('click', event);
}, [count]);
```

缺点：开销较大

#### useRef

```jsx
const [count, setCount] = useState(0);
const countRef = useRef(count);
useEffect(() => {
  dom.current.addEventListener('click', () => {
    console.log(countRef.current);
    setCount((prevCount) => {
      const newCount = ++prevCount;
      countRef.current = newCount;
      return newCount;
    });
  });
}, []);
```

用 useRef 存储最新的值

### useEffect 是如何清理的

```jsx
useEffect(() => {
  ChatAPI.subscribeToFriendStatus(props.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.id, handleStatusChange);
  };
});
```

React 只会在浏览器绘制后运行 effects。这使得你的应用更流畅因为大多数 effects 并不会阻塞屏幕的更新。Effect 的清除同样被延迟了。上一次的 effect 会在重新渲染后被清除：

## useCallback 与 useMemo

一个是「缓存函数」， 一个是缓存「函数的返回值」,使用较少，甚至有的时候会用错。

- 在组件内部，那些会成为其他 useEffect 依赖项的方法，建议用 useCallback 包裹，或者直接编写在引用它的 useEffect 中。
- 己所不欲勿施于人，如果你的 function 会作为 props 传递给子组件，请一定要使用 useCallback 包裹，对于子组件来说，如果每次 render 都会导致你传递的函数发生变化，可能会对它造成非常大的困扰。同时也不利于 react 做渲染优化。

## useReducer()

```jsx
const myReducer = (state, action) => {
  switch (action.type) {
    case 'countUp':
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(myReducer, { count: 0 });

function App() {
  const [state, dispatch] = useReducer(myReducer, { count: 0 });
  return (
    <div className='App'>
      <button onClick={() => dispatch({ type: 'countUp' })}>+1</button>
      <p>Count: {state.count}</p>
    </div>
  );
}
```

## 创建自己的 Hooks

```jsx
const usePerson = (personId) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then((response) => response.json())
      .then((data) => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId]);
  return [loading, person];
};

const Person = ({ personId }) => {
  const [loading, person] = usePerson(personId);

  if (loading === true) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <p>You're viewing: {person.name}</p>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
    </div>
  );
};
```

```

```
