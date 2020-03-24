## Vue 虚拟DOM及渲染流程 ##

Virtual Dom是Vue2.0开始引入的，也是Vue的核心之一。Virtual Dom其实就是使用Javascript对象来模拟真实DOM结构的树形结构。在Vue里面，用VNode来描述具体的节点信息，Virtual Dom其实就是由Vue组件树建立起来的整个VNode树的称呼。由于VNode只是用来映射到真实DOM的渲染，不需要包含操作DOM的方法，因此它是非常轻量和简单的。最后渲染的时候会根据VNode来渲染成真实的DOM。（其vdom是基于snabbdom库所做的修改[https://github.com/snabbdom/snabbdom](https://github.com/snabbdom/snabbdom)）

### VNode ###
VNode其实是对真实DOM的一种抽象描述，它的核心包括标签名、数据、子节点、键值等等，还有一些其他属性是用来扩展Vue特殊功能的

下面是Vnode的结构：

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

### VNode 生成及渲染流程 ###

![](file:///C:/Users/Administrator/Desktop/%E5%93%8D%E5%BA%94%E5%BC%8F/img/liuchengtu.png)

#### VNode的生成 ####

生成 VNode 的方法是 **render()** 函数。在`render`函数之前，templete会经过三步处理，`parse`、`optimize`、`generate`。`optimize`是优化的过程，主要执行两个方法进行优化，分别是标注静态节点（`markStatic`）和静态根节点（`markStaticRoots`），如果是静态的，在之后`patch`的时候会直接跳比对。`generate`会根据AST树的一些参数生成对应`render`函数。

这个方法会根据当前的 Vue 实例生成对应的 VNode。该方法有两种形式：

一种是在new Vue 实例的时候传入 render() 方法；

    new Vue({
	  el: '#app',
	  router,
	  components: { App },
	  render(createElement) {
	    return createElement('div', [
	      'div'
	    ])
	  },
	})

另一种是compiler 会根据传入的 template 自动生成

    <template>
	    <div class="box">
	      <p>...</p>
	    </div>
	</template>
	<script>
	 // ...
	</script>

或者是

	<script>
	  export default {
		template: `
		  <div>...</div>
		`
	  }
	</script>

需要注意的是，这两种方式是有优先级的：el < template < render。只有 el 的时候，会直接渲染 el 里面的内容，只有 template 或者只有 render 是不行的，Vue并不知道要把结果渲染在什么地方，需要配合 el 或者 手动挂载（$mount）时指定位置。如果 el 中有内容，但又存在 template 或者 render 的时候，会按优先级进行覆盖。（在 Vue 的单文件组件下，会优先判断有没有 `<template>` 标签，如果有会选择优先编译 `<template>` 生成  	`render` 函数。）

从上面的`render`函数可以看出来，`render` 函数的的核心是 `createElement()`，它是真正创建 VNode 的函数。`createElement`有两个重点的流程是**children 的规范化**和**VNode 的创建**。

`createElement`方法参数：
[https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0)

如果使用 `render` 函数代替 `template` 的话，看起来是很不直观的，在 Vue 中，我们可以通过 `babel-plugin-transform-vue-jsx` 插件，在`.babelrc`中加入配置即可使渲染函数可以支持JSX语法。

#### update ####

`update` 方法的作用是把VNode渲染成真实的DOM，它会在首次渲染和响应式数据发生变化的时候被调用。`update`方法的核心其实调用的是`vm.__patch__`。这个方法会根据平台的不同，部分处理方法也不同，但主要逻辑部分是相同的

`patch`的过程，是对新旧VNode进行分析比对的过程，在`patch`完成后，新的VNode上会对应生成elm，也就是真实的DOM，并且是已经挂载到父节点下的DOM。在整个patch过程中，因为节点变化很少是跨层次的，Vue用的是同级比较的方法，这样的比对方式，可以很好的提高比对效率。

`patch`的过程只要分为三种情况：

1. 如果不存在oldVnode，直接通过`createElm`创建新节点。
2. 存在 oldVnode 和 vnode，但是是相似节点，进行`patchVnode`。
3. 存在 oldVnode 和 vnode，不是相似节点，通过`createElm`创建新节点。

相似节点的判断如下：

    function sameVnode (a, b) {
      return (
	    a.key === b.key && (
	      (
	    a.tag === b.tag &&
	    a.isComment === b.isComment &&
	    isDef(a.data) === isDef(b.data) &&
	    sameInputType(a, b)
	      ) || (
	    isTrue(a.isAsyncPlaceholder) &&
	    a.asyncFactory === b.asyncFactory &&
	    isUndef(b.asyncFactory.error)
	      )
	    )
      )
    }

### patchVnode ###

`patchVnode`在比较两个节点时候，大致把VNode分为3类：普通文本VNode，存在children的VNode，不存在children的VNode。多种 if else 情况用表格总结为：
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

### updateChildren ###

在对新、旧 VNode 节点进行 `patchVnode` 的时候，如果两个节点都有子节点，并且不相似的时候，就调用 `updateChildren` 来对比子节点。因为`createElement`在children规范时会把子节点处理成数组类型，所以这里相当于是同层级的两个VNode的列表进行分析比较。比较原则为，对新旧两个节点分别头和头、尾和尾、头和尾、尾和头这样交叉比较，如果都不满足，再判断此时对比的两个节点是否有相同的key，根据不同的情况进行不同操作。

比较开始前，会初始化一些数据：

1. oldStartIdx： 开始指针，指向oldCh中待处理部分的头部，对应的vnode也就是oldStartVnode。
2. oldEndIdx： 结束指针，指向oldCh中待处理部分的尾部，对应的vnode也就是oldEndVnode。
3. newStartIdx： 开始指针，指向ch中待处理部分的头部，对应的vnode也就是newStartVnode。
4. newEndIdx： 结束指针，指向ch中待处理部分的尾部，对应的vnode也就是newEndVnode。
5. oldKeyToIdx： 存放key值的map，比如我们在v-for 里面定义的 key。

因为子节点是数组类型，所以需要循环更新，在比较的过程中，指针位置会往中间靠，循环结束的条件是：

    oldStartIdx > oldEndIdx || newStartIdx > newEndIdx


### 项目中渲染相关的问题 ###

#### 列表渲染key的问题 ####

在用v-for渲染的元素列表时，Vue默认采用“就地更新”的策略，不用过多的操作节点位置，只更改它们的内容，这样可以很好的提高效率，但是**只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。**为了保证数据的正确性，需要为每项提供一个唯一 key（用index做key和不加key效果相同）

#### v-if和v-for一起使用的问题 ####

有些时候，需要在列表渲染的时候按条件显示数据。例如

    <ul>
	  <li
	    v-for="user in users"
	    v-if="!user.disabled"
	    :key="user.id"
	  >
	    {{ user.name }}
	  </li>
	</ul>

从性能上来讲，这样其实是不太好的，当数据发生变化的需要重新渲染的时候，也会遍历整个列表。但是如果把`users`通过一个计算属性返回，这样会显得更高效。这样每次重新渲染的时候只用遍历当前计算属性中的数据就可以了。