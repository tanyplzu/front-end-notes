---
sidebarDepth: 0
---

# stream

相对于使用其他的数据处理方法，流基本上提供了两个主要优点：

- 内存效率: 无需加载大量的数据到内存中即可进行处理。
- 时间效率: 当获得数据之后即可立即开始处理数据，这样所需的时间更少，而不必等到整个数据有效负载可用才开始。

```js
const http = require("http");
const fs = require("fs");

const server = http.createServer(function (req, res) {
  fs.readFile(__dirname + "/data.txt", (err, data) => {
    res.end(data);
  });
});
server.listen(3000);
```

readFile() 读取文件的全部内容，并在完成时调用回调函数。

```js
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream(__dirname + "/data.txt");
  stream.pipe(res);
});
server.listen(3000);
```

## pipe()

```js
stream.pipe(res);

src.pipe(dest1).pipe(dest2);

// 相当于
src.pipe(dest1);
dest1.pipe(dest2);
```

## 流驱动的 Node.js API

- process.stdin 返回连接到 stdin 的流。
- process.stdout 返回连接到 stdout 的流。
- process.stderr 返回连接到 stderr 的流。
- fs.createReadStream() 创建文件的可读流。
- fs.createWriteStream() 创建到文件的可写流。
- net.connect() 启动基于流的连接。
- http.request() 返回 http.ClientRequest 类的实例，该实例是可写流。
- zlib.createGzip() 使用 gzip（压缩算法）将数据压缩到流中。
- zlib.createGunzip() 解压缩 gzip 流。
- zlib.createDeflate() 使用 deflate（压缩算法）将数据压缩到流中。
- zlib.createInflate() 解压缩 deflate 流。

## 不同类型的流

- Readable: 可以通过管道读取、但不能通过管道写入的流（可以接收数据，但不能向其发送数据）。 当推送数据到可读流中时，会对其进行缓冲，直到使用者开始读取数据为止。
- Writable: 可以通过管道写入、但不能通过管道读取的流（可以发送数据，但不能从中接收数据）。
- Duplex: 可以通过管道写入和读取的流，基本上相对于是可读流和可写流的组合。
- Transform: 类似于双工流、但其输出是其输入的转换的转换流。
