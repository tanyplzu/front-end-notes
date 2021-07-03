---
sidebarDepth: 0
---

# CSRF

[[toc]]

## 什么是 CSRF

CSRF 是跨站请求伪造意思。原理是攻击者构造出一个后端请求地址，诱导用户去点击发起请求。如果是登陆状态，服务端就会以为是用户在操作，从而进行相应的逻辑，比如冒用用户转账，转发邮件，发帖等等。

CSRF 的要点就在于，它不是为了窃取用户的登录凭证（cookie 等），而是直接利用用户已经登录过网站而留存在浏览器上的凭证，诱使用户访问恶意链接，借助登录凭证去执行敏感操作，整个攻击过程是在用户的浏览器上完成的。

案例：Q 币、QQ 音乐向腾讯微博分享歌单、csrf 蠕虫。

## 发起 CSRF 攻击的条件

- 目标站点一定要有 CSRF 漏洞；
- 用户要登录过目标站点，并且在浏览器上保持有该站点的登录状态；
- 攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生。
- 跨站请求可以用各种方式：图片 URL、超链接、CORS、Form 提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪。

由于同源策略，第三方网站向自己的网站提交数据时不会携带第三方网站的 cookie。但第三方网站向自己网站服务器提交数据时会携带自己网站的 cookie。为什么会这样，是因为 cookie 是和要请求的目标地址绑定的。

CSRF 通常是跨域的，因为外域通常更容易被攻击者掌控。但是如果本域下有容易被利用的功能，比如可以发图和链接的论坛和评论区，攻击可以直接在本域下进行，而且这种攻击更加危险。

## 实施 CSRF 攻击的方式

### GET 类型的 CSRF

```html
<img src="https://doc.abc.org/sendcoin?user=hacker&number=100" />
```

### POST 类型的 CSRF

```html
<form id="hacker-form" action="https://doc.abc.org/sendcoin" method="POST">
  <input type="hidden" name="user" value="hacker" />
  <input type="hidden" name="number" value="100" />
</form>
<script>
  document.getElementById('hacker-form').submit();
</script>
```

### 链接类型的 CSRF

```html
<a href="https://doc.abc.org/sendcoin?user=hacker&number=100" taget="_blank">
  点击下载美女照片
</a>
```

## CSRF 检测方法

- 抓包记录正常的 HTTP 请求；
- 分析 HTTP 请求参数是否可预测，以及相应的用途；
- 去掉或更改 referer 为第三方站点，然后重放请求；
- 判断是否达到与正常请求的同等效果，若是则可能存在 CSRF 漏洞，反之则不存在。

## 如何防范 CSRF

- 不让 get 请求对数据进行修改；
- 不让第三方网站访问到用户的 cookie，设置 cookie 的 SameSite 属性为 strict 或 lax，不让 cookie 随跨域请求携带（就 cookie 不让第三方网站使用）；
- 同源检测：阻止第三方网站请求接口，验证 Referer 和 Origin；
- Token 验证，登陆后服务器下发一个随机 token，之后的请求带上，CSRF Token 或双重 Cookie 验证。

## 同源检测

在 HTTP 协议中，每一个异步请求都会携带两个 Header，用于标记来源域名：

- Origin Header
- Referer Header

这两个 Header 在浏览器发起请求时，大多数情况会自动带上，并且不能由前端自定义内容。

### Origin Header

如果 Origin 存在，可以直接使用 Origin 中的字段确认来源域名就可以。但是 Origin 在以下两种情况下并不存在：

- **IE11 同源策略：** IE 11 不会在跨站 CORS 请求上添加 Origin 标头，Referer 头将仍然是唯一的标识。最根本原因是因为 IE 11 对同源的定义和其他浏览器有不同，有两个主要的区别。
- **302 重定向：** 在 302 重定向之后 Origin 不包含在重定向的请求中，因为 Origin 可能会被认为是其他来源的敏感信息。对于 302 重定向的情况来说都是定向到新的服务器上的 URL，因此浏览器不想将 Origin 泄漏到新的服务器上。

### Referer Header

对于 Ajax 请求，图片和 script 等资源请求，Referer 为发起请求的页面地址。对于页面跳转，Referer 为打开页面历史记录的前一个页面地址。因此我们使用 Referer 中链接的 Origin 部分可以得知请求的来源域名。

但是每个浏览器对于 Referer 的具体实现可能有差别，并不能保证浏览器自身没有安全漏洞。使用验证 Referer 值的方法，就是把安全性都依赖于第三方（即浏览器）来保障，从理论上来讲，这样并不是很安全。在部分情况下，攻击者可以隐藏，甚至修改自己请求的 Referer。

新版的 `Referrer Policy` 规定了五种 Referer 策略：`No Referrer`、`No Referrer When Downgrade`、`Origin Only`、`Origin When Cross-origin`、和 `Unsafe URL`。之前就存在的三种策略： `never`、`default` 和 `always`。

把 Referrer Policy 的策略设置成 `same-origin`，对于同源的链接和引用，会发送 Referer，referer 值为 Host 不带 Path；跨域访问则不携带 Referer。

设置 Referrer Policy 的方法有三种：

1. 在 CSP 设置
2. 页面头部增加 meta 标签
3. a 标签增加 referrerpolicy 属性

攻击者可以在自己的请求中隐藏 Referer。

```md
![](https://awps-assets.meituan.net/mit-x/blog-images-bundle-2018b/ff0cdbee.example/withdraw?amount=10000&for=hacker)
```

以下情况下 Referer 没有或者不可信：

1. IE6、7 下使用 window.location.href=url 进行界面的跳转，会丢失 Referer。
2. IE6、7 下使用 window.open，也会缺失 Referer。
3. HTTPS 页面跳转到 HTTP 页面，所有浏览器 Referer 都丢失。
4. 点击 Flash 上到达另外一个网站的时候，Referer 的情况就比较杂乱，不太可信。 5.javascript:// 伪协议就能以空 referer 的形式发起请求，很容易绕过限制。

### 无法确认来源域名情况

当 Origin 和 Referer 头文件不存在时该怎么办？如果 Origin 和 Referer 都不存在，建议直接进行阻止。

### 如何阻止外域请求

通过 Header 的验证，我们可以知道发起请求的来源域名。但是，且慢！当一个请求是页面请求（比如网站的主页），而来源是搜索引擎的链接（例如百度的搜索结果），也会被当成疑似 CSRF 攻击。

此外，CSRF 大多数情况下来自第三方域名，但并不能排除本域发起。如果攻击者有权限在本域发布评论（含链接、图片等，统称 UGC），那么它可以直接在本域发起攻击，这种情况下同源策略无法达到防护的作用。

**结论:**

同源验证是一个相对简单的防范方法，能够防范绝大多数的 CSRF 攻击。但这并不是万无一失的，对于安全性要求较高，或者有较多用户输入内容的网站，我们就要对关键的接口做额外的防护措施。

## CSRF Token

Token 是一个比较有效的 CSRF 防护方法，只要页面没有 XSS 漏洞泄露 Token，那么接口的 CSRF 攻击就无法成功。

结论：在会话中存储 CSRF Token 比较繁琐，而且不能在通用的拦截上统一处理所有的接口。

::: tip

验证码和密码其实也可以起到 CSRF Token 的作用哦，而且更安全。

为什么很多银行等网站会要求已经登录的用户在转账时再次输入密码，现在是不是有一定道理了？

:::

### koa-csrf

koa 中 可以使用 koa-csrf 插件用来防止 CSRF 攻击。原理是在 session 之中写入一个秘密的 token，用户每次使用 POST 方法提交数据的时候，必须含有这个 token，否则就会抛出错误。

POST 请求含有 token，可以是以下几种方式之一，koa-csrf 插件就能获得 token。

- 表单的\_csrf 字段
- 查询字符串的\_csrf 字段
- HTTP 请求头信息的 x-csrf-token 字段
- HTTP 请求头信息的 x-xsrf-token 字段

## 双重 Cookie 验证

双重 Cookie 采用以下流程：

- 在用户访问网站页面时，向请求域名注入一个 Cookie，内容为随机字符串（例如 csrfcookie=v8g9e4ksfhw ）。
- 在前端向后端发起请求时，取出 Cookie，并添加到 URL 的参数中（接上例 POST https://www.a.com/comment?csrfcookie=v8g9e4ksfhw ）。
- 后端接口验证 Cookie 中的字段与 URL 参数中的字段是否一致，不一致则拒绝。

此方法相对于 CSRF Token 就简单了许多。可以直接通过前后端拦截的的方法自动化实现。后端校验也更加方便，只需进行请求中字段的对比，而不需要再进行查询和存储 Token。

**结论:**

用双重 Cookie 防御 CSRF 的优点：

- 无需使用 Session，适用面更广，易于实施。
- Token 储存于客户端中，不会给服务器带来压力。
- 相对于 Token，实施成本更低，可以在前后端统一拦截校验，而不需要一个个接口和页面添加。

缺点：

- Cookie 中增加了额外的字段。
- 如果有其他漏洞（例如 XSS），攻击者可以注入 Cookie，那么该防御方式失效。
- 难以做到子域名的隔离。
- 为了确保 Cookie 传输安全，采用这种防御方式的最好确保用整站 HTTPS 的方式，如果还没切 HTTPS 的使用这种方式也会有风险。

## Samesite Cookie

Samesite 有：`Strict`和`Lax` 两个属性。

- Strict： 这种称为严格模式，表明这个 Cookie 在任何情况下都不可能作为第三方 Cookie。
- Lax：其他网站通过页面跳转过来的时候可以使用 Cookie，可以保障外域连接打开页面时用户的登录状态。但相应的，其安全性也比较低。

b.com 设置了如下 Cookie：

```js
Set-Cookie: foo=1; Samesite=Strict
Set-Cookie: bar=2; Samesite=Lax
Set-Cookie: baz=3
```

我们在 a.com 下发起对 b.com 的任意请求，foo 这个 Cookie 都不会被包含在 Cookie 请求头中，但 bar 会。

> 另外一个问题是 Samesite 的兼容性不是很好，现阶段除了从新版 Chrome 和 Firefox 支持以外，Safari 以及 iOS Safari 都还不支持，现阶段看来暂时还不能普及。

## 防止网站被利用

- 严格管理所有的上传接口，防止任何预期之外的上传内容（例如 HTML）。
- 添加 Header X­Content­Type­Options: nosniff 防止黑客上传 HTML 内容的资源（例如图片）被解析为网页。
- 对于用户上传的图片，进行转存或者校验。不要直接使用用户填写的图片链接。

## 防护策略

- CSRF 自动防御策略：同源检测（Origin 和 Referer 验证）。
- CSRF 主动防御措施：Token 验证 或者 双重 Cookie 验证 以及配合 Samesite Cookie。
- 保证页面的幂等性，后端接口不要在 GET 页面中做用户操作。

## 资料

- [美团技术资料-前端系列](http://dpurl.cn/DWVhPpS)
- OWASP.[Cross-Site_RequestForgery(CSRF)\_Prevention_Cheat_Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- Gmail Security [Hijack Case.Google-Gmail-Security-Hijack](https://www.davidairey.com/google-gmail-security-hijack/)
- Netsparker [Blog.Same-Site-Cookie-Attribute-Prevent-Cross-site-Request-Forgery](https://www.netsparker.com/blog/web-security/same-site-cookie-attribute-prevent-cross-site-request-forgery/)
- MDN.[Same-origin_policy#IE_Exceptions](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#IE_Exceptions)
