# axios

源码文件夹为加了注释和log的axios源码 可以在测试项目里替换掉node_modules下的axios方便查看log

# Axios 默认配置

    const defaults: AxiosRequestConfig = {
        headers: headers(), // 请求头
        adapter: getDefaultAdapter(), // XMLHttpRequest 发送请求的具体实现
        transformRequest: transformRequest(), // 自定义处理请求相关数据，默认有提供一个修改根据请求的 data 修改 content-type 的方法。
        transformResponse: transformResponse(), // 自定义处理响应相关数据，默认提供了一个将 respone 数据转换为 JSON格式的方法
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        validateStatus(status: number) {
            return status >= 200 && status < 300;
        }
    };

# Axios 传入配置

    export interface AxiosRequestConfig {
        url?: string; // 请求链接
        method?: string; // 请求方法
        baseURL?: string; // 请求的基础链接
        xsrfCookieName?: string; // CSRF 相关
        xsrfHeaderName?: string; // CSRF 相关
        headers?: any; // 请求头设置
        params?: any; // 请求参数
        data?: any; // 请求体
        timeout?: number; // 超时设置
        withCredentials?: boolean; // CSRF 相关
        responseType?: XMLHttpRequestResponseType; // 响应类型
        paramsSerializer?: (params: any) => string; // url query 参数格式化方法
        onUploadProgress?: (progressEvent: any) => void; // 上传处理函数
        onDownloadProgress?: (progressEvent: any) => void; // 下载处理函数
        validateStatus?: (status: number) => boolean;
        adapter?: AxiosAdapter;
        auth?: any;
        transformRequest?: AxiosTransformer | AxiosTransformer[];
        transformResponse?: AxiosTransformer | AxiosTransformer[];
        cancelToken?: CancelToken;
    }
# Features
    从浏览器中创建 XMLHttpRequests
    从 node.js 创建 http 请求
    支持 Promise API
    拦截请求和响应
    转换请求数据和响应数据
    取消请求
    自动转换 JSON 数据
    客户端支持防御 XSRF
# API

## 请求

    axios(url[, config])
    axios.request(url[, config])
    axios.get(url[, config])
    axios.delete(url[, config])
    axios.head(url[, config])
    axios.post(url[, data[, config]])
    axios.put(url[, data[, config]])
    axios.patch(url[, data[, config]])

    
## 创建实例

    var instance = axios.create({
        baseURL: 'https://some-domain.com/api/',
        timeout: 1000,
        headers: {'X-Custom-Header': 'foobar'}
    });

## 实例方法

    axios#(url[, config])
    axios#.request(url[, config])
    axios#.get(url[, config])
    axios#.delete(url[, config])
    axios#.head(url[, config])
    axios#.post(url[, data[, config]])
    axios#.put(url[, data[, config]])
    axios#.patch(url[, data[, config]])

# axios内部流程

axios入口

Axios构造函数(request)

intercepters 请求拦截器

dispatchRequest方法

请求转换器 transformRequest

http请求适配器

响应转换器 transformResponse

interceptors 响应拦截器


# Axios构造函数

    实例属性
        defaults配置
        interceptors{
            request
            response
        }请求响应拦截器
    原型方法
        Axios.prototype.request('delete', 'get', 'head', 'options','post', 'put', 'patch')

![Axios构造函数](./img/axios.png)

# axios是个啥
    axios是一个Function,这个Function指向Axios.prototype.request,这个Function还会有Axios.prototype上的每个方和Axios实例属性，且这些方法的上下文都是指向同一个对象(Axios实例)。
    Axios 库默认导出的是 Axios 的一个实例 axios，而不是 Axios 类本身。但是，这里并没有直接返回 Axios 的实例，而是将 Axios 实例方法 request 的上下文设置为了 Axios。 所以 axios 的类型是 function，不是 object。但由于 function 也是 Object 所以可以设置属性和方法。于是 axios 既可以表现的像实例，又可以直接函数调用 axios(config)

# axios为何会有多种使用方式

    get,post等方法都挂载在Axios原型上
    执行axios.get.post最终都走的是Axios.request
    axios

# axios是如何用promise搭起基于xhr的异步桥梁的

    axios.get('/user?ID=12345')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
    =============
    axios
    Axios.prototype.request
    dispatchRequest
    dispatchAdapter

# 拦截请求和响应

    // 添加请求拦截器
    const myRequestInterceptor = axios.interceptors.request.use(config => {
        // 在发送http请求之前做些什么
        return config; // 有且必须有一个config对象被返回
    }, error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 添加响应拦截器
    axios.interceptors.response.use(response => {
    // 对响应数据做点什么
    return response; // 有且必须有一个response对象被返回
    }, error => {
    // 对响应错误做点什么
    return Promise.reject(error);
    });

    // 移除某次拦截器
    axios.interceptors.request.eject(myRequestInterceptor);

![拦截请求和响应](./img/interceptors.jpg)

# 取消已经发送的请求

    // 第一种取消方法
    axios.get(url, {
    cancelToken: new axios.CancelToken(cancel => {
        if (/* 取消条件 */) {
        cancel('取消日志');
        }
    })
    });

    // 第二种取消方法
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios.get(url, {
    cancelToken: source.token
    });
    source.cancel('取消日志');


CancelToken这个类初始化的时候需要传递一个方法executor，并且它的内部新建了一个promise，最关键的是，它把promise的resolve方法控制权放在了executor方法里面

    let resolveHandle;
    new Promise((resolve)=>{
        resolveHandle=resolve;
    }).then((val)=>{
        console.log('resolve',val);
    });
    resolveHandle('ok');

上面的例子中，我们用resolveHandle获取了一个promise的resolve方法的控制权，这样，我们就可以在外部控制这个promise的成功了。要知道new Promise返回的对象是无法从外部决定它成功还是失败的

source这个方法，我们可以看到，它new了一个CancelToken对象，并传了一个方法executor；采用相同的手法，用cancel变量将executor方法的变量c的控制权拿出来了，那么这个变量c又代表啥呢？

变量c正是我们前面说到的在CancelToken初始化时，传入executor方法的，也即：

    function cancel(message) {
        if (token.reason) {
            // Cancellation has already been requested
            return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
    }
也就是说cancel代表的是上面的这个方法，有了这个方法，就可以在外部控制CancelToken内部的promise对象了。
在source方法中，除了cancel，还有一个token，这个token是CancelToken类的一个实例，可以访问到内部的promise。
因此CancelToken类如此封装的主要目的就是为了能够分离promise和resolve方法，让用户可以自己调用resolve方法。一旦resolve后，就会触发promise的then方法

## 并发

    axios.all(iterable)
    axios.spread(callback)

    axios.all([getUserAccount(), getUserPermissions()])
    .then(axios.spread(function (acct, perms) {
        // 两个请求现在都执行完成
    }));

[Remove `axios.all` and `axios.spread` #1042](https://github.com/axios/axios/issues/1042)

#### [Axios仓库地址](https://github.com/axios/axios)

#### [Axios中文说明](https://www.kancloud.cn/yunye/axios/234845)

#### [axios实例应用及源码剖析](https://github.com/ronffy/axios-tutorial)

#### [TypeScript 重构 Axios 全攻略](https://github.com/leer0911/myXHR/tree/master/doc)

#### [源码拾遗】axios —— 极简封装的艺术](https://zhuanlan.zhihu.com/p/28396592)

#### [axios 之cancelToken原理以及使用](http://www.qiutianaimeili.com/html/page/2019/03/8grudzwvfmq.html)

#### [分析axios源码来找出无法使用all和spread等方法的原因](https://juejin.im/post/5ad192d2518825558c47dcbc)