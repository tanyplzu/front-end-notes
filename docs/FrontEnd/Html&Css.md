---
title: "Html和Css"
sidebarDepth: 2
---

## 目录
[[toc]]

### 如何理解 html 标签语义化？

html5 新出的标签，每个标签都有自己语义，什么标签做什么事。让人看的懂，也让机器可以看的懂，利于 SEO。

### css 权重是什么？

- 设置节点样式的方式有很多种，不同的方式它们的权重并不相同，当它们给一个节点设置同一个样式时，谁的权重高谁就生效。
- important：无限高
- 行内样式：权重值为1000
- id选择器：权重值为100
- 类、伪类、属性选择器：权重值为10
- 元素选择器：权重值为1

### 盒模型有几种，它们区别是什么？

- 标准盒模型：设置的宽高只是包括内容区，`content-box`
- IE盒模型：设置的宽高包含了内边距和边框，`border-box`
- 使用`box-sizing`属性设置：`border-box`：IE盒模型、`content-box`：标准盒模型。

### 什么是 BFC？-------------------

块级格式上下文，一句话来说就是让块级元素有块级元素该有的样子，触发`BFC`可以清除浮动、让`margin`不重叠。张鑫旭称"css世界的结界"，主要的作用是会形成一个封闭空间。

### 如何触发 BFC？---------------------

- `float`的值不为`none`。
- `overflow`的值不为 auto、scroll或hidden。
- `display`的值为 table-cell、table-caption 和 inline-block 中的任何一个。
- `position`的值不为 static 或 releative 中的任何一个。

最佳结界：`overflow`

### 你常用的清除浮动方式是什么？

```css
.clear:after, .clear:before {
  content: ' ';
  display: table;
}
.clear:after {
  clear: both;
}
```

### em、rem的区别？

- `em`：如果父级有设置字体大小，1em就是父级的大小，没有1em等于自身默认的字体大小。
- `rem`：相对于`html`标签的字体大小。

项目中曾用过的一段代码：

```js
let clientWidth = document.body.clientWidth >= 600 ? 600 : document.body.clientWidth;
document.querySelector('html').style.fontSize = (clientWidth / 16) + 'px';
```

### 不使用`border`属性画一条`1px`的线？

```html
<div style='height: 1px; background: #666; overflow: hidden;'></div>
<hr size='1'></hr>
```

### 定位的方式有哪几种，它们的区别是什么？

relative：相较于自身定位，设置的位置相对于自己进行位移。不脱离文档流。
absolute：相较于最近有定位的父节点定位，设置的位置相较于父节点。会脱离文档流，导致父节点高度塌陷。
fixed：相较于当前窗口进行定位，设置的位置相较于窗口。脱离文档流。

### relative

![position](./imgs/css-position.jpg)

- 第三个 `<p>` 发生了位置变化，分别向右向下移动了10px；
- 其他的三个`<p>`位置没有发生变化，第四个都没有下移，这一点也很重要。

**relative 会导致自身位置的相对变化，而不会影响其他元素的位置、大小**。这是 relative 的要点之一。还有第二个要点，就是 relative 产生一个新的定位上下文。

### absolute

- absolute 元素脱离了文档结构。和 relative 不同，其他三个元素的位置重新排列了。只要元素会脱离文档结构，它就会产生破坏性，导致父元素坍塌。（此时你应该能立刻想起来，float 元素也会脱离文档结构。）
- absolute 元素具有“包裹性”。之前`<p>`的宽度是撑满整个屏幕的，而此时`<p>`的宽度刚好是内容的宽度。
- absolute 元素具有“跟随性”。虽然 absolute 元素脱离了文档结构，但是它的位置并没有发生变化，还是老老实实地呆在它原本的位置，因为我们此时没有设置 top、left 的值。
- absolute 元素会悬浮在页面上方，会遮挡住下方的页面内容。

通过给 absolute元素设置 top、left 值，可自定义其内容，这个都是平时比较常用的了。这里需要注意的是，设置了 top、left 值时，元素是相对于最近的定位上下文来定位的，而不是相对于浏览器定位。

### fixed

其实 fixed 和 absolute 是一样的，唯一的区别在于：absolute 元素是根据最近的定位上下文确定位置，而 fixed 根据 window （或者 iframe）确定位置。

### 定位上下文

- relative 元素的定位永远是相对于元素自身位置的，和其他元素没关系，也不会影响其他元素。
- fixed 元素的定位是相对于 window （或者 iframe）边界的，和其他元素没有关系。但是它具有破坏性，会导致其他元素位置的变化。
- absolute 的定位相对于前两者要复杂许多。如果为 absolute 设置了 top、left，浏览器会根据什么去确定它的纵向和横向的偏移量呢？答案是浏览器会递归查找该元素的所有父元素，如果找到一个设置了`position:relative/absolute/fixed`的元素，就以该元素为基准定位，如果没找到，就以浏览器边界定位。

![position](./imgs/css-position2.jpg)

### 介绍下 flex 布局？

主轴方向：水平排列（默认） | 水平反向排列 | 垂直排列 | 垂直反向排列
flex-direction: row | row-reverse | column | column-reverse;

换行：不换行（默认） | 换行 | 反向换行(第一行在最后面)
flex-wrap: nowrap | wrap | wrap-reverse;

flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
flex-flow: `<flex-direction> `|| `<flex-wrap>`;

主轴对齐方式：起点对齐（默认） | 终点对齐 | 居中对齐 | 两端对齐 | 分散对齐
justify-content: flex-start | flex-end | center | space-between | space-around;

交叉轴对齐方式：拉伸对齐（默认） | 起点对齐 | 终点对齐 | 居中对齐 | 第一行文字的基线对齐
align-items: stretch | flex-start | flex-end | center | baseline;

多根轴线对齐方式(说的是多根轴线在竖轴上的分布)：拉伸对齐（默认） | 起点对齐 | 终点对齐 | 居中对齐 | 两端对齐 | 分散对齐
align-content: stretch | flex-start | flex-end | center | space-between | space-around;

### 垂直水平居中的实现方式有哪些？

父级设置text-align: center和line-height等同高度。

子节点绝对定位，设置position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);

子节点绝对定位，需要设置宽度和高度。设置position: absolute;top:0;left:0;right:0;bottom:0;margin:auto;

父级设置display: table，子节点设置display:table-cell;text-align:center;vertical-align:middle;

父级设置 display: flex; justify-content:center; align-items:center;

父节点设置display: grid;，子节点设置：align-self:center;justify-self: center;

> 百分比 transform 会让 IOS 微信闪退。需要避免 table 布局，推荐使用 position 和 margin 的组合。（张鑫旭 css 世界202页）

### 你知道的左右宽度固定，中间自适应的三栏布局方案有哪些？

```html
<div class='parent'>
  <div class='left'></div>
  <div class='center'></div>
  <div class='right'></div>
</div>
```

- 浮动

```css
.parent {overflow: hidden;}
.left {float: left; width: 100px;}
.right: {float: right; width: 100px;}
```

> 兼容性好，简单；脱离文档流；撑开两边，下面也会变形。创建bfc解决，如overflow: hidden;

- 定位1：

```css
.parent {postion: relative}
.left {position: absolute; left: 0; width: 100px}
.right {position: absolute; right: 0; width: 100px}
.center {position: absolute; left: 100px; right: 100px}
```

- 定位2

```css
.parent {postion: relative}
.left {position: absolute; left: 0; width: 100px}
.right {position: absolute; right: 0; top: 0; width: 100px}
.center {margin: 0 100px 0 100px};
```

- 表格

```css
.parent {dispaly: table; width: 100%;}
.left {display: table-cell; width: 100px;}
.center {display: table-cell;}
.right {display: table-cell; width: 100px;}
```

- 弹性

```css
.parent {display: flex;}
.left {width: 100px;}
.center {flex: 1;}
.right {width: 100px;}
```

> 移动端很完美；且撑开两边

- 网格

```css
.parent {
  display: grid; 
  width: 100%; 
  grid-template-rows: 100px; 
  grid-template-columns: 100px auto 100px;
}
```



### 重绘和回流

- **重绘**：指的是当页面中的元素不脱离文档流，而简单地进行样式的变化，比如修改颜色、背景等，浏览器重新绘制样式
- **回流**：指的是处于文档流中 DOM 的尺寸大小、位置或者某些属性发生变化时，导致浏览器重新渲染部分或全部文档的情况

相比之下，**回流要比重绘消耗性能开支更大**。另外，一些属性的读取也会引起回流，比如读取某个 DOM 的高度和宽度，或者使用 `getComputedStyle` 方法。在写代码的时候要避免回流和重绘。



### BEM 命名规范

BEM 的意思就模块（Block）、元素（Element）、修饰符（Modifier），使用这种命名方式可以让 CSS 的类名变得有实际意义且能自我解释，具有更高的开发友好性。

```html
<!-- S Search Bar 模块 -->
<div class="search-bar">
  <input class="search-form__input"/>
  <!-- / input 输入框子元素 -->
  <button class="search-form__button"></button>
  <!-- / button 搜索按钮子元素 -->
</div>
<!-- E Search Bar 模块 -->
```

```SCSS
// 以下是 SCSS 代码
.search-bar {
  &__input { ... }
  &__button { ... }
}
```

* .block 代表了更高级别的抽象或组件。
* .block__element 代表.block的后代，用于形成一个完整的.block的整体。
* .block--modifier代表.block的不同状态或不同版本。一般是外观或行为



## 响应式页面开发

### PageSpeed 

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```



### Media Queries

方法 1，使用 link 标签，根据指定特性引入特定的外部样式文件
```html
<link rel="stylesheet" media="(max-width: 640px)" href="max-640px.css">
```
方法 2，直接在 style 标签或 样式文件内使用 @media 规则
```css
@media (max-width: 640px) {
  /*当视窗宽度小于或等于 640px 时，这里的样式将生效*/
}
```

常用的样式断点（参考）

| 断点名称   | 断点描述）                           |
| :--------- | :----------------------------------- |
| mobile     | 移动设备断点，视窗宽度 ≤ 768 px      |
| tablet     | 平板电脑设备断点，视窗宽度 ≥ 769 px  |
| desktop    | 桌面电脑断点，视窗宽度 ≥ 1024 px     |
| widescreen | 宽屏电脑断点，视窗宽度 ≥ 1216 px     |
| fullhd     | 高清宽屏电脑断点，视窗宽度 ≥ 1408 px |



### 使用 Viewport 单位及 rem

在仅使用 vw 单位作为唯一 CSS 单位时，我们需遵守：

利用 Sass 函数将设计稿元素尺寸的像素单位转换为 vw 单位

```css
// iPhone 6尺寸作为设计稿基准
$vw_base: 375; 
@function vw($px) {
    @return ($px / $vm_base) * 100vw;
}
```

无论是文本字号大小还是布局高宽、间距、留白等都使用 vw 作为 CSS 单位

```css
.mod_nav {
    background-color: #fff;
    &_list {
        display: flex;
        padding: vw(15) vw(10) vw(10); // 内间距
        &_item {
            flex: 1;
            text-align: center;
            font-size: vw(10); // 字体大小
            &_logo {
                display: block;
                margin: 0 auto;
                width: vw(40); // 宽度
                height: vw(40); // 高度
                img {
                    display: block;
                    margin: 0 auto;
                    max-width: 100%;
                }
            }
            &_name {
                margin-top: vw(2);
            }
        }
    }
}
```

对于需要保持高宽比的图，应改用 padding-top 实现

```css
.mod_banner {
    position: relative;
    // 使用padding-top 实现宽高比为 100:750 的图片区域
    padding-top: percentage(100/750);
    height: 0;
    overflow: hidden;
    img {
        width: 100%;
        height: auto;
        position: absolute;
        left: 0;
        top: 0; 
    }
}

```
由此，我们不需要增加其他任何额外的脚本代码就能够轻易实现一个常见布局的响应式页面，效果如下：

方法 2 - vw 搭配 rem，寻找最优解

```css
// rem 单位换算：定为 75px 只是方便运算，750px-75px、640-64px、1080px-108px，如此类推
$vw_fontsize: 75; // iPhone 6尺寸的根元素大小基准值
@function rem($px) {
     @return ($px / $vw_fontsize ) * 1rem;
}
// 根元素大小使用 vw 单位
$vw_design: 750;
html {
    font-size: ($vw_fontsize / ($vw_design / 2)) * 100vw; 
    // 同时，通过Media Queries 限制根元素最大最小值
    @media screen and (max-width: 320px) {
        font-size: 64px;
    }
    @media screen and (min-width: 540px) {
        font-size: 108px;
    }
}
// body 也增加最大最小宽度限制，避免默认100%宽度的 block 元素跟随 body 而过大过小
body {
    max-width: 540px;
    min-width: 320px;
}
```



### 设备像素比

设备像素比device pixel ratio简称dpr，即物理像素和设备独立像素的比值。

物理像素也叫设备像素，设备独立像素也叫逻辑分辨率。一般说的2k屏都是物理像素。苹果6的物理分辨率为750x1334，而逻辑分辨率为375x667。

在web中，浏览器为我们提供了`window.devicePixelRatio`来帮助我们获取dpr。在css中，可以使用媒体查询`min-device-pixel-ratio`，区分dpr。



### 1像素线边框问题

往往说的1像素边框问题就是如何实现1物理像素的问题。

解决方案1：**transform: scaleY(0.5) 方案**

```css
div {
    height:1px;
    background:#000;
    -webkit-transform: scaleY(0.5);
    -webkit-transform-origin:0 0;
    overflow: hidden;
}
```

css根据设备像素比媒体查询后的解决方案

```css
/* 2倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 2.0) {
    .border-bottom::after {
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
}

/* 3倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 3.0) {
    .border-bottom::after {
        -webkit-transform: scaleY(0.33);
        transform: scaleY(0.33);
    }
}
```

也可以采用下面的形式的封装：

```css
.mod_grid {
    position: relative;
    &::after {
        // 实现1物理像素的下边框线
        content: '';
        position: absolute;
        z-index: 1;
        pointer-events: none;
        background-color: #ddd;
        height: 1px;
        left: 0;
        right: 0;
        top: 0;
        @media only screen and (-webkit-min-device-pixel-ratio: 2) {
            -webkit-transform: scaleY(0.5);
            -webkit-transform-origin: 50% 0%;
        }
    }
    ...
}
```





























