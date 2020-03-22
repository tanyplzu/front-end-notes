# Vue 的启动过程

每一个组件都是 vue.component 的实例；

render() 时会生成 vnode，render() 执行时，主要在执行 createElement() 方法。

update 会将 vnode 生成 Dom，update 的核心是_pach 方法。

$mount 会将生成的 dom 挂载到 el 下。启动时挂载，还可以自己手动挂载。
