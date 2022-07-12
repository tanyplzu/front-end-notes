# 静态资源服务器

使用 `express`

```js
const express = require("express");
const compression = require("compression");
// 端口可以自己定义
const port = process.env.PORT || 3000;
const app = express();
// 开启 gzip 压缩
app.use(compression());
app.use(express.static("./dist"));
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Listening at " + port + "\n");
});
```

使用 `pushstate-server`

```js
const server = require("pushstate-server");

server.start({
  port: 3001,
  directory: "./dist",
});
```

使用 `http.createServer`

```js
const fs = require("fs");
const url = require("url");
const http = require("http");
const path = require("path");
const zlib = require("zlib");
const wwwroot = "/home/admin/wwwroot";
const mimeType = {
  ".ico": "image/x-icon",
  ".md": "text/plain",
  ".html": "text/html",
  ".js": "application/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".eot": "appliaction/vnd.ms-fontobject",
  ".ttf": "aplication/font-sfnt",
};

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  const filePath = path.join(wwwroot, pathname);
  const ext = path.extname(pathname);
  // 参数合法性校验
  // 1. 非允许后缀的资源不予返回
  if (!mimeType[ext]) {
    res.writeHead(404);
    return res.end();
  }
  // 2. 若后缀合法，判断文件是否存在
  if (!fs.existsSync(filePath)) {
    return (res.statusCode = 404);
  }
  // 3. 若文件存在，判断是否是文件类型
  const fStat = fs.statSync(filePath);
  if (!fStat.isFile()) {
    return (res.statusCode = 404);
  }
  // 4. 若合法存在，判断是否位于 wwwroot 目录下
  if (!filePath.startsWith(wwwroot)) {
    return (res.statusCode = 404);
  }

  // 5. 304 缓存有效期判断, 使用 If-Modified-Since，用 Etag 也可以
  const modified = req.headers["if-modified-since"];
  const expectedModified = new Date(fStat.mtime).getTime();
  if (modified && modified == expectedModified) {
    res.statusCode = 304;
    res.setHeader("Content-Type", mimeType[ext]);
    res.setHeader("Cache-Control", "max-age=3600");
    res.setHeader("Last-Modified", new Date(expectedModified).toGMTString());
    return;
  }

  // 6. 文件头信息设置
  res.statusCode = 200;
  res.setHeader("Content-Type", mimeType[ext]);
  res.setHeader("Cache-Control", "max-age=3600");
  res.setHeader("Content-Encoding", "gzip");
  res.setHeader("Last-Modified", new Date(expectedModified).toGMTString());

  // 7. gzip 压缩后，把文件流 pipe 回去
  const stream = fs.createReadStream(filePath, {
    flags: "r",
    encoding: "utf8",
  });
  stream.on("error", () => {
    res.writeHead(404);
    res.end();
  });
  stream.pipe(zlib.createGzip()).pipe(res);
});

server.on("error", (error) => console.log(error));
server.listen(4000, "127.0.0.1");
```

30s code

```js
const fs = require("fs");
const http = require("http");
const path = require("path");

const port = 8000;
const directoryName = "./public";

const types = {
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  json: "application/json",
  xml: "application/xml",
};

const root = path.normalize(path.resolve(directoryName));

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  const extension = path.extname(req.url).slice(1);
  const type = extension ? types[extension] : types.html;
  const supportedExtension = Boolean(type);

  if (!supportedExtension) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("404: File not found");
    return;
  }

  let fileName = req.url;
  if (req.url === "/") fileName = "index.html";
  else if (!extension) {
    try {
      fs.accessSync(path.join(root, req.url + ".html"), fs.constants.F_OK);
      fileName = req.url + ".html";
    } catch (e) {
      fileName = path.join(req.url, "index.html");
    }
  }

  const filePath = path.join(root, fileName);
  const isPathUnderRoot = path
    .normalize(path.resolve(filePath))
    .startsWith(root);

  if (!isPathUnderRoot) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("404: File not found");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("404: File not found");
    } else {
      res.writeHead(200, { "Content-Type": type });
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
```

- `path.resolve()` 方法将路径或路径片段的序列解析为绝对路径。
