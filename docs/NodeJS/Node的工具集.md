---
sidebarDepth: 0
---

# Node 的工具集

[Node.js 入门教程](http://nodejs.cn/learn/introduction-to-nodejs)

[[toc]]

## 文件路径

- `./` 当前文件所在目录，是个相对路径;
`__dirname` 当前文件所在目录的完整目录名，也就是绝对路径 `\Users\front-end\docs\NodeJS\`;
`__filename` 当前文件所在目录的完整目录路径，含文件名`\Users\front-end\docs\NodeJS\Node的工具集.md`;
`process.cwd()` 当前执行 Node 命令时候的文件夹目录名。如：`node index.js` 就是 index.js 文件夹目录；`node ./lib/index.js` 就是 lib 这一级的目录;

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

- util.format(format[, ...args])	字符串格式化处理
- util.isDeepStrictEqual(val1, val2)	比对两个变量是否严格相等
- util.inherits(constructor, superConstructor)	与 class 的 extends 相同，继承父类的方法属性
- util.inspect(object[, options])	对传入对象进行字符串格式化操作
- util.types	各种数据类型的判断

## 静态服务器搭建

```js
#!/usr/bin/env node

const fs = require('fs')
const url = require('url')
const http = require('http')
const path = require('path')
const zlib = require('zlib')
const wwwroot = '/home/admin/wwwroot'
const mimeType = {
  '.ico': 'image/x-icon',
  '.md': 'text/plain',
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt'
}

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url)
  const filePath = path.join(wwwroot, pathname)
  const ext = path.extname(pathname)
  // 参数合法性校验  
  // 1. 非允许后缀的资源不予返回
  if (!mimeType[ext]) {
    res.writeHead(404)
    return res.end()
  }
  // 2. 若后缀合法，判断文件是否存在
  if (!fs.existsSync(filePath)) {
    return (res.statusCode = 404)
  }
  // 3. 若文件存在，判断是否是文件类型
  const fStat = fs.statSync(filePath)
  if (!fStat.isFile()) {
    return (res.statusCode = 404)
  }
  // 4. 若合法存在，判断是否位于 wwwroot 目录下
  if (!filePath.startsWith(wwwroot)) {
    return (res.statusCode = 404)
  }

  // 5. 304 缓存有效期判断, 使用 If-Modified-Since，用 Etag 也可以
  const modified = req.headers['if-modified-since']
  const expectedModified = new Date(fStat.mtime).getTime()
  if (modified && modified == expectedModified) {
    res.statusCode = 304
    res.setHeader('Content-Type', mimeType[ext])
    res.setHeader('Cache-Control', 'max-age=3600')
    res.setHeader('Last-Modified', new Date(expectedModified).toGMTString())
    return
  }

  // 6. 文件头信息设置
  res.statusCode = 200
  res.setHeader('Content-Type', mimeType[ext])
  res.setHeader('Cache-Control', 'max-age=3600')
  res.setHeader('Content-Encoding', 'gzip')
  res.setHeader('Last-Modified', new Date(expectedModified).toGMTString())

  // 7. gzip 压缩后，把文件流 pipe 回去
  const stream = fs.createReadStream(filePath, {
    flags: 'r', encoding: 'utf8'
  })
  stream.on('error', () => {
    res.writeHead(404)
    res.end()
  })
  stream.pipe(zlib.createGzip()).pipe(res)
})

server.on('error', error => console.log(error))
server.listen(4000, '127.0.0.1')
```