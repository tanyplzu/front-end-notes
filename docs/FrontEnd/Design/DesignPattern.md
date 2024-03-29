---
sidebarDepth: 1
---

# 设计模式

[[toc]]

## 设计原则

- 单一职责原则（Single Responsibility Principle）
- 开放封闭原则（Opened Closed Principle）
- 里式替换原则（Liskov Substitution Principle）
- 接口隔离原则（Interface Segregation Principle）
- 依赖反转原则（Dependency Inversion Principle）

## 设计模式的分类

- 创建型模式，共五种：工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式。
- 结构型模式，共七种：适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式。
- 行为型模式，共十一种：策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模

## 工厂模式

主要作用就是把创建对象的过程进行更进一层的封装，相同的部分进行提取，不同的地方传递参数即可。

```js
function User(name, age, career, work) {
  this.name = name;
  this.age = age;
  this.career = career;
  this.work = work;
}
function Factory(name, age, career) {
  let work;
  if (career === 'coder') {
    word = ['写代码', '写细分', '修Bug'];
  } else if (career === 'product manager') {
    word = ['订会议室', '写PRD', '催更'];
  }
  ...
  return new User(name, age, career, word);
}
```

在 Vue 源码中，你也可以看到工厂模式的使用，比如创建异步组件

```typescript
export function createComponent (
  Ctor: Class<Component> | Function | Object | void,
  data: ?VNodeData,
  context: Component,
  children: ?Array<VNode>,
  tag?: string
): VNode | Array<VNode> | void {

  // 逻辑处理...
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  )

  return vnode
}
```

在上述代码中，我们可以看到我们只需要调用 `createComponent` 传入参数就能创建一个组件实例，但是创建这个实例是很复杂的一个过程，工厂帮助我们隐藏了这个复杂的过程，只需要一句代码调用就能实现功能。

## 单例模式

单例模式很常用，比如全局缓存、全局状态管理等等这些只需要一个对象，就可以使用单例模式。

```js
class SingleDog {
  show() {
    console.log('我是一个单例对象');
  }
  static getInstance() {
    // 判断是否已经new过1个实例
    if (!SingleDog.instance) {
      // 若这个唯一的实例不存在，那么先创建它
      SingleDog.instance = new SingleDog();
    }
    // 如果这个唯一的实例已经存在，则直接返回
    return SingleDog.instance;
  }
}

const s1 = SingleDog.getInstance();
const s2 = SingleDog.getInstance();

s1 === s2; // true
```

闭包版

```js
SingleDog.getInstance = (function() {
  // 定义自由变量instance，模拟私有变量
  let instance = null;
  return function() {
    // 判断自由变量是否为null
    if (!instance) {
      // 如果为null则new出唯一实例
      instance = new SingleDog();
    }
    return instance;
  };
})();
```

应用 Vuex

### 实现一个全局唯一的模态框

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>modal</title>
    <style>
      #modal {
        position: fixed;
        height: 200px;
        width: 200px;
        line-height: 200px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid #000;
        text-align: center;
      }
    </style>
  </head>

  <body>
    <button id="open">打开模态框</button>
    <button id="close">关闭模态框</button>
    <script>
      const Model = (function() {
        let box;
        return function() {
          if (!box) {
            box = document.createElement('div');
            box.innerHTML = '唯一';
            box.id = 'modal';
            box.style.display = 'none';
            document.body.appendChild(box);
          }
          return box;
        };
      })();
      document.getElementById('open').addEventListener('click', () => {
        const model = Model();
        model.style.display = 'block';
      });
      document.getElementById('close').addEventListener('click', () => {
        const model = Model();
        model.style.display = 'none';
      });
    </script>
  </body>
</html>
```

## 观察者模式

### DOM 事件

```js
document.body.addEventListener('click', () => {}, false);
```

### 双向数据绑定

```js
// 主题，接收状态变化，触发每个观察者
class Subject {
  constructor() {
    this.state = 0;
    this.observers = [];
  }
  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
    this.notifyAllObservers();
  }
  attach(observer) {
    this.observers.push(observer);
  }
  notifyAllObservers() {
    this.observers.forEach((observer) => {
      observer.update();
    });
  }
}

// 观察者，等待被触发
class Observer {
  constructor(name, subject) {
    this.name = name;
    this.subject = subject;
    this.subject.attach(this);
  }
  update() {
    console.log(`${this.name} update, state: ${this.subject.getState()}`);
  }
}

// 测试代码
let s = new Subject();
let o1 = new Observer('o1', s);
let o2 = new Observer('o2', s);
let o3 = new Observer('o3', s);

s.setState(1);
s.setState(2);
s.setState(3);
```

**观察者模式和发布订阅模式的区别**

- 如果发布者直接触及到订阅者，就可以说明是观察者模式；
- 如果发布者不直接触及到订阅者，而是由第三方来完成实际的通信操作，就叫做发布 - 订阅模式。
- 简单来说，它们就是解耦的程度不同，vue 内的自定义事件的 Event Emitter，发布者完全不用感知到订阅者，事件的注册和触发都发生在事件总线上，实现了完全的解耦。
- 而 Dep 和 Watcher 就是观察者模式，Dep 直接 add 以及 notify 触发 watcher 的更新。

观察者模式让观察者依赖与抽象而非具体。如登录的例子：

```js
// 登录成功后，发布“loginSucc”登录成功消息，并传递data数据
login.succ((data) => {
  login.trigger('loginSucc', data);
});

// header模块js
// 订阅“loginSucc”登录成功消息
login.listen('loginSucc', () => {
  header.setAvatar(data.avatar);
});

// nav模块js
// 订阅“loginSucc”登录成功消息
login.listen('loginSucc', () => {
  nav.setAvatar(data.avatar);
});
```

## 策略模式

> 一个基于策略模式的程序至少由两部分组成。第一部分为策略类，策略类封装了具体的算法，并负责具体计算过程。第二部分是环境类 context，接收客户请求，随后把请求委托给某一个策略。

### 价格计算

> 需求：
>
> prePrice - 处理预热价 onSalePrice - 处理大促价 backPrice - 处理返场价 freshPrice - 处理尝鲜价 askPrice - 分发询价逻辑

```js
// 定义一个询价处理器对象
const priceProcessor = {
  pre(originPrice) {
    if (originPrice >= 100) {
      return originPrice - 20;
    }
    return originPrice * 0.9;
  },
  onSale(originPrice) {
    if (originPrice >= 100) {
      return originPrice - 30;
    }
    return originPrice * 0.8;
  },
  back(originPrice) {
    if (originPrice >= 200) {
      return originPrice - 50;
    }
    return originPrice;
  },
  fresh(originPrice) {
    return originPrice * 0.5;
  },
};
// 询价函数
function askPrice(tag, originPrice) {
  return priceProcessor[tag](originPrice);
}
```

如果新加功能的话：

```js
priceProcessor.newUser = function(originPrice) {
  if (originPrice >= 100) {
    return originPrice - 50;
  }
  return originPrice;
};
```

### 表单校验

```text
现在有一个注册用户的表单需求，在提交表单之前，需要验证以下规则：

用户名不能为空
密码长度不能少于 6 位
手机号码必须符合格式
```

传统做法：使用 `if-else` 语句判断表单输入是否符合对应规则，如不符合，提示错误原因。

```js
let registerForm = document.getElementById('registerForm');
registerForm.onsubmit = () => {
  if (registerForm.userName.value) {
    alert('用户名不能为空');
    return false;
  }
  if (registerForm.password.value.length < 6) {
    alert('密码长度不能少于6');
    return false;
  }
  if (!/(^1[3|5|8][0-9]$)/.test(registerForm.phone.value)) {
    alert('手机号码格式不正确');
    return false;
  }
};
```

上述代码有以下缺点：

- onsubmit 函数庞大，包含大量 if-else 语句；
- onsubmit 缺乏弹性，当有规则需要调整，或者需要新增规则时，需要改动 onsubmit 函数内部，违反开放-封闭原则；
- 算法复用性差，只能通过复制，复用到其他表单。

策略模式做法:

```js
// 表单dom
const registerForm = document.getElementById('registerForm');

// 表单规则
const rules = {
  userName: [
    {
      strategy: 'isNonEmpty',
      errorMsg: '用户名不能为空',
    },
    {
      strategy: 'minLength:10',
      errorMsg: '用户名长度不能小于10位',
    },
  ],
  password: [
    {
      strategy: 'minLength:6',
      errorMsg: '密码长度不能小于6位',
    },
  ],
  phoneNumber: [
    {
      strategy: 'isMobile',
      errorMsg: '手机号码格式不正确',
    },
  ],
};

// 策略类
var strategies = {
  isNonEmpty: function(value, errorMsg) {
    if (value === '') {
      return errorMsg;
    }
  },
  minLength: function(value, errorMsg, length) {
    console.log(length);
    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile: function(value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  },
};

// 验证类
const Validator = function() {
  this.cache = [];
};

// 添加验证方法
Validator.prototype.add = function({ dom, rules }) {
  rules.forEach((rule) => {
    const { strategy, errorMsg } = rule;
    const [strategyName, strategyCondition] = strategy.split(':');
    const { value } = dom;
    this.cache.push(
      strategies[strategyName].bind(dom, value, errorMsg, strategyCondition)
    );
  });
};

// 开始验证
Validator.prototype.start = function() {
  let errorMsg;
  this.cache.some((cacheItem) => {
    const _errorMsg = cacheItem();
    if (_errorMsg) {
      errorMsg = _errorMsg;
      return true;
    } else {
      return false;
    }
  });

  return errorMsg;
};

// 验证函数
const validatorFn = () => {
  const validator = new Validator();
  Object.keys(rules).forEach((key) => {
    validator.add({
      dom: registerForm[key],
      rules: rules[key],
    });
  });

  const errorMsg = validator.start();
  return errorMsg;
};

// 表单提交
registerForm.onsubmit = () => {
  const errorMsg = validatorFn();
  if (errorMsg) {
    alert(errorMsg);
    return false;
  }
  return false;
};
```

:question: todo 调研现在 UI 框架的做法

## 状态模式

> 简单来说，就是将 “一个大 class + 一堆 if else” 替换为 “一堆小 class”。一堆小 class 就是一堆状态，用一堆状态代替 if else 会更好拓展与维护。

```ts
abstract class Context {
  abstract setState(state: State): void;
}

// 定义状态接口
interface State {
  // 模拟台灯点亮
  show: () => string
}

interface Light {
  click: () => void
}

type LightState = State & Light

class TurnOff implements State, Light {
  context: Context;

  constructor(context: Context) {
    this.context = context
  }

  show() {
    return '关灯'
  }

  // 按下按钮
  public click() {
    this.context.setState(new WeakLight(this.context))
  }
}

class WeakLight implements State, Light {
  context: Context;

  constructor(context: Context) {
    this.context = context
  }

  show() {
    return '弱光'
  }

  // 按下按钮
  public click() {
    this.context.setState(new StandardLight(this.context))
  }
}

class StandardLight implements State, Light {
  context: Context;

  constructor(context: Context) {
    this.context = context
  }

  show() {
    return '亮'
  }

  // 按下按钮
  public click() {
    this.context.setState(new StrongLight(this.context))
  }
}

class StrongLight implements State, Light {
  context: Context;

  constructor(context: Context) {
    this.context = context
  }

  show() {
    return '强光'
  }

  // 按下按钮
  public click() {
    this.context.setState(new TurnOff(this.context))
  }
}

// 台灯
class Lamp extends Context {
  // 当前状态
  #currentState: LightState = new TurnOff(this)
  setState(state: LightState) {
    this.#currentState = state
  }
  getState() {
    return this.#currentState
  }

  // 按下按钮
  click() {
    this.getState().click()
  }
}

const lamp = new Lamp() // 关闭
console.log(lamp.getState().show()) // 关灯
lamp.click() // 弱光
console.log(lamp.getState().show()) // 弱光
lamp.click() // 亮
console.log(lamp.getState().show()) // 亮
lamp.click() // 强光
console.log(lamp.getState().show()) // 强光
lamp.click() // 关闭
console.log(lamp.getState().show()) // 关闭

```

编译器

```js
<script>
const template = `<p>Vue</p>`

const State = {
  initial: 1,
  tagOpen: 2,
  tagName: 3,
  text: 4,
  tagEnd: 5,
  tagEndName: 6
}

function isAlpha(char) {
  return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z'
}

function tokenize(str) {
  let currentState = State.initial
  const chars = []
  const tokens = []
  while(str) {
    const char = str[0]
    switch (currentState) {
      case State.initial:
        if (char === '<') {
          currentState = State.tagOpen
          str = str.slice(1)
        } else if (isAlpha(char)) {
          currentState = State.text
          chars.push(char)
          str = str.slice(1)
        }
        break
      case State.tagOpen:
        if (isAlpha(char)) {
          currentState = State.tagName
          chars.push(char)
          str = str.slice(1)
        } else if (char === '/') {
          currentState = State.tagEnd
          str = str.slice(1)
        }
        break
      case State.tagName:
        if (isAlpha(char)) {
          chars.push(char)
          str = str.slice(1)
        } else if (char === '>') {
          currentState = State.initial
          tokens.push({
            type: 'tag',
            name: chars.join('')
          })
          chars.length = 0
          str = str.slice(1)
        }
        break
      case State.text:
        if (isAlpha(char)) {
          chars.push(char)
          str = str.slice(1)
        } else if (char === '<') {
          currentState = State.tagOpen
          tokens.push({
            type: 'text',
            content: chars.join('')
          })
          chars.length = 0
          str = str.slice(1)
        }
        break
      case State.tagEnd:
        if (isAlpha(char)) {
          currentState = State.tagEndName
          chars.push(char)
          str = str.slice(1)
        }
        break
      case State.tagEndName:
        if (isAlpha(char)) {
          chars.push(char)
          str = str.slice(1)
        } else if (char === '>') {
          currentState = State.initial
          tokens.push({
            type: 'tagEnd',
            name: chars.join('')
          })
          chars.length = 0
          str = str.slice(1)
        }
        break
    }
  }

  return tokens
}

console.log(tokenize(template))
</script>
```

## 迭代器模式

- ES6 对迭代器的实现

ES6 约定，任何数据结构只要具备 **Symbol.iterator** 方法（这个属性就是 Iterator 的具体实现，它本质上是当前数据结构默认的迭代器生成函数），就可以被遍历——准确地说，是被 for...of... 循环和迭代器的 next 方法遍历。 事实上，for...of... 的背后正是对 next 方法的反复调用。

在 ES6 中，针对 Array、Map、Set、String、TypedArray、函数的 arguments 对象、NodeList 对象这些原生的数据结构都可以通过 for...of... 进行遍历。原理都是一样的，此处我们拿最简单的数组进行举例，当我们用 for...of... 遍历数组时：

```js
const arr = [1, 2, 3];
const len = arr.length;
for (item of arr) {
  console.log(`当前元素是${item}`);
}
```

改变原始值

```js
let iterable = [10, 20, 30];

for (let value of iterable) {
  value += 1;
  console.log(value);
}
// 11
// 21
// 31
```

终止迭代器

```js
let iterable = [10, 20, 30];

for (let value of iterable) {
  console.log(value);
  if (value === 20) {
    break;
  }
}
```

```js
const arr = [1, 2, 3];
// 通过调用iterator，拿到迭代器对象
const iterator = arr[Symbol.iterator]();

// 对迭代器对象执行next，就能逐个访问集合的成员
iterator.next();
iterator.next();
iterator.next();
```

```js
// 下面的两种方法是等效的
const m1 = new Map([
  ['key1', 'val1'],
  ['key2', 'val2'],
  ['key3', 'val3'],
]);

const m2 = new Map({
  [Symbol.iterator]: function*() {
    yield ['key1', 'val1'];
    yield ['key2', 'val2'];
    yield ['key3', 'val3'];
  },
});
```

> 有迭代器属性的是有序集合，object 是无序的，没有迭代器属性；map 是有序列表

## 装饰器

ES7 装饰器

- 类装饰器

```js
// 装饰器函数，它的第一个参数是目标类
function classDecorator(target) {
  target.hasDecorator = true;
  return target;
}

// 将装饰器“安装”到Button类上
@classDecorator
class Button {
  // Button类的相关逻辑
}

// 验证装饰器是否生效
console.log('Button 是否被装饰了：', Button.hasDecorator); // true
```

为 Button 添加了静态属性

- 方法装饰器

```js
// 具体的参数意义，在下个小节，这里大家先感知一下操作
function funcDecorator(target, name, descriptor) {
  let originalMethod = descriptor.value;
  descriptor.value = function() {
    console.log('我是Func的装饰器逻辑');
    return originalMethod.apply(this, arguments);
  };
  return descriptor;
}

class Button {
  @funcDecorator
  onClick() {
    console.log('我是Func的原有逻辑');
  }
}

// 验证装饰器是否生效
const button = new Button();
button.onClick();
```

第一个参数修饰的目标对象；第二个参数是属性名；第三个参数是该属性的描述对象。

> 装饰器不能用于函数

## 代理模式

**事件代理（事件委托）：**

用代理模式实现多个子元素的事件监听，代码会简单很多：

```js
// 获取父元素
const father = document.getElementById('father');

// 给父元素安装一次监听函数
father.addEventListener('click', function(e) {
  // 识别是否是目标子元素
  if (e.target && e.target.tagName === 'A') {
    // 以下是监听函数的函数体
    e.preventDefault();
    alert(`我是${e.target.innerText}`);
  }
});
```

**虚拟代理：**

使用虚拟代理实现图片图片预加载

```js
class PreLoadImage {
  constructor(imgNode) {
    // 获取真实的DOM节点
    this.imgNode = imgNode;
  }

  // 操作img节点的src属性
  setSrc(imgUrl) {
    this.imgNode.src = imgUrl;
  }
}

class ProxyImage {
  // 占位图的url地址
  static LOADING_URL = 'xxxxxx';

  constructor(targetImage) {
    // 目标Image，即PreLoadImage实例
    this.targetImage = targetImage;
  }

  // 该方法主要操作虚拟Image，完成加载
  setSrc(targetUrl) {
    // 真实img节点初始化时展示的是一个占位图
    this.targetImage.setSrc(ProxyImage.LOADING_URL);
    // 创建一个帮我们加载图片的虚拟Image实例
    const virtualImage = new Image();
    // 监听目标图片加载的情况，完成时再将DOM上的真实img节点的src属性设置为目标图片的url
    virtualImage.onload = () => {
      this.targetImage.setSrc(targetUrl);
    };
    // 设置src属性，虚拟Image实例开始加载图片
    virtualImage.src = targetUrl;
  }
}
```

## 适配器

经典例子：axios

所有关于 http 模块、关于 xhr 的实现细节，全部被 Adapter 封装进了自己复杂的底层逻辑里，暴露给用户的都是十分简单的统一的东西——统一的接口，统一的入参，统一的出参，统一的规则。

## 组合模式

react hooks, react 中的高阶组件。

## 学习设计模式

- 应对面试中的设计模式相关问题
- 告别写被人吐槽的烂代码
- 提高复杂代码的设计和开发能力
- 让读源码、学框架事半功倍

## 资料

- [简单易懂的设计模式](https://mp.weixin.qq.com/s/KDIsqVzA2XotlLyhsy-K9w)
- [黄子毅 设计模式](https://github.com/ascoders/weekly/tree/master/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F)
