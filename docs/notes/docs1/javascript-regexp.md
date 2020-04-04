---
title: JavaScript 正则表达式
tag: RegExp
keywords: JavaScript,RegExp,test,exec
date: 2019-04-25
---

在 `JavaScript` 中，正则表达式 (Regular Expressions) 也是对象。这些模式被用于 `RegExp` 的 `exec` 和 `test` 方法，以及 `String` 的 `match`、`replace`、`search` 和 `split` 方法。

## 创建一个正则表达式

你可以使用以下两种方法之一构建一个正则表达式：使用一个正则表达式字面量，其由包含在斜杠之间的模式组成，如下所示：

```JavaScript
var regex = /ab+c/;

var regex = /ab+c/gi;
```

或者调用 `RegExp` 对象的构造函数，如下所示：

```JavaScript
let regex = new RegExp("ab+c");

let regex = new RegExp(/^[a-zA-Z]+[0-9]*\W?_$/, "gi");
```

<!-- more -->

## 正则表达式字符匹配攻略

> 正则表达式是匹配模式，要么匹配字符，要么匹配位置。

### 两种模糊匹配

如果正则只有精确匹配是没多大意义的，比如 `/hello/` ，也只能匹配字符串中的 `"hello"` 这个子串。

```JavaScript
var regex = /hello/;
console.log( regex.test("hello") );         // => true
console.log( regex.test("hel333lo") );      // => false
```

正则表达式之所以强大，是因为其能实现模糊匹配。而模糊匹配，有两个方向上的“模糊”：横向模糊和纵向模糊。

### 横向模糊匹配

> 横向模糊指的是，一个正则可匹配的字符串的长度不是固定的，可以是多种情况的。其实现的方式是使用量词。譬如 `{m,n}` ，表示连续出现最少 `m` 次，最多 `n` 次。比如 `/ab{2,5}c/` 表示匹配这样一个字符串：第一个字符是 `“a”` ，接下来是 2 到 5 个字符 `“b”` ，最后是字符 `“c”` 。

测试如下：

```JavaScript
var regex = /ab{2,5}c/g;
var string = "abc abbc abbbc abbbbc abbbbbc abbbbbbc";
console.log( string.match(regex) );
// => ["abbc", "abbbc", "abbbbc", "abbbbbc"]
```

Tips: 案例中用的正则是 `/ab{2,5}c/g` ，后面多了 `g` ，它是正则的一个修饰符。表示全局匹配，即在目标字符串中按顺序找到满足匹配模式的所有子串，强调的是“所有”，而不只是“第一个”。`g` 是单词 `global` 的首字母。

### 纵向模糊匹配

> 纵向模糊指的是，一个正则匹配的字符串，具体到某一位字符时，它可以不是某个确定的字符，可以有多种可能。其实现的方式是使用字符组。譬如 `[abc]` ，表示该字符可以是字符 “a”、“b”、“c” 中的任何一个。比如 `/a[123]b/` 可以匹配如下三种字符串："a1b"、"a2b"、"a3b"。

测试如下：

```JavaScript
var regex = /a[123]b/g;
var string = "a0b a1b a2b a3b a4b";
console.log( string.match(regex) );
// => ["a1b", "a2b", "a3b"]
```

要掌握横向和纵向模糊匹配，基本能解决很大部分正则匹配问题。

### 字符组

需要强调的是，虽叫字符组（字符类），但只是其中一个字符。例如 `[abc]` ，表示匹配一个字符，它可以是 “a”、“b”、“c” 之一。

#### 范围表示法

如果字符组里的字符特别多的话，怎么办？可以使用范围表示法。例如 `[123456abcdefGHIJKLM]` ，可以写成 `[1-6a-fG-M]` 。用连字符 `-` 来省略和简写。因为连字符有特殊用途，如果要匹配 “a”、“-”、“z” 这三者中任意一个字符，该怎么做呢？不能写成 `[a-z]` ，因为其表示小写字符中的任何一个字符。可以写成如下的方式：`[-az]` 或 `[az-]` 或 `[a\-z]` 。即要么放在开头，要么放在结尾，要么转义。总之不会让引擎认为是范围表示法就行了。

测试如下：

```JavaScript
var regex = new RegExp(/[1-6a-fG-M]/);
console.log( regex.test('123456abcdefGHIJKLM') );
// => true
```

#### 排除字符组

纵向模糊匹配，还有一种情形就是，某位字符可以是任何东西，但就不能是 "a"、"b"、"c" 。此时就是排除字符组（反义字符组）的概念。例如 `[^abc]` ，表示是一个除 "a"、"b"、"c" 之外的任意一个字符。字符组的第一位放 `^`（脱字符），表示求反的概念。

测试如下：

```JavaScript
var regex = new RegExp(/[^abc]/);
console.log( regex.test('abc') );   // => false
console.log( regex.test('222') );   // => true
```

### 常见的简写形式

有了字符组的概念后，一些常见的符号我们也就理解了。因为它们都是系统自带的简写形式。

::: tip 系统自带的简写形式:

- `\d` 就是 `[0-9]` 。表示是一位数字。记忆方式：其英文是 digit（数字）。
- `\D` 就是 `[^0-9]` 。表示除数字外的任意字符。
- `\w` 就是 `[0-9a-zA-Z_]` 。表示数字、大小写字母和下划线。记忆方式：w 是 word 的简写，也称单词字符。 
- `\W` 是 `[^0-9a-zA-Z_]` 。非单词字符。
- `\s` 是 `[ \t\v\n\r\f]` 。表示空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符。记忆方式： `s` 是 space character 的首字母。
- `\S` 是 `[^ \t\v\n\r\f]` 。 非空白符。
- . 就是 `[^\n\r\u2028\u2029]` 。通配符，表示几乎任意字符。换行符、回车符、行分隔符和段分隔符除外。记忆方式：想想省略号。
- .. 中的每个点，都可以理解成占位符，表示任何类似的东西。

:::

### 量词

量词也称重复。掌握 `{m,n}` 的准确含义后，只需要记住一些简写形式。

#### 简写形式

> `{m,}` 表示至少出现 `m` 次。 `{m}` 等价于 `{m,m}` ，表示出现 `m` 次。 `?` 等价于 `{0,1}` ，表示出现或者不出现。记忆方式：问号的意思表示，有吗？ `+` 等价于 `{1,}` ，表示出现至少一次。记忆方式：加号是追加的意思，得先有一个，然后才考虑追加。 `*` 等价于 `{0,}` ，表示出现任意次，有可能不出现。记忆方式：看看天上的星星，可能一颗没有，可能零散有几颗，可能数也数不过来。

测试如下：

```JavaScript
//  {m,} 表示至少出现m次。
var regex1 = new RegExp(/ac{2,}r/);
regex1.test('accr');                //  => true
regex1.test('acr');                 //  => false

//  {m} 等价于 {m,m}，表示出现 m 次
var regex2 = new RegExp(/ac{3}r/);
regex2.test('acccr');               //  => true
regex2.test('accr');                //  => false

// ? 等价于{0,1}，表示出现或者不出现。记忆方式：问号的意思表示，有吗？
var regex3 = new RegExp(/abc?r/);
console.log(regex3.test('abcr'));    //  => true
console.log(regex3.test('abbr'));    //  => false
console.log(regex3.test('abr'));     //  => true

// + 等价于{1,}，表示出现至少一次。记忆方式：加号是追加的意思，得先有一个，然后才考虑追加。
var regex4 = new RegExp(/ac+r/);
console.log(regex4.test('acr'));    //  => true
console.log(regex4.test('accr'));   //  => true
console.log(regex4.test('abr'));    //  => false

// * 等价于{0,}，表示出现任意次，有可能不出现。记忆方式：看看天上的星星，可能一颗没有，可能零散有几颗，可能数也数不过来。
var regex5 = new RegExp(/abc*r/);
console.log(regex5.test('abcr'));    //  => true
console.log(regex5.test('abccr'));   //  => true
console.log(regex5.test('abr'));     //  => true
console.log(regex5.test('ar'));      //  => false
```

#### 贪婪匹配和惰性匹配

例子如下：

```JavaScript
var regex = /\d{2,5}/g;
var string = "123 1234 12345 123456";
console.log( string.match(regex) );
// => ["123", "1234", "12345", "12345"]
```

其中正则 `/\d{2,5}/` ，表示数字连续出现 2 到 5 次。会匹配 2 位、3 位、4 位、5 位连续数字。但是其是贪婪的，它会尽可能多的匹配。你能给我 6 个，我就要 6 个。你能给我 3 个，我就要 3 个。反正只要在能力范围内，越多越好。而惰性匹配，就是尽可能少的匹配：

```JavaScript
var regex = /\d{2,5}?/g;
var string = "123 1234 12345 123456";
console.log( string.match(regex) );
// => ["12", "12", "34", "12", "34", "12", "34", "56"]
```

其中 `/\d{2,5}?/` 表示，虽然 2 到 5 次都行，当 2 个就够的时候，就不在往下尝试了。通过在量词后面加个问号就能实现惰性匹配，因此所有惰性匹配情形如下：

> `{m,n}?` `{m,}?` `??` `+?` `*?`

对惰性匹配的记忆方式是：量词后面加个问号，问一问你知足了吗，你很贪婪吗？

### 多选分支

一个模式可以实现横向和纵向模糊匹配。而多选分支可以支持多个子模式任选其一。具体形式如下：`(p1|p2|p3)` ，其中 p1、p2 和 p3 是子模式，用 `|`（管道符）分隔，表示其中任何之一。例如要匹配 "good" 和 "nice" 可以使用 `/good|nice/` 。测试如下：

```JavaScript
var regex = /good|nice/g;
var string = "good idea, nice try.";
console.log( string.match(regex) );         // => ["good", "nice"]
```

但有个事实我们应该注意，比如我用 `/good|goodbye/` ，去匹配 "goodbye" 字符串时，结果是 "good"

```JavaScript
var regex = /good|goodbye/g;
var string = "goodbye";
console.log( string.match(regex) );         // => ["good"]
```

而把正则改成 `/goodbye|good/` ，结果是：

```JavaScript
var regex = /goodbye|good/g;
var string = "goodbye";
console.log( string.match(regex) );         // => ["goodbye"]
```

也就是说，分支结构也是惰性的，即当前面的匹配上了，后面的就不再尝试了。

### 案例分析

匹配字符，无非就是字符组、量词和分支结构的组合使用。下面找几个例子演练一下（其中，每个正则并不是只有唯一写法，可以有多种，就不一一列举了）：

#### 匹配 16 进制颜色值

> 要求匹配：`#ffbbad`、`#Fc01DF`、`#FFF`、`#ffE`

分析：表示一个 16 进制字符，可以用字符组 `[0-9a-fA-F]` 。其中字符可以出现 3 或 6 次，需要是用量词和分支结构。使用分支结构时，需要注意顺序。

```JavaScript
var regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;
var string = "#ffbbad #Fc01DF #FFF #ffE";
console.log( string.match(regex) );
// => ["#ffbbad", "#Fc01DF", "#FFF", "#ffE"]
```

#### 匹配时间

> 要求匹配：`23:59`、`02:07`

分析：共 4 位数字，第一位数字可以为 `[0-2]` 。当第 1 位为 2 时，第 2 位可以为 `[0-3]` ，其他情况时，第 2 位为 `[0-9]` 。第 3 位数字为 `[0-5]` ，第 4 位为 `[0-9]`

```JavaScript
var regex = /^([01][0-9]|[2][0-3]):[0-5][0-9]$/;
console.log( regex.test("23:59") );         // => true
console.log( regex.test("02:07") );         // => true
```

如果也要求匹配 7:9，也就是说时分前面的 0 可以省略。此时正则变成：

```JavaScript
var regex = /^(0?[0-9]|1[0-9]|[2][0-3]):(0?[0-9]|[1-5][0-9])$/;
console.log( regex.test("23:59") );
console.log( regex.test("02:07") );
console.log( regex.test("7:9") );
// => true
// => true
// => true
```

#### 匹配日期

> 比如 `yyyy-mm-dd` 格式为例。要求匹配：2017-06-10

分析：年，四位数字即可，可用 `[0-9]{4}` 。月，共 12 个月，分两种情况 01、02、……、09 和 10、11、12，可用 `(0[1-9]|1[0-2])` 。日，最大 31 天，可用 `(0[1-9]|[12][0-9]|3[01])` 。正则如下：

```JavaScript
var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
console.log( regex.test("2017-06-10") );
// => true
```

Tips： `/^[0-9]` 这个 `^` 表示：匹配以数字开始的字符串（从左向右匹配）。 `$/` 这个 `$` 表示：匹配以数字结尾的字符串（从后向前匹配）。如果 `^` 在 `[]` 中出现，那么就是非的意思了，不再是从开头匹配的意思。

## 正则表达式位置匹配攻略

正则表达式是匹配模式，要么匹配字符，要么匹配位置。

### 什么是位置呢

位置是相邻字符之间的位置。比如，下图中箭头所指的地方： <img src="https://user-gold-cdn.xitu.io/2017/7/19/95d0faf6b21f9414d24c8281b3046746?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"/>

### 如何匹配位置呢

在 ES5 中，共有 6 个锚字符：

> `^` `$` `\b` `\B` `(?=p)` `(?!p)`

#### ^ 和 \$

`^`（脱字符）匹配开头，在多行匹配中匹配行开头。 `$`（美元符号）匹配结尾，在多行匹配中匹配行结尾。

比如我们把字符串的开头和结尾用"#"替换（位置可以替换成字符的！）：

```JavaScript
var result = "hello".replace(/^|$/g, '#');
console.log(result);            // => "#hello#"
```

多行匹配模式时，二者是行的概念，这个需要我们的注意：

```JavaScript
var result = "I\nlove\njavascript".replace(/^|$/gm, '#');
console.log(result);
/*
#I#
#love#
#javascript#
*/
```

Tips：`JavaScript` 正则标志 `/g` , `/i` , `/m` 说明

> 1、`/g` 表示该表达式将用来在输入字符串中查找所有可能的匹配，返回的结果可以是多个。如果不加 `/g` 最多只会匹配一个 2、`/i`  表示匹配的时候不区分大小写 3、`/m` 表示多行匹配，什么是多行匹配呢？就是匹配换行符两端的潜在匹配。影响正则中的`^$` 符号。

#### \b 和 \B

`\b` 是单词边界，具体就是 `\w` 和 `\W` 之间的位置，也包括 `\w` 和 `^` 之间的位置，也包括 `\w` 和 `$` 之间的位置。比如一个文件名是"[JS] Lesson_01.mp4"中的 `\b`，如下：

```JavaScript
var result = "[JS] Lesson_01.mp4".replace(/\b/g, '#');
console.log(result);        // => "[#JS#] #Lesson_01#.#mp4#"
```

为什么匹配结果是这样呢？分析如下：首先，我们知道，`\w` 是字符组 `[0-9a-zA-Z_]` 的简写形式（单词字符），即 `\w` 是字母数字或者下划线的中任何一个字符。而 `\W` 是排除字符组 `[^0-9a-zA-Z_]` 的简写形式（非单词字符），即 `\W` 是 `\w` 以外的任何一个字符。此时我们可以看看"[#JS#] #Lesson_01#.#mp4#"中的每一个"#"，是怎么来的。

> 第一个"#"，两边是"["与"J"，是 `\W` 和 `\w` 之间的位置。 第二个"#"，两边是"S"与"]"，也就是 `\w` 和 `\W` 之间的位置。 第三个"#"，两边是空格与"L"，也就是 `\W` 和 `\w` 之间的位置。 第四个"#"，两边是"1"与"."，也就是 `\w` 和 `\W` 之间的位置。 第五个"#"，两边是"."与"m"，也就是 `\W` 和 `\w` 之间的位置。 第六个"#"，其对应的位置是结尾，但其前面的字符"4"是 `\w` ，即 `\w` 和 `$` 之间的位置。

知道了 `\b` 的概念后，那么 `\B` 也就相对好理解了。 `\B` 就是 `\b` 的反面的意思，非单词边界。例如在字符串中所有位置中，扣掉 `\b` ，剩下的都是 `\B` 的。具体说来就是 `\w` 与 `\w` 、 `\W` 与 `\W` 、`^` 与 `\W` ，`\W` 与 `$` 之间的位置。比如上面的例子，把所有 `\B` 替换成 "#"：

```JavaScript
var result = "[JS] Lesson_01.mp4".replace(/\B/g, '#');
console.log(result);        // => "#[J#S]# L#e#s#s#o#n#_#0#1.m#p#4"
```

#### (?=p) 和 (?!p)

(?=p)，其中 p 是一个子模式，即 p 前面的位置。比如 (?=l)，表示'l'字符前面的位置，例如：

```JavaScript
var result = "hello".replace(/(?=l)/g, '#');
console.log(result);        // => "he#l#lo"
```

而 (?!p) 就是 (?=p) 的反面意思，比如：

```JavaScript
var result = "hello".replace(/(?!l)/g, '#');
console.log(result);        // => "#h#ell#o#"
```

二者的学名分别是 positive lookahead 和 negative lookahead。中文翻译分别是正向先行断言和负向先行断言。 ES6 中，还支持 positive lookbehind 和 negative lookbehind。具体是 (?<=p) 和 (?<!p)。比如 (?=p)，一般都理解成：要求接下来的字符与 p 匹配，但不能包括 p 的那些字符。而在个人看来 (?=p) 就与 ^ 一样好理解，就是 p 前面的那个位置。

> `x(?=y)` 仅匹配被 y 跟随的 x。 例如，`/Jack(?=Sprat)/` 只有在 'Jack' 后面紧跟着 'Sprat' 时，才会匹配它。`/Jack(?=Sprat|Frost)/` 只有在 'Jack' 后面紧跟着 'Sprat' 或 'Frost' 时，才会匹配它。然而，'Sprat' 或 'Frost' 都不是匹配结果的一部分。 `x(?!y)` 仅匹配不被 y 跟随的 x。举个例子，`/\d+(?!\.)/` 只会匹配不被点（.）跟随的数字。`/\d+(?!\.)/.exec('3.141')` 匹配"141"，而不是"3.141" 相关断言（Assertions）学习资料可以看看这里：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#assertions)、[博客](https://www.cnblogs.com/whaozl/p/5462865.html)、[百科](https://baike.baidu.com/item/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F?fr=aladdin#7)

### 位置的特性

对于位置的理解，我们可以理解成空字符 ""。比如"hello"字符串等价于如下的形式：

```JavaScript
"hello" === "" + "h" + "" + "e" + "" + "l" + "" + "l" + "o" + "";   // => true
```

也等价于：

```JavaScript
"hello" == "" + "" + "hello"        // => true
```

因此，把 `/^hello$/` 写成 `/^^hello$$$/` ，是没有任何问题的：

```JavaScript
var result = /^^hello$$$/.test("hello");
console.log(result);                // => true
```

甚至可以写成更复杂的：

```JavaScript
var result = /(?=he)^^he(?=\w)llo$\b\b$/.test("hello");
console.log(result);                // => true
```

也就是说字符之间的位置，可以写成多个。把位置理解空字符，是对位置非常有效的理解方式。

### 相关案例

#### 不匹配任何东西的正则

让你写个正则不匹配任何东西 `/.^/` 因为此正则要求只有一个字符，但该字符后面是开头。

#### 数字的千位分隔符表示法

比如把"12345678"，变成"12,345,678"。可见是需要把相应的位置替换成","。思路是什么呢？

##### 弄出最后一个逗号

使用 `(?=\d{3}$)` 就可以做到：

```JavaScript
// 在字符最后3个数字前面加一个逗号
var result = "12345678".replace(/(?=\d{3}$)/g, ',')
console.log(result);            // => "12345,678"
```

##### 弄出所有的逗号

因为逗号出现的位置，要求后面 3 个数字一组，也就是 `\d{3}` 至少出现一次。此时可以使用量词 +：

```JavaScript
var result = "12345678".replace(/(?=(\d{3})+$)/g, ',')
console.log(result);            // => "12,345,678"
```

##### 匹配其余案例

写完正则后，多验证几个案例，此时我们会发现问题：

```JavaScript
var result = "123456789".replace(/(?=(\d{3})+$)/g, ',')
console.log(result);            // => ",123,456,789"
```

因为上面的正则，仅仅表示把从结尾向前数，一但是 3 的倍数，就把其前面的位置替换成逗号。因此才会出现这个问题。怎么解决呢？我们要求匹配到这个位置不能是开头。我们知道匹配开头可以使用 `^` ，但要求这个位置不是开头怎么办？ `(?!^)` 测试如下：

```JavaScript
var string1 = "12345678", string2 = "123456789";
var reg = /(?!^)(?=(\d{3})+$)/g;

var result = string1.replace(reg, ',')
console.log(result);            // => "12,345,678"

result = string2.replace(reg, ',');
console.log(result);            // => "123,456,789"
```

123456.3435 如果要匹配这种数据格式呢？就是保留小数并且千分位逗号分割

```JavaScript
// 小数点前面的数字，每隔三个数加一个 ','
var string = '123456.3435';
var reg = /(\d)(?=(\d{3})+\.)/g;
var result = string.replace(reg, '$1,')
console.log(result);            // => "123,456.3435"
```

Tips: `var a = 222122122.6754;var b = a.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');` 这行代码，可以实现四舍五入保留 2 位小数点，并且千分位逗号分割，这是项目中很常见的一个需求

## test, exec, match, replace 用法介绍

注：`pattern` 为 `RegExp` 的实例，`str` 为 `String` 的实例

| 用法 | 说明 | 返回值 |
| :-- | :-- | :-- |
| `pattern.test(str)` | 判断 `str` 是否包含匹配结果 | 包含返回 `true` ，不包含返回 `false` |
| `pattern.exec(str)` | 根据 `pattern` 对 `str` 进行正则匹配 | 返回匹配结果数组，如匹配不到返回 `null` |
| `str.match(pattern)` | 根据 `pattern` 对 `str` 进行正则匹配 | 返回匹配结果数组，如匹配不到返回 `null` |
| `str.replace(pattern, replacement)` | 根据 `pattern` 进行正则匹配，把匹配结果替换为 `replacement` | 返回一个新的字符串 |
| `str.search(pattern)` | 根据 `pattern` 对 `str` 进行正则匹配 | 返回匹配到的位置索引，如匹配不到返回 `-1` |
| `str.split(pattern)` | `pattern` 可以是一个字符串或正则表达式，使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中的 `String` 方法 | 返回源字符串以分隔符出现位置分隔而成的一个 `Array` |

> Tips：当字符串为空时，`split()` 返回一个包含一个空字符串的数组，而不是一个空数组，如果字符串和分隔符都是空字符串，则返回一个空数组。

        如果空字符串 `('')` 被用作分隔符，则字符串会在每个字符之间分割。
        <b>[正则用法更多详情](https://segmentfault.com/a/1190000003497780)</b>
