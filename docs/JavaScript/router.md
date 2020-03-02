# 前端路由
## 路由

在最开始的网页交互中，后端路由比较常见。在模板页阶段，经常根据一个路径去请求数据，后端根据服务器的路由配置返回相应的数据信息（html文本，json 数据，图片等）。简单来说路由就是跟后端服务器进行交互的一种方式，通过不同的路径，来请求不同的资源。
前端路由大部分同学都比较熟悉，因为前端的框架的原因，都在用前端路由，它的作用就是根据不同的路径映射到不同的视图，也可以说是URL到函数的映射。

## 前端路由

类似于服务端路由，前端路由实现起来其实也是匹配不同的 url 路径，再进行解析，然后动态的渲染出区域页面（html）内容。但这样存在一个问题，url 每次变化的时候，都会造成请求资源或刷新页面。那解决问题的思路便是在改变url中部分区域，使页面不刷新。或告诉浏览器，这是前端路由，你不要刷新页面。实现这个功能，浏览器提供相应的API。前端路由的实现主要有两种实现方案：hash模式和history模式。

## hash 模式

期初的前端路由，是通过hash来实现路由，url hash模式就是类似于：
```js
http://www.xxx.com/#/login
```
它的最大特点是有个#。早期的开发中#常用于网页锚点，现在基本用在单页面应用的路由中。后面hash值的变化,并不会导致浏览器向服务器发出请求，浏览器不发出请求，也就不会刷新页面。但浏览器会监听hash值的变化, 触发hashchange这个事件。
```js
function refreshData () {
}
window.addEventListener('hashchange', refreshData)
```
对hash值的读写可以通过`window.location.hash`完成。
每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用"后退"按钮，就可以回到上一个位置。
[Location其他api](https://developer.mozilla.org/zh-CN/docs/Web/API/Location)

## history 模式

history模式是HTML5标准发布后有才有的，是前端路由的另一种实现方式。hostory模式中有两个重要的方法，pushState和replaceState；还有一个重要的事件，popstate事件。

history模式实现的原理跟hash实现是相似。用了HTML5的实现，单页路由的url就不会多出一个#，变得更加美观。但因为没有#号，当用户做刷新页面之类的操作时，浏览器还是会给服务器发送请求。为了避免出现这种情况，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面（现在单页面开发环境，都有本地服务，需要在本地配置，如webpack中就有相应的配置项）。

#### pushState方法
pushState方法有三个参数:state，title，URL(可选)
- state: 是一个JavaScript对象，以后你要用到的信息，都可以放到这个对象中。
- title: 新页面的标题，所有浏览器目前都忽略这个值，因此这里可以填null。
- url: 是可选的，负责改变浏览器的地址栏中显示的url,如果没有指定url，你点击前进后退按钮页面还是会变化，只是浏览器的地址栏上显示的url会一直保持不变。
```js
var stateObj = { foo: "bar" };
history.pushState(stateObj, null, "bar.html");
```

#### replaceState方法
replaceState和pushState的区别就在于它不是写入而是替换修改浏览历史中当前纪录，其余和pushState一模一样。
在hash模式中可以使用`window.location.replace()`方法替换路由。

#### popstate事件:
- 定义：每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。
- 注意：仅仅调用pushState方法或replaceState方法 ，并不会触发该事件。只有用户点击浏览器倒退按钮和前进按钮，或者使用JavaScript调用back、forward、go方法时才会触发该事件。
- 用法：使用的时候，可以为popstate事件指定回调函数。这个回调函数的参数是一个event事件对象，它的state属性指向pushState和replaceState方法为当前URL所提供的状态对象（即这两个方法的第一个参数）。
```js
function refreshData (e) {
    console.log(e.state);
}
window.addEventListener('popstate', refreshData)
```

## 两种实现的比较
- Hash的路由，兼容性更好；而History API的路由，更加直观和正式，更适合seo优化。
- pushState方法设置的新URL可以是与当前URL同源的任意URL；而hash只可修改#后面的部分；
- pushState设置的新URL可以与当前URL一模一样，这样也会把记录添加到栈中；而hash设置的新值必须与原来不一样才会触发动作将记录添加到栈中；
- pushState通过state对象参数可以添加任意类型的数据到记录中；而hash只可添加短字符串；
- history虽然在浏览器里游刃有余，但真要通过URL向后端发起 HTTP 请求时，两者的差异就来了。尤其在用户手动输入URL后回车，或者刷新（重启）浏览器的时候,history需要服务端做响应的配置。
- hash模式下，仅hash符号之前的内容会被包含在请求中，如 `http://www.xxx.com`，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回404错误。history模式下，前端的URL必须和实际向后端发起请求的 URL 一致，如 `http://www.xxx.com/book/id`。如果后端缺少对 /book/id 的路由处理，将返回404错误。Vue-Router 官方文档中也说了，history需要后台配置支持。你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面。
- hash路由只要url中hash值发生变化，就会触发hashchange事件，History使用pushState或replaceState方法改变路由时，并不会触发popstate

## 注意事项
- 网上有很多人说微信公众号开发（没测过），会碰到路由方面的很多坑，但说法不一致，有人说hash模式会有好多坑，有人说history会有很多坑。不过理解二者的原理后应该可以快速定位问题并解决。
- 之前在开发中使用history模式，就遇到过找不到页面的坑。