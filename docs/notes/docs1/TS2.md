# TypeScript

[[toc]]

## 基础类型

```ts
// 布尔
const isCheck: boolean = false
// 数字
const year: number = 2077
// 字符串
const name: string = 'Cyberpunk'
// 数组
const list: number[] = [1, 2, 3]
const list: Array<number> = [1, 2, 3]
```

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

### 在泛型中使用类类型

使用`new (...any: []) => T`，引用类类型

```ts
// c的实例必须是T类型，c必须是T类型本身
function create<T>(c: new(...any[]) => T): T {
  return new c();
}
```

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
