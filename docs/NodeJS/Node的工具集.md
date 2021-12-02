---
sidebarDepth: 0
---

# Node 的工具集

[Node.js 入门教程](http://nodejs.cn/learn/introduction-to-nodejs)

[[toc]]

## 文件路径

- `./` 当前文件所在目录，是个相对路径;
- `__dirname` 当前文件所在目录的完整目录名，也就是绝对路径 `\Users\front-end\docs\NodeJS\`;
- `__filename` 当前文件所在目录的完整目录路径，含文件名`\Users\front-end\docs\NodeJS\Node的工具集.md`;
- `process.cwd()` 当前执行 Node 命令时候的文件夹目录名。如：`node index.js` 就是 index.js 文件夹目录；`node ./lib/index.js` 就是 lib 这一级的目录;

## path

- path.basename()
- path.dirname()
- path.extname()
- path.isAbsolute()
- path.join()
- path.normalize()
- path.parse()
- path.relative()
- path.resolve()

## 参数的序列化与反序列化 - querystring

- querystring.decode()
- querystring.encode()
- querystring.escape(str)
- querystring.parse(str[, sep[, eq[, options]]])
- querystring.stringify(obj[, sep[, eq[, options]]])
- querystring.unescape(str)

## 实用方法集 - util

- util.format(format[, ...args]) 字符串格式化处理
- util.isDeepStrictEqual(val1, val2) 比对两个变量是否严格相等
- util.inherits(constructor, superConstructor) 与 class 的 extends 相同，继承父类的方法属性
- util.inspect(object[, options]) 对传入对象进行字符串格式化操作
- util.types 各种数据类型的判断

## url

### parse

```js
url.parse('https://usr:pwd@xxxxx.com:8080/a/b/c/d?q=js&cat=3&#hash')
Url {
  // 请求协议，比如 http、https、ftp、file 等
  protocol: 'https:',
  // 协议的 : 号有没有 /
  slashes: true,
  // url 的认证信息，跟上 @ 来区分认证部分和域名部分
  auth: 'usr:pwd',
  // url 的主机名
  host: 'xxxxx.com:8080',
  // 主机端口号
  port: '8080',
  // 主机名
  hostname: 'xxxxx.com',
  // 锚点部分，用 # 标识
  hash: '#hash',
  // 查询参数，包含 ?
  search: '?q=js&cat=3&',
  // 查询参数的字符串部分，不包含 ?
  query: 'q=js&cat=3&',
  // url 中的路径部分
  pathname: '/a/b/c/d',
  // 完整路径，由 pathname 和 search 组成
  path: '/a/b/c/d?q=js&cat=3&',
  // 链接地址
  href: 'https://usr:pwd@xxxxx.com:8080/a/b/c/d?q=js&cat=3&#hash'
}
```

### format

```js
const url = require('url');

const href = url.format({
  protocol: 'https',
  hostname: 'xxxx.com',
  port: '8080',
  pathname: '/a/b/c/d',
  auth: 'usr:pwd',
  hash: '#hash',
  query: {
    q: 'js',
    cat: 3,
  },
});

// https://usr:pwd@xxxx.com:8080/a/b/c/d?q=js&cat=3#hash
```
