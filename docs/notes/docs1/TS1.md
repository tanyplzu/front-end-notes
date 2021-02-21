---
sidebarDepth: 1
---

# TypeScript(1)

[[toc]]

## 基础类型

```ts
// 布尔
const isCheck: boolean = false
// 数字
const year: number = 2077 // 可以存放 NaN 和 Infinity
// 字符串
const name: string = 'Cyberpunk'
// 数组
const list: number[] = [1, 2, 3]
const list: Array<number> = [1, 2, 3]
```

- boolean number string 可以为空，可以是null或undefined; 需要开启配置项

### Object 

- 泛指所有的非原始类型，数组，函数，对象都可以
- 可以用对象去显示，不过一般是使用interface去限制

### Tuple

元组 Tuple，表示一个已知元素数量和类型的数组。访问跨界元素时，ts 会抛出错误。

👻：[typescript 中文网](https://www.tslang.cn/)中的内容是，访问跨界元素，使用联合类型。是过时的内容。

```ts
const tuple: [number, string] = [2077, 'Cyberpunk']
```

### Enum

可以为一组数据提供更语义化的名称

```ts
enum language {
  CPP = 1,
  JS = 2,
  JAVA = 3,
}
const lan: language = language.CPP // 1
// Enum类型，也可以通过枚举的值，获取枚举的名称
const lanName: string = language[2] // 2
```

### Any

Any 为不清楚类型的变量指定类型，变量将不会进行类型检查。

#### Void

Void 表示没有任何类型。如果一个变量为 Void 类型，只能赋予 undefined 或者 null。

### Null & Undefined

null, undefined 是所有类型的子类型。null 和 undefined 可以赋值给 number 或者 string 类型。

如果 tsconfig.json 的配置项`strictNullChecks`设置为 true，那么 null, undefined 只能赋予它们各自的类型以及 Void 类型。

### Never

Never 表示永远不存在的类型。比如一个函数总是抛出错误，而没有返回值。或者一个函数内部有死循环，永远不会有返回值。函数的返回值就是 Never 类型。

### Object

object 表示非原始类型，也就是除 number，string，boolean，symbol，null 或 undefined 之外的类型。比如一个函数接受一个对象作为参数，但是参数上的 key 和 value 是不确定的，此时参数可以使用 object 类型。

### 类型断言

类型断言告诉编译器，我们自己确切的知道变量的类型，而不需要进行类型检查。

```ts
// as语法或是尖括号语法
alert((temp as string).length)
alert((<string>temp).length)
```

### 双重断言

`S as T`，只有当`S`是`T`的子集或者`T`是`S`的子集时，断言才能成功

```ts
window.onclick = function(event: Event) {
  let mouseEvent = event as HTMLElement // error，Event，HTMLElement类型不是父子集关系
  mouseEvent = (event as any) as HTMLElement // ok
}
```

## 接口

接口的主要作用是对类型进行命名。类型则会对值进行结构检查。在 ts 中不会说，“这个对象实现了这个接口”，ts 中只需要关注值的外形，只要对象满足接口的值的外形，那么它就是被允许的。

```ts
interface Bar {
  name: string
}
interface Foo {
  name: string
}

const bar: Bar = { name: 'Geralt' }
const foo: Foo = { name: 'V' }

function getName(hero: Bar) {
  return hero.name
}
// hero接受Bar类型，但是Foo类型和Bar类型结构是一致的，所以使用Foo类型也是被允许的
getName(bar) // Geralt
getName(foo) // V
```

### 可选属性

可选属性是在接口定义的属性后添加一个`?`，表示对象中的一些属性只在某些条件下存在，或者根本不存在。

### 只读属性

只读属性是在接口定义的属性前添加`readonly`关键字。只读属性一旦创建，就不能被修改了。

### 只读数组

使用 ReadonlyArray 关键字可以声明一个只读数组。但是我们可以通过类型断言，绕过编译器修改只读数组。

```ts
let list: ReadonlyArray<number> = [1, 2, 3]
// error
list
  .push(4)(
    // ok
    list as number[]
  )
  .push(4)
```

### 额外的属性检查

**对象字面量**会经过额外的属性检查，如果**对象字面量**存在目标类型中不存在的属性，编译器会抛出一个错误。

```ts
interface Bar {
  name: string
  age?: number
}
function getName(hero: Bar) {
  return hero.name
}

// error，对象字面量会进行额外的属性检查
getName({ name: 'Geralt', gender: 'man' })
// ok，使用类型断言会绕过检查
getName({ name: 'Geralt', gender: 'man' } as Bar)
// ok，使用一个变量，变量是不会进行额外的属性检查
const bar = { name: 'Geralt', gender: 'man' }
getName(bar)
// 或者修改接口的定义，对于未知的属性，使用索引签名
```

### 函数类型

接口同样可以描述函数。实现接口的函数的参数名，不需要和接口定义的参数名相匹配。

```ts
interface FooFunc {
  (a: number, b: string): string
}
const foo: FooFunc = (a: number, b: string): string => a + b
// 如果不指定类型，TypeScript会自动对推断参数以及返回值的类型
const far: FooFunc = (a, b) => a + b
```

### 可索引的类型

可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。TypeScript 支持两种索引类型，字符串和数字。代码中可以同时使用两种索引类型，但是数字索引的返回值的类型，必须是字符串索引的子类型（子集）。因为 Foo['1']和 Foo[1]是等同的。

```ts
interface Foo {
  [key: number]: string
  [key: string]: string
}

interface NumberDictionary {
  [index: string]: number
  length: number // ok
  name: string // error
}
interface Foo {
  [key: string]: number | string
  length: number // ok
  name: string // ok
}
```

### 可索引的类型的嵌套

简单的看一个例子，下面的可索引类型是不安全的

```ts
interface Foo {
  color?: string
  [key: string]: string
}
// 因为笔误，写错了拼写，color -> colour，但是由于可索引类型的原因，这并不会抛出错误
let a: Foo = {
  colour: 'blue',
}
```

合理的思路，是应该将可索引的类型，分离到单独的属性里

```ts
interface Foo {
  color?: string
  other?: {
    [key: string]: string
  }
}
// error编译器会抛出错误
let a: Foo = {
  colour: 'blue',
}
```

### 类类型

TypeScript 可以使用接口强制**一个类的实例**部分实现某种属性或者方法。但是对于静态部分，比如静态属性，静态方法，constructor 则不在检查的范围内。

```ts
interface WitcherClass {
  name: string // 接口可以定义`实例`的属性
  getName(): string // 接口可以定义`实例`的方法
}

// Witcher类实现WitcherClass接口
class Witcher implements WitcherClass {
  name: string
  getName() {
    return this.name
  }
  constructor() {}
}
```

### 继承接口

接口之间可以使用`extends`关键字实现继承。一个接口可以同时继承多个接口，实现合成接口。

```ts
interface Witcher {
  name: string
}

interface Wolf extends Witcher {
  fencing: string
}

const geralt: Wolf = {
  name: 'geralt',
  fencing: '拜年剑法',
}
```

### 接口继承类

接口可以继承一个类，但是接口只会继承类的定义，但不包括类的具体实现。接口会继承类的`private`和`protected`成员的修饰符。 当一个接口，继承了包含了`private`和`protected`成员的类时，该接口只能被该类和该类的子类所实现。

```ts
class Foo {
  protected name: string
}
interface InterfaceFoo extends Foo {
  getName(): string
}
// ok
class Bar extends Foo implements InterfaceFoo {
  getName() {
    return this.name
  }
}
// error, Far没有name属性，只有Foo以及Foo的子类才有
class Far implements InterfaceFoo {
  getName() {
    return this.name
  }
}
```

## 类

### 修饰符

- public 默认修饰符，TypeScript 中类中的成员默认为 public
- private 类的成员不能在类的外部访问，子类也不可以
- protected 类的成员不能在类的外部访问，但是子类中可以访问。如果一个类的构造函数，修饰符为 protected，那么此类只能被继承，无法实例化。
- readonly 关键字`readonly`可以将实例的属性，设置为只读

#### 参数属性

在构造函数的参数中使用`private`、`protected`、`public`或者`readonly`，可以将声明和赋值合并至一处

```ts
// Boo，Far声明name属性的方式是一致的
class Boo {
  public name: string
  constructor(theName: string) {
    this.name = theName
  }
}
class Far {
  constructor(public name: string) {}
}
```

### getters/setters

可以使用 getters/setters 控制对类成员的读写，但是如果当类的成员只带有 get 时，成员默认是只读的。

```ts
class Boo {
  // 控制_name的getters/setters行为
  private _name: string
  get name(): string {
    return this._name
  }
  set name(newName): void {
    if (newName) {
      this._name = newName
    }
  }
}
```

### 静态属性/静态方法

使用`static`关键词，定义类的静态属性或者静态方法，直接使用`类名.`，访问静态属性或者静态方法。

```ts
class Boo {
  static lan: string = 'JAVA'
  static getLan() {
    return Boo.lan
  }
}
// JAVA
console.log(Boo.getLan())
```

### 抽象类

使用`abstract`关键词定义抽象类。抽象类只能被继承，不会被直接实例化。在抽象类中还可以使用`abstract`定义抽象方法，抽象方法不包含具体的实现，必须在子类中实现抽象方法。

```ts
abstract class Boo {
  public name: string = 'boo'
  public abstract getName(): string
}
class Bar extends Boo {
  // 子类必须实现抽象类的抽象方法
  getName() {
    return this.name
  }
}
```

### typeof

在 TypeScript 中声明一个类的时候，声明的**实例的类型**。而使用`typeof 类名`取的是**类本身的类型**。

```ts
class Bar {
  static lan: string = 'Java'
  constructor(public age: number) {}
}
const a: Bar = new Bar(20)
// typeof 类名，获取的是类本身的类型，包含了静态成员和构造函数
const b: typeof Bar = Bar
// Java
console.log(b.lan)
```

### private 与单例模式

```ts
class Bar {
  private static instance: Bar
  private constructor() {}
  public static create() {
    if (!Bar.instance) {
      Bar.instance = new Bar()
    }
    return Bar.instance
  }
}
let a = new Bar() // error，类的外部无法访问构造函数
let b = Bar.create() // ok
```

## 函数

### 函数类型

```ts
// 函数类型
const sum = (a: number, b: number): number => a + b
// 完整的函数类型，参数名可以不同
const sum: (a: number, b: number) => number = (x: number, y: number) => x + y
```

#### 推断类型

```ts
// ts编译器会自动推断出x, y以及函数的返回值的类型
const sum: (a: number, b: number) => number = (x, y) => x + y
```

### 可选参数、默认参数、剩余参数

```ts
// 可选参数，在参数旁使用`?`实现可选参数功能，可选参数必须在必须参数的最后
const sum = (a: number, b?: number): number => {
  if (b) {
    return a
  } else {
    return a + b
  }
}
// 参数的默认值，当参数的值是undefined时，会时候默认的参数
const sum = (a: number, b: number = 0): number => a + b
// 剩余参数，使用省略号定义剩余参数的数组
const sum = (...arguments: number[]) => {
  return arguments[0] + arguments[1]
}
```

### this 参数

this 出现在函数的对象字面量中，默认为 any 类型。可以为函数添加 this 参数，this 参数是一个假参数，在参数列表中的第一位

```ts
interface Bar {
  name: string
}
function foo() {
  return {
    name: this.name, // this为any类型
  }
}
function bar(this: Bar) {
  return {
    name: this.name, // this为Bar类型
  }
}
```

### 重载

当我们需要根据参数的不同类型，返回不同类型的结果时，可以使用函数重载。为同一个函数提供多个函数类型定义来进行函数重载。编译器会根据这个列表去处理函数的调用。编译器会依次查找重载列表，找到匹配的函数定义。

```ts
function foo(x: number): string
function foo(x: string): number
// function foo(x): any并不是函数重载的一部分
function foo(x): any {
  if (typeof x === 'number') {
    return x + ''
  } else if (x === 'string') {
    return Number(x)
  }
}
```

## 泛型

使用泛型创建可重用的组件，使一个组件可以支持多种数据类型

```ts
// echo函数就是泛型
function echo<T>(arg: T): T {
  return arg
}
// 明确传入类型参数
echo<string>('Hello')
// 使用ts的类型推论，编译器会根据参数自动确认T的类型
echo('Hello')
```

### 泛型变量

对于泛型参数，我们必须把它当作任意或所有类型。

```ts
function echo<T>(arg: T): number {
  // error。布尔，数字类型是没有length属性的
  return arg.length
}
```

对于确定的参数：

```ts
function getArrayLength<T>(arg: Array<T>) {
  console.log((arg as Array<any>).length) // ok
  return arg
}
```

### 泛型接口

```ts
interface Foo {
  <T>(arg: T): T
}
const foo: Foo = <T>(arg: T): T => arg

// 将泛型参数当作接口的一个参数，明确泛型类型
interface Foo<T> {
  (arg: T): T
}
// arg将会被推导为number类型
const foo: Foo<number> = (arg) => arg
```

### 泛型类

类分为静态部分和实例部分，泛型类指的是实例部分的类型，不能用于静态部分

```ts
class Foo<T, U> {
  static name: T // error，静态成员不能泛型类型
  constructor(public x: T, public y: U) {}
  getY(): U {
    return this.y
  }
  getX(): T {
    return this.x
  }
}
const foo = new Foo('CyberpuCk', 2077)
```

### 泛型约束

我们的泛型现在似乎可以是任何类型，但是我们明明知道我们的传入的泛型属于哪一类，我们可以用 `<T extends xx>` 的方式约束泛型

```ts
interface NameConstraint {
  name: string
}
// 约束了泛型参数T，必须包含name属性，而不是任意类型
function witcher<T extends NameConstraint>(people: T): T {
  return people
}
// ok
witcher({ name: 'geralt' })
// error, 必须有name属性
witcher('geralt')
```

### 泛型约束与索引类型

```ts
function getValue(obj: object, key: string) {
  return obj[key] // error
}
```

我们会得到一段报错，这是新手 TypeScript 开发者常常犯的错误，编译器告诉我们，参数 obj 实际上是 {},因此后面的 key 是无法在上面取到任何值的。

```ts
function getValue<T extends object>(obj: T, key: string) {
  return obj[key] // error
}
```

这依然解决不了问题。因为我们第二个参数 key 是不是存在于 obj 上是无法确定的，因此我们需要对这个 key 也进行约束，我们把它约束为只存在于 obj 属性的类型，这个时候需要借助到后面我们会进行学习的索引类型进行实现 `<U extends keyof T>`

```ts
function getValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key] // ok
}
```

### 使用多重类型进行泛型约束

```ts
interface FirstInterface {
  doSomething(): number
}

interface SecondInterface {
  doSomethingElse(): string
}

class Demo<T extends FirstInterface, SecondInterface> {
  private genericProperty: T

  useT() {
    this.genericProperty.doSomething()
    this.genericProperty.doSomethingElse() // 类型“T”上不存在属性“doSomethingElse”
  }
}
```

正确的做法：

```ts
interface ChildInterface extends FirstInterface, SecondInterface {
}
class Demo<T extends ChildInterface> {
  private genericProperty: T

  useT() {
    this.genericProperty.doSomething()
    this.genericProperty.doSomethingElse()
  }
}
```

我们也可以利用交叉类型来进行多类型约束

```ts
interface FirstInterface {
  doSomething(): number
}

interface SecondInterface {
  doSomethingElse(): string
}

class Demo<T extends FirstInterface & SecondInterface> {
  private genericProperty: T

  useT() {
    this.genericProperty.doSomething() // ok
    this.genericProperty.doSomethingElse() // ok
  }
}
```

### 泛型与 new

我们假设需要声明一个泛型拥有构造函数，比如：

```ts
function factory<T>(type: T): T {
  return new type() // This expression is not constructable.
}
```

编译器会告诉我们这个表达式不能构造，因为我们没有声明这个泛型 T 是构造函数，这个时候就需要 new 的帮助了。

```ts
function factory<T>(type: {new(): T}): T {
  return new type() // ok
}
```

参数 type 的类型 {new(): T} 就表示此泛型 T 是可被构造的，在被实例化后的类型是泛型 T。

### 合理的使用泛型（配合 Axios 使用的例子）

```ts
import axios from 'axios'

// 通用的返回结构
// 使用泛型，封装通用的返回的数据接口
interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

// 封装的请求函数
// 请求用户数据
function getUser<T>() {
  return axios
    .get<ResponseData<T>>('/user')
    .then((res) => {
      return res.data
    })
    .catch((error) => {})
}
// 请求一组用户数据
function getUsers<T>() {
  return axios
    .get<ResponseData<T>>('/users')
    .then((res) => {
      return res.data
    })
    .catch((error) => {})
}
// 的接口
interface User {
  id: string
  name: string
}
// 使用
async function test() {
  await getUser<User>()
  await getUsers<User[]>()
}
```

## 枚举

### 数字枚举

数字枚举在不指定初始值的情况下，枚举值会从 0 开始递增。如果一个成员初始化为 1，后面的成员会从 1 开始递增。

### 字符串枚举

枚举中的每一个成员，必须使用字符串进行初始化。

### 异构枚举

枚举的成员，数字成员和字符串成员混合。但最好不要这样使用。

### 枚举类型

当所有枚举成员都具有字面量枚举值时，枚举具有了特殊的语义，枚举可以成为一种类型。

```ts
enum Witcher {
  Ciri,
  Geralt,
}
// ok
let witcher: Witcher = Witcher.Ciri
// error
let witcher: Witcher = 'V'
```

### 运行时枚举

枚举在运行时，是一个真实存在的对象，可以被当作对象使用

```ts
enum Witcher {
  Ciri = 'Queen',
  Geralt = 'Geralt of Rivia',
}
function getGeraltMessage(arg: { [key: string]: string }): string {
  return arg.Geralt
}
getGeraltMessage(Witcher) // Geralt of Rivia
```

### 编译时枚举

虽然在运行时，枚举是一个真实存在的对象。但是使用`keyof`时的行为却和普通对象不一致。必须使用`keyof typeof`才可以获取枚举所有属性名。

👻：这一部分内容在[typescript 中文网](https://www.tslang.cn/)中是没有的

```ts
enum Witcher {
  Ciri = 'Queen',
  Geralt = 'Geralt of Rivia',
}
type keys = keyof Witcher // toString, charAt………………
type keys = keyof typeof Witcher // Ciri, Geralt，所有的枚举类型
```

### const 枚举

const 枚举会在 ts 编译期间被删除，避免额外的性能开销。

```ts
const enum Witcher {
  Ciri = 'Queen',
  Geralt = 'Geralt of Rivia',
}
const witchers: Witcher[] = [Witcher.Ciri, Witcher.Geralt]
// 编译后
// const witchers = ['Queen', 'Geralt of Rivia']
```

### 枚举的静态方法和属性

同名的命名空间和同名的枚举类型，将会发生"声明合并"，命名空间`export`的函数和变量，将会成为枚举的静态方法，静态属性。

```ts
enum Color {
  Blue,
  Yellow,
  Green,
}
namespace Color {
  export function print(color: Color): void {
    alert(Color[color])
  }
  export const name = 'colors'
}
Color.print(Color.Blue) // Blue
alert(Color.name) // colors
```

### 开放式枚举

同名的枚举将会被合并，但是你需要给同名的第二个枚举，指定初始值。

```ts
enum Color {
  Red,
  Green,
  Blue,
}

enum Color {
  Yellow = 3,
  Black,
}
```

> 文章来源 [「学习笔记」TypeScript](https://juejin.im/post/5db429d0f265da4d204f34e0)
