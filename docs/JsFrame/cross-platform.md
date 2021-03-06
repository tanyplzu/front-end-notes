---
sidebarDepth: 0
---

# 移动端跨平台方案演进

https://juejin.cn/book/6844733786626719757/section/6844733786672857095

[[toc]]

## WebView 流

第一种方案，我们称之为 WebView 流。因为 WebView 作为一个显示 web 页面的容器，它本身是跨平台的，所以利用 WebView 跨平台属性的技术方案就称之为 WebView 流。WebView 流的发展也经历了如下的过程：

### 纯 H5

最开始的时候，是在 APP 里嵌入一个 WebView，负责显示 H5，可能是独立的一个页面，也有可能是 Native 页面的一部分。但在这个阶段，一方面，WebView 的性能没有 Native 的好，另一方面，H5 页面和 Native 的页面几乎是没有交互的，使得 Native 的开发和 H5 的开发是彼此独立的，Native 无法使用 H5 的特性，H5 也无法使用 Native 的特性，这些都限制了 WebView 的使用场景。

## Hybrid

为了打破 Native 和 H5 割裂的情况，就出现了 JSBridge ，JSBridge 是 Native 代码与 JavaScript 代码的通信桥梁。JSBridge 的出现，使得 H5 可以使用 Native 的能力，Native 也能使用 H5 的能力，使 Native 和 H5 能完美融合在一起，出现了一系列的 Hybrid 开发框架，比如 PhoneGap 等，这些架构具有开发成本低、简单、跨平台的优点。但是这些 Hybrid 框架都是基于 WebView 实现的，所以无法避免 WebView 本身的劣势：内存占用多、网页加载速度慢、渲染慢、JavaScript 执行慢等，因为这些性能问题，所以大多数人在开发过程中，主要页面都是使用 Native 开发，只有少数页面才采用 Hybrid 的框架。

### 基于 Hybrid 的优化改进方案

针对具体的性能问题，开始有了不同的优化方案，比如：网页加载速度慢，则采用离线包的方案；网页渲染效率低，则优化 dom 树等。

虽然性能上有很大提升，但是始终绕不过两大问题：

- 第一个是，WebView 的渲染性能比 Native 差；
- 第二个就是，JavaScript 是解释执行语言，运行效率也比 Native 差。

所以无论怎么优化，使用 Hybrid 开发的页面的性能肯定不会比 Native 的好。所以，如果是你，你会在自己的 APP 中全部采用 Hybrid 吗？答案是肯定不会。

## ReactNative 流

第二种是 ReactNative 流，ReactNative 流是从 WebView 流发展而来，典型的方案是 ReactNative 和 Weex，这两种方案，都抛弃了 WebView 这个累赘，但仍然使用 H5 的技术栈开发，使用 JavaScript 开发，那是如何做到跨平台的呢：

### 跨平台的布局引擎

ReactNative 内置了跨平台的布局引擎，可以将 H5 的布局转化为 Native 的布局。

### 使用 Native 原生组件渲染

将 ReactView 组件使用 Native 原生组件渲染。

### JavaScript 引擎

ReactNative 内置 JavaScript 的引擎，从而可以在不同平台上运行 JavaScript 代码。ReactNative 流采用 JavaScript + JavaScript 引擎+ Native 的技术方案，利用了 JavaScript 的跨平台特性实现了移动端的跨平台方案。

## 编译流/虚拟机流

## 游戏引擎流

游戏引擎也不适合用来开发普通 APP，因为：

1. 游戏引擎的安装包体积都很大。
2. 游戏引擎和普通 APP 的刷新机制不同，游戏引擎是实时刷新，普通 APP 是按需刷新，而且实时刷新也造成耗电量较高。
3. 游戏引擎虽然能做出复杂的游戏界面，但是实现 Android 或 iOS 的原生界面，却需要自己在重新开发。
4. 而且游戏引擎适合开发一个新的 APP，不适合和原生 APP 做混合开发。

## 理想的跨平台开发方案

介绍了这么多种跨平台的方案，不难看出，实现跨平台方案需要解决的技术难题：

- 一个是逻辑代码：逻辑代码需要用一种语言来实现。
- 一个是 UI：要么自己渲染，要么使用原生的渲染。

## Flutter

Flutter 开辟了一种全新的思路，利用 Dart 语言，同时支持 **JIT** 和 **AOT** 两种编译方式的特性，在不同场景下使用不同的编译方式，达到最高效的开发和运行体验。

在 Debug 模式下，为了保证开发体验，采用 JIT 这种动态编译的方式，将代码运行在 Dart 虚拟机上，使得我们编写的代码可以实时更新，实现 HotReload 的特性，提升开发体验。

而在 Release 模式下，又需要保证运行速度和渲染流程度，则会采用 AOT 的编译方式，将代码直接编译成各自平台的 Native 代码，以此提高使用体验。

在 UI 渲染方面， Flutter 的渲染不依赖于平台，基于自带的 Skia 渲染引擎 ，构建了一套完整的跨平台 UI 渲染框架；在和平台交互方面，Flutter 提供了 Platform Channel 的通道，可以方便的和 Native 交互。可以说是 Google 融合多种技术才有的产物，也是跨平台方案发展的必然产物。

除此之外，一个好的技术，还需要有完善的文档去让人学习，有专业的人去维护，让技术不断发展，而在这方面，Flutter 即有完善的文档，也有 Google 团队的维护。因此 Flutter 肯定会更好的发展。

Flutter 不仅是一个跨平台的 UI 框架，也是 Google 的新一代操作系统 Fuchsia 的 UI 框架。

> Fuchsia 是 Google 开发的下一代操作系统。和以前 Google 开发的操作系统，如基于 Linux 内核的 Chrome OS 和 Android 等不同，Fuchsia 基于新的名为 Zircon 的微内核， Fuchsia 的设计目标之一是可运行在众多的设备上，包括汽车的娱乐媒体系统和嵌入式设备，如红绿灯、数字手表、智能手机、平板电脑与个人计算机。