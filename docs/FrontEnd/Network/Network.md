---
sidebarDepth: 0
---

# 网络协议

[[toc]]

## TCP/UDP

### UDP

属于通信传输流中的传输层，UDP 是面向无连接的，传输双方没有确认机制，也就是说你要传就传吧，没有 HTTP 那样需要事先三从握手。缺点是不能保证数据传输的可靠性；优点是报文头信息少开销小，支持一对多、多对多、多对一的传输方式，传输实时性强。常用于直播以及游戏。

### TCP

TCP（Transmission Control Protocol，传输控制协议）是一种面向连接的、可靠的、基于字节流的传输层通信协议。相对于 UDP，TCP 有下面两个特点：

- 对于数据包丢失的情况，TCP 提供重传机制；
- TCP 引入了数据包排序机制，用来保证把乱序的数据包组合成一个完整的文件。

### TCP 的队头阻塞

虽然 HTTP/2 解决了应用层面的队头阻塞问题，不过和 HTTP/1.1 一样，HTTP/2 依然是基于 TCP 协议的，而 TCP 最初就是为了单连接而设计的。你可以把 TCP 连接看成是两台计算机之前的一个虚拟管道，计算机的一端将要传输的数据按照顺序放入管道，最终数据会以相同的顺序出现在管道的另外一头。

![http_tcp](./imgs/http_tcp.png)

从一端发送给另外一端的数据会被拆分为一个个按照顺序排列的数据包，这些数据包通过网络传输到了接收端，接收端再按照顺序将这些数据包组合成原始数据，这样就完成了数据传输。

如果在数据传输的过程中，有一个数据因为网络故障或者其他原因而丢包了，那么整个 TCP 的连接就会处于暂停状态，需要等待丢失的数据包被重新传输过来。你可以把 TCP 连接看成是一个按照顺序传输数据的管道，管道中的任意一个数据丢失了，那之后的数据都需要等待该数据的重新传输。

### 拥塞控制

- 慢启动
- 拥塞避免。也就是慢启动的阈值。
- 快速重传与快速恢复

### 性能检测清单（TCP）

- 把服务器升级到最新版本（Linux：3.2+）；
- 确保 cwnd 的大小为 10；
- 禁用空闲后的慢启动；
- 确保启动窗口缩放；
- 减少传输冗余数据；
- 压缩要传输的数据；
- 把服务器放到离用户近的地方，减少往返时间；
- 尽最大可能重用已经建立的 TCP 连接。

### UDP 与 TCP 的区别是什么

首先 UDP 协议是面向无连接的，也就是说不需要在正式传递数据之前先连接起双方。然后 UDP 协议只是数据报文的搬运工，不保证有序且不丢失的传递到对端，并且 UDP 协议也没有任何控制流量的算法，总的来说 UDP 相较于 TCP 更加的轻便。

## HTTP

### HTTP/0.9

- 第一个是只有一个请求行，并没有 HTTP 请求头和请求体，因为只需要一个请求行就可以完整表达客户端的需求了。

- 第二个是服务器也没有返回头信息，这是因为服务器端并不需要告诉客户端太多信息，只需要返回数据就可以了。
- 第三个是返回的文件内容是以 ASCII 字符流来传输的，因为都是 HTML 格式的文件，所以使用 ASCII 字节码来传输是最合适的。

### HTTP/1.0

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

### HTTP/1.1

#### 1. 改进持久连接

HTTP/1.0 每进行一次 HTTP 通信，都需要经历建立 TCP 连接、传输 HTTP 数据和断开 TCP 连接三个阶段。

HTTP/1.1 中增加了持久连接的方法，它的特点是在一个 TCP 连接上可以传输多个 HTTP 请求，只要浏览器或者服务器没有明确断开连接，那么该 TCP 连接会一直保持。

目前浏览器中对于同一个域名，默认允许同时建立 6 个 TCP 持久连接

#### 2. 不成熟的 HTTP 管线化

由于各种原因，管线化技术最终被各大厂商放弃了。不过 1.1 是支持管线化的。

#### 3. 提供虚拟主机的支持

一台物理主机上绑定多个虚拟主机，每个虚拟主机都有自己的单独的域名，这些单独的域名都公用同一个 IP 地址。

HTTP/1.1 的请求头中增加了 Host 字段，用来表示当前的域名地址，这样服务器就可以根据不同的 Host 值做不同的处理。

#### 4. 对动态生成的内容提供了完美支持

浏览器判断数据包是否接收完成，不完全依赖 Content-Length 字段，服务器会将数据分割成若干个任意大小的数据块，每个数据块发送时会附上上个数据块的长度，最后使用一个零长度的块作为发送数据完成的标志。

#### 5. 户端 Cookie、安全机制

> 总结： HTTP/1.1，增加了持久连接方法来提升连接效率，同时还尝试使用管线化技术提升效率（不过由于各种原因，管线化技术最终被各大厂商放弃了）。除此之外，HTTP/1.1 还引入了 Cookie、虚拟主机的支持、对动态内容的支持等特性

### HTTP/1.1 的主要问题

**第一个原因，TCP 的慢启动。**

TCP 的慢启动：TCP 刚启动时，不知道网络中的情况，刚开始的发送窗口比较少，在没有丢包的情况会依次增加。

> 丢包为依据，或探测带宽为依据

**第二个原因，同时开启了多条 TCP 连接，那么这些连接会竞争固定的带宽。**

拥塞避免：一个域名 6 个 TCP 连接，在网络不好的情况为了避免拥塞，需降低速率。（待确认？）

**第三个原因，HTTP/1.1 队头阻塞的问题。**

如果 TCP 通道中的某个请求因为某些原因没有及时返回，那么就会阻塞后面的所有请求，这就是著名的队头阻塞的问题。

> 慢启动和 TCP 连接之间相互竞争带宽是由于 TCP 本身的机制导致的，而队头阻塞是由于 HTTP/1.1 的机制导致的。

### HTTP/2

#### 1. 多路复用

在 HTTP/2 中，有两个非常重要的概念，分别是帧（frame）和流（stream）。

帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。

多路复用，就是在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。

<!-- ![多路复用](./imgs/http_多路复用.jpg) -->

#### 2. 二进制传输

HTTP/2 中所有加强性能的核心点在于此。在之前的 HTTP 版本中，我们是通过文本的方式传输数据。在 HTTP/2 中引入了新的编码机制，所有传输的数据都会被分割，并采用二进制格式编码。

数据经过二进制分帧层处理之后，会被转换为一个个带有请求 ID 编号的帧，通过协议栈将这些帧发送给服务器。反向也是如此。

<!-- ![http_二级制分帧](./imgs/http_二级制分帧.jpg) -->

#### 3. Header 压缩

不是对相应数据压缩，是对头部信息进行压缩。

#### 4. 服务端 Push

服务器知道该 HTML 页面会引用几个重要的 JavaScript 文件和 CSS 文件，那么在接收到 HTML 请求之后，附带将要使用的 CSS 文件和 JavaScript 文件一并发送给浏览器，这样当浏览器解析完 HTML 文件之后，就能直接拿到需要的 CSS 文件和 JavaScript 文件，

#### 5. 可以设置请求的优先级

> http/2 是没必要用雪碧图了；
>
> 虽然 HTTP/2 解决了 HTTP/1.1 中的队头阻塞问题，但是 HTTP/2 依然是基于 TCP 协议的，而 TCP 协议依然存在数据包级别的队头阻塞问题

::: tip Note

HTTP 2.0 最大的改进有两点，一是支持服务端推送，二是支持 TCP 连接复用。

:::

### HTTP/3

QUIC 虽然基于 UDP，但是在原本的基础上新增了很多功能，比如多路复用、0-RTT、使用 TLS1.3 加密、流量控制、有序交付、重传等等功能。

HTTP/3 中的 QUIC 协议集合了以下几点功能：

**实现了类似 TCP 的流量控制、传输可靠性的功能。** 虽然 UDP 不提供可靠性的传输，但 QUIC 在 UDP 的基础之上增加了一层来保证数据可靠性传输。它提供了数据包重传、拥塞控制以及其他一些 TCP 中存在的特性。

**集成了 TLS 加密功能。** 目前 QUIC 使用的是 TLS1.3，相较于早期版本 TLS1.3 有更多的优点，其中最重要的一点是减少了握手所花费的 RTT 个数。

**实现了 HTTP/2 中的多路复用功能。** 和 TCP 不同，QUIC 实现了在同一物理连接上可以有多个独立的逻辑数据流（如下图）。实现了数据流的单独传输，就解决了 TCP 中队头阻塞的问题。

![http_二级制分帧](./imgs/http_QUIC.png)

**实现了快速握手功能。**由于 QUIC 是基于 UDP 的，所以 QUIC 可以实现使用 0-RTT 或者 1-RTT 来建立连接，这意味着 QUIC 可以用最快的速度来发送和接收数据，这样可以大大提升首次打开页面的速度。

> 三次握手就是 1.5 个 RTT；

### 一个 TCP 连接能发几个 HTTP 请求

如果是 HTTP 1.0 版本协议，一般情况下，不支持长连接，因此在每次请求发送完毕之后，TCP 连接即会断开，因此一个 TCP 发送一个 HTTP 请求，但是有一种情况可以将一条 TCP 连接保持在活跃状态，那就是通过 Connection 和 Keep-Alive 首部，在请求头带上 Connection: Keep-Alive，并且可以通过 Keep-Alive 通用首部中指定的，用逗号分隔的选项调节 keep-alive 的行为，如果客户端和服务端都支持，那么其实也可以发送多条，不过此方式也有限制，Chrome 限制是 6 个。

而如果是 HTTP 1.1 版本协议，支持了长连接，因此只要 TCP 连接不断开，便可以一直发送 HTTP 请求，持续不断，没有上限； 同样，如果是 HTTP 2.0 版本协议，支持多用复用，一个 TCP 连接是可以并发多个 HTTP 请求的，同样也是支持长连接，因此只要不断开 TCP 的连接，HTTP 请求数也是可以没有上限地持续发送

### HTTPS

- HTTPS 还是通过了 HTTP 来传输信息，但是信息通过 TLS 协议进行了加密。
- 在 TLS 中使用了两种加密技术，分别为：对称加密和非对称加密。
- 在传输数据阶段依然使用对称加密，但是对称加密的密钥我们采用非对称加密来传输
- 浏览器端先验证证书，验证了证书之后，才继续后续流程。

### TLS 握手

![http_TLS](https://static001.geekbang.org/resource/image/77/af/77c852ff2202b2b7bb3299a96a0f4aaf.png)

1. 首先是 tcp 的三次握手建立连接
2. client 发送 random1+支持的加密算法集合（clientHello）
3. server 收到信息，返回选择一个加密算法+random2（serverHello）+ 证书+ 确认
4. clent 验证证书有效性，并用 random1+random2 生成 pre-master 通过服务器公钥加密 发送给 server
5. server 收到 pre-master 后解密，根据约定的加密算法对 random1+random2+pre-master 生成 master-secret，然后发送预定成功
6. client 收到生成同样的 master-secert，对称加密秘钥传输完毕

> 在 1.3 协议中，首次建立连接只需要一个 RTT，后面恢复连接不需要 RTT 了。

#### 数字证书 CA

已极客时间为例：

- 首先极客时间需要准备一套私钥和公钥，私钥留着自己使用；
- 然后极客时间向 CA 机构提交公钥、公司、站点等信息并等待认证，这个认证过程可能是收费的；
- CA 通过线上、线下等多种渠道来验证极客时间所提供信息的真实性，如公司是否存在、企业是否合法、域名是否归属该企业等；
- 如信息审核通过，CA 会向极客时间签发认证的数字证书，包含了极客时间的公钥、组织信息、CA 的信息、有效时间、证书序列号等，这些信息都是明文的，同时包含一个 CA 生成的签名。

> 首先 CA 使用 Hash 函数来计算极客时间提交的明文信息，并得出信息摘要；然后 CA 再使用它的私钥对信息摘要进行加密，加密后的密文就是 CA 颁给极客时间的数字签名。

### HTTP 和 HTTPS 的区别

- url 开头不一致是最明显的区分；
- 其次 http 没有 https 安全，http 没有经过 SSL/TLS 加密、身份验证；
- 还有默认的端口不一样，http 是 80、https 是 443，https 需要证书，https 是防止中间人攻击方式的一种。

### HTTPS 总结

浏览器安全主要包括页面安全、系统安全、传输安全三个部分。https 主要保证传输过程的安全，从防止中间人窃取修改伪造的角度循序渐进的介绍了 https 的实现过程。

1. 对称加密传输（协商秘钥的过程容易被窃取）
2. 非对称加密传输（服务端用私钥加密的内容，可以通过它的公钥进行解密）
3. 非对称加密交换秘钥、对称加密传输内容（DNS 劫持 如何保证服务器是可信的）
4. 引入 CA 权威机构保证服务器可信性。

数字证书的申请过程：服务器生成一对公钥和私钥，私钥自己保存，通过公钥+企业+网站信息去 CA 机构申请证书。CA 机构通过全方位的验证给这个网站颁发证书，证书内容包括企业信息、证书有效期、证书编号，以及自己私钥加密上述信息的摘要、网站的公钥。服务器就获得了 CA 的认证。浏览器认证证书过程：浏览器从服务器拿到网站的证书，通过 CA 的公钥解密证书信息的摘要跟使用摘要算法计算企业信息等的摘要对比，如果一致则证明证书有效。如果证书 CA 是可靠的呢，通过给 CA 颁发证书的根 CA 验证，通常操作系统中包括顶级 CA 证书（它们自己给自己签名称为自签名证书，我们自己生成证书也是自签名证书 只是它不是操作系统内置的）

### Host、Referer 和 Origin 的区别

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

### 什么是持久连接以及管线化

持久连接：在 HTTP/1.1 之前的时代，每一次 HTTP 请求就需要先 TCP 建立三次握手，传输完毕后就断开连接，会增加很多的通信开销。

HTTP/1.1 增加了持久连接，也就是说在一次 TCP 连接里面可以发送多次 HTTP 请求，只要任意一端没有明确提出断开连接，则保持 TCP 的连接状态，也就是响应头里面的 Connection:keep-alive。

管线化：在持久连接里处理 HTTP 的方式是，发送响应完成后才能发起下一个请求，而管线化解决的问题是可以一次发起多个 HTTP 请求，且可以同时返回多次响应结果。

### 为什么发起 HTTP 请求前需要 TCP 三次握手

为了让客户端和服务端都能确定彼此**发起**和**响应**的能力是否靠谱。

- 第一次：客户端发 SYN 给服务度
- 第二次：服务端发 SYN/ACK 给客户端
- 第三次：客户端发 ACK 给服务端

SYN 是同步，ACK 为确认； SYN 是包的序列号，对方回复时 ACK 会加 1。 SYN 和 ACK 的起始位置不同，因为网络有延迟、复制重发，会丢失。

### 三次握手

三次握手的目标：

- 同步 sequence 序列
  - 初始化序列 ISN
- 交换 TCP 通讯参数
  - 如 MSS、窗口比例因子、选择性确认、指定校验和算法

### ISN 能设置成一个固定值吗

不能，TCP 连接四元组（源 IP、源端口号、目标 IP、目标端口号）唯一确定，所以就算所有的连接 ISN 都是一个固定的值，连接之间也是不会互相干扰的。但是会有几个严重的问题

1. 出于安全性考虑。如果被知道了连接的 ISN，很容易构造一个在对方窗口内的序列号，源 IP 和源端口号都很容易伪造，这样一来就可以伪造 RST 包，将连接强制关闭掉了。如果采用动态增长的 ISN，要想构造一个在对方窗口内的序列号难度就大很多了。

2. 因为开启 SO_REUSEADDR 以后端口允许重用，收到一个包以后不知道新连接的还是旧连接的包因为网络的原因姗姗来迟，造成数据的混淆。如果采用动态增长的 ISN，那么可以保证两个连接的 ISN 不会相同，不会串包。

### 四次挥手

> [深入理解 TCP 协议](https://juejin.im/book/5c70dbbe51882562046911bc/section/5cf5f583e51d4558936aa033)

![四次挥手](https://user-gold-cdn.xitu.io/2019/6/26/16b911c618264239?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

1. 客户端调用 close 方法，执行「主动关闭」，会发送一个 FIN 报文给服务端，从这以后客户端不能再发送数据给服务端了，客户端进入 FIN-WAIT-1 状态。FIN 报文其实就是将 FIN 标志位设置为 1。

2. 服务端收到 FIN 包以后回复确认 ACK 报文给客户端，服务端进入 CLOSE_WAIT，客户端收到 ACK 以后进入 FIN-WAIT-2 状态。

3. 服务端也没有数据要发送了，发送 FIN 报文给客户端，然后进入 LAST-ACK 状态，等待客户端的 ACK。同前面一样如果 FIN 段没有携带数据，也需要消耗一个序列号。

4. 客户端收到服务端的 FIN 报文以后，回复 ACK 报文用来确认第三步里的 FIN 报文，进入 TIME_WAIT 状态，等待 2 个 MSL 以后进入 CLOSED 状态。服务端收到 ACK 以后进入 CLOSED 状态。TIME_WAIT 是一个很神奇的状态，后面有文章会专门介绍。

### 为什么挥手要四次，变为三次可以吗

当然可以，因为有延迟确认的存在，把第二步的 ACK 经常会跟随第三步的 FIN 包一起捎带会对端。

发送 FIN 包以后，会进入半关闭（half-close）状态，表示自己不会再给对方发送数据了。因此如果服务端收到客户端发送的 FIN 包以后，只能表示客户端不会再给自己发送数据了，但是服务端这个时候是可以给客户端发送数据的。

在这种情况下，如果不及时发送 ACK 包，死等服务端这边发送数据，可能会造成客户端不必要的重发 FIN 包

如果服务端确定没有什么数据需要发给客户端，那么当然是可以把 FIN 和 ACK 合并成一个包，四次挥手的过程就成了三次。

### HTTP 请求报文和响应报文里分别有什么

报文的结构大致是两部分，报文首部，一个空行，和报文主体，报文主体不一定非要有。请求报文：包括了请求行，里面包括请求的方法，协议版本；各种首部的字段，例如服务器域名、客户端信息、缓存信息、压缩传输的方式等。响应报文：包括了状态行，协议版本，响应的状态码；各种首部的字段，如 ETag、日期、内容类型等，以及响应的报文主体。

### 常见的响应状态码有哪些

大致可以分为 2 开头表示成功、3 开头表示重定向、4 开头客户端错误、5 开头服务器错误。

- 204：如当浏览器发出请求处理后，返回 204 响应，表示客户端显示的页面不发生更新。
- 206：客户端只要想要响应内容中的一部分，服务端成功执行了这次响应。响应报文中的 Content-Range 则指定了哪部分的内容。
- 301：永久重定向，表示请求的资源已被分配到了新的 URI，以后使用新的吧
- 302：临时重定向，表示请求的资源已被分配到了新的 URI，现在使用新的吧
- 303：临时重定向，表示请求的资源已被分配到了新的 URI，请使用 get 方法获取资源。
- 304：服务端找不到根据客户端发送附带条件的请求。（附带条件指 get 请求报文中包含 If-Match、If-Modified-Since、If-None-Match、If-Range、If-Unmodified-Since 中的一个）
- 400：请求报文存在语法错误。
- 403：请求资源被服务器拒绝。
- 503：表明服务器暂时处于超负载或正在停机维护，无法处理请求。

### get 和 post 的区别

- get 回退不会重新发起请求，post 会；
- get 默认会被浏览器主动缓存，post 不会；
- get 只能进行 url 编码，post 支持多种编码方式；
- get 的请求参数会被拼接到 url 后面，post 放在 request-body 中；
- get 产生一个 tcp 数据包，post 会产生两个 tcp 包；
- get 主要是应用为获取资源，post 主要是应用于传输或修改资源。

### 什么情况会触发 options 请求

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

## WebSocket

### 过滤器

- WS
- is:running

### 长连接的心跳保持

- HTTP 长连接只能基于简单的超时（常见为 65 秒）
- WebSocket 连接基于 ping/pong 心跳机制维持

### 设计哲学

在 Web 约束下暴露 TCP 给上层

## 相关参考

- 《Web 性能权威指南》
- 《Web 协议详解与抓包实战》
- 《浏览器工作原理与实践》
- 《趣谈网络协议》
- 《深入理解 TCP 协议：从原理到实战》