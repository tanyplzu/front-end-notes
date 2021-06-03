# Hooks

[[toc]]

## Hooks 资料

- [英文文档](https://reactjs.org/docs/hooks-intro.html)
- [中文文档](https://zh-hans.reactjs.org/docs/hooks-intro.html)
- [useeffect 极客时间](https://time.geekbang.org/dailylesson/detail/100028442)
- [useeffect](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
- [React-Redux Hooks: useSelector and useDispatch](https://levelup.gitconnected.com/react-redux-hooks-useselector-and-usedispatch-f7d8c7f75cdd)
- [写 React Hooks 前必读](https://zhuanlan.zhihu.com/p/113216415)
- Dan 的 [《useEffect 完全指南》](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
- 衍良同学的 [《React Hooks 完全上手指南》](https://zhuanlan.zhihu.com/p/92211533)
- 阮一峰 [React Hooks 入门教程](http://www.ruanyifeng.com/blog/2019/09/react-hooks.html)
- [Hooks 该怎么用](https://github.com/KieSun/Dream/issues/15)

## useState

## useEffect

基本用法

```js
useEffect(() => {
  // Async Action
}, [dependencies]);
```

### useEffect 快速上手

useEffect 就涵盖了 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 三个生命周期方法。
**useEffect 是每次组件 render 完后判断依赖并执行。**

- 每一次渲染后（render）都执行的副作用：传入回调函数，不传依赖数组。调用形式如下所示：

```js
useEffect(callBack);
```

- 仅在挂载阶段执行一次的副作用：传入回调函数，且这个函数的返回值不是一个函数，同时传入一个空数组。调用形式如下所示：

```js
useEffect(() => {
  // 这里是业务逻辑
}, []);
```

- 仅在挂载阶段和卸载阶段执行的副作用：传入回调函数，且这个函数的返回值是一个函数，同时传入一个空数组。假如回调函数本身记为 A， 返回的函数记为 B，那么将在挂载阶段执行 A，卸载阶段执行 B。调用形式如下所示：

```js
useEffect(() => {
  // 这里是 A 的业务逻辑
  // 返回一个函数记为 B
  return () => {};
}, []);
```

### useEffect 的依赖项

React 会使用浅比较来对比依赖项是否发生了变化，所以要特别注意数组或者对象类型。如果你是每次创建一个新对象，即使和之前的值是等价的，也会被认为是依赖项发生了变化。这是一个刚开始使用 Hooks 时很容易导致 Bug 的地方。

```js
function Sample() {
  // 这里在每次组件执行时创建了一个新数组
  const todos = [{ text: 'Learn hooks.' }];
  useEffect(() => {
    console.log('Todos changed.');
  }, [todos]);
}
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

**结论：** 每次 count 都是重新声明的变量，指向一个全新的数据；每次的 setCount 虽然是重新声明的，但指向的是同一个引用。

- 并不是 count 的值在“不变”的 effect 中发生了改变，而是 effect 函数本身在每一次渲染中都不相同。
- effects 会在每次渲染后运行，并且概念上它是组件输出的一部分，可以“看到”属于某次特定渲染的 props 和 state。

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(count); // count一直是0,所以页面上的值没有变化
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}
```

一些移除依赖的常用技巧：

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

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount((c) => c + 1);
  }, 1000);
  return () => clearInterval(id);
}, []);
```

> 即使是 setCount(c => c + 1)也并不完美。如果我们有两个互相依赖的状态，或者我们想基于一个 prop 来计算下一次的 state，它并不能做到。幸运的是， setCount(c => c + 1)有一个更强大的模式，它的名字叫 useReducer。

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

#### 使用 useRef 做记录

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

React 只会在浏览器绘制后运行 effects。这使得你的应用更流畅因为大多数 effects 并不会阻塞屏幕的更新。Effect 的清除同样被延迟了。上一次的 effect 会在重新渲染后被清除

## useReducer()

当你写类似 setSomething(something => ...)这种代码的时候，也许就是考虑使用 reducer 的契机。reducer 可以让你把组件内发生了什么(actions)和状态如何响应并更新分开表述。

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
const { count, step } = state;

useEffect(() => {
  const id = setInterval(() => {
    dispatch({ type: 'tick' }); // Instead of setCount(c => c + step);
  }, 1000);
  return () => clearInterval(id);
}, [dispatch]);
```

定义 reducer

```jsx
const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  const { count, step } = state;
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}
```

**为什么 useReducer 是 Hooks 的作弊模式**

useReducer 是 Hooks 的“作弊模式”，它可以把更新逻辑和描述发生了什么分开。结果是，这可以帮助我移除不必需的依赖，避免不必要的 effect 调用。

## useRef

useRef 在 react hook 中的作用, 正如官网说的, 它像一个变量, 类似于 this , 它就像一个盒子, 你可以存放任何东西. createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用。

useRef 不仅仅是用来管理 DOM ref 的，它还相当于 this , 可以存放任何变量.

当 useRef 的内容发生变化时,它不会通知您。更改.current 属性不会导致重新呈现。因为他一直是一个引用 .

## useCallback 与 useMemo

一个是「缓存函数」， 一个是缓存「函数的返回值」,使用较少，甚至有的时候会用错。

他们的唯一区别就是：useCallback 是根据依赖(deps)缓存第一个入参的(callback)。useMemo 是根据依赖(deps)缓存第一个入参(callback)执行后的值。

- 在组件内部，那些会成为其他 useEffect 依赖项的方法，建议用 useCallback 包裹，或者直接编写在引用它的 useEffect 中。
- 己所不欲勿施于人，如果你的 function 会作为 props 传递给子组件，请一定要使用 useCallback 包裹，对于子组件来说，如果每次 render 都会导致你传递的函数发生变化，可能会对它造成非常大的困扰。同时也不利于 react 做渲染优化。

```jsx
function SearchResults() {
  // ✅ Preserves identity when its own deps are the same
  const getFetchUrl = useCallback((query) => {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }, []); // ✅ Callback deps are OK

  useEffect(() => {
    const url = getFetchUrl('react');
    // ... Fetch data and do something ...
  }, [getFetchUrl]); // ✅ Effect deps are OK

  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... Fetch data and do something ...
  }, [getFetchUrl]); // ✅ Effect deps are OK
  // ...
}
```

useCallback 本质上是添加了一层依赖检查。对可变值很有用：

```jsx
function SearchResults() {
  const [query, setQuery] = useState('react');

  // ✅ Preserves identity until query changes
  const getFetchUrl = useCallback(() => {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }, [query]); // ✅ Callback deps are OK

  useEffect(() => {
    const url = getFetchUrl();
    // ... Fetch data and do something ...
  }, [getFetchUrl]); // ✅ Effect deps are OK

  // ...
}
```

如果我们结合 useMemo 和 useCallback 这两个 Hooks 一起看，会发现一个有趣的特性，那就是 useCallback 的功能其实是可以用 useMemo 来实现的。


> 任何场景下，函数都用useCallback 包裹吗？那种轻量的函数是不是不需要？
> 确实不是，useCallback 可以减少不必要的渲染，主要体现在将回调函数作为属性传给某个组件。如果每次都不一样就会造成组件的重新渲染。但是如果你确定子组件多次渲染也没有太大问题，特别是原生的组件，比如 button，那么不用 useCallback 也问题不大。所以这和子组件的实现相关，和函数是否轻量无关。但是比较好的实践是都 useCallback。


## 函数组件的生命周期

## redux hooks

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

```js
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

## Hooks

在 React 函数组件中，每一次 UI 的变化，都是通过重新执行整个函数来完成的，这和传统的 Class 组件有很大区别：函数组件中并没有一个直接的方式在多次渲染之间维持一个状态。

### 使用规则

**1.Hooks 只能在函数组件的顶级作用域使用**

Hooks 不能在循环、条件判断或者嵌套函数内执行，而必须是在顶层。同时 Hooks 在组件的多次渲染之间，必须按顺序被执行

**2.Hooks 只能在函数组件或者其它 Hooks 中使用**

如果一定要在 Class 组件中使用，那应该如何做呢？其实有一个通用的机制，那就是利用高阶组件的模式，将 Hooks 封装成高阶组件，从而让类组件使用。

## eslint 规则

hooks 容易出错，规则很重要

https://github.com/facebook/react/issues/14920

```json
{
  "plugins": ["react-hooks"],
  // ...
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn" // <--- THIS IS THE NEW RULE
  }
}
```
