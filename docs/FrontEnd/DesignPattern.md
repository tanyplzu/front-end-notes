---
title: "设计模式"
sidebarDepth: 3
---

### 目录

[[toc]]

### 设计原则

- 单一职责原则（Single Responsibility Principle）
- 开放封闭原则（Opened Closed Principle）
- 里式替换原则（Liskov Substitution Principle）
- 接口隔离原则（Interface Segregation Principle）
- 依赖反转原则（Dependency Inversion Principle）

### 设计模式的分类

- 创建型模式，共五种：工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式。
- 结构型模式，共七种：适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式。
- 行为型模式，共十一种：策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模

### 工厂模式

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

### 单例模式

单例模式很常用，比如全局缓存、全局状态管理等等这些只需要一个对象，就可以使用单例模式。

```js
class SingleDog {
  show() {
    console.log('我是一个单例对象')
  }
  static getInstance() {
    // 判断是否已经new过1个实例
    if (!SingleDog.instance) {
      // 若这个唯一的实例不存在，那么先创建它
      SingleDog.instance = new SingleDog()
    }
    // 如果这个唯一的实例已经存在，则直接返回
    return SingleDog.instance
  }
}

const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()

s1 === s2 // true
```

闭包版

```js
SingleDog.getInstance = (function() {
    // 定义自由变量instance，模拟私有变量
    let instance = null
    return function() {
        // 判断自由变量是否为null
        if(!instance) {
            // 如果为null则new出唯一实例
            instance = new SingleDog()
        }
        return instance
    }
})()
```

应用Vuex

### 实现一个全局唯一的模态框？

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>modal</title>
  <style>
    #modal {
      position: fixed; height: 200px; width: 200px;
      line-height: 200px; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid #000; text-align: center;
    }
  </style>
</head>

<body>
  <button id='open'>打开模态框</button>
  <button id='close'>关闭模态框</button>
  <script>
    const Model = (function () {
      let box;
      return function () {
        if (!box) {
          box = document.createElement('div');
          box.innerHTML = '唯一';
          box.id = 'modal';
          box.style.display = 'none';
          document.body.appendChild(box);
        }
        return box;
      }
    })()
    document.getElementById('open').addEventListener('click', () => {
      const model = Model();
      model.style.display = 'block';
    })
    document.getElementById('close').addEventListener('click', () => {
      const model = Model();
      model.style.display = 'none';
    })
  </script>
</body>
</html>
```

### 观察者模式和发布订阅模式的区别？

- 如果发布者直接触及到订阅者，就可以说明是观察者模式；
- 如果发布者不直接触及到订阅者，而是由第三方来完成实际的通信操作，就叫做发布-订阅模式。
- 简单来说，它们就是解耦的程度不同，vue内的自定义事件的Event Emitter，发布者完全不用感知到订阅者，事件的注册和触发都发生在事件总线上，实现了完全的解耦。
- 而Dep和Watcher就是观察者模式，Dep直接add以及notify触发watcher的更新。



### 策略模式

>需求：
>
>prePrice - 处理预热价 
>onSalePrice - 处理大促价 
>backPrice - 处理返场价 
>freshPrice - 处理尝鲜价 
>askPrice - 分发询价逻辑

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
  return priceProcessor[tag](originPrice)
}
```

如果新加功能的话：

```js
priceProcessor.newUser = function (originPrice) {
  if (originPrice >= 100) {
    return originPrice - 50;
  }
  return originPrice;
}
```

### 迭代器模式

- ES6对迭代器的实现

ES6约定，任何数据结构只要具备Symbol.iterator属性（这个属性就是Iterator的具体实现，它本质上是当前数据结构默认的迭代器生成函数），就可以被遍历——准确地说，是被for...of...循环和迭代器的next方法遍历。 事实上，for...of...的背后正是对next方法的反复调用。

在ES6中，针对Array、Map、Set、String、TypedArray、函数的 arguments 对象、NodeList 对象这些原生的数据结构都可以通过for...of...进行遍历。原理都是一样的，此处我们拿最简单的数组进行举例，当我们用for...of...遍历数组时：

```js
const arr = [1, 2, 3]
const len = arr.length
for(item of arr) {
    console.log(`当前元素是${item}`)
}
```

```js
const arr = [1, 2, 3]
// 通过调用iterator，拿到迭代器对象
const iterator = arr[Symbol.iterator]()

// 对迭代器对象执行next，就能逐个访问集合的成员
iterator.next()
iterator.next()
iterator.next()
```

> 有迭代器属性的是有序集合，object 是无序的，没有迭代器属性；map 是有序列表

### 装饰器

ES7装饰器

- 类装饰器

```js
// 装饰器函数，它的第一个参数是目标类
function classDecorator(target) {
    target.hasDecorator = true
  	return target
}

// 将装饰器“安装”到Button类上
@classDecorator
class Button {
    // Button类的相关逻辑
}

// 验证装饰器是否生效
console.log('Button 是否被装饰了：', Button.hasDecorator) // true
```

为Button添加了静态属性

- 方法装饰器

```js
// 具体的参数意义，在下个小节，这里大家先感知一下操作
function funcDecorator(target, name, descriptor) {
    let originalMethod = descriptor.value
    descriptor.value = function() {
    console.log('我是Func的装饰器逻辑')
    return originalMethod.apply(this, arguments)
  }
  return descriptor
}

class Button {
    @funcDecorator
    onClick() { 
        console.log('我是Func的原有逻辑')
    }
}

// 验证装饰器是否生效
const button = new Button()
button.onClick()
```

第一个参数修饰的目标对象；第二个参数是属性名；第三个参数是该属性的描述对象。

> 装饰器不能用于函数

### 适配器

经典例子：axios

所有关于 http 模块、关于 xhr 的实现细节，全部被 Adapter 封装进了自己复杂的底层逻辑里，暴露给用户的都是十分简单的统一的东西——统一的接口，统一的入参，统一的出参，统一的规则。

### 学习设计模式

- 应对面试中的设计模式相关问题

- 告别写被人吐槽的烂代码

- 提高复杂代码的设计和开发能力

- 让读源码、学框架事半功倍