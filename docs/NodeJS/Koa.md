# koa

- application 整个 Koa 应用服务类
- context Koa 的应用服务上下文
- request Koa 的请求对象
- response Koa 的响应对象

## application.js

```js
const onFinished = require('on-finished');
const response = require('./response');
const compose = require('koa-compose');
const context = require('./context');
const request = require('./request');
const Emitter = require('events');
const util = require('util');
const Stream = require('stream');
const http = require('http');
const only = require('only');

// 继承 Emitter，暴露一个 Application 类
module.exports = class Application extends Emitter {
  constructor() {
    super();
    this.proxy = false;
    this.middleware = [];
    this.subdomainOffset = 2;
    this.env = process.env.NODE_ENV || 'development';
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
    if (util.inspect.custom) {
      this[util.inspect.custom] = this.inspect;
    }
  }

  // 等同于 http.createServer(app.callback()).listen(...)
  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }

  // 返回 JSON 格式数据
  toJSON() {
    return only(this, ['subdomainOffset', 'proxy', 'env']);
  }

  // 把当前实例 JSON 格式化返回
  inspect() {
    return this.toJSON();
  }

  // 把中间件压入数组
  use(fn) {
    this.middleware.push(fn);
    return this;
  }

  // 返回 Node 原生的 Server request 回调
  callback() {
    const fn = compose(this.middleware);
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }

  // 在回调中处理 request 请求对象
  handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    // 先设置一个 404 的响应码，等后面来覆盖它
    res.statusCode = 404;
    const onerror = (err) => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx)
      .then(handleResponse)
      .catch(onerror);
  }

  // 初始化一个上下文，为 req/res 建立各种引用关系，方便使用
  createContext(req, res) {
    const context = Object.create(this.context);
    const request = (context.request = Object.create(this.request));
    const response = (context.response = Object.create(this.response));
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    return context;
  }
};

// 响应处理的辅助函数
function respond(ctx) {
  const res = ctx.res;
  let body = ctx.body;
  // 此处删减了代码，如 head/空 body 等问题的处理策略等
  // 基于 Buffer/string 和 流，分别给予响应
  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' == typeof body) return res.end(body);
  if (body instanceof Stream) return body.pipe(res);

  // 最后则是以 JSON 的格式返回
  body = JSON.stringify(body);
  res.end(body);
}
```

## 启动一个 HTTP Server

```js
const Koa = require('koa');
const app = new Koa();

app
  .use((ctx) => {
    ctx.body = 'Hello Koa';
  })
  .listen(3000);
```

## koa 插件

### koa-router

```sh
$ npm i koa-router
```

```js
const Koa = require('koa');
const Router = require('koa-router'); // Changed

const app = new Koa();
const router = new Router(); // Router initialization

router.get('/', (ctx, next) => {
  // We will handle GET requests
  ctx.body = 'Hello, World!';
});

app.use(router.routes()).use(router.allowedMethods()); // Add routes to the middleware chain, and respond to the OPTIONS requests.

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Koa-bodyparser

```sh
$ npm i koa-bodyparser
```

```js
const Koa = require('koa');
const BodyParser = require('koa-bodyparser'); // Changed

const app = new Koa();

app.use(bodyParser()); // Use Parser before the route handler

app.use(async (ctx) => {
  // Parsed data is located in ctx.request.body
  // Empty object as a placeholer will be used if there is nothing to parse
  ctx.body = ctx.request.body;
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Koa-logger

```text
<-- GET /
--> GET / 200 835ms 746b
<-- GET /
--> GET / 200 960ms 1.9kb
<-- GET /users
--> GET /users 200 357ms 922b
<-- GET /users?page=2
--> GET /users?page=2 200 466ms 4.66kb
```

```sh
$ npm i koa-logger
```

```js
const Koa = require('koa');
const Logger = require('koa-logger'); // Changed

const app = new Koa();

app.use(Logger()); // Logger is before the route handler

app.use(async (ctx) => {
  ctx.body = 'Hello, World!';
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### @koa/cors

```sh
$ npm i @koa/cors@2
```

```js
const Koa = require('koa');
const CORS = require('@koa/cors'); // Changed

const app = new Koa();

app.use(CORS()); // Before the route handler!

app.use(async (ctx) => {
  ctx.body = 'Hello, World!';
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Koa-compress

```sh
$ npm i koa-compress
```

```js
const Koa = require('koa');
const Compress = require('koa-compress'); // Changed

const app = new Koa();

app.use(
  Compress({
    filter: function(content_type) {
      return /text/i.test(content_type);
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH,
  })
); // Before the route handler! We'll compress any text responses.

app.use(async (ctx) => {
  ctx.body = 'Hello, World!';
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

- [examples](https://github.com/koajs/examples)
