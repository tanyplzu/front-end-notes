# 前后端通信的方式
    form表单提交
    XMLHttpRequest
    fetch

    websocket
    短轮询/长轮询/长连接 


[XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

# 历史

###    XMLHttpRequest level1

　　只支持文本数据的传送，无法用来读取和上传二进制文件。

　　传送和接收数据时，没有进度信息，只能提示有没有完成。

　　受到"同域限制"（Same Origin Policy），只能向同一域名的服务器请求数据

###     XMLHttpRequest level2

　　可以设置HTTP请求的时限。

　　可以使用FormData对象管理表单数据。

　　可以上传文件。

　　可以请求不同域名下的数据（跨域请求）。

　　可以获取服务器端的二进制数据。

　　可以获得数据传输的进度信息


## 属性

示例 ./xmlhttprequestAPI/readyState.html

    XMLHttpRequest.onreadystatechange
        当readyState属性发生变化时调用的EventHandler。
    XMLHttpRequest.readyState(readOnly)
        返回 一个unsigned short 即无符号短整型，请求的状态码。
| 值 | 状态 | 描述 |
| ---- | ---- | ---- |
| 0 | UNSENT (未打开) | 已创建 XHR 对象，open() 方法还未被调用 |
| 1 | OPENED (未发送) | open() 方法已被成功调用，send() 方法还未被调用 |
| 2 | HEADERS_RECEIVED (已获取响应头) | send() 方法已经被调用，响应头和响应状态已经返回 |
| 3 | LOADING (正在下载响应体) | 响应体下载中，responseText中已经获取了部分数据 |
| 4 | DONE (请求完成) | 整个请求过程已经完毕 |

示例 ./xmlhttprequestAPI/response.html

    XMLHttpRequest.response(readOnly)
        返回ArrayBuffer、Blob、Document、DOMString，具体是哪种类型取决于XMLHttpRequest.responseType的值。其中包含响应体body。
        //axios xhr.js
        var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;

    XMLHttpRequest.responseText(readOnly)
        返回一个DOMString，该DOMString包含对请求的响应，如果请求未成功或尚未发送，则返回null。
        
    XMLHttpRequest.responseType
        responseType 要在调用 open() 初始化请求之后调用， 并且要在调用 send() 发送请求到服务器之前调用
        定义响应类型的枚举值

    XMLHttpRequest.responseURL(readOnly)
        返回响应的序列化URL，如果URL为空，则返回空字符串。
    XMLHttpRequest.responseXML(readOnly)
        返回一个Document，其中包含该请求的响应，如果请求未成功、尚未发送或不能解析为XML或HTML，则返回null。
    XMLHttpRequest.status(readOnly)
        返回  unsigned short 即无符号短整型请求响应状态。
    XMLHttpRequest.statusText(readOnly)

    XMLHttpRequest.timeout
    XMLHttpRequest.upload 
    XMLHttpRequest.withCredentials

## 方法
    
示例 ./xmlhttprequestAPI/request.html

    XMLHttpRequest.abort()
    如果请求已经被发送,则立刻中止请求.

    XMLHttpRequest.setRequestHeader()
    设置HTTP请求头的值。您必须在open()之后、send()之前调用setRequestHeader()这个方法。
    XMLHttpRequest.getAllResponseHeaders()
    以字符串的形式返回所有用CRLF分隔的响应头，如果没有收到响应，则返回null。
    XMLHttpRequest.getResponseHeader()
    返回包含指定响应头的字符串，如果响应尚未收到或响应中不存在该报头，则返回null。


    XMLHttpRequest.open()
    初始化一个请求。该方法只能JavaScript代码中使用，若要在native code中初始化请求，请使用openRequest()。

    XMLHttpRequest.send()
    发送请求。如果请求是异步的（默认），那么该方法将在请求发送后立即返回。

## 事件

### 事件触发流程

示例 ./xmlhttprequestAPI/event.html

![事件触发流程](./img/xhr-event-progress.png)

    const xhr = new XMLHttpRequest();
    xhr.open('GET','url')
    xhr.send()
    xhr.onload=function(){
        console.log(xhr.getAllResponseHeaders())
    }

xhr绑定事件的书写顺序在send之前之后不影响请求的发起和接收,也不会影响事件的触发