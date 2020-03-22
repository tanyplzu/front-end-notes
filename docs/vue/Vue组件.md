---
title: "vue 知识点"
---

## 组件

```js
const compoent = {
  props: { // 组件可配置的行为
    active: {
      // type: Boolean,
      // required: true,
      validator (value) {
        return typeof value === 'boolean'
      }
    },
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  // data一定是一个function使用return形成一个闭包,这样每个组件中的数据是独立的。
  data () {
    return {
      text: 0
    }
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
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
    CompOne: compoent
  }
})
```

不推荐在子组件中修改`props`
修改组件中`props`的方法

其实.vue文件是Vue局部组件的形式。`vue-loader` 会解析文件，提取每个语言块，如有必要会通过其它 loader 处理，最后将他们组装成一个 ES Module，它的默认导出是一个 Vue.js 组件选项的对象。都是JS。
