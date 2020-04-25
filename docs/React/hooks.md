# HOOKS

- [useeffect 极客时间](https://time.geekbang.org/dailylesson/detail/100028442)
- [useeffect](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
- [React-Redux Hooks: useSelector and useDispatch](https://levelup.gitconnected.com/react-redux-hooks-useselector-and-usedispatch-f7d8c7f75cdd)

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
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCount } from "./store/counter/actions";

export const Count = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  return (
    <main>
      <div>Count: {count}</div>
      <button onClick={() => dispatch(addCount())}>Add to count</button>
    </main>
  );
};
```
