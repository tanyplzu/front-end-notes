# Vue 虚拟 DOM 及渲染流程

Virtual Dom 是 Vue2.0 开始引入的，也是 Vue 的核心之一。Virtual Dom 其实就是使用 Javascript 对象来模拟真实 DOM 结构的树形结构。在 Vue 里面，用 VNode 来描述具体的节点信息，Virtual Dom 其实就是由 Vue 组件树建立起来的整个 VNode 树的称呼。由于 VNode 只是用来映射到真实 DOM 的渲染，不需要包含操作 DOM 的方法，因此它是非常轻量和简单的。最后渲染的时候会根据 VNode 来渲染成真实的 DOM。（其 vdom 是基于 snabbdom 库所做的修改[https://github.com/snabbdom/snabbdom](https://github.com/snabbdom/snabbdom)）

## VNode

VNode 其实是对真实 DOM 的一种抽象描述，它的核心包括标签名、数据、子节点、键值等等，还有一些其他属性是用来扩展 Vue 特殊功能的

下面是 Vnode 的结构：

```ts
{
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  devtoolsMeta: ?Object; // used to store functional render context for devtools
  fnScopeId: ?string; // functional scope id support
}
```

## VNode 生成及渲染流程

### VNode 的生成

生成 VNode 的方法是 **render()** 函数。在`render`函数之前，templete 会经过三步处理，`parse`、`optimize`、`generate`。`optimize`是优化的过程，主要执行两个方法进行优化，分别是标注静态节点（`markStatic`）和静态根节点（`markStaticRoots`），如果是静态的，在之后`patch`的时候会直接跳比对。`generate`会根据 AST 树的一些参数生成对应`render`函数。

这个方法会根据当前的 Vue 实例生成对应的 VNode。该方法有两种形式：

一种是在 new Vue 实例的时候传入 render() 方法；

```js
new Vue({
  el: '#app',
  router,
  components: { App },
  render(createElement) {
    return createElement('div', ['div']);
  }
});
```

另一种是 compiler 会根据传入的 template 自动生成

```vue
<template>
  <div class="box">
    <p>...</p>
  </div>
</template>
<script>
// ...
</script>
```

或者是

```vue
<script>
export default {
  template: `
    <div>...</div>
  `
};
</script>
```

需要注意的是，这两种方式是有优先级的：el < template < render。只有 el 的时候，会直接渲染 el 里面的内容，只有 template 或者只有 render 是不行的，Vue 并不知道要把结果渲染在什么地方，需要配合 el 或者 手动挂载（\$mount）时指定位置。如果 el 中有内容，但又存在 template 或者 render 的时候，会按优先级进行覆盖。（在 Vue 的单文件组件下，会优先判断有没有 `<template>` 标签，如果有会选择优先编译 `<template>` 生成 `render` 函数。）

从上面的`render`函数可以看出来，`render` 函数的的核心是 `createElement()`，它是真正创建 VNode 的函数。`createElement`有两个重点的流程是**children 的规范化**和**VNode 的创建**。

`createElement`方法参数： [https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0)

如果使用 `render` 函数代替 `template` 的话，看起来是很不直观的，在 Vue 中，我们可以通过 `babel-plugin-transform-vue-jsx` 插件，在`.babelrc`中加入配置即可使渲染函数可以支持 JSX 语法。

### update

`update` 方法的作用是把 VNode 渲染成真实的 DOM，它会在首次渲染和响应式数据发生变化的时候被调用。`update`方法的核心其实调用的是`vm.__patch__`。这个方法会根据平台的不同，部分处理方法也不同，但主要逻辑部分是相同的

`patch`的过程，是对新旧 VNode 进行分析比对的过程，在`patch`完成后，新的 VNode 上会对应生成 elm，也就是真实的 DOM，并且是已经挂载到父节点下的 DOM。在整个 patch 过程中，因为节点变化很少是跨层次的，Vue 用的是同级比较的方法，这样的比对方式，可以很好的提高比对效率。

`patch`的过程只要分为三种情况：

1. 如果不存在 oldVnode，直接通过`createElm`创建新节点。
2. 存在 oldVnode 和 vnode，但是是相似节点，进行`patchVnode`。
3. 存在 oldVnode 和 vnode，不是相似节点，通过`createElm`创建新节点。

相似节点的判断如下：

```js
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    ((a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)) ||
      (isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)))
  );
}
```

## patchVnode

`patchVnode`在比较两个节点时候，大致把 VNode 分为 3 类：普通文本 VNode，存在 children 的 VNode，不存在 children 的 VNode。多种 if else 情况用表格总结为：

```html
<table>
  <tr>
    <th></th>
    <th>oldVnode.text</th>
    <th>oldVnode.ch</th>
    <th>!oldVnode.ch</th>
  </tr>
  <tr>
    <th>vnode.text</th>
    <th>setTextContent</th>
    <th>setTextContent</th>
    <th>setTextContent</th>
  </tr>
  <tr>
    <th>vnode.ch</th>
    <th>addVnodes</th>
    <th>updateChildren</th>
    <th>addVnodes</th>
  </tr>
  <tr>
    <th>!vnode.ch</th>
    <th>setTextContent</th>
    <th>removeVnodes</th>
    <th>setTextContent</th>
  </tr>
</table>
```

## updateChildren

在对新、旧 VNode 节点进行 `patchVnode` 的时候，如果两个节点都有子节点，并且不相似的时候，就调用 `updateChildren` 来对比子节点。因为`createElement`在 children 规范时会把子节点处理成数组类型，所以这里相当于是同层级的两个 VNode 的列表进行分析比较。比较原则为，对新旧两个节点分别头和头、尾和尾、头和尾、尾和头这样交叉比较，如果都不满足，再判断此时对比的两个节点是否有相同的 key，根据不同的情况进行不同操作。

比较开始前，会初始化一些数据：

1. oldStartIdx： 开始指针，指向 oldCh 中待处理部分的头部，对应的 vnode 也就是 oldStartVnode。
2. oldEndIdx： 结束指针，指向 oldCh 中待处理部分的尾部，对应的 vnode 也就是 oldEndVnode。
3. newStartIdx： 开始指针，指向 ch 中待处理部分的头部，对应的 vnode 也就是 newStartVnode。
4. newEndIdx： 结束指针，指向 ch 中待处理部分的尾部，对应的 vnode 也就是 newEndVnode。
5. oldKeyToIdx： 存放 key 值的 map，比如我们在 v-for 里面定义的 key。

因为子节点是数组类型，所以需要循环更新，在比较的过程中，指针位置会往中间靠，循环结束的条件是：

oldStartIdx > oldEndIdx || newStartIdx > newEndIdx

## 项目中渲染相关的问题

### 列表渲染 key 的问题

在用 v-for 渲染的元素列表时，Vue 默认采用“就地更新”的策略，不用过多的操作节点位置，只更改它们的内容，这样可以很好的提高效率，但是**只适用于不依赖子组件状态或临时 DOM 状态 （例如：表单输入值） 的列表渲染输出。**为了保证数据的正确性，需要为每项提供一个唯一 key（用 index 做 key 和不加 key 效果相同）

### v-if 和 v-for 一起使用的问题

有些时候，需要在列表渲染的时候按条件显示数据。例如

```html
<ul>
  <li v-for="user in users" v-if="!user.disabled" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

从性能上来讲，这样其实是不太好的，当数据发生变化的需要重新渲染的时候，也会遍历整个列表。但是如果把`users`通过一个计算属性返回，这样会显得更高效。这样每次重新渲染的时候只用遍历当前计算属性中的数据就可以了。
