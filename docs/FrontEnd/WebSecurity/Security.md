---
sidebarDepth: 0
---

# 其它 Web 安全

[[toc]]

## 点击劫持

### 什么是点击劫持

是一种视觉欺骗的攻击手段，攻击者将需要攻击的网站通过 `iframe` 嵌入的方式嵌入到自己的网页里，将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。

```html
<body style="background:url(clickhijack.png) no-repeat">
  <iframe
    style="opacity:.1"
    src="http://localhost:1521/post/1"
    width="800"
    height="600"
  >
  </iframe>
</body>
```

案例：

- 用游戏的方式打开了摄像头；
- 邮箱中，邮件的转发；

### 如何防范点击劫持

1. 现代浏览器设置 HTTP 响应头 X-FRAME-OPTIONS 为 DENY，这个响应头就是为了防御点击劫持的；兼容性比较好。ie8 以上都支持。

2. 判断 top.location === window.location 是否相同

   ```js
   if (top.location === window.location) {
     top.location = window.location;
   }
   ```

3. 远古浏览器使用 js 防御，当通过 iframe 的方式加载页面时，让攻击者网站不显示内容。

## 传输安全

### http 传输窃听篡改

也叫中间人攻击。

- 在中间设备窃听数据
- 篡改数据，插入广告

使用命令行查看经过科哪些中间设备：

```js
// mac
traceroute https://juejin.im/timeline
// windows
tracert https://juejin.im/timeline
```

解决方法：

- https TLS(SSL) 加密

## 密码安全

### MD5

不可逆，简单密码可以通过查表得到；优于明文。

### SHA256

比特别就是用 SHA256 和非对称加密。

Hash 函数是这样，不论原始数据有多长、有多少位，经过 Hash 运算后，输出的值的长度都是固定的。

> node 中的加密模块：[crypto](http://nodejs.cn/api/crypto.html)

### 生物密码

- 缺少私密性，容易泄露；比如指纹，人脸。
- 生物特征没有对错，是一个概率的判断，不会百分之百可靠。相似性监测，没法做 hash 变换，只能留原始值。
- 唯一性，终生无法修改。

目前技术，还需要保持一个谨慎的态度。

## 其它安全问题

### DOS 拒绝服务攻击

- 模拟正常用户
- 大量占用服务资源
- 无法服务正常用户

优化方式：

- TCP 半连接
- 正常的 HTTP 连接
- 攻击 DNS,DNS 带宽叫小

### DDOS 大规模分布式拒绝服务攻击

- 流量可以达到几十到上百 G
- 分布式（肉鸡、代理）
- 极难防御。即便有方法防御，可能直接被运营商下线。

案例（非常多）：

- 如游戏；
- 2009 年 5 月 19，多个省断网；同时也导致了暴风影音疯狂请求解析，导致各地的 DNS 服务器瘫痪。
- [DDoS 攻击爆发！医疗在线教育成重点，代理攻击成常态](http://www.myzaker.com/article/5e7ede008e9f09031e1c712e/);

常用解决方式：

- 防火墙
- 专业交换机和路由器
- 流量清洗
- 高防 IP

优化方式：

- 避免重逻辑业务；
- 快速失败，快速返回。防止任务过度重试
- 防雪崩的机制。给系统设置请求上线。给别的请求返回失败。
- 有损服务
- CDN,对动态任务的请求，不是很理想

### 接口怎么防刷

被人通过工具在短时间内恶意大量请求服务端。常用优化方式如下

- referer 校验 UA 校验
- 客户端和服务端约定签名算法，由服务端校验签名
- 服务端对请求 ip 单位时间内请求数量限制
- 通过前置交互式验证手段，先验证通过在接收请求

### 重放攻击

- 重复提交；
- 常见于支付，抽奖，刷票等

优化方式：

- 加密；
- 加时间戳；
- 加 token，token 只能使用一次。
- onnce
- 以上标识为了防篡改，需要做签名

## 安全沙箱

是系统设计层面的。

将渲染进程和操作系统隔离的这道墙就是我们要聊的安全沙箱。安全沙箱是不能防止 XSS 或者 CSRF 一类的攻击安全沙箱的目的是隔离渲染进程和操作系统，让渲染进行没有访问操作系统的权利 XSS 或者 CSRF 主要是利用网络资源获取用户的信息，这和操作系统没有关系的

## CSP

内容安全策略 (CSP) 是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 (XSS (en-US)) 和数据注入攻击等。

### 使用 CSP

你可以使用 Content-Security-Policy HTTP 头部 来指定你的策略，像这样:

```http
Content-Security-Policy: policy
```

或使用

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src https://*; child-src 'none';"
/>
```

policy 参数是一个包含了各种描述你的 CSP 策略指令的字符串。

```http
Content-Security-Policy: default-src 'self'
```

一个网站管理者想要所有内容均来自站点的同一个源 (不包括其子域名)

例 1：

```http
Content-Security-Policy: default-src 'self' *.trusted.com
```

一个网站管理者允许内容来自信任的域名及其子域名 (域名不必须与 CSP 设置所在的域名相同)

例 2：

```http
Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com
```

- 图片可以从任何地方加载(注意 "\*" 通配符)。
- 多媒体文件仅允许从 media1.com 和 media2.com 加载(不允许从这些站点的子域名)。
- 可运行脚本仅允许来自于 userscripts.example.com。

例 3：

```http
Content-Security-Policy: default-src https://onlinebanking.jumbobank.com
```

该服务器仅允许通过 HTTPS 方式并仅从 onlinebanking.jumbobank.com 域名来访问文档。

例 4：

```http
Content-Security-Policy: default-src 'self' *.mailsite.com; img-src *
```

同样图片允许从任何地方加载，但不允许 JavaScript 或者其他潜在的危险内容(从任意位置加载)。

### 违例报告

```http
Content-Security-Policy: default-src 'self'; report-uri http://reportcollector.example.com/collector.cgi
```

报告格式：

```http
Content-Security-Policy: default-src 'none'; style-src cdn.example.com; report-uri /_/csp-reports
```

报告样式

```json
{
  "csp-report": {
    "document-uri": "http://example.com/signup.html",
    "referrer": "",
    "blocked-uri": "http://example.com/css/style.css",
    "violated-directive": "style-src cdn.example.com",
    "original-policy": "default-src 'none'; style-src cdn.example.com; report-uri /_/csp-reports"
  }
}
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta
      http-equiv="Content-Security-Policy"
      content="script-src 'self'; form-action 'self';"
    />
    <title>Document</title>
  </head>
  <body>
    <div>This is content</div>
    <script>
      console.log('inline js');
    </script>
    <script src="test.js"></script>
    <script src="https://cdn.bootcss.com/jquery/3.3.1/core.js"></script>
  </body>
</html>
```

```js
const http = require('http');
const fs = require('fs');

http
  .createServer(function(request, response) {
    console.log('request come', request.url);

    if (request.url === '/') {
      const html = fs.readFileSync('test.html', 'utf8');
      response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Security-Policy':
          "script-src 'self'; form-action 'self'; report-uri /report",
      });
      response.end(html);
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/javascript',
      });
      response.end('console.log("loaded script")');
    }
  })
  .listen(8888);

console.log('server listening on 8888');
```

- [内容安全策略( CSP )](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)
