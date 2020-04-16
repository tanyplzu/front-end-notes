# webpack 进阶

## autoprefixer

PostCSS 插件 autoprefixer ⾃动补⻬ CSS3 前缀

```css
.box {
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  -o-border-radius: 10px;
  border-radius: 10px;
}
```

配置：

```js
{
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      require('autoprefixer')({
        browsers: ['last 2 version', '> 1%', 'iOS 7'],
      }),
    ],
  },
}
```

## rem

使⽤ px2rem-loader

⻚⾯渲染时计算根元素的 font-size 值。也可以使⽤⼿淘的[lib-flexible 库](https://github.com/amfe/lib-flexible)

## 静态资源内联

## 提取页面的公共资源:fire:

### 基础库的分离

### 11
