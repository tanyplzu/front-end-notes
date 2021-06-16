---
sidebarDepth: 0
---

# WebGL 基础

[[toc]]

## WebGL 基本知识

```js
//获取canvas
var canvas = getCanvas(id);

//获取webgl绘图环境
var gl = getWebGLContext(canvas);

//创建顶点着色器
var vertexShader = createShaderFromScript(gl, gl.VERTEX_SHADER, 'vertexShader');
//创建片元着色器
var fragmentShader = createShaderFromScript(gl, gl.FRAGMENT_SHADER, 'fragmentShader');

//创建着色器程序
var program = createProgram(gl, vertexShader, fragmentShader);
//告诉 WebGL 运行哪个着色器程序
gl.useProgram(program);

//设置清空画布颜色为黑色。
gl.clearColor(0.0, 0.0, 0.0, 1.0);
//用上一步设置的清空画布颜色清空画布。
gl.clear(gl.COLOR_BUFFER_BIT);
//绘制点
gl.drawArrays(gl.POINTS, 0, 1);
```
