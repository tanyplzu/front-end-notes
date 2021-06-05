---
sidebarDepth: 1
---

# 代码组合（compose）

组合多个函数

```js
const compose = (...fns) => (value) => reduce(fns.reverse(), (acc, fn) => fn(acc), value);
```
