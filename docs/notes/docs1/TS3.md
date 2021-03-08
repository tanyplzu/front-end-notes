---
sidebarDepth: 0
---

# TS3

[[toc]]

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Interfaces vs. Type Aliases

- [Interfaces vs. Type Aliases](https://www.typescriptlang.org/docs/handbook/advanced-types.html#interfaces-vs-type-aliases)
- [Typescript 中 type 和 interface 有什么区别？](https://zhuanlan.zhihu.com/p/351213183)

> As we mentioned, type aliases can act sort of like interfaces; however, there are some subtle differences.
> Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

Extending an interface
```ts
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear() 
bear.name
bear.honey
```

Extending a type via intersections

```ts
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: Boolean 
}

const bear = getBear();
bear.name;
bear.honey;
```

主要区别：
- 接口是通过继承的方式来扩展，类型别名是通过 & 来扩展。
- 接口可以自动合并，而类型别名不行

### 对 type 的定义叫 type alias 而非直接就叫 type
- Typescript 的 type 关键字表示的是类型别名；
- 被 type 关键词声明的变量表示的还是 Types (比如 Animal 就是动物类型)；

### 到底应该用 type 还是 interface ？

- 能用 interface 的地方就用 interface，否则用 type。如果我们是定义一个 object，那么最好是使用 interface 去做类型声明，什么时候用 type 呢，当定义一个 function 的时候，用 type 会更好一些

### 资料

[写了这么多年代码，你真的了解SOLID吗？](https://zhuanlan.zhihu.com/p/44344256)