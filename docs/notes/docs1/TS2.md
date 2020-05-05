---
sidebarDepth: 1
---

# TypeScript(2)

[[toc]]

## 类型推论

```ts
// x被自动推断为number
let x = 2
// zoo被自动推断为(Rhino | Elephant | Snake)[]类型
// 如果Rhino，Elephant，Snake有同一种超类型Animal，zoo会被推断为Animal[]类型
let zoo = [new Rhino(), new Elephant(), new Snake()]
```

### 上下文类型

typescript 会根据 window.onmousedown 的类型，推断出右侧的函数的类型。

👻：这一部分内容在[typescript 中文网](https://www.tslang.cn/)中表现是不一致的。

```ts
// typescript可以推断出mouseEvent为MouseEvent类型
window.onmousedown = function(mouseEvent) {
  // ok
  console.log(mouseEvent.button)
  // error
  console.log(mouseEvent.kangaroo)
}

window.onscroll = function(uiEvent) {
  // error，uiEvent会自动推断出为UIEvent类型，UIEvent类型不包含button属性
  console.log(uiEvent.button)
}
```

### noImplicitAny

开启编译选项`noImplicitAny`，当类型推断只能推断为`any`类型，编译器会发出警告

## 类型兼容性

typescript 的类型兼容是基于**结构**的，不是基于名义的。下面的代码在 ts 中是完全可以的，但在 java 等基于名义的语言则会抛错。

```ts
interface Named {
  name: string
}
class Person {
  name: string
}
let p: Named
// ok
p = new Person()

// 可以直接使用const断言(const断言的介绍，在后面)
let c = 'python' as const
c = 'Swift' // error
```

### 协变（Covariant），逆变（Contravariant），双向协变（Bivariant）

- 协变（Covariant）父类 = 子类 👌；子类 = 父类 🙅
- 逆变（Contravariant）父类 = 子类 🙅；子类 = 父类 👌
- 双向协变（Bivariant）父类 = 子类 👌；子类 = 父类 👌

### 对象兼容性 协变（Covariant）

```ts
interface Foo {
  name: string
}
interface Bar extends Foo {
  age: number
}
let x!: Foo
let y!: Bar

x = y // ok
y = x // error
```

### ✨ 函数兼容性

#### 函数参数类型兼容性 双向协变（Bivariant）逆变（Contravariant）

函数参数的兼容性，具有双向协变性

```ts
// 动物
interface Animal {
  name: string
}
// 猫
interface Cat extends Animal {
  color: string
}
// 美国短尾猫
interface USAShorthair extends Cat {
  age: number
}
type handle = (it: Cat) => void

// ok，是安全的
const handle1: handle = (it: Animal) => {}

// ok，不安全，但是被允许
// 因为type handle的参数是Cat类型，表明是可以允许接受其他，Cat的子类型的
// 如果it是USAShorthair类型，则会拒绝其他Cat的子类，所以是不安全的
const handle2: handle = (it: USAShorthair) => {}
```

##### 禁用函数参数双向协变性 逆变（Contravariant）

开启了`strictFunctionTypes`编译选项，会禁用函数参数的双向协变。参数类型是逆变的

```ts
type handle = (it: Cat) => void
// ok
const handle1: handle = (it: Animal) => {}
// error
const handle2: handle = (it: USAShorthair) => {}
```

#### 函数返回值类型兼容性 协变（Covariant）

如果函数返回值是一个对象，兼容性同对象一样

```ts
interface Foo {
  name: string
}
interface Bar extends Foo {
  age: number
}
// Bar是Foo的子类，返回值类型兼容性是协变的
// Foo（父类） = Bar（子类） ok
let x: () => Foo
let y: () => Bar
x = y // ok
y = x // error
```

#### 函数参数的数量兼容性

函数可以允许忽略一部分参数（具有逆变性？）

```ts
let x: (a: number) => void = (a) => {} // 参数数量少
let y: (a: number, b: string) => void = (a, b) => {} // 参数数量多
y = x // ok
x = y // error
```

### 枚举兼容性

枚举类型与数字类型兼容，不同枚举类型之间不兼容

```ts
enum Bar {
  T,
  R,
}
enum Foo {
  T,
  R,
}
// ok
const a: number = Bar.T
// error
const b: Foo = Bar.T
```

### 类兼容性

类类型的兼容性和对象字面量类似。但类类型只会比较类的实例部分，静态成员和构造函数不在兼容性的比较范围内。

```ts
class Bar {
  constructor(public name: string) {}
}
class Foo {
  constructor(public name: string, public age: number) {}
}
class Faz {
  constructor(public age: number) {}
}
class Boo {
  static version: number
  constructor(public name: string) {}
}
let bar!: Bar
let foo!: Foo
let faz!: Faz
let boo!: Boo
foo = bar // error，缺少age实例属性，兼容性的规则和对象类似
bar = foo // ok
bar = faz // error，name和age不兼容
boo = bar // ok，静态成员不会比较兼容性
```

### 泛型兼容性

泛型进行兼容性比较时，需要指定泛型参数后比较。当没有指定泛型参数时，泛型参数默认为`any`类型。

```ts
type Bar<T> = {
  name: T
}
type Foo<U> = {
  name: U
}
type Far<R> = {
  name: R
}
let a!: Bar<string>
let b!: Foo<string>
let c!: Far<number>
a = b // ok
b = c // error
```

### 兼容性总结

- 对象兼容性 协变（Covariant）
- 函数兼容性
  - 函数参数兼容性 双向协变（Bivariant）-更安全-> 逆变（Contravariant）
  - 函数返回值兼容 协变（Covariant）
  - 函数参数个数 逆变（Contravariant）
- 枚举兼容性（数字 <= 枚举 ok，枚举 a <= 枚举 b error）
- 类兼容性（和对象兼容性类型类似）
- 泛型兼容性（需要指定泛型参数后比较）

## 名义化类型

ts 的兼容性是基于结构的。但有时，我们确实想要区分，结构相同的两种类型。

### 使用字面量类型

使用字面量类型区分结构相同的类型

```ts
interface People<T extends string> {
  name: string
  age: number
  color: T
}
let blackPeople!: People<'black'>
let whitePeople!: People<'white'>
// 结构相同，但是类型并不兼容
// 例子没有涉及任何种族主义思想
blackPeople = whitePeople // error
whitePeople = blackPeople // error
```

### 使用枚举

```ts
interface Foo {
  name: string
}
enum FooEnum {}
interface Boo {
  name: string
}
enum BooEnum {}
type FooTitular = Foo & FooEnum
type BooTitular = Boo & BooEnum
let a: FooTitular = { name: '123' } as FooTitular
let b: BooTitular = { name: '456' } as BooTitular
// 结构相同但是不兼容
a = b // error
b = a // error
```

### 使用接口

为类型添加一个无关的属性，打破结构兼容性，这个无关的属性的命名习惯，通常是以`_`开头，以`Brand`结尾

```ts
interface A extends String {
  _aBrand: number
}
interface B extends String {
  _bBrand: number
}
let a: A = 'a' as any
let b: B = 'b' as any
// 结构相同，但是类型不兼容
a = b // error
b = a // error
```

## ✨ 高级类型

### 交叉类型

将多种类型叠加成为一种类型

```ts
function assign<T extends object, U extends object>(x: T, y: U): T & U {
  return { ...x, ...y }
}
class Foo {
  constructor(public foo: string) {}
}
class Bar {
  constructor(public bar: string) {}
}
const boo = assign(new Foo('foo'), new Bar('bar')) // boo是Bar & Foo的交叉类型
boo.bar // ok
boo.foo // ok
```

### 联合类型

联合类型表示一个值可以是几种类型之一。当一个值是联合类型时，我们能确定它包含多种类型的共有成员。

```ts
let a!: Boo | Foo | Baz
a.sex(
  // error，当a是Boo，Baz类型时，是没有sex属性
  a as Foo
).sex // ok
```

### 类型保护

#### 自定义类型保护

定义一个特殊的函数，返回值为`arg is type`类型谓词。arg 是自定义类型保护函数中的一个参数。

```ts
interface Boo {
  name: string
}
interface Foo {
  sex: boolean
}
interface Baz {
  age: number
}
type BooFooBaz = Boo | Foo | Baz
let a!: Boo | Foo | Baz

function isBoo(arg: BooFooBaz): arg is Boo {
  return (arg as Boo).name !== 'undefined'
}

alert(a.name) // error
if (isBoo(a)) {
  alert(a.name) // ok
}
```

#### typeof 类型保护

针对 number、string、boolean、symbol 提供类型保护。我们可以不必将`typeof`抽象成返回类型谓词的特殊函数。

```ts
let a!: number | string
if (typeof a === 'string') {
  alert(a.length) // ok
}
if (typeof a === 'number') {
  alert(a - 1) // ok
}
```

#### instanceof 类型保护

针对类类型提供类型保护

```ts
class Foo {
  getFoo(): void {}
}
class Bar {
  getBar(): void {}
}
let a!: Bar | Foo

if (a instanceof Foo) {
  a.getFoo() // ok
  a.getBar() // error
}
if (a instanceof Bar) {
  a.getBar() // ok
  a.getFoo() // error
}
```

#### in 类型保护

```ts
interface A {
  x: number
}
interface B {
  y: string
}
function doStuff(q: A | B) {
  // 判断是否有x属性
  if ('x' in q) {
    alert(q.x)
  } else {
    alert(q.y)
  }
}
```

#### 字面量类型保护

```ts
interface Foo {
  name: string
  type: 'foo'
}
interface Bar {
  name: string
  type: 'bar'
}
function temp(arg: Foo | Bar) {
  if (arg.type === 'foo') {
    // Foo类型
  } else {
    // Bar类型
  }
}
```

### null 类型

null, undefined 可以赋值给任何类型。在 tsconfig.js 中添加`strictNullChecks`的配置，可以阻止这种行为。开启`strictNullChecks`后，一个变量默认不在自动包含`null`和`undefined`类型。

```ts
// 开启strictNullChecks前
let a: string = '123'
a = null // ok

// 开启strictNullChecks后
let b: string = '123'
b = null // error
```

#### 断言排除 undefined，null 类型

在变量名后添加`!`，可以断言排除 undefined 和 null 类型

```ts
let a: string | null | undefined
a.length // error
a!.length // ok
```

### ✨ 类型别名

```ts
type Foo = string
type Bar = {
  name: string
  age: number
}
// 类型别名也可用来声明函数
type Func = {
  (a: number): number
  (a: string): string
}
// 类型别名也可以是泛型
type Boo<T> = {
  key: T
}
// 类型别名中可以引用自身
type LinkListNode<T> = {
  value: T
  next: LinkListNode<T> | null
  prev: LinkListNode<T> | null
}
```

#### 类型别名和接口的区别

1. 类型别名可以为任何类型引入名称。例如基本类型，联合类型等
2. 类型别名不支持继承
3. 类型别名不会创建一个真正的名字
4. 类型别名无法被实现，而接口可以被派生类实现
5. 类型别名重名时编译器会抛出错误，接口重名时会产生合并

### 字符串字面量类型

```ts
let a!: 'js'
a = 'js' // ok
a = 'java' // error

let b!: 'c#' | 'c++'
b = 'c#' // ok
b = '.net' // error
```

### 数字字面量类型

```ts
let x!: 1
x = 2 // error

let y!: 1 | 2
y = 2 // ok
y = 3 // error
```

### 索引类型

#### 索引类型查询操作符

`keyof T`的结果为`T`上公共属性名的联合

```ts
type Keys<T> = keyof T
interface Witcher {
  name: string,
  age: number
}
// Witcher公共属性名的联合
let keys: Keys<Witcher>; // name | age
typKeys<T> = keyof T
type Witchers = [string, string]
let keys: Keys<Witchers>; // '0' | '1' | length | toString……

type Keys<T> = keyof T
type Witchers = Array<string>
let keys: Keys<Witchers>; // number | length | toString……
funion pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n])
}
const witcher = {
  name: '杰洛特',
  age: 88
}
// (string | number)[]
// ['杰洛特', '88']
const values = pluck(witcher, ['name', 'age'])
```

#### 索引访问操作符

```ts
T[K]`，索引访问操作符。但是需要确保`K extends keyof T
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
```

### 映射类型

从旧类型中创建出一种新的类型，映射类型

```ts
// 只读映射类型
type CustomReadonly<T> = {
  readonly [K in keyof T]: T[K]
}
// 可选映射类型
type CustomPartial<T> = {
  [K in keyof T]?: T[K]
}
// 可为空可为undefined映射类型
type NullUndefinedable<T> = {
  [K in keyof T]: T[K] | null | undefined
}
typCustomPick<T, K extends keyof T> = {
  [P in K]: T[P];
}
interface Bar {
  name: string,
  age: number,
  sex: boolean
}
// 提取出指定的key的类型
// Foo = { name: string, age: number }
type Foo = CustomPick<Bar, 'name' | 'age'>
typCustomRecord<K extends string, T> = {
  [P in K]: T;
}
// { name: string, title: string, message: string }
type Bar = CustomRecord<'name' | 'title' | 'message', string>
```

### 内置映射类型

#### Exclude

`Exclude`，从`T`出提取出，不能赋值给`U`的类型

```ts
// string | boolean
// string | boolean 不能赋值给number类型
type Foo = Exclude<string | number | boolean, number>
```

#### Extract

`Extract`，从`T`出提取出，能赋值给`U`的类型

```ts
// number
// 只有number能给赋值给number类型
type Foo = Extract<string | number | boolean, number>
```

#### NonNullable

`NonNullable`，从`T`中剔除 null 和 undefined 类型

```ts
type Bar = string | null | undefined
// Foo
type Foo = NonNullable<Bar>
let a!: Foo
// error
a = null
```

基于`NonNullable`封装，剔除属性中 null 和 undefined 类型

```ts
type NonNullUndefinedable<T> = {
  [K in keyof T]: NonNullable<T[K]>
}
interface Bar {
  name: string | null | undefined
  age: number | null | undefined
  sex: boolean | null | undefined
}
// Foo { name: string, age: number, sex: boolean }
type Foo = NonNullUndefinedable<Bar>
```

#### ReturnType

`ReturnType`，获取`T`的返回值类型

```ts
type BarCall = () => number
// number
type BarReturn = ReturnType<BarCall>
```

#### InstanceType

`InstanceType`，获取`T`的实例类型

```ts
class Bar {}
// Bar, Bar的构造函数的实例类型，就是Bar类型
type Foo = InstanceType<typeof Bar>
```

#### Omit

Omit 在 ts3.5 版本已经成为内置类型（见下文）

```ts
// Exclude<keyof T, K>从key of T中出剔除所有K的类型
// Pick<T, U>映射出只有U属性的新类型
// 模拟Omit映射类型
type CustomOmit<T, K> = Pick<T, Exclude<keyof T, K>>
```

## lib.d.ts

在安装`typescript`时，会安装一系列声明文件`lib.dom.d.ts`，`lib.es2015.core.d.ts`等。它们包含了 javaScript 运行时以及 dom 中存在各种常见的环境声明

```ts
// lib.dom.d.ts内容节选

/** A window containing a DOM document; the document property points to the DOM document loaded in that window. */
interface Window
  extends EventTarget,
    WindowTimers,
    WindowSessionStorage,
    WindowLocalStorage,
    WindowConsole,
    GlobalEventHandlers,
    IDBEnvironment,
    WindowBase64,
    AnimationFrameProvider,
    WindowOrWorkerGlobalScope,
    WindowEventHandlers {
  readonly applicationCache: ApplicationCache
  readonly caches: CacheStorage
  readonly clientInformation: Navigator
  readonly closed: boolean
  readonly crypto: Crypto
  customElements: CustomElementRegistry
  defaultStatus: string
  readonly devicePixelRatio: number
  readonly doNotTrack: string
  readonly document: Document
  // ...more
}
```

### 修改原始类型

创建`globals.d.ts`全局的声明文件，在全局的声明文件中修改原始的类型

```ts
// globals.d.ts

// 修改Window接口，添加helloworld方法
interface Window {
  helloworld(): 'helloworld'
}
// 修改Date的静态成员，添加today方法
interface DateConstructor {
  today(): Date
}

// 使用
window.helloworld()
Date.today()
```

## 流动的类型

### 复制类型

`import`配合`namespace`或者`module`可以实现类型的复制。

```ts
class Foo {}
const Bar = Foo // Bar只是Foo的引用，不是类型
let bar: Bar // error，没有Bar类型
nampace classs {
  export class Foo {}
}
import Bar = classs.Foo // 可以实现复制类型
let bar: Bar // ok
```

### 获取变量的类型

使用`let`和`typeof`可以获取变量自身的类型（如果是使用`const`, 使用 typeof 获取的是字面量类型）

```ts
let foo = 'foo'
let bar!: typeof foo
bar = 'bar' // ok, bar为string类型
bar = 123 // error

let foo = [1, 2, 3]
let bar!: typeof foo
bar = [4, 5, 6] // ok
bar = ['4', '5', '6'] // error, bar为number[]类型
```

### 获取类（实例）成员的类型

```ts
class Foo {
  constructor(public name: string) {}
}
declare let _foo: Foo
// bar为string类型，_foo是Foo的实例
let bar: typeof _foo.name
```

### 获取字面量类型

使用`const`关键字与`typeof`，可以获取字面量类型

```ts
const foo = 'foo'
let bar!: typeof foo
bar = 'bar' // error
bar = 'foo' // ok, foo类型为foo
```

## 命名空间

使用命名空间组织代码，避免命名冲突。如果外部想访问命名空间内部的内容，命名空间中的内容，需要使用`export`导出

```ts
namespace Lib {
  export namespace Math {
    export function sum(a: number, b: number): number {
      return a + b
    }
  }
}
Lib.Math.sum(1, 2)
```

### 命名空间别名

`import alias = namespace.namespace`，可以为命名空间创建别名

```ts
namespace Lib {
  export namespace Math {
    export namespace Geometry {
      export function pythagoreanTheorem(x: number, y: number): number {
        return x * x + y * y
      }
    }
  }
}
// 使用时，会有多个层级的关系
Lib.Math.Geometry.pythagoreanTheorem(1, 2)
// 使用命名空间别名
import Geometry = Lib.Math.Geometry
Geometry.pythagoreanTheorem(1, 2)
```

### 使用其他 javascript 库

ts 在使用，使用 js 编写的类库时，需要类型声明文件`xx.d.ts`，大部分类库通常会暴露一个顶级的对象，可以使用命名空间表示它们。举一个例子。

```ts
// node_modules/custom-lib/index.d.ts
export declare namespace Lib {
  export namespace Geometry {
    export function pythagoreanTheorem(x: number, y: number): number {
      return x * x + y * y
    }
  }
  }
}
export declare const gravitationalConstant: number
// c/main.ts
import { Lib, gravitationalConstant } from 'custom-lib'

Lib.Geometry.pythagoreanTheorem(gravitationalConstant, 2)
```

## ✨ 一些手册指南中没有提及的内容

### 只读数组的新语法

```ts
// 原来的语法
const bar: ReadonlyArray<string> = ['Hello', 'World']
// 新增的语法
const boo: readonly string[] = ['Hello', 'World']
```

### const 类型断言

使用 const 断言，typescript 会为变量添加一个自身的字面量类型。举一个例子

```ts
// ts自动推导为x添加`string`类型
// let x: string = '123'
let x = '123'
// x可以被再次赋值
x = '456'

// 使用const断言，会为x添加自身的字面量类型
// let x: '123' = '123'
let x = '123' as const
// error，x不能被重新赋值
x = '456'
```

使用 const 断言时：

1. 对象字面量的属性，获得`readonly`的属性，成为只读属性
2. 数组字面量成为`readonly tuple`只读元组
3. 字面量类型不能被扩展（比如从`hello`类型到`string`类型）

```ts
// type '"hello"'
let x = 'hello' as const
// type 'readonly [10, 20]'
let y = [10, 20] as const
// type '{ readonly text: "hello" }'
let z = { text: 'hello' } as const
```

const 断言支持两种语法，`as`语法，在非 tsx 文件中可以使用``语法

```ts
// type '"hello"'
let x = <const>'hello'
// type 'readonly [10, 20]'
let y = <const>[10, 20]
// type '{ readonly text: "hello" }'
let z = <const>{ text: 'hello' }
```

### unknown 类型

`unknown`类型和`any`类型类似。与`any`类型不同的是。`unknown`类型可以接受任意类型赋值，但是`unknown`类型赋值给其他类型前，必须被断言。

`unknown`对那种**想表示是任何值，但是使用前必须执行类型检查的 api**很有用。

```ts
let x: any = 'Hello'
// ok
let y: number = x

let x: unknown = 'Hello'
// error
let y: number = x
// ok，必须经过断言处理才能赋值给确认的类型
let z: number = x as number
```

### ✨✨✨infer

一开始，我很难理解 infer 到底是做什么的，我们从两个简单的示例开始

```ts
type Pro<T> = T extends Promise<infer R> ? Promise<R> : T

type Bar = Pro<Promise<string[]>> // Bar = Promise<string[]>，Promise<string[]>满足Promise<R>的约束
type Boo = Pro<number> // Boo = number
```

`type Pro`，会检查泛型参数`T`，如果泛型参数`T`满足`Promise`的约束条件，返回`Promise`的类型，否则返回`T`类型

```ts
type Param<T> = T extends (param: infer P) => any ? P : T

type getUser = (id: number) => object

type Foo = Param<getUser> // Foo等于getUser的参数类型，number类型
type Bar = Param<boolean> // Bar等于boolean类型
```

`type Param`，会检查泛型参数`T`，如果泛型参数`T`满足`(param: infer P) => any`的约束，会返回参数的类型，否则返回`T`类型

#### infer 映射类型

typescript 中内置的 infer 映射类型

##### type ReturnType

提取获取函数的返回值的类型

```ts
type Foo = ReturnType<() => string[]> // Foo = string[]
```

`type ReturnType`内部的具体实现

```ts
// 自定义ReturnType映射类型
type CustomReturnType<T> = T extends (...arg: any[]) => infer P ? P : T
type Foo = CustomReturnType<() => string[]> // Foo = string[]
```

##### type ConstructorParameters

提取构造函数的参数类型

```ts
class Foo {
  constructor(public name: string, public age: number) {}
}
type Params = ConstructorParameters<typeof Foo> // [string, number]
```

`type ConstructorParameters`内部具体实现

```ts
// ConstructorParameters映射类型
type CustomConstructorParameters<T extends new (...args: any[]) => any> = T extends new (
  ...args: infer P
) => any
  ? P
  : never
type Params = CustomConstructorParameters<typeof Foo> // [string, number]
```

#### 元组类型 -> 联合类型

如何将 `[string, number]` 转变成 `string | number`?

```ts
type CustomTuple = [string, number, boolean]

type TupleToUnion<T> = T extends Array<infer P> ? P : never

type CustomUnion = TupleToUnion<CustomTuple> // string | number | boolean
```

#### 联合类型 -> 交叉类型

《TypeScript 深入浅出》中的例子，在目前的版本（3.6.4）中存在一些[问题](https://github.com/microsoft/TypeScript/issues/34732)。

### type Omit

`Omit`是 3.5 版本中新增的映射类型, 从`T`中删除所有的`K`类型。

```ts
interface Foo {
  name: string
  age: number
}

// Bar = { name: string }
type Bar = Omit<Foo, 'age'>
```

在之前的版本中可以使用`type Omit = Pick>`实现

## 参考

感谢大佬们的付出 ❤️

- [✨ 三毛大佬的博客](https://jkchao.cn/)
- [深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/)
- [TypeScript 中文网](https://www.tslang.cn/)
- [TypeScript](http://www.typescriptlang.org/)
- [TypeScript Tutorial - 'infer' keyword](https://dev.to/aexol/typescript-tutorial-infer-keyword-2cn)
- [[TypeScript 奇技淫巧\] union to tuple](https://zhuanlan.zhihu.com/p/58704376)
- [What are covariance and contravariance?](https://www.stephanboyer.com/post/132/what-are-covariance-and-contravariance)
- [Differences Between TypeScript Type vs Interface](https://www.educba.com/typescript-type-vs-interface/)

> 文章来源 [「学习笔记」TypeScript](https://juejin.im/post/5db429d0f265da4d204f34e0)
