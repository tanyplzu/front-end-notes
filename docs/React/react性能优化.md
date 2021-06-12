---
sidebarDepth: 0
---

# React 性能优化

[[toc]]

## 问题

- 如何分析和调优性能瓶颈？
- 如何避免重复渲染？
- 如何提升 React 代码可维护性？

## 衡量工具

### Lighthouse

- Lighthouse 并不能真实地反映出每个用户的设备的实际性能数据；
- Lighthouse 的分数反应的是业界的标准，而非项目实际需求的标准。

### APM 工具

- 国际上比较老牌的就是 New Relic，实力十分强悍；
- 国内的话可以直接考虑使用阿里云的 ARMS，
- 开源项目自建。

## 指标采集工作

### FCP（First Contentful Paint）

**首次绘制内容的耗时**

首屏统计的方式一直在变，起初是通过记录 window.performance.timing 中的 domComplete 与 domLoading 的时间差来完成，但这并不具备交互意义，现在通常是记录初次加载并绘制内容的时间。

回到 React 的角度来看，加载一个 React 页面，通常是从白屏到直接显示内容。那么如果白屏时间很长，用户可能会流失，就需要在页面上绘制内容，给出一些反馈。

最早的优化方案是绘制一个 Loading 图标，写死在 HTML 的 CSS 里，等 JS 开始执行的时候再移除它。

还有一种解决方案是 SSR，也就是走服务端渲染路线，常用的方案有 next.js 等。

TP99 指标：

- 一般 50 ~ 60 FPS，就相当流畅了；
- 在 30 ~ 50 FPS 之间就因人而异了，通常属于尚可接受的范畴；
- 在 30 FPS 以下属于有明显卡顿，会令人不适。

### FP、FPT、FMP

浏览器从开始请求网站开始计算。

- FP：渲染出第一个像素点；
- FPT: 渲染第一个内容，不包括白色背景和 Canvas 元素；
- FMP：渲染出第一个关键内容。每个网站的关键内容不一样，导致计算比较复杂，也不准确。

### TTI（Time to Interact）

**是页面可交互的时间**

通常通过记录 window.performance.timing 中的 domInteractive 与 fetchStart 的时间差来完成。

TTI 在实现上，可以优先加载让用户关注的内容，让用户先用起来。策略上主要是将异步加载与懒加载相结合。

### Page Load

**页面完全加载时间**

通常通过记录 window.performance.timing 中的 loadEventStart 与 fetchStart 的时间差来完成。

异步加载主要由 Webpack 打包 common chunk 与异步组件的方式完成。

### FPS

**前端页面帧率**

通常是在主线程打点完成记录。其原理是 requestAnimationFrame 会在页面重绘前被调用，而 FPS 就是计算两次之间的时间差。

```js
let lastTime = performance.now();
let frame = 0;
let lastFameTime = performance.now();
const loop = (time) => {
  const now = performance.now();
  lastFameTime = now;
  frame++;
  if (now > 1000 + lastTime) {
    let fps = Math.round(frame / ((now - lastTime) / 1000));
    frame = 0;
    lastTime = now;
    console.log(fps);
  }
  window.requestAnimationFrame(loop);
};
```

在 React 中引起卡顿的主要原因有长列表与重渲染。长列表的解决方案很成熟，直接使用 react-virtualized 或者 react-window 就可以，相关的原理你可以自行学习；重渲染的问题比较复杂，下一讲我会详细讲解。

### 静态资源及 API 请求成功率

通常是通过 window.performance.getEntries( ) 来获取相关信息。

## 优化时机

## 工具

React Profiler：颜色和高度对应该次提交渲染所需的时间。

从概念上讲，React 分两个阶段工作：

- **渲染** 阶段会确定需要进行哪些更改，比如 DOM。在此阶段，React 调用 render，然后将结果与上次渲染的结果进行比较。
- **提交** 阶段发生在当 React 应用变化时。（对于 React DOM 来说，会发生在 React 插入，更新及删除 DOM 节点的时候。）在此阶段，React 还会调用 componentDidMount 和 componentDidUpdate 之类的生命周期方法。

开发者工具的 profiler 是在提交阶段收集性能数据的。

profiler 提供了一个筛选功能。

## 常见的坑

参数动态化。

React.memo 还是 PureComponent 都是通过浅比较的方式对比变化前后的 props 与 state。但这个两个方法往往会失效。

- 最常见的情况使用了箭头函数

```jsx
<ListItem
  key={id}
  id={id}
  text={text}
  onMoveUp={(id) => { //... }}
  onMoveDown={this.handleMoveDown}
/>
```

这是因为箭头函数在 List 每次调用 render 时都会动态生成一个新的函数，函数的引用变化了，这时即便使用 React.memo 也是无效的。

如果长列表中使用箭头函数，对性能影响很大。

如果 props 中传入一个普通的方法，也会造成重新渲染。可以使用 useCallback 包裹。

## 处理方案

1. 性能不够，缓存来凑，第一类方案是添加缓存来处理，常见的解决方案有 Facebook 自研的 reselect。

```js
import { createSelector } from 'reselect'
const listSelector = props => props.list || [];
const dataSelector = createSelector(
  listSelector,
  list => list.map((item) => { /*... */ })
)
render() {
  return (
    <FlatList
      data={dataSelector(this.props)}
      renderItem={this.renderItem}
    />
  )
}
```

2.不可变数据

ImmutableJS

3.手动控制

使用 shouldComponentUpdate 可能会带来意想不到的 Bug，所以这个方案应该放到最后考虑。

## 提升 React 代码可维护性

### 预防

- 人工审查代码的方式， Code Review。
- 工具审查的方式，标准称谓是静态代码检查工具。在 JavaScript 世界中，静态代码检查工具 ESLint。

在前端工程中最常见的 Lint 工具包含：

- 针对 JavaScript 的 ESLint；
- 针对样式的 Stylelint；
- 针对代码提交的 Commitlint；
- 针对编辑器风格的 Editorconfig；
- 针对代码风格的 Prettier。
