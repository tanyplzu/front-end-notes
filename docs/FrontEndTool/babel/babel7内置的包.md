---
sidebarDepth: 0
---

# babel api

babel 7 把这些功能的实现放到了不同的包里面：

## @babel/parser

解析源码成 AST，对应 parse 阶段

```js
require('@babel/parser').parse('code', {
  // parse in strict mode and allow module declarations
  sourceType: 'module',
  plugins: [
    // enable jsx and flow syntax
    'jsx',
    'flow',
  ],
});
```

- @babel/traverse 遍历 AST 并调用 visitor 函数，对应 transform 阶段
- @babel/generate 打印 AST，生成目标代码和 sorucemap，对应 generate 阶段

其中，遍历过程中需要创建 AST，会用到：

- @babel/types 创建、判断 AST
- @babel/template 根据模块批量创建 AST

上面是每一个阶段的功能， babel 整体功能的入口是在：

- @babel/core 解析配置、应用 plugin、preset，整体整体编译流程

插件和插件之间有一些公共函数，这些都是在：

- @babel/helpers 用于转换 es next 代码需要的通过模板创建的 AST，比如 \_typeof、\_defineProperties 等
- @babel/helper-xxx 其他的插件之间共享的用于操作 AST 的公共函数当然，除了编译期转换的时候会有公共函数以外，运行时也有，这部分是放在：

- @babel/runtime 主要是包含 corejs、helpers、regenerator 这 3 部分：
- helper： helper 函数的运行时版本（不是通过 AST 注入了，而是运行时引入代码）
- corejs： es next 的 api 的实现，corejs 2 只支持静态方法，corejs 3 还支持实例方法
- regenerator：async await 的实现，由 facebook 维护（babel 做语法转换是自己实现的 helper，但是做 polyfill 都不是自己实现的，而是借助了第三方的 corejs、regenerator）
