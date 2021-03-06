---
sidebarDepth: 0
---

# HTTP

[[toc]]

## HTTP/0.9

- 第一个是只有一个请求行，并没有 HTTP 请求头和请求体，因为只需要一个请求行就可以完整表达客户端的需求了。

- 第二个是服务器也没有返回头信息，这是因为服务器端并不需要告诉客户端太多信息，只需要返回数据就可以了。
- 第三个是返回的文件内容是以 ASCII 字符流来传输的，因为都是 HTML 格式的文件，所以使用 ASCII 字节码来传输是最合适的。

## HTTP/1.0

- HTTP/1.0 引入了请求头和响应头，已 Key-Value 形式保存；
- 文件格式不仅仅局限于 ASCII 编码，还有很多其他类型编码的文件；
- 引入了状态码；
- 增加了各种不同类型的文件
- 服务器会对数据进行压缩后再传输
- 为了减轻服务器的压力，在 HTTP/1.0 中提供了 Cache 机制，用来缓存已经下载过的数据。
- 服务器需要统计客户端的基础信息，比如 Windows 和 macOS 的用户数量分别是多少，所以 HTTP/1.0 的请求头中还加入了用户代理的字段

请求头中可以如下设置：

```js
accept: text/html
accept-encoding: gzip, deflate, br // 压缩形式
accept-Charset: ISO-8859-1,utf-8
accept-language: zh-CN,zh
```

响应头的数据信息：

```js
content-encoding: br
content-type: text/html; charset=UTF-8
```

## HTTP/1.1

### 1. 改进持久连接

HTTP/1.0 每进行一次 HTTP 通信，都需要经历建立 TCP 连接、传输 HTTP 数据和断开 TCP 连接三个阶段。

HTTP/1.1 中增加了持久连接的方法，它的特点是在一个 TCP 连接上可以传输多个 HTTP 请求，只要浏览器或者服务器没有明确断开连接，那么该 TCP 连接会一直保持。

目前浏览器中对于同一个域名，默认允许同时建立 6 个 TCP 持久连接

### 2. 不成熟的 HTTP 管线化

由于各种原因，管线化技术最终被各大厂商放弃了。不过 1.1 是支持管线化的。

### 3. 提供虚拟主机的支持

一台物理主机上绑定多个虚拟主机，每个虚拟主机都有自己的单独的域名，这些单独的域名都公用同一个 IP 地址。

HTTP/1.1 的请求头中增加了 Host 字段，用来表示当前的域名地址，这样服务器就可以根据不同的 Host 值做不同的处理。

### 4. 对动态生成的内容提供了完美支持

浏览器判断数据包是否接收完成，不完全依赖 Content-Length 字段，服务器会将数据分割成若干个任意大小的数据块，每个数据块发送时会附上上个数据块的长度，最后使用一个零长度的块作为发送数据完成的标志。

### 5. 户端 Cookie、安全机制

> 总结： HTTP/1.1，增加了持久连接方法来提升连接效率，同时还尝试使用管线化技术提升效率（不过由于各种原因，管线化技术最终被各大厂商放弃了）。除此之外，HTTP/1.1 还引入了 Cookie、虚拟主机的支持、对动态内容的支持等特性

## HTTP/1.1 的主要问题

**第一个原因，TCP 的慢启动。**

TCP 的慢启动：TCP 刚启动时，不知道网络中的情况，刚开始的发送窗口比较少，在没有丢包的情况会依次增加。

> 丢包为依据，或探测带宽为依据

**第二个原因，同时开启了多条 TCP 连接，那么这些连接会竞争固定的带宽。**

拥塞避免：一个域名 6 个 TCP 连接，在网络不好的情况为了避免拥塞，需降低速率。（待确认？）

**第三个原因，HTTP/1.1 队头阻塞的问题。**

如果 TCP 通道中的某个请求因为某些原因没有及时返回，那么就会阻塞后面的所有请求，这就是著名的队头阻塞的问题。

> 慢启动和 TCP 连接之间相互竞争带宽是由于 TCP 本身的机制导致的，而队头阻塞是由于 HTTP/1.1 的机制导致的。

## HTTP/2

### 1. 多路复用

在 HTTP/2 中，有两个非常重要的概念，分别是帧（frame）和流（stream）。

帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。

多路复用，就是在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。<font color='red'> 注意，这里并不是指的 TCP 队头阻塞，而是 HTTP 队头阻塞，两者并不是一回事。 </font>

<!-- ![多路复用](./imgs/http_多路复用.jpg) -->

### 2. 二进制传输

HTTP/2 中所有加强性能的核心点在于此。在之前的 HTTP 版本中，我们是通过文本的方式传输数据。在 HTTP/2 中引入了新的编码机制，所有传输的数据都会被分割，并采用二进制格式编码。

数据经过二进制分帧层处理之后，会被转换为一个个带有请求 ID 编号的帧，通过协议栈将这些帧发送给服务器。反向也是如此。

<!-- ![http_二级制分帧](./imgs/http_二级制分帧.jpg) -->

### 3. Header 压缩

在服务器和客户端之间建立哈希表，将用到的字段存放在这张表中，那么在传输的时候对于之前出现过的值，只需要把索引(比如 0，1，2，...)传给对方即可，对方拿到索引查表就行了。这种传索引的方式，可以说让请求头字段得到极大程度的精简和复用。

![Header](./imgs/http2_header.png)

其次是对于整数和字符串进行哈夫曼编码，哈夫曼编码的原理就是先将所有出现的字符建立一张索引表，然后让出现次数多的字符对应的索引尽可能短，传输的时候也是传输这样的索引序列，可以达到非常高的压缩率。

### 4. 服务端 Push

服务器知道该 HTML 页面会引用几个重要的 JavaScript 文件和 CSS 文件，那么在接收到 HTML 请求之后，附带将要使用的 CSS 文件和 JavaScript 文件一并发送给浏览器，这样当浏览器解析完 HTML 文件之后，就能直接拿到需要的 CSS 文件和 JavaScript 文件，

### 5. 可以设置请求的优先级

> http/2 是没必要用雪碧图了；
>
> 虽然 HTTP/2 解决了 HTTP/1.1 中的队头阻塞问题，但是 HTTP/2 依然是基于 TCP 协议的，而 TCP 协议依然存在数据包级别的队头阻塞问题

::: tip Note

HTTP 2.0 最大的改进有两点，一是支持服务端推送，二是支持 TCP 连接复用。

:::

## HTTP/2 中的二进制帧是如何设计的？

## HTTP/3

QUIC 虽然基于 UDP，但是在原本的基础上新增了很多功能，比如多路复用、0-RTT、使用 TLS1.3 加密、流量控制、有序交付、重传等等功能。

HTTP/3 中的 QUIC 协议集合了以下几点功能：

**实现了类似 TCP 的流量控制、传输可靠性的功能。** 虽然 UDP 不提供可靠性的传输，但 QUIC 在 UDP 的基础之上增加了一层来保证数据可靠性传输。它提供了数据包重传、拥塞控制以及其他一些 TCP 中存在的特性。

**集成了 TLS 加密功能。** 目前 QUIC 使用的是 TLS1.3，相较于早期版本 TLS1.3 有更多的优点，其中最重要的一点是减少了握手所花费的 RTT 个数。

**实现了 HTTP/2 中的多路复用功能。** 和 TCP 不同，QUIC 实现了在同一物理连接上可以有多个独立的逻辑数据流（如下图）。实现了数据流的单独传输，就解决了 TCP 中队头阻塞的问题。

![http_二级制分帧](./imgs/http_QUIC.png)

**实现了快速握手功能。**由于 QUIC 是基于 UDP 的，所以 QUIC 可以实现使用 0-RTT 或者 1-RTT 来建立连接，这意味着 QUIC 可以用最快的速度来发送和接收数据，这样可以大大提升首次打开页面的速度。

> 三次握手就是 1.5 个 RTT；

## 一个 TCP 连接能发几个 HTTP 请求

如果是 HTTP 1.0 版本协议，一般情况下，不支持长连接，因此在每次请求发送完毕之后，TCP 连接即会断开，因此一个 TCP 发送一个 HTTP 请求，但是有一种情况可以将一条 TCP 连接保持在活跃状态，那就是通过 Connection 和 Keep-Alive 首部，在请求头带上 Connection: Keep-Alive，并且可以通过 Keep-Alive 通用首部中指定的，用逗号分隔的选项调节 keep-alive 的行为，如果客户端和服务端都支持，那么其实也可以发送多条，不过此方式也有限制，Chrome 限制是 6 个。

而如果是 HTTP 1.1 版本协议，支持了长连接，因此只要 TCP 连接不断开，便可以一直发送 HTTP 请求，持续不断，没有上限； 同样，如果是 HTTP 2.0 版本协议，支持多用复用，一个 TCP 连接是可以并发多个 HTTP 请求的，同样也是支持长连接，因此只要不断开 TCP 的连接，HTTP 请求数也是可以没有上限地持续发送

## HTTPS

- HTTPS 还是通过了 HTTP 来传输信息，但是信息通过 TLS 协议进行了加密。
- 在 TLS 中使用了两种加密技术，分别为：对称加密和非对称加密。
- 在传输数据阶段依然使用对称加密，但是对称加密的密钥我们采用非对称加密来传输
- 浏览器端先验证证书，验证了证书之后，才继续后续流程。

## TLS 握手

![http_TLS](https://static001.geekbang.org/resource/image/77/af/77c852ff2202b2b7bb3299a96a0f4aaf.png)

1. 首先是 tcp 的三次握手建立连接
2. client 发送 random1+支持的加密算法集合（clientHello）
3. server 收到信息，返回选择一个加密算法+random2（serverHello）+ 证书+ 确认
4. clent 验证证书有效性，并用 random1+random2 生成 pre-master 通过服务器公钥加密 发送给 server
5. server 收到 pre-master 后解密，根据约定的加密算法对 random1+random2+pre-master 生成 master-secret，然后发送预定成功
6. client 收到生成同样的 master-secert，对称加密秘钥传输完毕

> 在 1.3 协议中，首次建立连接只需要一个 RTT，后面恢复连接不需要 RTT 了。

### TLS 1.2 握手过程

### TLS 1.3 做了哪些改进？

#### 强化安全

在 TLS1.3 中废除了非常多的加密算法，最后只保留五个加密套件:

- TLS_AES_128_GCM_SHA256
- TLS_AES_256_GCM_SHA384
- TLS_CHACHA20_POLY1305_SHA256
- TLS_AES_128_GCM_SHA256
- TLS_AES_128_GCM_8_SHA256

最后剩下的对称加密算法只有 AES 和 CHACHA20，之前主流的也会这两种。分组模式也只剩下 GCM 和 POLY1305, 哈希摘要算法只剩下了 SHA256 和 SHA384 了。

ECDHE 取代 RSA。

#### 提升性能

大体的方式和 TLS1.2 差不多，不过和 TLS 1.2 相比少了一个 RTT， 服务端不必等待对方验证证书之后才拿到client_params，而是直接在第一次握手的时候就能够拿到, 拿到之后立即计算secret，节省了之前不必要的等待时间。这种 TLS 1.3 握手方式也被叫做1-RTT握手。

### 数字证书 CA

已极客时间为例：

- 首先极客时间需要准备一套私钥和公钥，私钥留着自己使用；
- 然后极客时间向 CA 机构提交公钥、公司、站点等信息并等待认证，这个认证过程可能是收费的；
- CA 通过线上、线下等多种渠道来验证极客时间所提供信息的真实性，如公司是否存在、企业是否合法、域名是否归属该企业等；
- 如信息审核通过，CA 会向极客时间签发认证的数字证书，包含了极客时间的公钥、组织信息、CA 的信息、有效时间、证书序列号等，这些信息都是明文的，同时包含一个 CA 生成的签名。

> 首先 CA 使用 Hash 函数来计算极客时间提交的明文信息，并得出信息摘要；然后 CA 再使用它的私钥对信息摘要进行加密，加密后的密文就是 CA 颁给极客时间的数字签名。

## HTTP 和 HTTPS 的区别

- url 开头不一致是最明显的区分；
- 其次 http 没有 https 安全，http 没有经过 SSL/TLS 加密、身份验证；
- 还有默认的端口不一样，http 是 80、https 是 443，https 需要证书，https 是防止中间人攻击方式的一种。

## HTTPS 总结

浏览器安全主要包括页面安全、系统安全、传输安全三个部分。https 主要保证传输过程的安全，从防止中间人窃取修改伪造的角度循序渐进的介绍了 https 的实现过程。

1. 对称加密传输（协商秘钥的过程容易被窃取）
2. 非对称加密传输（服务端用私钥加密的内容，可以通过它的公钥进行解密）
3. 非对称加密交换秘钥、对称加密传输内容（DNS 劫持 如何保证服务器是可信的）
4. 引入 CA 权威机构保证服务器可信性。

数字证书的申请过程：服务器生成一对公钥和私钥，私钥自己保存，通过公钥+企业+网站信息去 CA 机构申请证书。CA 机构通过全方位的验证给这个网站颁发证书，证书内容包括企业信息、证书有效期、证书编号，以及自己私钥加密上述信息的摘要、网站的公钥。服务器就获得了 CA 的认证。浏览器认证证书过程：浏览器从服务器拿到网站的证书，通过 CA 的公钥解密证书信息的摘要跟使用摘要算法计算企业信息等的摘要对比，如果一致则证明证书有效。如果证书 CA 是可靠的呢，通过给 CA 颁发证书的根 CA 验证，通常操作系统中包括顶级 CA 证书（它们自己给自己签名称为自签名证书，我们自己生成证书也是自签名证书 只是它不是操作系统内置的）

## Host、Referer 和 Origin 的区别

Host:

- Host 请求头指明了服务器的域名（对于虚拟主机来说），以及（可选的）服务器监听的 TCP 端口号。
- 如果没有给定端口号，会自动使用被请求服务的默认端口（比如请求一个 HTTP 的 URL 会自动使用 80 端口）。
- HTTP/1.1 的所有请求报文中必须包含一个 Host 头字段。如果一个 HTTP/1.1 请求缺少 Host 头字段或者设置了超过一个的 Host 头字段，会返回一个 400（Bad Request）状态码。

Referer：

Referer 首部包含了当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。服务端一般使用 Referer 首部识别访问来源，可能会以此进行统计分析、日志记录以及缓存优化等

Origin：

- 只有跨域请求，或者同域时发送 post 请求，才会携带 origin 请求头，而 referer 不论何种情况下，只要浏览器能获取到请求源都会携带
- 如果浏览器不能获取请求源，那么 origin 满足上面情况也会携带，不过其值为 null。这点与 referer 不同，浏览器如果不能获取请求源，那么请求头中不会携带 referer。
- origin 的值只包括协议、域名和端口，而 erferer 不但包括协议、域名、端口还包括路径，参数，注意不包括 hash 值。

> [host、referer 和 origin 的区别](https://cloud.tencent.com/developer/article/1467299)

## 什么是持久连接以及管线化

持久连接：在 HTTP/1.1 之前的时代，每一次 HTTP 请求就需要先 TCP 建立三次握手，传输完毕后就断开连接，会增加很多的通信开销。

HTTP/1.1 增加了持久连接，也就是说在一次 TCP 连接里面可以发送多次 HTTP 请求，只要任意一端没有明确提出断开连接，则保持 TCP 的连接状态，也就是响应头里面的 Connection:keep-alive。

管线化：在持久连接里处理 HTTP 的方式是，发送响应完成后才能发起下一个请求，而管线化解决的问题是可以一次发起多个 HTTP 请求，且可以同时返回多次响应结果。

## HTTP 请求报文和响应报文里分别有什么

报文的结构大致是两部分，报文首部，一个空行，和报文主体，报文主体不一定非要有。请求报文：包括了请求行，里面包括请求的方法，协议版本；各种首部的字段，例如服务器域名、客户端信息、缓存信息、压缩传输的方式等。响应报文：包括了状态行，协议版本，响应的状态码；各种首部的字段，如 ETag、日期、内容类型等，以及响应的报文主体。

## get 和 post 的区别

- 从缓存的角度，GET 请求会被浏览器主动缓存下来，留下历史记录，而 POST 默认不会。
- 从编码的角度，GET 只能进行 URL 编码，只能接收 ASCII 字符，而 POST 没有限制。
- 从参数的角度，GET 一般放在 URL 中，因此不安全，POST 放在请求体中，更适合传输敏感信息。
- 从幂等性的角度，GET 是幂等的，而 POST 不是。(幂等表示执行相同的操作，结果也是相同的)
- 从 TCP 的角度，GET 请求会把请求报文一次性发出去，而 POST 会分为两个 TCP 数据包，首先发 header 部分，如果服务器响应 100(continue)， 然后发 body 部分。(火狐浏览器除外，它的 POST 请求只发一个 TCP 包)

## HTTP 缺点

- 无状态
- 明文传输
- 队头阻塞问题

## Accept 系列字段

对于 Accept 系列字段的介绍分为四个部分: 数据格式、压缩方式、支持语言和字符集。

### 数据格式

Content-Type 和 Accept

- text： text/html, text/plain, text/css 等
- image: image/gif, image/jpeg, image/png 等
- audio/video: audio/mpeg, video/mp4 等
- application: application/json, application/javascript, application/pdf, application/octet-stream

### 压缩方式

```http
// 发送端
Content-Encoding: gzip
// 接收端
Accept-Encoding: gzip
```

- gzip: 当今最流行的压缩格式
- deflate: 另外一种著名的压缩格式
- br: 一种专门为 HTTP 发明的压缩算法

### 支持语言

```http
// 发送端
Content-Language: zh-CN, zh, en
// 接收端
Accept-Language: zh-CN, zh, en
```

### 字符集

```http
// 发送端
Content-Type: text/html; charset=utf-8
// 接收端
Accept-Charset: charset=utf-8
```

## Cookie 属性

### 生存周期

Cookie 的有效期可以通过 Expires 和 Max-Age 两个属性来设置。

- Expires 即过期时间
- Max-Age 用的是一段时间间隔，单位是秒，从浏览器收到报文开始计算。

若 Cookie 过期，则这个 Cookie 会被删除，并不会发送给服务端。

### 作用域

关于作用域也有两个属性: Domain 和 path, 给 Cookie 绑定了域名和路径，在发送请求之前，发现域名或者路径和这两个属性不匹配，那么就不会带上 Cookie。值得注意的是，对于路径来说，/表示域名下的任意路径都允许使用 Cookie。

### 安全相关

如果带上 Secure，说明只能通过 HTTPS 传输 cookie。

如果 cookie 字段带上 HttpOnly，那么说明只能通过 HTTP 协议传输，不能通过 JS 访问，这也是预防 XSS 攻击的重要手段。

相应的，对于 CSRF 攻击的预防，也有 SameSite 属性。SameSite 可以设置为三个值，Strict、Lax 和 None。

### Cookie 的缺点

- 容量缺陷。Cookie 的体积上限只有 4KB，只能用来存储少量的信息。

- 性能缺陷。Cookie 紧跟域名，不管域名下面的某一个地址需不需要这个 Cookie ，请求都会携带上完整的 Cookie，这样随着请求数的增多，其实会造成巨大的性能浪费的，因为请求携带了很多不必要的内容。但可以通过 Domain 和 Path 指定作用域来解决。

- 安全缺陷。由于 Cookie 以纯文本的形式在浏览器和服务器中传递，很容易被非法用户截获，然后进行一系列的篡改，在 Cookie 的有效期内重新发送给服务器，这是相当危险的。另外，在 HttpOnly 为 false 的情况下，Cookie 信息能直接通过 JS 脚本来读取。

## 什么情况会触发 options 请求

options 通常用于，在跨域请求前发起预检请求，以检测请求是否被服务器接受。

跨域请求中分为简单请求和预检请求两种，符合以下条件可视为简单请求：

- 使用的 HTTP method 是 `GET POST HEAD`
- content-type 是 `text/plain mutipart/form-data application/x-www-form-urlencode` 三种之一

除去简单请求外，其他请求就会先触发预检请求。

常见的，比如使用

- content-Type 为 application/xml 或 text/xml 的 POST 请求
- 设置自定义头，比如 X-JSON、X-MENGXIANHUI 等

预检请求返回的头部报文中有

- Access-Control-Allow-Origin： 服务器可接受的请求来源
- Access-Control-Request-Method： 服务器实际请求所使用的 HTTP 方法
- Access-Control-Request-Headers`： 服务器实际请求所携带的自定义首部字段。

客户端基于从预检请求获得的信息来判断，是否继续执行跨域请求。

> 注意：跨域请求若想发送 cookie 信息，需要服务端设置 resp.setHeader("Access-Control-Allow-Credentials","true"); 客户端设置 withCredentials: true

参考资料： [跨域请求](https://cloud.tencent.com/developer/news/397683)

## HTTP 代理

### 代理服务器到底是用来做什么的?

- 负载均衡。客户端的请求只会先到达代理服务器，后面到底有多少源服务器，IP 都是多少，客户端是不知道的。因此，这个代理服务器可以拿到这个请求之后，可以通过特定的算法分发给不同的源服务器，让各台源服务器的负载尽量平均。当然，这样的算法有很多，包括随机算法、轮询、一致性 hash、LRU(最近最少使用)等等。

- 保障安全。利用心跳机制监控后台的服务器，一旦发现故障机就将其踢出集群。并且对于上下行的数据进行过滤，对非法 IP 限流，这些都是代理服务器的工作。

- 缓存代理。将内容缓存到代理服务器，使得客户端可以直接从代理服务器获得而不用到源服务器那里。下一节详细拆解。

### Via

```text
客户端 -> 代理1 -> 代理2 -> 源服务器
```

在源服务器收到请求后，会在请求头拿到这个字段:

```http
Via: proxy_server1, proxy_server2
```

而源服务器响应时，最终在客户端会拿到这样的响应头:

```http
Via: proxy_server2, proxy_server1
```

### X-Real-IP

是一种获取用户真实 IP 的字段，不管中间经过多少代理，这个字段始终记录最初的客户端的 IP。

相应的，还有 `X-Forwarded-Host` 和 `X-Forwarded-Proto`，分别记录客户端(注意哦，不包括代理)的域名和协议名。

### 代理 缓存

## HTTP 如何处理大文件的传输

```http
Accept-Ranges: bytes 0-9/100
```

## HTTP 中如何处理表单数据的提交

有两种主要的表单提交的方式，体现在两种不同的 Content-Type 取值:

- `application/x-www-form-urlencoded`
- `multipart/form-data`

### application/x-www-form-urlencoded

- 其中的数据会被编码成以&分隔的键值对
- 字符以 URL 编码方式编码。

```
转换过程: {a: 1, b: 2} -> a=1&b=2 -> "a%3D1%26b%3D2"
```

### multipart/form-data

- 请求头中的 `Content-Typ`e 字段会包含 `boundary`，且 boundary 的值有浏览器默认指定。例: Content-Type: multipart/form-data;boundary=----WebkitFormBoundaryRRJKeWfHPGrS4LKe。
- 数据会分为多个部分，每两个部分之间通过分隔符来分隔，每部分表述均有 HTTP 头部描述子包体，如 Content-Type，在最后的分隔符会加上--表示结束。

相应的请求体是下面这样:

```http
Content-Disposition: form-data;name="data1";
Content-Type: text/plain
data1
----WebkitFormBoundaryRRJKeWfHPGrS4LKe
Content-Disposition: form-data;name="data2";
Content-Type: text/plain
data2
----WebkitFormBoundaryRRJKeWfHPGrS4LKe--
```

在实际的场景中，对于图片等文件的上传，基本采用 multipart/form-data 而不用 application/x-www-form-urlencoded，因为没有必要做 URL 编码，带来巨大耗时的同时也占用了更多的空间。

## 相关参考

- 《Web 性能权威指南》
- 《Web 协议详解与抓包实战》
- 《浏览器工作原理与实践》
- 《趣谈网络协议》
- 《深入理解 TCP 协议：从原理到实战》
- MDN [HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)
- [HTTP 灵魂之问，巩固你的 HTTP 知识体系](https://juejin.cn/post/6844904100035821575)
