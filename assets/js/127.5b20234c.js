(window.webpackJsonp=window.webpackJsonp||[]).push([[127],{551:function(r,t,e){"use strict";e.r(t);var a=e(15),v=Object(a.a)({},(function(){var r=this,t=r.$createElement,e=r._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":r.$parent.slotKey}},[e("h1",{attrs:{id:"buffer"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#buffer"}},[r._v("#")]),r._v(" Buffer")]),r._v(" "),e("p"),e("div",{staticClass:"table-of-contents"},[e("ul",[e("li",[e("a",{attrs:{href:"#二进制数据和编码"}},[r._v("二进制数据和编码")])]),e("li",[e("a",{attrs:{href:"#字节和字符"}},[r._v("字节和字符")])]),e("li",[e("a",{attrs:{href:"#二进制数据"}},[r._v("二进制数据")])]),e("li",[e("a",{attrs:{href:"#buffer-基础知识"}},[r._v("Buffer 基础知识")]),e("ul",[e("li",[e("a",{attrs:{href:"#缓冲内存的大小"}},[r._v("缓冲内存的大小")])]),e("li",[e("a",{attrs:{href:"#内存分配策略-8kb"}},[r._v("内存分配策略 - 8KB")])])])])])]),e("p"),r._v(" "),e("h2",{attrs:{id:"二进制数据和编码"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#二进制数据和编码"}},[r._v("#")]),r._v(" 二进制数据和编码")]),r._v(" "),e("p",[r._v("无论是英文字母，还是中文汉字、标点符号，都能对应到一段 0 和 1 这样一组二进制数据。这样的二进制，需要有一种规则来把它对应到正确的字符，这个对应的规则或标准理解回来就是编码，我把字符串用 utf8 编码，那么你收到的 0 和 1 再用同一种编码解码开，就不会乱码了。")]),r._v(" "),e("ul",[e("li",[r._v("ASCII 是基于拉丁字母的编码，用 8 个 0/1 二进制表示，前面一个 bit 为 0，后面 7 位定义了 128 个字符，其中 95 个是可显示字符，比如英文字母 A，它二进制表示是 0100 0001，十进制是 65，十六进制是 41，进制不同表示不同。")]),r._v(" "),e("li",[r._v("UTF-8 是 Unicode 标准的一种实现而已（还有 UTF-16 等），它可以表示 Unicode 标准的任何字符，第一个字节与 ASCII 兼容，是邮箱网页等应用优先采用的编码，也是 Node Buffer 默认的编码，范围从 U+0000 到 U+10FFFF。")]),r._v(" "),e("li",[r._v("Base64 基于 64 个可打印字符来表示二进制数据的一种编码格式，比如 Hello 的 base64 是 SGVsbG8=，具体转换过程大家可以自行 Google。")])]),r._v(" "),e("p",[r._v("而 binary/hex/utf16le 都是 Node 所支持的编码格式，其中 utf8 是默认的编码，而类似 GBK/GB2312 等编码是 Node 无法解析的，可能需要 iconv 这样的三方库来支持")]),r._v(" "),e("h2",{attrs:{id:"字节和字符"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#字节和字符"}},[r._v("#")]),r._v(" 字节和字符")]),r._v(" "),e("p",[r._v("Byte，也即字节，是一种对数据大小衡量的单位，所以 1GB = 1024MB = 1048576KB = 1073741824B，也就是 10 亿字节，而 1 字节 = 8 比特(bit)，也就是 8 位，8 位就是一个长度为 8 的二进制，比如 10011001，它能表示的范围就是从 0-255，也就是 2 的 8 次方，所以 ASCII 实际上可以容纳 256 个字符。")]),r._v(" "),e("p",[r._v("我们知道一个英文字母，占据 1 个字节（8 位二进制）的空间，而一个汉字占据 2 个字节的空间，而字母或汉字，其实就是字符了，所以 1GB 可以容纳 5 亿个汉字。无论是操作字节还是操作字符，当以流的方式进行，它们本质上就是连续的二进制数据，而字节又是最小单位，所以本质上我们操作的就是字节，也即字节流")]),r._v(" "),e("h2",{attrs:{id:"二进制数据"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#二进制数据"}},[r._v("#")]),r._v(" 二进制数据")]),r._v(" "),e("p",[r._v("想象下，你有一大堆的沙子（假如有 100 GB）需要运走，但是想一次性运走，先不说电脑带宽，光服务器内存可能都吃不消，所以得有一种机制，能不断的把沙子拎出来放到管道里面，像水一样不间断的流走，直到这一堆沙子完全到达目的地，那么这样的一个机制，在计算机的世界里，就是通过 "),e("code",[r._v("Stream")]),r._v("（流） 来实现数据的动态读写，再借助管道 "),e("code",[r._v("pipe")]),r._v("，流可以被生产也可以被消耗，说白了就是流数据可读可写。")]),r._v(" "),e("h2",{attrs:{id:"buffer-基础知识"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#buffer-基础知识"}},[r._v("#")]),r._v(" Buffer 基础知识")]),r._v(" "),e("p",[r._v("数据是许多个 8 比特数据单位组成，每个 8 比特都有它包含的信息，那么我们就是在不停的操作这些二进制的 8 比特单位数据，当一坨数据被搬运往另外一个地点时，假设 A 是起点（数据文件本身），B 是目的地（待写入的数据文件），从 A 往 B 搬运时，一头是 A 不断的提供数据，一头是 B 处理存储数据，当 B 处理数据比较慢，或者从 A 拿出数据比较慢的时候，就会出现两头速度不一致，要么 A 等待 B，要么 B 等待 A，这个时候，一定有一部分数据在路上无处安放，那么就需要有一个地方，来暂时存储这个数据，缓冲一下运输速度，这个地方一般选择在内存里面，这个专门开辟的区域就是缓冲，即 Buffer。")]),r._v(" "),e("h3",{attrs:{id:"缓冲内存的大小"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#缓冲内存的大小"}},[r._v("#")]),r._v(" 缓冲内存的大小")]),r._v(" "),e("p",[r._v("虽然 Node 的代码运行底层是 V8，实际分配给缓冲的内存是在 C++ 层申请，也就是在 v8 之外的堆内存，所以 Buffer 类更像是一个混合体，底层细节都在 C++ 里面，调度策略这些在 JS 的接口里面，其中一个原因就是 v8 引擎一开始也并不是为服务端设计的，所以它内部的最大可用堆内存只有 1.4G，可以通过传入 "),e("code",[r._v("--max-old-space-size")]),r._v(" 新老生代参数来解除限制，但面对大内存管理有时候还是不够用，"),e("strong",[r._v("所以有时候我们运行代码抛出 RangeError 错误的时候，有可能就是内存实例爆池了")]),r._v("。")]),r._v(" "),e("p",[r._v("而 Node 里面，要想突破 v8 的内存限制，还有一种手段就是通过 Buffer，Buffer 是通过 C++ 层面申请的，它不走 V8 的内存机制，单个 Buffer 实例在 64 位系统上是 2GB，这个限制在 C++ 层面就已经约束了。")]),r._v(" "),e("h3",{attrs:{id:"内存分配策略-8kb"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#内存分配策略-8kb"}},[r._v("#")]),r._v(" 内存分配策略 - 8KB")]),r._v(" "),e("p",[r._v("原本 JS 是没有一种机制来读取或者操作二进制数据流的，但 ES6 里面新增了 TypedArray，而 Node 也很快跟进，底层则采用 Unit8Array 来为 Buffer 提供数据结构支持，这意味着从 JS 层面有了二进制数据流操作分配和管理的能力，先来了解几个基础概念：")]),r._v(" "),e("ul",[e("li",[r._v("ArrayBuffer: 内存中一段原始二进制数据，可以通过视图来解读它，视图的意思是，这段数据可以用不同的方式表示，每一种方式就是一个视图")]),r._v(" "),e("li",[r._v("TypedArray : 描述二进制数据缓存区的视图，类似于数组 Array 的形式，比如有 Int8Array/Int16Array/Uint8Array 等")]),r._v(" "),e("li",[r._v("Uint8Array : 是数组类型，表示一个 8 位无符号整型数组，长度为一个字节，类似这样：[0, 0, 0, 0, 0, 0, 0, 0]，是 TypedArray 的一种实现，那同样还有 Uint16Array 和浮点数组等。")])]),r._v(" "),e("p",[r._v("资料：")]),r._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://juejin.cn/book/6844733758315184142",target:"_blank",rel:"noopener noreferrer"}},[r._v("10+ 代码案例掌握 NodeJS 核心基础知识"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=v.exports}}]);