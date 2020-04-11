# 组件进阶

## 普通组件

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
