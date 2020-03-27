---
sidebarDepth: 2
---

# Vue 组件通信

[[toc]]

## 父子组件传值

1. 通过 `props` 和 `$emit` 传值；
2. 使用 `$attrs`，父作用域中不作为 prop 识别 （且获取） 的特性绑定 。使用 `v-bind="$attrs"` 绑定，使用`this.$attrs` 获取。
3. 使用 ref，用 `this.$refs` 访问，直接获取子组件下 data 中的值。
4. 还有一些小众的传值方式，将父组件的方法直接传给子组件。在子组件中直接使用父组件的方法。

## 兄弟组件传值

1. 兄弟组件中通信，自定义事件。

`$emit` 其实是一种自定义事件的方式。`$emit` 在当前组件使用较多，用来将组件的值传递给父组件。如果使用 vue 实例上的自定义组件，就可以实现兄弟组件之间的传参。并且使用`$emit`、`$on`、`$off` 分别来分发、监听、取消监听事件，这种写法就是 eventBus 的写法。

（1）绑定自定义事件：

````js
mounted() {
  // 绑定自定义事件
  event.$on('onAddTitle', this.addTitleHandler)
},
````

（2）调用自定义事件：

```js
event.$emit('onAddTitle', this.title)
```

（3）需要一个 vue 实例，vue 实例可以有 export default 导出，也可以将 vue 实例挂在到根节点的 data 下面。如果放 data 中，可以使用`this.$root`获取到。

```js
import Vue from 'vue'
export default new Vue()
```

下面是 eventBus 的写法。

```js
var eventBus = {
    install(Vue,options) {
        Vue.prototype.$bus = vue
    }
};
Vue.use(eventBus);
// 可以这样使用
this.$bus.$emit('todoSth', params);
```

（4）解绑，不用的自定义事件要及时销毁，否则可能造成内存泄露，因为它是绑在 vue 实例下的。`beforeDestroy ()`

```js
beforeDestroy() {
	event.$off('onAddTitle', this.addTitleHandler)
}
```

2. 使用 Vuex 和 eventBus，eventBus 的写法类似于上面自定义事件的写法。

使用 Vuex，一般是用户的登录信息维护、通知信息维护等全局的状态和数据。

- [Vue 组件通信之 Bus](https://juejin.im/post/5a4353766fb9a044fb080927)

3. 将全局性的状态放在 this.$root 下面，this.$root 可以取到根组件中的数据。此外，可以在更组件的 data 下 new 一个 Vue，在改属性下可以自定义事件。

4. `provide / inject`，这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。如果你熟悉 React，这与 React 的上下文特性很相似。

文档中要求：

> provide 和 inject 主要为高阶插件 / 组件库提供用例。并不推荐直接用于应用程序代码中。

一个例子：

```js
// A.vue
export default {
  provide: {
    name: 'Aresn'
  }
}

// B.vue
export default {
  inject: ['name'],
  mounted () {
    console.log(this.name);  // Aresn
  }
}
```

> provide 和 inject 绑定并**不是可响应**的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。

类似于 AngularJS 中的服务。用注入的形式维护全局状态。
