---
title: "Webpack"
sidebarDepth: 0
---

## 目录
[[toc]]

### 有哪些方式可以提升webpack的打包速度？
- loader：使用include和exclude指定搜索文件的范围。
- babel-loader:配置后面加上loader:'babel-loader?cacheDirectory=true'将编译过的文件缓存起来，下次只需要编译更改过的代码文件即可。
- HappyPack：使用这个插件开启loader多线程打包。
- DllPlugin：将特定的类库提前打包然后引入，减少打包类库的次数，只有当类库更新版本才进行重新打包。
- resolve.alias：配置别名，更快找到路径。
- module.noParse：确定这个文件没有其他依赖时，让webpack打包时不扫描该文件。

### 有哪些方式可以减小webpack的打包后的体积？
- Scope Hoisting：分析模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数里。
- Tree Shaking：删除项目中未被引用的代码。

