## vue 组件通信
####  父子组件传值

1.通过props和$emit传值；	

2.使用$attrs，父作用域中不作为 prop 被识别 (且获取) 的特性绑定 。使用 `v-bind="$attrs"` 绑定，使用`this.$attrs` 获取。

3.使用 ref，用`this.$refs`访问，直接获取子组件下data中的值。

还有一些小众的传值方式，将父组件的方法直接传给子组件。在子组件中直接使用父组件的方法。

#### 兄弟组件传值

4.兄弟组件中通信，自定义事件。$emit其实是一种自定义事件的方式。$emit在当前组件使用较多，用来将组件的值传递给父组件。如果使用vue实例上的自定义组件，就可以实现兄弟组件之间的传参。并且使用$emit， $on， $off 分别来分发、监听、取消监听事件，这种写法就是eventBus的写法。

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

（3）需要一个vue实例，vue实例可以有export default 导出，也可以将vue实例挂在到根节点的data下面。如果放data中，可以使用this.$root获取到。

```js
import Vue from 'vue'
export default new Vue()
```

下面是eventBus的写法。

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

（4）解绑，不用的自定义事件要及时销毁，否则可能造成内存泄露，因为它是绑在vue实例下的。`beforeDestroy ()`

```js
beforeDestroy() {
	event.$off('onAddTitle', this.addTitleHandler)
}
```

5.使用 Vuex 和 eventBus，eventBus的写法类似于上面自定义事件的写法。使用 Vuex，一般是用户的登录信息维护、通知信息维护等全局的状态和数据。

- [Vue 组件通信之 Bus](https://juejin.im/post/5a4353766fb9a044fb080927)

6.将全局性的状态放在this.$root下面，this.$root可以取到根组件中的数据。此外，可以在更组件的data下new一个Vue，在改属性下可以自定义事件。

7.`provide / inject`，这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。如果你熟悉 React，这与 React 的上下文特性很相似。

文档中要求：

> provide 和 inject 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中。

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

类似于AngularJS中的服务。用注入的形式维护全局状态。