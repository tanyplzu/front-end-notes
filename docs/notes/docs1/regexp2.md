---
title: 正则表达式中的括号
tag: RegExp
sidebarDepth: 1
---

## 1. 分组和分支结构

### 1.1 分组

```js
var regex = /(ab)+/g;
var string = 'ababa abbb ababab';
console.log(string.match(regex)); // ["abab", "ab", "ababab"]
```

### 1.2 分支结构

上面的多选分支`(p1|p2|p3)`，提供了子表达式的所有可能。

```js
var regex = /^I love (JavaScript|Regular Expression)$/;
console.log(regex.test('I love JavaScript')); // true
console.log(regex.test('I love Regular Expression')); // true
```

如果去掉正则中的括号，即/^I love JavaScript|Regular Expression\$/，匹配字符串是"I love JavaScript"和"Regular Expression"，当然这不是我们想要的。

## 2. 引用分组

以日期为例,假设格式为：`yyyy-mm-dd`

```js
var regex = /\d{4}-\d{2}-\d{2}/;
// 修改后
var regex = /(\d{4})-(\d{2})-(\d{2})/;
```

### 2.1 提取数据

```js
var regex = /\d{4}-\d{2}-\d{2}/;
var regex2 = /(\d{4})-(\d{2})-(\d{2})/;
var string = '2017-06-12';
console.log(string.match(regex1));
// ["2017-06-12", index: 0, input: "2017-06-12", groups: undefined]

console.log(string.match(regex2));
// ["2017-06-12", "2017", "06", "12", index: 0, input: "2017-06-12"]
```

提取数据

```js
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";

regex.test(string); // 正则操作即可，例如
//regex.exec(string);
//string.match(regex);

console.log(RegExp.$1); // "2017"
console.log(RegExp.$2); // "06"
console.log(RegExp.$3); // "12"
```

### 2.2 替换

比如，把yyyy-mm-dd格式，替换成mm/dd/yyyy。

```js
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
var result = string.replace(regex, "$2/$3/$1");
console.log(result); // "06/12/2017"
```

等价于：

```js
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
var result = string.replace(regex, function(match, year, month, day) {
 return month + "/" + day + "/" + year;
});
console.log(result); // "06/12/2017"
```

## 3. 反向引用

正则支持匹配如下三种格式：2016-06-12、2016/06/12、2016.06.12

```js
var regex = /\d{4}(-|\/|\.)\d{2}(-|\/|\.)\d{2}/;
var string1 = "2017-06-12";
var string2 = "2017/06/12";
var string3 = "2017.06.12";
var string4 = "2016-06/12";
console.log( regex.test(string1) ); // true
console.log( regex.test(string2) ); // true
console.log( regex.test(string3) ); // true
console.log( regex.test(string4) ); // true
```

如果匹配2016-06/12返回false，可以用到反向引用

```js
var regex = /\d{4}(-|\/|\.)\d{2}\1\d{2}/;
var string1 = "2017-06-12";
var string2 = "2017/06/12";
var string3 = "2017.06.12";
var string4 = "2016-06/12";
console.log( regex.test(string1) ); // true
console.log( regex.test(string2) ); // true
console.log( regex.test(string3) ); // true
console.log( regex.test(string4) ); // false
```

`\1`，表示的引用之前的那个分组`(-|\/|\.)`

### 3.1 括号嵌套

```js
var regex = /^((\d)(\d(\d)))\1\2\3\4$/;
var string = "1231231233";
console.log( regex.test(string) ); // true
console.log( RegExp.$1 ); // 123
console.log( RegExp.$2 ); // 1
console.log( RegExp.$3 ); // 23
```

按从左到右括号的位置决定

## 4. 非捕获分组

之前文中出现的分组，都会捕获它们匹配到的数据，以便后续引用，因此也称他们是捕获型分组。

如果只想要括号最原始的功能，但不会引用它，即，既不在API里引用，也不在正则里反向引用。此时可以使用非捕获分组(?:p)，例如本文第一个例子可以修改为：

```js
var regex = /(?:ab)+/g;
var string = "ababa abbb ababab";
console.log( string.match(regex) ); // ["abab", "ab", "ababab"]
```

## 5. 示例

要求匹配：`<title>regular expression</title>`、`<p>laoyao bye bye</p>`

不匹配：`<title>wrong!</p>`

```js
var regex = /<([^>]+)>[\d\D]*<\/\1>/;
var string1 = "<title>regular expression</title>";
var string2 = "<p>laoyao bye bye</p>";
var string3 = "<title>wrong!</p>";
console.log( regex.test(string1) ); // true
console.log( regex.test(string2) ); // true
console.log( regex.test(string3) ); // false
```

另外`[\d\D]`的意思是，这个字符是数字或者不是数字，因此，也就是匹配任意字符的意思。

> 来源：<https://zhuanlan.zhihu.com/p/27355118>