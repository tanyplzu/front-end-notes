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
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

Extending a type via intersections

```ts
type Animal = {
  name: string;
};

type Bear = Animal & {
  honey: Boolean;
};

const bear = getBear();
bear.name;
bear.honey;
```

主要区别：

- 接口是通过 extends 继承的方式来扩展，类型别名是通过 & 来扩展。
- 接口可以自动合并，而类型别名不行
- interface 与 type 都可以描述对象类型、函数类型、Class 类型，但 interface 无法像 type 那样表达元组、一组联合类型等等。
- interface 无法使用映射类型等类型工具，也就意味着在类型编程场景中我们还是应该使用 type。

> interface 就是描述对象对外暴露的接口，其不应该具有过于复杂的类型逻辑，最多局限于泛型约束与索引类型这个层面。而 type alias 就是用于将一组类型的重命名，或是对类型进行复杂编程。

### 对 type 的定义叫 type alias 而非直接就叫 type

- Typescript 的 type 关键字表示的是类型别名；
- 被 type 关键词声明的变量表示的还是 Types (比如 Animal 就是动物类型)；

### 到底应该用 type 还是 interface ？

- 能用 interface 的地方就用 interface，否则用 type。如果我们是定义一个 object，那么最好是使用 interface 去做类型声明，什么时候用 type 呢，当定义一个 function 的时候，用 type 会更好一些

> 很多同学更喜欢用 type（Type Alias，类型别名）来代替接口结构描述对象，而我更推荐的方式是，interface 用来描述对象、类的结构，而类型别名用来将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型。但大部分场景下接口结构都可以被类型别名所取代，因此，只要你觉得统一使用类型别名让你觉得更整齐，也没什么问题。

### 资料

[写了这么多年代码，你真的了解 SOLID 吗？](https://zhuanlan.zhihu.com/p/44344256)
