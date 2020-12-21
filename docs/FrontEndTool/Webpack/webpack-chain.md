---
sidebarDepth: 0
---

# webpack-chain

[[toc]]

## 代码分割及性能优化 optimizations

```js
config.optimization.splitChunks({
  chunks: "async", // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
  minSize: 30000, // 最小尺寸，30000
  minChunks: 1, // 最小 chunk ，默认1
  maxAsyncRequests: 5, // 最大异步请求数， 默认5
  maxInitialRequests : 3, // 最大初始化请求书，默认3
  automaticNameDelimiter: '~',// 打包分隔符
  name: function(){}, // 打包后的名称，此选项可接收 function
  cacheGroups:{ // 这里开始设置缓存的 chunks
    priority: 0, // 缓存组优先级
    vendor: { // key 为entry中定义的 入口名称
      chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是async) 
      test: /react|lodash/, // 正则规则验证，若是符合就提取 chunk
      name: "vendor", // 要缓存的 分隔出来的 chunk 名称 
      minSize: 30000,
      minChunks: 1,
      enforce: true,
      maxAsyncRequests: 5, // 最大异步请求数， 默认1
      maxInitialRequests : 3, // 最大初始化请求书，默认1
      reuseExistingChunk: true // 可设置是否重用该chunk
    }
  }
});
```
umi中的配置

```js
export default {
  chunks: ['vendors', 'umi'],
  chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
          },
        },
      }
    });
  },
}
```