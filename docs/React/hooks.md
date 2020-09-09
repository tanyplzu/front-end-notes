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

```js
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

## 一些例子

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

结果：`{count}` 到`1`以后就加不上了

处理方式:

#### Functional updates

```JSX
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
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

## useEffect()

```jsx
useEffect(() => {
  // Async Action
}, [dependencies]);
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
