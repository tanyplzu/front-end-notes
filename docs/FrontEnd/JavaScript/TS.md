---
title: "- TS 基础"
sidebarDepth: 2
---

## 目录

[[toc]]

## 概述

### TypeScript 的优势

- 规避大量低级错误，避免时间浪费，省时
- 减少多人协作项目的成本，大型项目友好，省力
- 良好代码提示，不用反复文件跳转或者翻文档，省心

### 环境配置

- 安装 TypeScript
- 用 tsc --init 初始化配置
- 编辑 tsconfig.json 配置 TypeScript 选项

```sh
npm install -g typescript
```

然后在 package.json 中加入我们的 script 命令：

```json
"scripts": {
    "build": "tsc", // 编译
    "build:w": "tsc -w" // 监听文件，有变动即编译
  },
```

## 基础语法

### Typescript 中一些类型

TypeScript 中的原始类型，其实还有一些常见的类型没有涉及。

- 比如计算机类型系统理论中的顶级类型：any、unknown；
- 比如类型系统中的底部类型：never；
- 再比如非原始类型 (non-primitive type):object;
- 当然还有比较常见的数组、元组等等

**any:**

any 类型是多人协作项目的大忌，很可能把 Typescript 变成 AnyScript，通常在不得已的情况下，不应该首先考虑使用此类型。

**数组：**

数组有两种类型定义方式，一种是使用泛型：

```ts
const list: Array<number> = [1, 2, 3]
```

另一种使用更加广泛那就是在元素类型后面接上 []:

```ts
const list: number[] = [1, 2, 3]
```

**元组（Tuple）：**

```ts
let x: [string, number];
x = ['hello', 10, false] // Error
x = ['hello'] // Error
```

这就是元组与数组的不同之处，元组的类型如果多出或者少于规定的类型是会报错的，必须严格跟事先声明的类型一致才不会报错。可以把元组看成严格版的数组。

还有一个个元组越界问题，比如 Typescript 允许向元组中使用数组的 push 方法插入新元素：

```ts
const tuple: [string, number] = ['a', 1];
tuple.push(2); // ok
console.log(tuple); // ["a", 1, 2] -> 正常打印出来
```

但是当我们访问新加入的元素时，会报错：

```ts
console.log(tuple[2]); // Tuple type '[string, number]' of length '2' has no element at index '2'
```

**枚举类型**

枚举类型是很多语言都拥有的类型，它用于声明一组命名的常数，当一个变量有几种可能的取值时，可以将它定义为枚举类型。

数字枚举，常量枚举，等等

### 接口 (interface)

TypeScript 的核心原则之一是对值所具有的结构进行类型检查，它有时被称做“鸭式辨型法”或“结构性子类型化”。

```ts
interface User {
    name: string
    age?: number // 可选
    readonly isMale: boolean // 只读
    say: (words: string) => string
}

const getUserName = (user: User) => user.name
```

接口中也可以使用接口

### 类 (Class)

**抽象类：**

抽象类做为其它派生类的基类使用，它们一般不会直接被实例化，不同于接口，抽象类可以包含成员的实现细节。

**访问限定符：**

- public：成员都默认为 public
- private：当成员被设置为 private 之后，被此限定符修饰的成员是只可以被类的内部访问
- protected：当成员被设置为 protected 之后，被此限定符修饰的成员是只可以被类的内部以及类的子类访问。

### 函数(Function)

**重载（Overload）：**
