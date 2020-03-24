---
title: "`$parse`和`$eval`的用法"
sidebarDepth: 0
---

## `$parse` 和 `$eval` 的用法

AngularJS 的初学者常常会对`$parse`和`$eval`两个内建服务感到有些困惑，今天我们就来说说 AngularJS 中的`$parse`和`$eval`。

总的来说，`$parse`和`$eval`都是作用于 AngularJS 的表达式。

### 什么是表达式

AngularJS 中的表达式就是一些类似于 JavaScript 代码的代码片段（但是它们和 JavaScript 代码有不尽相同）。表达式通常被用来防止在绑定中，例如{{expression}}。下面是一个例子：

```html
1 + 2 = {{ 1 + 2 }}
```

或者

```html
My name is {{ user.name }}
```

### $parse 服务

$parse 服务可以将一个表达式转换为一个函数。这个函数可以被调用，其中的参数是一个上下文对象，通常来说是作用域。

另外，通过 $parse 的表达式返回的这个函数有一个 assign 属性。这个 assign 属性也是一个函数，它可以用来在给定的上下文中改变这个表达式的值。

下面是一段简单的代码：

```html
<div my-attr="obj.name" my-directive>testing</div>
```

```js
app.directive('myDirective',function($log,$parse){
  return function(scope,elem,attrs){
    // 解析"my-attr属性值到一个函数中"
    var model = $parse(attrs.myAttr);

    // model现在是一个函数，可以调用它来获取表达式的值
    // 下面这行代码将会输出作用域中obj.name的值
    $log.log(model(scope));

    elem.bind('click',function(){
        // 'model.assign'也是一个函数，它用来更新表达式的值
        model.assign(scope,'New name');
        // New name是给obj.name赋一个新的值；
        scope.$apply();
    })
  }
});
```

上面的例子可以充分体现我们为什么需要 $parse 服务。如果属性值是 name，那么我们完全可以不用 $parse，只用 scope[attrs.myAttr] 即可。但是在上面的例子中，方括号并不管用。

### $eval 服务

$eval 是一个作用域 scope 中的方法，它将会在当前作用域中执行一个表达式并返回结果：

```js
scope.a = 1;
scope.b = 2;

scope.$eval('a+b'); // 3
```
