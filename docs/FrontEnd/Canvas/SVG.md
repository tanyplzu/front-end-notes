---
sidebarDepth: 0
---

# SVG 基础

[[toc]]

## SVG 基本知识

SVG（Scalable Vector Graphics，可缩放矢量图形）是基于 XML（可扩展标记语言，标准通用标记语言的子集），用于描述二维矢量图形的一种图形格式。

SVG 图像是矢量图像，可以无限缩小放大，所以 SVG 可以在任何分辨率的设备上高清显示，不需要再像以前一样输出各种 @2x 倍图来适配不同分辨率的屏幕。

因为 SVG 还是一种 XML 格式的图形，所以我们可以使用 CSS 和 JavaScript 与它们进行交互，这使得 SVG 在动画方面有着很大潜力和想象力。

```html
<svg x="0px" y="0px" width="300px" height="100px" viewBox="0 0 300 100">
  <rect x="10" y="5" fill="white" stroke="black" width="90" height="90"></rect>
  <circle cx="170" cy="50" r="45" fill="white" stroke="black"></circle>
  <line fill="none" stroke="black" x1="230" y1="6" x2="260" y2="95"></line>
</svg>
```

<DomContainer>
  <svg x="0px" y="0px" width="300px" height="100px" viewBox="0 0 300 100">
    <rect x="10" y="5" fill="white" stroke="black" width="90" height="90"></rect>
    <circle cx="170" cy="50" r="45" fill="white" stroke="black"></circle>
    <line fill="none" stroke="black" x1="230" y1="6" x2="260" y2="95"></line>
  </svg>
</DomContainer>

## SVG 优化

- 减少路径的控制点
- 使用合适的画布尺寸。建议画布尺寸不要太大，因为画布越大意味着路径上的控制点也约多，从而导致导出的文件的体积过大。推荐画布的尺寸为 100x100。
- 使用第三方工具进行优化。
  - SVGO-GUI：这是一个基于 node 的优化工具。
  - SVGOMG：这是一个在线的优化工具，提供来非常多的选项来自定义优化 SVG 文件。

## SVG 描边动画

由于 SVG 是一种 XML 格式的文档，和 HTML 中的 DOM 类似。所以，SVG 也能通过 CSS 执行动画效果。

SVG 描边动画密切相关的 3 个属性，分别为 `stroke`，`stroke-dasharray` 和 `stroke-dashoffset`。

- stroke：是用来定义边框的颜色。
- stroke-dasharray：定义 dash 和 gap 的长度。
- stroke-dashoffset：用来设置 dasharray 定义 dash 线条开始的位置。

## SMIL 动画

```html
<svg width="500px" height="500px" viewBox="0 0 500 500">
  <rect x="0" y="0" width="100" height="100" fill="#feac5e">
    <animate attributeName="x" from="0" to="500" dur="2s" repeatCount="indefinite" />
  </rect>
</svg>
```

<DomContainer>
  <svg width="500px" height="150px" viewBox="0 0 500 100"> 
    <rect x="0" y="0" width="100" height="100" fill="#feac5e"> 
      <animate attributeName="x" from="0" to="500" dur="2s" repeatCount="indefinite" /> 
    </rect> 
  </svg>
</DomContainer>

```html
<svg width="120px" height="120px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
  <g>
    <animateTransform
      attributeName="transform"
      type="rotate"
      values="0 33 33;270 33 33"
      begin="0s"
      dur="1.4s"
      fill="freeze"
      repeatCount="indefinite"
    />
    <circle
      fill="none"
      stroke-width="6"
      stroke-linecap="round"
      cx="33"
      cy="33"
      r="30"
      stroke-dasharray="187"
      stroke-dashoffset="610"
    >
      <animate
        attributeName="stroke"
        values="#4285F4;#DE3E35;#F7C223;#1B9A59;#4285F4"
        begin="0s"
        dur="5.6s"
        fill="freeze"
        repeatCount="indefinite"
      />
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 33 33;135 33 33;450 33 33"
        begin="0s"
        dur="1.4s"
        fill="freeze"
        repeatCount="indefinite"
      />
      <animate
        attributeName="stroke-dashoffset"
        values="187;46.75;187"
        begin="0s"
        dur="1.4s"
        fill="freeze"
        repeatCount="indefinite"
      />
    </circle>
  </g>
</svg>
```

<DomContainer>
  <svg width="120px" height="120px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
    <g>
      <animateTransform attributeName="transform" type="rotate" values="0 33 33;270 33 33" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite"/>
      <circle fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30" stroke-dasharray="187" stroke-dashoffset="610">
        <animate attributeName="stroke" values="#4285F4;#DE3E35;#F7C223;#1B9A59;#4285F4" begin="0s" dur="5.6s" fill="freeze" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="rotate" values="0 33 33;135 33 33;450 33 33" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite"/>
        <animate attributeName="stroke-dashoffset" values="187;46.75;187" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite"/>
      </circle>
    </g>
  </svg>
</DomContainer>
