---
sidebarDepth: 2
---

# Webpack

[[toc]]

## 提升 webpack 的打包速度方法

- loader：使用 include 和 exclude 指定搜索文件的范围。
- babel-loader: 配置后面加上 loader:'babel-loader?cacheDirectory=true'将编译过的文件缓存起来，下次只需要编译更改过的代码文件即可。
- HappyPack：使用这个插件开启 loader 多线程打包。
- DllPlugin：将特定的类库提前打包然后引入，减少打包类库的次数，只有当类库更新版本才进行重新打包。
- resolve.alias：配置别名，更快找到路径。
- module.noParse：确定这个文件没有其他依赖时，让 webpack 打包时不扫描该文件。

## 减小 webpack 的打包后的体积的方法

- Scope Hoisting：分析模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数里。
- Tree Shaking：删除项目中未被引用的代码。
