---
sidebarDepth: 0
---

# micro-front

[[toc]]

## 微前端应用

### 微前端应用场景

从上面的演变过程可以看出，微前端架构比较适合大型的 Web 应用，常见的有以下 3 种形式。

公司内部的平台系统。这些系统之间存在一定的相关性，用户在使用过程中会涉及跨系统的操作，频繁地页面跳转或系统切换将导致操作效率低下。而且，在多个独立系统内部可能会开发一些重复度很高的功能，比如用户管理，这些重复的功能会导致开发成本和用户使用成本上升。

大型单页应用。这类应用的特点是系统体量较大，导致在日常调试开发的时候需要耗费较多时间，严重影响到开发体验和效率。而且随着业务上的功能升级，项目体积还会不断增大，如果项目要进行架构升级的话改造成本会很高。

对已有系统的兼容和扩展。比如一些项目使用的是老旧的技术，使用微前端之后，对于新功能的开发可以使用新的技术框架，这样避免了推翻重构，也避免了继续基于过时的技术进行开发。

## 微前端架构模式

- 在服务端集成微应用，比如通过 Nginx 代理转发；
- 在浏览器集成微应用，比如使用 Web Components 的自定义元素功能。

### 浏览器集成

浏览器集成也称运行时集成，常见的方式有以下 3 种。

**iframe**。通过 iframe 的方式将不同的微应用集成到主应用中，实现成本低，但样式、兼容性方面存在一定问题，比如沙箱属性 sandbox 的某些值在 IE 下不支持。

**前端路由**。每个微应用暴露出渲染函数，主应用在启动时加载各个微应用的主模块，之后根据路由规则渲染相应的微应用。虽然实现方式比较灵活，但有一定的改造成本。

**Web Components**。基于原生的自定义元素来加载不同微应用，借助 Shadow DOM 实现隔离，改造成本比较大。

这也是一种非常热门的集成方式，代表性的框架有 single-spa 以及基于它修改的[qiankun](https://github.com/umijs/qiankun)。

## 文档

- [基于 qiankun 的微前端最佳实践（万字长文） - 从 0 到 1 篇](https://github.com/a1029563229/Blogs/tree/master/BestPractices/qiankun/Start.md)
- [基于 qiankun 的微前端最佳实践（图文并茂） - 应用部署篇](https://github.com/a1029563229/Blogs/tree/master/BestPractices/qiankun/Deploy.md)
- [基于 qiankun 的微前端最佳实践（图文并茂） - 应用间通信篇](https://github.com/a1029563229/Blogs/tree/master/BestPractices/qiankun/Communication.md)
- [万字长文+图文并茂+全面解析微前端框架 qiankun 源码 - qiankun 篇](https://github.com/a1029563229/Blogs/tree/master/Source-Code/qiankun/1.md)

### 文档笔记

构建好了主框架后,注册微应用的方法：
```js
// micro-app-main/src/micro/apps.ts
// 此时我们还没有微应用，所以 apps 为空
const apps = [];

export default apps;

// micro-app-main/src/micro/index.ts
// 一个进度条插件
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { message } from "ant-design-vue";
import {
  registerMicroApps,
  addGlobalUncaughtErrorHandler,
  start,
} from "qiankun";

// 微应用注册信息
import apps from "./apps";

/**
 * 注册微应用
 * 第一个参数 - 微应用的注册信息
 * 第二个参数 - 全局生命周期钩子
 */
registerMicroApps(apps, {
  // qiankun 生命周期钩子 - 微应用加载前
  beforeLoad: (app: any) => {
    // 加载微应用前，加载进度条
    NProgress.start();
    console.log("before load", app.name);
    return Promise.resolve();
  },
  // qiankun 生命周期钩子 - 微应用挂载后
  afterMount: (app: any) => {
    // 加载微应用前，进度条加载完成
    NProgress.done();
    console.log("after mount", app.name);
    return Promise.resolve();
  },
});

/**
 * 添加全局的未捕获异常处理器
 */
addGlobalUncaughtErrorHandler((event: Event | string) => {
  console.error(event);
  const { message: msg } = event as any;
  // 加载失败时提示
  if (msg && msg.includes("died in status LOADING_SOURCE_CODE")) {
    message.error("微应用加载失败，请检查应用是否可运行");
  }
});

// 导出 qiankun 的启动函数
export default start;
```

配置微应用 

```js

```