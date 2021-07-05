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
  <iframe style="opacity:.1" src="http://localhost:1521/post/1" width="800" height="600"> </iframe>
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

## 一些前端安全的资料

- [Where to Store your JWTs – Cookies vs HTML5 Web Storage](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage)

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
