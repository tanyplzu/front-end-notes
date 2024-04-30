(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{389:function(t,s,a){"use strict";a.r(s);var n=a(6),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"angularjs-笔记"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#angularjs-笔记"}},[t._v("#")]),t._v(" AngularJS 笔记")]),t._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#angularjs-笔记"}},[t._v("AngularJS 笔记")]),s("ul",[s("li",[s("a",{attrs:{href:"#脏检查机制"}},[t._v("脏检查机制")])]),s("li",[s("a",{attrs:{href:"#watch"}},[t._v("$watch")])]),s("li",[s("a",{attrs:{href:"#digest"}},[t._v("$digest")])]),s("li",[s("a",{attrs:{href:"#apply"}},[t._v("$apply")])]),s("li",[s("a",{attrs:{href:"#内置-服务替代原生服务"}},[t._v("内置$服务替代原生服务")])]),s("li",[s("a",{attrs:{href:"#在-angularjs-中-provider、factory-和-service-有什么区别"}},[t._v("在 AngularJS 中 Provider、Factory 和 Service 有什么区别？")])]),s("li",[s("a",{attrs:{href:"#injector"}},[t._v("$injector")])]),s("li",[s("a",{attrs:{href:"#独立-scope-声明中的-、-、-三种形式"}},[t._v("独立 scope 声明中的“@”、“&”、“=”三种形式")])]),s("li",[s("a",{attrs:{href:"#restrict"}},[t._v("restrict")])]),s("li",[s("a",{attrs:{href:"#observe"}},[t._v("$observe")])]),s("li",[s("a",{attrs:{href:"#angular-element"}},[t._v("angular.element")])])])])])]),s("p"),t._v(" "),s("h3",{attrs:{id:"脏检查机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#脏检查机制"}},[t._v("#")]),t._v(" 脏检查机制")]),t._v(" "),s("p",[t._v("用一句话来概括“脏检查机制”：Angular 将双向绑定转换为一堆 watch 表达式，然后递归检查这些 watch 表达式的结果是否变了，如果变了，则执行相应的 watcher 函数。等到 Model 的值不再变化，也就不会再有 watcher 函数被触发，一个完整的 digest 循环就结束了。这时，浏览器就会重新渲染 DOM 来体现 model 的改变。这里所说的 watcher 函数，是由 View 上的指令（如 ngBind、ngShow、ngHide 等）或 "),s("code",[t._v("{{}}")]),t._v(" 表达式（严格来说是$compile 服务）所注册的。指令在 Angular 的 compile 阶段会被逐一解析、注册。")]),t._v(" "),s("p",[t._v("$rootScope对象是Angular中所有$scope 对象的祖先。所有的$scope都是直接或者间接利用$rootScope 提供的$new方法创建的。它们都从$rootScope 中继承了$new，$watch，$watchGroup、$watchCollection、$digest、$destroy、$eval、$evalAsync、$apply、$on、$emit、$broadcast 等方法，并且有$id、$parent 这两个属性。")]),t._v(" "),s("h3",{attrs:{id:"watch"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#watch"}},[t._v("#")]),t._v(" $watch")]),t._v(" "),s("p",[t._v("watch 表达式很灵活：可以是一个函数，可以是$scope上的一个属性名，也可以是一个字符串形式的表达式。$scope 上的属性名或表达式，最终仍会被$parse服务解析为响应的获取属性值的函数。$watch 函数会返回一个反注册函数，一旦我们调用它，就可以移除刚才注册的 watcher。")]),t._v(" "),s("p",[t._v("需要注意的是，Angular 默认是不会使用 angular.equals()函数进行深度比较的，因为使用===比较会更快，所以，它对数组或者 Object 进行比较时检查的是引用。这就导致内容完全相同的两个表达式被判定为不同。如果需要进行深度比较，第三个可选参数 objectEquality，需要显式设置为 true，如$watch（'someExp'，function()，{...}，true）。")]),t._v(" "),s("p",[t._v("Angular 还提供了$watchGroup、$watchCollection 方法来监听数组或者是一组属性。")]),t._v(" "),s("h3",{attrs:{id:"digest"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#digest"}},[t._v("#")]),t._v(" $digest")]),t._v(" "),s("p",[t._v("$digest循环实际上包括两个while循环。它们分别是：处理$evalAsync 的异步运算队列，处理$watch 的 watchers 队列。")]),t._v(" "),s("p",[t._v("遍历一遍所有 watcher 函数称为一轮脏检查。执行完一轮脏检查，如果任何一个 watcher 所监听的值改变过，那么就会重新再进行一轮脏检查，直到所有的 watcher 函数都报告其所监听的值不再变了。")]),t._v(" "),s("p",[t._v("从第一轮脏检查到结果变得稳定，这个过程就是一个完整的$digest循环。当$digest 循环结束时，才把模型的变化结果更新到 DOM 中去。这样可以合并多个更新，防止频繁的 DOM 操作。")]),t._v(" "),s("h3",{attrs:{id:"apply"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#apply"}},[t._v("#")]),t._v(" $apply")]),t._v(" "),s("p",[t._v("$digest是一个内部函数，正常的应用代码中是不应该直接调用它的。要想主动触发它，就要调用scope.$apply 函数，它是触发 Angular“脏检查机制”的常用公开接口。")]),t._v(" "),s("p",[t._v("$apply函数也很少需要主动调用，因为在各种Angular事件指令以及$timeout 等服务中，都会自动调用它一次来确保界面刷新。如果你要自己挂接第三方组件的事件，那么就要记得调用一次$apply 了，否则在这个事件处理函数中对 scope 变量的更新就不会更新到界面上。")]),t._v(" "),s("h3",{attrs:{id:"内置-服务替代原生服务"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#内置-服务替代原生服务"}},[t._v("#")]),t._v(" 内置$服务替代原生服务")]),t._v(" "),s("p",[t._v("应注意以下几点：")]),t._v(" "),s("ul",[s("li",[t._v("$timeout 替代 setTimeout")]),t._v(" "),s("li",[t._v("$Interval 替代 setInterval")]),t._v(" "),s("li",[t._v("$window 替代 window")]),t._v(" "),s("li",[t._v("$document 替代 document")]),t._v(" "),s("li",[t._v("$resource或$http 替代$.ajax")]),t._v(" "),s("li",[t._v("angular.element 替代$")])]),t._v(" "),s("p",[t._v("这样可以避免手动调用$scope.$apply 启动“脏检查机制”的问题、获得更多的 API，并在测试中更好地进行 Mock。")]),t._v(" "),s("h3",{attrs:{id:"在-angularjs-中-provider、factory-和-service-有什么区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#在-angularjs-中-provider、factory-和-service-有什么区别"}},[t._v("#")]),t._v(" 在 AngularJS 中 Provider、Factory 和 Service 有什么区别？")]),t._v(" "),s("p",[t._v("Factory 相当于拿到：factoryResult")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" factoryResult "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("MyFactory")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("Service 相当于拿到：serviceObj")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" serviceObj "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyService")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("Provider 相当于拿到：providerObj")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" instance "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyProvider")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" providerObj "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" instance"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("$get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("Factory/service 是第一个注入时才实例化，而 provider 不是，它是在 config 之前就已实例化好")]),t._v(" "),s("h3",{attrs:{id:"injector"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#injector"}},[t._v("#")]),t._v(" $injector")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 在控制器或其他地方获取 $injector 服务")]),t._v("\napp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("controller")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MyController"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"$injector"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("$injector")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 使用 $injector 来获取服务实例")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" myServiceInstance "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" $injector"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"myService"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 手动创建新的服务实例")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" newServiceInstance "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" $injector"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("instantiate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("myService"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("ul",[s("li",[t._v("get(name)：用于获取指定名称的服务实例。通过名称获取已注册的服务，返回该服务的实例。")]),t._v(" "),s("li",[t._v("invoke(fn, self, locals)：用于调用函数并注入依赖项。可以调用指定的函数，并自动注入函数所需的依赖项。")]),t._v(" "),s("li",[t._v("annotate(fn)：用于获取函数的参数列表，包括依赖项。返回一个函数的参数列表，包括需要注入的依赖项。")]),t._v(" "),s("li",[t._v("has(name)：用于检查是否存在指定名称的服务。检查指定名称的服务是否已经注册。")]),t._v(" "),s("li",[t._v("instantiate(Type, locals)：用于实例化一个构造函数，并注入依赖项。实例化一个构造函数，并自动注入构造函数所需的依赖项。")]),t._v(" "),s("li",[t._v("loadNewModules(modules)：用于加载新的模块并使其可用于依赖注入。这个方法的作用是动态加载新的模块，以便在应用程序中使用新模块中定义的服务，以实现动态模块加载和依赖注入。")])]),t._v(" "),s("h3",{attrs:{id:"独立-scope-声明中的-、-、-三种形式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#独立-scope-声明中的-、-、-三种形式"}},[t._v("#")]),t._v(" 独立 scope 声明中的“@”、“&”、“=”三种形式")]),t._v(" "),s("p",[t._v("@：用于单向绑定，将父作用域的值传递给指令的作用域。这种绑定只支持字符串，并且支持使用"),s("code",[t._v("{{}}")]),t._v("表达式进行插值。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("app"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("directive")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"myDirective"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("restrict")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"E"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("scope")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("isolatedAttribute")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("template")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<div>{{isolatedAttribute}}</div>"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("=：用于双向绑定，将父作用域的模型与指令的独立作用域的模型进行关联。这意味着对一个模型的更改会影响另一个模型，反之亦然。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("app"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("directive")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"myDirective"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("restrict")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"E"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("scope")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("isolatedBinding")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"="')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("template")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'<input ng-model=\"isolatedBinding\">'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("&：用于在独立作用域中调用父作用域的函数，并传递参数。这种绑定允许指令调用父作用域中的函数。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("app"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("directive")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"myDirective"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("restrict")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"E"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("scope")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("isolatedExpression")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"&"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("template")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'<button ng-click=\"isolatedExpression()\">Click</button>'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h3",{attrs:{id:"restrict"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#restrict"}},[t._v("#")]),t._v(" restrict")]),t._v(" "),s("p",[s("code",[t._v("A")]),t._v("：表示指令可以作为 HTML 元素的属性使用。例如："),s("code",[t._v("<div my-directive></div>")])]),t._v(" "),s("p",[s("code",[t._v("E")]),t._v("：表示指令可以作为 HTML 元素使用。例如："),s("code",[t._v("<my-directive></my-directive>")])]),t._v(" "),s("p",[s("code",[t._v("C")]),t._v("：表示指令可以作为类名使用。例如："),s("code",[t._v('<div class="my-directive"></div>')])]),t._v(" "),s("p",[s("code",[t._v("M")]),t._v("：表示指令可以作为 HTML 注释使用。例如："),s("code",[t._v("\x3c!-- directive: my-directive --\x3e")])]),t._v(" "),s("p",[t._v("这些值可以组合使用，例如'A'和'E'可以一起使用，表示指令可以作为 HTML 元素和属性使用。但是最佳实践建议只使用'A'和'E'两种类型。")]),t._v(" "),s("h3",{attrs:{id:"observe"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#observe"}},[t._v("#")]),t._v(" $observe")]),t._v(" "),s("ul",[s("li",[t._v("$observe 方法是在 link 函数中使用的，用于监视指令的属性变化。")]),t._v(" "),s("li",[t._v("$observe 方法接受两个参数：属性名和回调函数。当指令的属性发生变化时，回调函数会被调用。")]),t._v(" "),s("li",[t._v("$observe 方法只能用于监视指令的属性，而不能用于监视作用域中的变量。")]),t._v(" "),s("li",[t._v("$observe 方法通常用于监视 HTML 属性的变化，例如 class、style 等。")]),t._v(" "),s("li",[t._v("当指令的属性值是插值表达式（如{{"),s("code",[t._v("variable")]),t._v("}}）时，$observe 方法会在表达式的值发生变化时被调用。")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("app"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("directive")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"myDirective"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("restrict")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"A"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("link")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("scope"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" element"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" attrs")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      attrs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("$observe")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"myAttribute"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("value")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"myAttribute值发生变化："')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h3",{attrs:{id:"angular-element"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#angular-element"}},[t._v("#")]),t._v(" angular.element")]),t._v(" "),s("p",[t._v("angular.element 是 AngularJS 中用于操作 DOM 元素的函数。它返回一个包装了原生 DOM 元素的 jQuery lite 对象，因此可以使用类似 jQuery 的方法来操作 DOM。")]),t._v(" "),s("p",[t._v("在 AngularJS 中，angular.element 可以用于以下情况：")]),t._v(" "),s("p",[t._v("在指令的链接函数中使用，以便在指令的 DOM 元素上执行操作。\n在控制器中使用，但通常不建议在控制器中直接操作 DOM 元素。\n以下是一个简单的示例，演示了如何在 AngularJS 中使用 angular.element：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 在指令中使用 angular.element")]),t._v("\napp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("directive")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"myDirective"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("link")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("scope"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" element"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" attrs")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 使用 angular.element 操作指令的 DOM 元素")]),t._v("\n      angular"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("element")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("element"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addClass")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"highlight"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 在控制器中使用 angular.element")]),t._v("\napp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("controller")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"myController"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("$scope"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" $element")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 不建议在控制器中直接操作 DOM 元素")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 但如果需要，可以使用 angular.element")]),t._v("\n  angular"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("element")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("querySelector")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"#myElement"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addClass")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"highlight"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("ul",[s("li",[t._v("addClass(className): 添加一个或多个类名到元素。")]),t._v(" "),s("li",[t._v("removeClass(className): 移除一个或多个类名。")]),t._v(" "),s("li",[t._v("toggleClass(className, condition): 如果存在（不存在）就移除（添加）一个类。")]),t._v(" "),s("li",[t._v("attr(name, value): 获取或设置元素的属性。")]),t._v(" "),s("li",[t._v("removeAttr(name): 移除元素的属性。")]),t._v(" "),s("li",[t._v("css(property, value): 获取或设置元素的 CSS 样式。")]),t._v(" "),s("li",[t._v("on(eventType, handler): 绑定事件处理程序。")]),t._v(" "),s("li",[t._v("off(eventType, handler): 移除事件处理程序。")]),t._v(" "),s("li",[t._v("find(selector): 在元素内部查找匹配选择器的元素。")]),t._v(" "),s("li",[t._v("parent(): 获取父元素。")]),t._v(" "),s("li",[t._v("children(): 获取子元素。")]),t._v(" "),s("li",[t._v("html(): 获取或设置元素的 HTML 内容。")]),t._v(" "),s("li",[t._v("text(): 获取或设置元素的文本内容。")]),t._v(" "),s("li",[t._v("clone(): 克隆元素。")])])])}),[],!1,null,null,null);s.default=e.exports}}]);