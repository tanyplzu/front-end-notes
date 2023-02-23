---
sidebarDepth: 0
---

# scrollbar

`::-webkit-scrollbar` 滚动条整体部分，可以设置宽度啥的

`::-webkit-scrollbar-button` 滚动条两端的按钮

`::-webkit-scrollbar-track` 外层轨道

`::-webkit-scrollbar-track-piece` 内层轨道，滚动条中间部分(除去)

`::-webkit-scrollbar-thumb` 滚动条里面可以拖动的那个

`::-webkit-scrollbar-corner` 边角

`::-webkit-resizer` 定义右下角拖动块的样式

```css
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width:12px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
-webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
  border-radius:10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius:10px;
  background:rgba(0,0,0,0.1);
  -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
}

::-webkit-scrollbar-thumb:window-inactive {
  background:rgba(255,0,0,0.4);
}
```
