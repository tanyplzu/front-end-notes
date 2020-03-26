# Vue 的运行过程

Vue 的启动流程图

![运行机制](./imgs/vue_run.png)

[[toc]]

## 概述

每一个组件都是 vue.component 的实例；

render() 时会生成 vnode，render() 执行时，主要在执行 createElement() 方法。

update 会将 vnode 生成 Dom，update 的核心是_pach 方法。

$mount 会将生成的 dom 挂载到 el 下。启动时挂载，还可以自己手动挂载。

自从有了 VNode ，开发页面的方式就变成了书写 VNode

## 解析（Parse）

```html
<ul :class="bindCls" class="list" v-if="isShow">
    <li v-for="(item,index) in data" @click="clickItem(index)">{{item}}:{{index}}</li>
</ul>
```

解析之后

```js
ast = {
  'type': 1,
  'tag': 'ul',
  'attrsList': [],
  'attrsMap': {
    ':class': 'bindCls',
    'class': 'list',
    'v-if': 'isShow'
  },
  'if': 'isShow',
  'ifConditions': [{
    'exp': 'isShow',
    'block': // ul ast element
  }],
  'parent': undefined,
  'plain': false,
  'staticClass': 'list',
  'classBinding': 'bindCls',
  'children': [{
    'type': 1,
    'tag': 'li',
    'attrsList': [{
      'name': '@click',
      'value': 'clickItem(index)'
    }],
    'attrsMap': {
      '@click': 'clickItem(index)',
      'v-for': '(item,index) in data'
     },
    'parent': // ul ast element
    'plain': false,
    'events': {
      'click': {
        'value': 'clickItem(index)'
      }
    },
    'hasBindings': true,
    'for': 'data',
    'alias': 'item',
    'iterator1': 'index',
    'children': [
      'type': 2,
      'expression': '_s(item)+":"+_s(index)'
      'text': '{{item}}:{{index}}',
      'tokens': [
        {'@binding':'item'},
        ':',
        {'@binding':'index'}
      ]
    ]
  }]
}
```

## 优化语法树（Optimize）

```js
optimize(ast, options)
```

此阶段会深度遍历生成的 AST 树，检测它的每一颗子树是不是静态节点，如果是静态节点则它们生成 DOM 永远不需要改变，这对运行时对模板的更新起到极大的优化作用。

遍历过程中，会对整个 AST 树中的每一个 AST 元素节点标记 static 和 staticRoot（递归该节点的所有 children，一旦子节点有不是 static 的情况，则为 false，否则为 true）。

## 生成代码 (generate)

```js
const code = generate(ast, options)
```

通过 generate 方法，将 ast 生成 render function：

```js
with(this){
  return (isShow) ?
    _c('ul', {
        staticClass: "list",
        class: bindCls
      },
      _l((data), function(item, index) {
        return _c('li', {
          on: {
            "click": function($event) {
              clickItem(index)
            }
          }
        },
        [_v(_s(item) + ":" + _s(index))])
      })
    ) : _e()
}
```

说明：

- `_c`  对应的是 `createElement`
- 可以使用 `vue-template-compiler` 编译成 render function

```js
const compiler = require('vue-template-compiler')
const template = `<p>{{message}}</p>`
const res = compiler.compile(template)
console.log(res.render)
// with(this){return createElement('p',[createTextVNode(toString(message))])}
```

> Webpack 下用 vue-load 编译；

## render

render 方法是实例的一个私有方法，它用来把实例渲染成一个虚拟 Node。

在 Vue 的官方文档中介绍了 `render` 函数的第一个参数是 `createElement`。

```vue
<h1>{{ blogTitle }}</h1>
```

相当于我们编写如下 `render` 函数：

```js
render: function (createElement) {
  return createElement('h1', this.blogTitle)
}
```

## VNode

render function 会被转化成 VNode 节点。Virtual DOM 其实就是一棵以 JavaScript 对象（VNode 节点）作为基础的树，用对象属性来描述节点，实际上它只是一层对真实 DOM 的抽象。

createElement 根据 tag 的不同，会创建不同的 VNode。

![vnode-types](./imgs/vnode-types.png)

创建不同的 VNode，对应的方法也不一样。

先看 vnode

```js
class VNode {
    constructor (tag, data, children, text, elm) {
        /*当前节点的标签名*/
        this.tag = tag;
        /*当前节点的一些数据信息，比如props、attrs等数据*/
        this.data = data;
        /*当前节点的子节点，是一个数组*/
        this.children = children;
        /*当前节点的文本*/
        this.text = text;
        /*当前虚拟节点对应的真实dom节点*/
        this.elm = elm;
    }
}
```

比如我目前有这么一个 Vue 组件。

```vue
<template>
  <span class="demo" v-show="isShow">
    This is a span.
  </span>
</template>
```

下面是转换成 VNode 以后的情况。

```js
{
    tag: 'span',
    data: {
        /* 指令集合数组 */
        directives: [
            {
                /* v-show指令 */
                rawName: 'v-show',
                expression: 'isShow',
                name: 'show',
                value: true
            }
        ],
        /* 静态class */
        staticClass: 'demo'
    },
    text: undefined,
    children: [
        /* 子节点是一个文本VNode节点 */
        {
            tag: undefined,
            data: undefined,
            text: 'This is a span.',
            children: undefined
        }
    ]
}
```

## update

Vue 的 `_update` 是实例的一个私有方法，它被调用的时机有 2 个，一个是首次渲染，一个是数据更新的时候。update 其实调用的是 patch 方法。

```js{12,15}
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  const vm: Component = this
  const prevEl = vm.$el
  const prevVnode = vm._vnode
  const prevActiveInstance = activeInstance
  activeInstance = vm
  vm._vnode = vnode
  // Vue.prototype.__patch__ is injected in entry points
  // based on the rendering backend used.
  if (!prevVnode) {
    // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode)
  }
	activeInstance = prevActiveInstance
  // update __vue__ reference
  if (prevEl) {
    prevEl.__vue__ = null
  }
  if (vm.$el) {
    vm.$el.__vue__ = vm
  }
  // if parent is an HOC, update its $el as well
  if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
    vm.$parent.$el = vm.$el
  }
  // updated hook is called by the scheduler to ensure that children are
  // updated in a parent's updated hook.
}
```

### patchVnode

![vnode-types](./imgs/flags-mount.png)

### updateChildren

diff 算法就在 updateChildren 阶段

![vnode-types](./imgs/flags-patch.png)
