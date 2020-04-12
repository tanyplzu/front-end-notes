---
sidebarDepth: 1
---

# 组件进阶

## VUE 中的组件

```js
const compoent = {
  props: {},
  template: `<div></div>`,
  data() {},
  methods: {},
}
```

全局组件

```js
Vue.component('CompOne', compoent)
```

局部组件

```js
new Vue({
  components: {
    CompOne: compoent,
  },
})
```

不推荐在子组件中修改`props` 修改组件中`props`的方法

其实。vue 文件是 Vue 局部组件的形式。`vue-loader` 会解析文件，提取每个语言块，如有必要会通过其它 loader 处理，最后将他们组装成一个 ES Module，它的默认导出是一个 Vue.js 组件选项的对象。都是 JS。

## 组件组成

一个再复杂的组件，都是由三部分组成的：prop、event、slot，它们构成了 Vue.js 组件的 API。

- prop 定义了这个组件有哪些可配置的属性，组件的核心功能也都是它来确定的。
- slot 当需要多个插槽时，会用到具名 slot
- event 组件里面通过 \$emit，就可以触发自定义的事件。

直接在父级声明，用事件修饰符 .native。

## 组件的通信

开发独立组件一般不使用 Vuex 和 Bus 的解决方案

- ref：给元素或组件注册引用信息；
- $parent / $children：访问父 / 子实例。

::: tip

在组件开发中，最难的环节应当是解耦组件的交互逻辑，尽量把复杂的逻辑分发到不同的子组件中，然后彼此建立联系，在这其中，计算属性（computed）和混合（mixins）是两个重要的技术点，合理利用，就能发挥出 Vue.js 语言的最大特点：把状态（数据）的维护交给 Vue.js 处理，我们只专注在交互上。Vue.js 组件开发，玩到最后还是在拼 JavaScript 功底。

:::

## 函数式组件

函数式组件：没有状态 (data)，没有生命周期，只接受传递的 props , 常用于纯 UI 组件定义：通过 Vue.component 构建组件时，添加 functional: true; 需要通过调用 render 函数来渲染，常用包裹组建或者构建高阶组件对于单文件组件，在 template 上添加 functional `<template functional>`

## `$Alert` 组件

期望的调用方式

```js
methods: {
  handleShow () {
    this.$Alert({
      content: '这是一条提示信息',
      duration: 3
    })
  }
}
```

设计思路：

Alert.vue 的最外层是有一个 .alert 节点的，它会在第一次调用 \$Alert 时，在 body 下创建，因为不在 `<router-view>` 内，它不受路由的影响，也就是说一经创建，除非刷新页面，这个节点是不会消失的，所以在 alert.vue 的设计中，并没有主动销毁这个组件，而是维护了一个子节点数组 notices。

.alert 节点是 position: fixed 固定的，因此要合理设计它的 z-index，否则可能被其它节点遮挡。

notification.js 和 alert.vue 是可以复用的，如果还要开发其它同类的组件，比如二次确认组件 \$Confirm, 只需要再写一个入口 confirm.js，并将 alert.vue 进一步封装，将 notices 数组的循环体写为一个新的组件，通过配置来决定是渲染 Alert 还是 Confirm，这在可维护性上是友好的。

在 notification.js 的 new Vue 时，使用了 Render 函数来渲染 alert.vue，这是因为使用 template 在 runtime 的 Vue.js 版本下是会报错的。

本例的 content 只能是字符串，如果要显示自定义的内容，除了用 v-html 指令，也能用 Functional Render
