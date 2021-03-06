---
sidebarDepth: 0
---

# React vs Vue

对于这两个框架，很难判断哪个好，哪个不好。甚至说哪个简洁，哪个复杂。对于一般的项目，react 能实现的 vue 同样可以实现，vue 能实现的 react 也能实现，并没有谁更有优势。对于复杂的项目，可能不是框架本身的问题，更多的是业务复杂度的问题。以下是几个比对的版本：

## 版本一

### 共同点

- 使用 Virtual DOM
- 组件化 (Composable)
- 都是数据驱动试图

### 区别

- react 使用 jsx，vue 使用 Templates；
- react 函数式编程，vue 命令式编程；
- react 需要更多的自立更生，vue 把什么都给你；

## 版本二

### React

- 对比 Vue，React 最大的优点是灵活，对原生 JavaScript 的侵入性弱（没有过多的模板语法），不需要掌握太多的 API 也可以很好地使用。
- React 的哲学是：React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。
- 对于框架的升级，React 选择了渐进兼容的技术方案，而 Angular/Vue 都曾经历过“断崖式”的版本升级。

### Vue

Vue 最大的特点是上手简单，框架的设计和文档对新手极其友好。但这并不代表它只是个简单的框架，当你需要实现一些更加深入的自定义功能时（比如自定义组件、自定义指令、JSX 等），你会发现它也提供了友好的支持能力。

很多人会认为 Vue 只是把 Angular 和 React 的优势结合，但 Vue 也有自身的设计和思考特色。

## 版本三

Vue 文档中比对：[对比其他框架](https://cn.vuejs.org/v2/guide/comparison.html)

### 优化

在 React 应用中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。

如要避免不必要的子组件的重渲染，你需要在所有可能的地方使用 PureComponent，或是手动实现 shouldComponentUpdate 方法。同时你可能会需要使用不可变的数据结构来使得你的组件更容易被优化。

然而，使用 PureComponent 和 shouldComponentUpdate 时，需要保证该组件的整个子树的渲染输出都是由该组件的 props 所决定的。如果不符合这个情况，那么此类优化就会导致难以察觉的渲染结果不一致。这使得 React 中的组件优化伴随着相当的心智负担。

在 Vue 应用中，组件的依赖是在渲染过程中自动追踪的，所以系统能精确知晓哪个组件确实需要被重渲染。**你可以理解为每一个组件都已经自动获得了 shouldComponentUpdate，并且没有上述的子树问题限制**。

Vue 的这个特点使得开发者不再需要考虑此类优化，从而能够更好地专注于应用本身。

### 使用 JSX 的渲染函数有下面这些优势

你可以使用完整的编程语言 JavaScript 功能来构建你的视图页面。比如你可以使用临时变量、JS 自带的流程控制、以及直接引用当前 JS 作用域中的值等等。

开发工具对 JSX 的支持相比于现有可用的其他 Vue 模板还是比较先进的 (比如，linting、类型检查、编辑器的自动完成)。

## Vue 和 React 的使用场景和深度有何不同？

> 以下是尤雨溪在知乎中的回答 https://www.zhihu.com/question/31585377/answer/52576501

在超大量数据的首屏渲染速度上，React 有一定优势，因为 Vue 的渲染机制启动时候要做的工作比较多，而且 React 支持服务端渲染。

需要指出的一点：React 的 Virtual DOM 也不是不需要优化的。复杂的应用里你有两个选择：

1. 手动添加 shouldComponentUpdate 来避免不需要的 vdom re-render；
2. Components 尽可能都用 pureRenderMixin，然后采用 Flux 结构 + Immutable.js。  

其实也不是那么简单的。相比之下，Vue 由于采用依赖追踪，默认就是优化状态：你动了多少数据，就触发多少更新，不多也不少。

再谈谈开发风格的偏好：React 推荐的做法是 JSX + inline style，也就是把 HTML 和 CSS 全都整进 JavaScript 了。Vue 的默认 API 是以简单易上手为目标，但是进阶之后推荐的是使用 webpack + vue-loader 的单文件组件格式

然后扯一扯模板 vs. JSX 的问题。JSX 在逻辑表达能力上虽然完爆模板，但是很容易写出凌乱的 render 函数，不如模板看起来一目了然。当然这里也有个人偏好的问题。React 的社区/组件生态比 Vue 大很多，这个是很显然的。不过说实话我很少见到现成的第三方组件完全符合我的要求。

最后，使用场景上来说：React 配合严格的 Flux 架构，适合超大规模多人协作的复杂项目。理论上 Vue 配合类似架构也可以胜任这样的用例，但缺少类似 Flux 这样的官方架构。小快灵的项目上，Vue 和 React 的选择更多是开发风格的偏好。对于需要对 DOM 进行很多自定义操作的项目，Vue 的灵活性优于 React。
