---
sidebarDepth: 1
---

# Vue 知识点

::: details 目录

[[toc]]

:::

## v-show 与 v-if 区别

`v-show` 只是 CSS 级别的 `display: none;` 和 `display: block;`，而 `v-if` 决定是否会渲染代码块的内容（或组件）。频繁操作时，使用 `v-show`，一次性渲染完的，使用 `v-if`。

因为当 `v-if="false"` 时，内部组件是不会渲染的，所以在特定条件才渲染部分组件（或内容）时，可以先将条件设置为 `false`，需要时（或异步，比如 \$nextTick）再设置为 `true`，这样可以优先渲染重要的其它内容，合理利用，可以进行性能优化。

> 项目中多 vue 的 tab 页使用 v-if 做了优化，避免了一次性请求所有接口

## 绑定 class 的数组用法

最常用的绑定 class 怎么写：

```vue
<template>
  <div :class="{ show: isShow }">内容</div>
</template>
<script>
export default {
  data() {
    return {
      isShow: true,
    }
  },
}
</script>
```

绑定 class 的对象用法能满足大部分业务需求，不过，在复杂的场景下，会用到**数组**，来看示例：

```vue
<template>
  <div :class="classes"></div>
</template>
<script>
export default {
  computed: {
    classes() {
      return [`${prefixCls}`, `${prefixCls}-${this.type}`]
    },
  },
}
</script>
```

## 计算属性和 watch 的区别

计算属性是自动监听依赖值的变化，从而动态返回内容，监听是一个过程，在监听的值变化时，可以触发一个回调，并做一些事情。

只是需要动态值，那就用计算属性；需要知道值的改变后执行业务逻辑，才用 watch，用反或混用虽然可行，但都是不正确的用法。

这个问题会延伸出几个问题：

- **computed 是一个对象时，它有哪些选项？**

有 get 和 set 两个选项

- **computed 和 methods 有什么区别？**

methods 是一个方法，它可以接受参数，而 computed 不能；computed 是可以缓存的，methods 不会；一般在 `v-for` 里，需要根据当前项动态绑定值时，只能用 methods 而不能用 computed，因为 computed 不能传参。

- **computed 是否能依赖其它组件的数据？**

computed 可以依赖其它 computed，甚至是其它组件的 data。

- **watch 是一个对象时，它有哪些选项？**
  - handler 执行的函数
  - deep 是否深度
  - immediate 是否立即执行

## 事件修饰符

**native**

在一个组件的根元素上直接监听一个原生事件。这时，你可以使用 v-on 的 .native 修饰符

**sync**

双向绑定。.sync 修饰符的 v-bind 不能和表达式一起使用

**exact**

.exact 是 Vue.js 2.5.0 新加的，它允许你控制由精确的系统修饰符组合触发的事件，比如：

```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```

其它的事件修饰符：

- `.stop`
- `.prevent`
- `.capture`
- `.self`

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

而且，事件修饰符在连用时，是有先后顺序的。

## 组件中 data 为什么是函数

用函数是为了 return 出一个新的对象，如果 return 出一个对象的应用，还是没用的。

组件复用时所有组件实例都会共享 `data`，如果 `data` 是对象的话，就会造成一个组件修改 `data` 以后会影响到其他所有组件，所以需要将 `data` 写成函数，每次用到就调用一次函数获得新的数据。

当我们使用 `new Vue()` 的方式的时候，无论我们将 `data` 设置为对象还是函数都是可以的，因为 `new Vue()` 的方式是生成一个根组件，该组件不会复用，也就不存在共享 `data` 的情况了。

## keep-alive 的理解

简单说，就是把一个组件的编译缓存起来。 [Vue.js 的文档](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#在动态组件上使用-keep-alive)。

## v-model 是怎样实现的

```vue
<template>
  <div>
    {{ currentValue }}
    <button @click="handleClick">Click</button>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentValue: this.value,
    }
  },
  methods: {
    handleClick() {
      this.currentValue += 1
      this.$emit('input', this.currentValue)
    },
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
  },
}
</script>
```

这个组件中，只有一个 props，但是名字叫 `value`，内部还有一个 `currentValue`，当改变 currentValue 时，会触发一个自定义事件 `@input`，并把 currentValue 的值返回。这就是一个 `v-model` 的语法糖，它要求 props 有一个叫 `value` 的项，同时触发的自定义事件必须叫 `input`。这样就可以在自定义组件上用 `v-model` 了：

```vue
<custom-component v-model="value"></custom-component>
```

如果你能说到 `model` 选项，绝对是加分的。

## Vuex 中 mutations 和 actions 的区别

主要的区别是，actions 可以执行异步。actions 是调用 mutations，而 mutations 来修改 store。

## Render 函数

- 什么是 Render 函数，它的使用场景是什么。
- createElement 是什么？
- Render 函数有哪些常用的参数？

说到 Render 函数，就要说到虚拟 DOM（Virtual DOM）,Virtual DOM 并不是真正意义上的 DOM，而是一个轻量级的 JavaScript 对象，在状态发生变化时，Virtual DOM 会进行 Diff 运算，来更新只需要被替换的 DOM，而不是全部重绘。

它的使用场景，就是完全发挥 JavaScript 的编程能力，有时需要结合 JSX 来使用。

createElement 是 Render 函数的核心，它构成了 Vue Virtual DOM 的模板，它有 3 个参数：

```js
createElement () {
  // {String | Object | Function}
  // 一个 HTML 标签，组件选项，或一个函数
  // 必须 return 上述其中一个
  'div',
    // {Object}
    // 一个对应属性的数据对象，可选
    // 您可以在 template 中使用
    {
    // 详细的属性
  },
    // {String | Array}
    // 子节点（VNodes），可选
    [
    createElement('h1', 'hello world'),
    createElement(MyComponent, {
      props: {
        someProps: 'foo'
      }
    }),
    'bar'
  ]
}
```

常用的参数，主要是指上面第二个参数里的值了，这个比较多，得去看 Vue.js 的文档。

## 怎样理解单向数据流

这个概念出现在组件通信。父组件是通过 prop 把数据传递到子组件的，但是这个 prop 只能由父组件修改，子组件不能修改，否则会报错。子组件想修改时，只能通过 `$emit` 派发一个自定义事件，父组件接收到后，由父组件修改。

一般来说，对于子组件想要更改父组件状态的场景，可以有两种方案：

**1. 在子组件的 data 中拷贝一份 prop，data 是可以修改的，但 prop 不能：**

```js
export default {
  props: {
    value: String,
  },
  data() {
    return {
      currentValue: this.value,
    }
  },
}
```

**2. 如果是对 prop 值的转换，可以使用计算属性：**

```js
export default {
  props: ['size'],
  computed: {
    normalizedSize: function() {
      return this.size.trim().toLowerCase()
    },
  },
}
```

如果你能提到 v-model 实现数据的双向绑定、.sync 用法，会大大加分的，这些在第 16 节已经详细介绍过。

## 组件间通信

**1. 父子通信：**

- 父向子传递数据是通过 props，子向父是通过 events（\$emit）；
- 通过父链 / 子链也可以通信（$parent / \$children）；
- `ref` 也可以访问组件实例；
- provide / inject API。

**2. 兄弟通信：**

Bus；Vuex；

**3. 跨级通信：**

Bus；Vuex；provide / inject API；attrs。

## 路由的跳转方式

一般有两种：

1. 通过，router-link 标签会渲染为 `` 标签，在 template 中的跳转都是用这种；
2. 另一种是编程式导航，也就是通过 JS 跳转，比如 `router.push('/home')`。

## MVVM 与 MVC

MVVM 模式是由经典的软件架构 MVC 衍生来的。当 View（视图层）变化时，会自动更新到 ViewModel（视图模型），反之亦然。View 和 ViewModel 之间通过双向绑定（data-binding）建立联系。与 MVC 不同的是，它没有 Controller 层，而是演变为 ViewModel。

ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作是由 Vue.js 完成的，我们不需要手动操作 DOM，只需要维护好数据状态。

## vue 有几种构建版本

1. 有生成版本和开发版本的区分；
2. 完整版和运行时版本的区分，完整版包含编译器（用于生成渲染函数）；
3. 构建环境的区分，支持 UMD(AMD 和 commonjs)、commonjs、ES Module(用于构建工具的)、ES Module(用于浏览器的)

## Vue.config 全局配置 API

performance：我们可以使用它来进行网页性能的追踪，配置如下：

```js
if (process.env.NODE_ENV !== 'production') {
  Vue.config.performance = true
}
```

开启后我们可以下载 Vue Performance Devtool 这一 chrome 插件来看查看各个组件的加载情况

从中我们可以清晰的看到页面组件在每个阶段的耗时情况，而针对耗时比较久的组件，我们便可以对其进行相应优化。

errorHandler ：在浏览器异常捕获的方法上，我们熟知的一般有：`try ... catch` 和 `window.onerror`，这也是原生 JavaScript 提供给我们处理异常的方式。但是在 Vue 2.x 中如果你一如既往的想使用 window.onerror 来捕获异常，那么其实你是捕获不到的，因为异常信息被框架自身的异常机制捕获了，你可以使用 `errorHandler` 来进行异常信息的获取：

```js
Vue.config.errorHandler = function(err, vm, info) {
  let {
    message, // 异常信息
    name, // 异常名称
    stack, // 异常堆栈信息
  } = err
  // vm 为抛出异常的 Vue 实例
  // info 为 Vue 特定的错误信息，比如错误所在的生命周期钩子
}
```

## 生命周期

[Vue.js 生命周期](https://cn.vuejs.org/v2/api/#选项-生命周期钩子) 主要有 8 个阶段：

- 创建前 / 后（beforeCreate / created）：在 beforeCreate 阶段，Vue 实例的挂载元素 el 和数据对象 data 都为 undefined，还未初始化。在 created 阶段，Vue 实例的数据对象 data 有了，el 还没有。
- 载入前 / 后（beforeMount / mounted）：在 beforeMount 阶段，Vue 实例的 \$el 和 data 都初始化了，但还是挂载之前为虚拟的 DOM 节点，data 尚未替换。在 mounted 阶段，Vue 实例挂载完成，data 成功渲染。
- 更新前 / 后（beforeUpdate / updated）：当 data 变化时，会触发 beforeUpdate 和 updated 方法。这两个不常用，且不推荐使用。
- 销毁前 / 后（beforeDestroy / destroyed）：beforeDestroy 是在 Vue 实例销毁前触发，一般在这里要通过 removeEventListener 解除手动绑定的事件。实例销毁后，触发 destroyed。
- 另外还有 keep-alive 独有的生命周期，分别为 activated 和 deactivated 。用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 actived 钩子函数。

**如果有父子组件，创建阶段是由外到内，渲染阶段是由内到外的；updated、destroyed 和 mounted 是一样的。**

## Virtual Dom 的优势在哪里

「Virtual Dom 的优势」其实这道题目面试官更想听到的答案不是上来就说「直接操作 / 频繁操作 DOM 的性能差」，如果 DOM 操作的性能如此不堪，那么 jQuery 也不至于活到今天。所以面试官更想听到 VDOM 想解决的问题以及为什么频繁的 DOM 操作会性能差。

首先我们需要知道： DOM 引擎、JS 引擎 相互独立，但又工作在同一线程（主线程） JS 代码调用 DOM API 必须 挂起 JS 引擎、转换传入参数数据、激活 DOM 引擎，DOM 重绘后再转换可能有的返回值，最后激活 JS 引擎并继续执行若有频繁的 DOM API 调用，且浏览器厂商不做“批量处理”优化，引擎间切换的单位代价将迅速积累若其中有强制重绘的 DOM API 调用，重新计算布局、重新绘制图像会引起更大的性能消耗。其次是 VDOM 和真实 DOM 的区别和优化：

- 虚拟 DOM 不会立马进行排版与重绘操作
- 虚拟 DOM 进行频繁修改，然后一次性比较并修改真实 DOM 中需要改的部分，最后在真实 DOM 中进行排版与重绘，减少过多 DOM 节点排版与重绘损耗
- 虚拟 DOM 有效降低大面积真实 DOM 的重绘与排版，因为最终与真实 DOM 比较差异，可以只渲染局部

## 操作虚拟 dom 和 dom 哪个更快

以下是根据尤大在知乎的回答，做的总结：

1. 首先是没有任何一个框架可以比纯手动优化操作 dom 快，因为框架的 dom 操作层需要应对上层 API 可能发生的操作，所以它的实现是普适性的，所以不可能对每个场景做优化，这就是个性能和可维护性的取舍。各大框架可以给到即使不需要手动优化，也可以提供较优秀的性能。
2. 我们看看两者的重绘性能消耗：

- innerHTML: render html string O(template size) + 重新创建所有 DOM 元素 O(DOM size)
- Virtual DOM: render Virtual DOM + diff O(template size) + 必要的 DOM 更新 O(DOM change) render Virtual DOM + diff O 显然比渲染 html string 要慢，但我们知道，这是纯 js 层面的计算相比， 与 DOM 层面的操作的开销相比要小很多。 所以直接操作 dom 的开销就和整个页面相关，而虚拟 dom 的开销就是 js 层面的计算和计算后的 dom 的开销，所以虚拟 dom 就可以保证，不管页面数据变化多少，每次计算后的重绘的性能都在可接受范围内。

1. 因为机制不一样，那么比较的时候就要看场合，比如是大量数据的更新还是小量数据的更新。举个例子，如果一个非常大的列表，数据全都发生了变化，那么直接操作 dom 肯定是更快的，那如果只是其中的几行发生了变化，直接全量替换 dom 的开销可就大了，而虚拟 dom 在计算后，只需要替换个别 dom 即可
2. 虚拟 dom 提供给开发者的价值不是性能，而是 1. 为函数式的 UI 编程打开大门 2. 扩展性强，可以渲染到 DOM 意外的其他平台
3. 那如果开发中遇到特殊的情况导致虚拟 dom 的更新效率不满足，那么可以牺牲一定的维护性来自己手动进行优化

参考文档： [www.zhihu.com/question/31…](https://www.zhihu.com/question/31809713/answer/53544875)
