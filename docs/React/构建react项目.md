# 构建一个 react 项目

## 脚手架

### [create-react-app](https://www.html.cn/create-react-app/docs/getting-started/)

create-react-app 是基于 webpack 的打包层方案，包含 build、dev、lint 等，他在打包层把体验做到了极致，但是不包含路由，不是框架，也不支持配置。所以，如果大家想基于他修改部分配置，或者希望在打包层之外也做技术收敛时，就会遇到困难。

### [DVA](https://dvajs.com/)

- [dva 介绍](https://github.com/dvajs/dva/issues/1)
- [知识地图](https://dvajs.com/knowledgemap/)

### [umijs](https://umijs.org/zh-CN)

- 蚂蚁金服开箱即用的中台前端 [pro.ant.design](https://pro.ant.design/)
- [蚂蚁前端研发最佳实践](https://github.com/sorrycc/blog/issues/90)
- [发布 UMI 3，插件化的企业级前端应用框架](https://zhuanlan.zhihu.com/p/110290443)

### [next.js](https://github.com/zeit/next.js)

next.js 是个很好的选择，Umi 很多功能是参考 next.js 做的。要说有哪些地方不如 Umi，我觉得可能是不够贴近业务，不够接地气。比如 antd、dva 的深度整合，比如国际化、权限、数据流、配置式路由、补丁方案、自动化 external 方面等等一线开发者才会遇到的问题。

### 前端应用架构

- [支付宝前端应用架构的发展和选择](https://github.com/sorrycc/blog/issues/6)

## React 的状态管理

- [结合具体场景，聊聊 React 的状态管理方案](https://juejin.im/post/5c47e3246fb9a049ad776355)
- [mobx](https://cn.mobx.js.org/)

## Hooks

- [精读《React Hooks 最佳实践》](https://juejin.im/post/5d75ae7a6fb9a06b0f2407e8)

## 使用 ts

- [React with TypeScript: Best Practices](https://www.sitepoint.com/react-with-typescript-best-practices/)
- [Using ESLint and Prettier in a TypeScript Project](https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb)
- [React 记录 - 使用 TS 编写 React 项目](https://juejin.im/post/5dcea2bb6fb9a020340e8f09)

## Best Practices

- [React Best Practices](https://towardsdatascience.com/react-best-practices-804def6d5215)
- [Our Best Practices for Writing React Components](https://engineering.musefind.com/our-best-practices-for-writing-react-components-dec3eb5c3fc8)

## Prettier and ESlint

Setting up Prettier and ESlint for JS and React Apps

```sh
yarn add -D babel-eslint eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-react eslint-plugin-import eslint-plugin-jsx-a11y prettier pretty-quick
```

### airbnb 编码规范

- [Airbnb JavaScript 代码规范](https://www.jianshu.com/p/527fe171e8d7)
