# TS 基础

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
let x: [string, number]
x = ['hello', 10, false] // Error
x = ['hello'] // Error
```

这就是元组与数组的不同之处，元组的类型如果多出或者少于规定的类型是会报错的，必须严格跟事先声明的类型一致才不会报错。可以把元组看成严格版的数组。

还有一个个元组越界问题，比如 Typescript 允许向元组中使用数组的 push 方法插入新元素：

```ts
const tuple: [string, number] = ['a', 1]
tuple.push(2) // ok
console.log(tuple) // ["a", 1, 2] -> 正常打印出来
```

但是当我们访问新加入的元素时，会报错：

```ts
console.log(tuple[2]) // Tuple type '[string, number]' of length '2' has no element at index '2'
```

巧用元组

```ts
function query(...args: [string, number, boolean]) {
  const d: string = args[0]
  const n: number = args[1]
  const b: boolean = args[2]
}
```

**枚举类型**

枚举类型是很多语言都拥有的类型，它用于声明一组命名的常数，当一个变量有几种可能的取值时，可以将它定义为枚举类型。

- 是只读属性，无法修改
- 枚举成员值默认从 0 开始递增，可以自定义设置初始值
- 枚举成员值：可以没有初始值；可以是一个对常量成员的引用；可以是一个常量表达式；也可以是一个非常量表达式

```ts
enum Gender {
  BOY = 1,
  GRIL,
}
```

枚举的使用场景

```ts
function initByRole(role) {
  if (role === 1 || role == 2) {
    console.log('1,2')
  } else if (role == 3 || role == 4) {
    console.log('3,4')
  } else if (role === 5) {
    console.log('5')
  } else {
    console.log('')
  }
}
// 使用枚举后
enum Role {
  Reporter,
  Developer,
  Maintainer,
  Owner,
  Guest,
}

function init(role: number) {
  switch (role) {
    case Role.Reporter:
      console.log('Reporter:1')
      break
    case Role.Developer:
      console.log('Developer:2')
      break
    case Role.Maintainer:
      console.log('Maintainer:3')
      break
    case Role.Owner:
      console.log('Owner:4')
      break
    default:
      console.log('Guest:5')
      break
  }
}

init(Role.Developer)
```

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

### interface 和 type

#### 相同点

都可以描述一个对象或者函数

```ts
// interface
interface User {
  name: string
  age: number
}

interface SetUser {
  (name: string, age: number): void
}

// type
type User = {
  name: string
  age: number
}

type SetUser = (name: string, age: number) => void
```

#### 都允许拓展（extends）

### 不同点

type 可以声明基本类型别名，联合类型，元组等类型。

```ts
// 基本类型别名
type Name = string

// 联合类型
interface Dog {
  wong()
}
interface Cat {
  miao()
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]
```

type 语句中还可以使用 typeof 获取实例的 类型进行赋值

```ts
// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement('div')
type B = typeof div
```

其他骚操作

```ts
type StringOrNumber = string | number
type Text = string | { text: string }
type NameLookup = Dictionary<string, Person>
type Callback<T> = (data: T) => void
type Pair<T> = [T, T]
type Coordinates = Pair<number>
type Tree<T> = T | { left: Tree<T>; right: Tree<T> }
```

interface 能够声明合并

```ts
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/
```

### 类 (Class)

**抽象类：**

抽象类做为其它派生类的基类使用，它们一般不会直接被实例化，不同于接口，抽象类可以包含成员的实现细节。

**访问限定符：**

- public：成员都默认为 public
- private：当成员被设置为 private 之后，被此限定符修饰的成员是只可以被类的内部访问
- protected：当成员被设置为 protected 之后，被此限定符修饰的成员是只可以被类的内部以及类的子类访问。

### 函数(Function)

**重载（Overload）：**

- 在 Java 中的函数重载，指的是两个或者两个以上的同名函数，参数类型不同或者参数个数不同。函数重载的好处是：不需要为功能相似的函数起不同的名称。
- 在 TypeScript 中，表现为给同一个函数提供多个函数类型定义，适用于接收不同的参数和返回不同结果的情况。
- TS 实现函数重载的时候，要求定义一系列的函数声明，在类型最宽泛的版本中实现重载（前面的是函数声明，目的是约束参数类型和个数，最后的函数实现是重载，表示要遵循前面的函数声明。一般在最后的函数实现时用 any 类型）
- 函数重载在实际应用中使用的比较少，一般会用联合类型或泛型代替
- 函数重载的声明只用于类型检查阶段，在编译后会被删除
- TS 编译器在处理重载的时候，会去查询函数申明列表，从上至下直到匹配成功为止，所以要把最容易匹配的类型写到最前面

> [TS 常见问题整理](https://juejin.im/post/5e33fcd06fb9a02fc767c427)
