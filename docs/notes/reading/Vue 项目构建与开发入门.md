# Vue 项目构建与开发入门

## webpack 的使用

## env 文件与环境设置

2. 环境注入

## 构建实战篇 1：单页应用的基本配置

1. 路由配置除了使用 require.ensure 来拆分代码，Vue Router 官方文档还推荐使用动态 import 语法来进行代码分块

2. Vuex 配置

3. 接口配置

4. 公共设施配置

## 构建实战篇 4：项目整合与优化

- 使用 alias 简化路径
- 整合功能模块
- 开启 Gzip 压缩

## 开发指南篇 1：从编码技巧与规范开始

1. 使用对象代替 if 及 switch
2. 使用 Array.from 快速生成数组
3. 使用 router.beforeEach 来处理跳转前逻辑
4. 使用 v-if 来优化页面加载
5. 路由跳转尽量使用 name 而不是 path
6. 使用 key 来优化 v-for 循环
7. 使用 computed 代替 watch
8. 统一管理缓存变量
9. 使用 setTimeout 代替 setInterval
10. 不要使用 for in 循环来遍历数组

## 开发指南篇 2：学会编写可复用性模块

- 封装成一个函数
- 封装成一个组件
- 封装成一个插件

## 开发指南篇 3：合理划分容器组件与展示组件

## 开发指南篇 4：数据驱动与拼图游戏

## 开发指南篇 5：Vue API 盲点解析

- 使用 performance 开启性能追踪
- 使用 errorHandler 来捕获异常
- 使用 nextTick 将回调延迟到下次 DOM 更新循环之后执行
- 使用 watch 的深度遍历和立即调用功能
- 对低开销的静态组件使用 v-once

## 开发拓展篇 1：扩充你的开发工具

巧用 Chrome 插件

- Vue.js devtools
- Vue Performance Devtool
- Google PageSpeed Insights API Extension

分析你的包文件

- webpack-bundle-analyzer

## 开发拓展篇 2：将 UI 界面交给第三方库
