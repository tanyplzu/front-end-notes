---
sidebarDepth: 0
---

# 位运算符

[[toc]]

## 运算符

位运算符只对整数起作用，如果一个运算子不是整数，会自动转为整数后再执行。另外，虽然在 JavaScript 内部，数值都是以 64 位浮点数的形式储存，但是做位运算的时候，是以 32 位带符号的整数进行运算的，并且返回值也是一个 32 位带符号的整数。

- `&` ，与 两个位都为 1 时，结果才为 1
- `|` ，或 两个位都为 0 时，结果才为 0
- `^` ，异或 两个位相同为 0 ，相异为 1
- `~`，按位取反 所有 0 变 1，1 变 0
- `<<`，左移 各二进位全部左移若干位，高位丢弃，低位补 0
- `>>`，有符号右移 各二进位全部右移若干位，对无符号数，高位补 0 ，有符号数，各编译器处理方法不一样，有的补符号位，有的补 0
- `>>>`， 无符号右移动

例子：

&

```text
  11011110
& 11110000
------------
= 11010000
```

|

```text
  11010000
| 10101010
------------
= 11111010
```

^

```text
  11010000
^ 01111110
------------
= 10101110
```

~

```text
~ 00000000000000000000000010101010
------------------------------------
= 11111111111111111111111101010101
```

`<<<`

`(A << B) => A * (2 ** B) => A * Math.pow(2, B)`

```text
170 => 00000000000000000000000010101010
170 << 3
--------------------------------------------
   (000)00000000000000000000010101010(***)
--------------------------------------------
 = (***)00000000000000000000010101010(000)
--------------------------------------------
 = 00000000000000000000010101010000
--------------------------------------------
 = 1360 (decimal)
```

`>>`

```text
-170 >> 3
--------------------------------------------
   (***)11111111111111111111111101010(110)
--------------------------------------------
 = (111)11111111111111111111111101010(***)
--------------------------------------------
 = 11111111111111111111111111101010
--------------------------------------------
 = -22 (decimal)

```

`>>>`

```text
170 >>> 3
--------------------------------------------
   (***)00000000000000000000000010101(010)
--------------------------------------------
 = (000)00000000000000000000000010101(***)
--------------------------------------------
 = 00000000000000000000000000010101
--------------------------------------------
 = 21 (decimal)

-170 >>> 3
--------------------------------------------
   (***)11111111111111111111111101010(110)
--------------------------------------------
 = (000)11111111111111111111111101010(***)
--------------------------------------------
 = 00011111111111111111111111101010
--------------------------------------------
 = 536870890 (decimal)
```

## 应用

### 判断奇偶

```js
x % 2 === 1;
(x & 1) === 1; //(奇数)

x % 2 === 0;
(x & 1) === 0; //(偶数)
```

### x >> 1

```js
mid = (left + right) / 2;
mid = (left + right) >> 1;
```

```js
5 >> 1; // 2
5 / 2; // 2.5
```

### >>> 0

```js
const a = [1, 2, 3, 4, 5];
const index = a.findIndex((item) => item === 8);
a.splice(index >>> 0, 1);
```

### | 0

```text
( 3|0 ) === 3;             // it does not change integers
( 3.3|0 ) === 3;           // it casts off the fractional part in fractionalal numbers
( 3.8|0 ) === 3;           // it does not round, but exactly casts off the fractional part
( -3.3|0 ) === -3;         // including negative fractional numbers
( -3.8|0 ) === -3;         // which have Math.floor(-3.3) == Math.floor(-3.8) == -4
( "3"|0 ) === 3;           // strings with numbers are typecast to integers
( "3.8"|0 ) === 3;         // during this the fractional part is cast off too
( "-3.8"|0 ) === -3;       // including negative fractional numbers
( NaN|0 ) === 0;           // NaN is typecast to 0
( Infinity|0 ) === 0;      // the typecast to 0 occurs with the Infinity
( -Infinity|0 ) === 0;     // and with -Infinity
( null|0 ) === 0;          // and with null,
( (void 0)|0 ) === 0;      // and with undefined
( []|0 ) === 0;            // and with an empty array
( [3]|0 ) === 3;           // but an array with one number is typecast to number
( [-3.8]|0 ) === -3;       // including the cast off of the fractional part
( [" -3.8 "]|0 ) === -3;   // including the typecast of strings to numbers
( [-3.8, 22]|0 ) === 0     // but an Array with several numbers is typecast to 0
( {}|0 ) === 0;                // an empty object is typecast to 0
( {'2':'3'}|0 ) === 0;         // or a not empty object
( (function(){})|0 ) === 0;    // an empty function is typecast to 0 too
( (function(){ return 3;})|0 ) === 0;
```

### 使用^来完成值交换

```js
var a = 5;
var b = 8;
a ^= b;
b ^= a;
a ^= b;
console.log(a); // 8
console.log(b); // 5
```

### rgb 和 16 进制颜色值转换

```js
/**
 * 16进制颜色值转RGB
 * @param  {String} hex 16进制颜色字符串
 * @return {String}     RGB颜色字符串
 */
function hexToRGB(hex) {
  var hexx = hex.replace('#', '0x');
  var r = hexx >> 16;
  var g = (hexx >> 8) & 0xff;
  var b = hexx & 0xff;
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * RGB颜色转16进制颜色
 * @param  {String} rgb RGB进制颜色字符串
 * @return {String}     16进制颜色字符串
 */
function RGBToHex(rgb) {
  var rgbArr = rgb.split(/[^\d]+/);
  var color = (rgbArr[1] << 16) | (rgbArr[2] << 8) | rgbArr[3];
  return '#' + color.toString(16);
}

hexToRGB('#ffffff'); // 'rgb(255,255,255)'
RGBToHex('rgb(255,255,255)'); // '#ffffff'
```

```text
  (red) => 255 => 00000000 00000000 00000000 11111111
(green) =>  35 => 00000000 00000000 00000000 00100011
 (blue) =>  20 => 00000000 00000000 00000000 00010100

// Rearrange the component bits and pad with zeroes as necessary
// Use the left shift operator

  (red << 16) => 00000000 11111111 00000000 00000000
 (green << 8) => 00000000 00000000 00100011 00000000
       (blue) => 00000000 00000000 00000000 00010100

// Combine the component bits together using the OR (|) operator
// ( red << 16 | green << 8 | blue )

      00000000 11111111 00000000 00000000
    | 00000000 00000000 00100011 00000000
    | 00000000 00000000 00000000 00010100
// -----------------------------------------
      00000000 11111111 00100011 00010100
//
```

## 开关作用

以下是一段代码控制逻辑：

```js
function doSomething (optA = true, optB = true, optC = false, optD = true, ...) {
  // something happens here...
}
```

优化一下可以写成这样：

```js
const defaultOptions = {
  optA: true,
  optB: true,
  optC: false,
  optD: true,
  ...
};

function doSomething (options = defaultOptions) {
  // something happens here...
}
```

如果使用位运算

If all the options take boolean values, we could use an integer instead of an object to represent the options. In this case, certain bits of the integer will be mapped to designated options. If a bit is turned on (set to 1), the designated option’s value is true;otherwise, it is false.

以下例子有三个状态：

fraction: 将数组的每个项除以数组中的最大项
unique: 从数组中删除重复项
sorted: 按从低到高对数组的项目进行排序

```js
const LIST_FRACTION = 1 << 0; // (001)
const LIST_UNIQUE = 1 << 1; // (010)
const LIST_SORTED = 1 << 2; // (100)
```

```js
const LIST_ALL = LIST_FRACTION | LIST_UNIQUE | LIST_SORTED; // (111)
const LIST_DEFAULT = LIST_FRACTION | LIST_SORTED; // (101)
const LIST_DEFAULT = LIST_ALL ^ LIST_UNIQUE; // (101)
```

使用这种方式非常巧妙的控制了下面的逻辑

```js
function normalizeList(list, flag = LIST_DEFAULT) {
  if (flag & LIST_FRACTION) {
    const max = Math.max(...list);
    list = list.map((value) => Number((value / max).toFixed(2)));
  }
  if (flag & LIST_UNIQUE) {
    list = [...new Set(list)];
  }
  if (flag & LIST_SORTED) {
    list = list.sort((a, b) => a - b);
  }
  return list;
}
```

## Leecode 52. N 皇后 II

::: tip 题目

n  皇后问题 研究的是如何将 n  个皇后放置在 n × n 的棋盘上，并且使皇后彼此之间不能相互攻击。  
给你一个整数 n ，返回 n 皇后问题 不同的解决方案的数量。

输入：n = 4  
输出：2  
解释：如上图所示，4 皇后问题存在两个不同的解法。

:::

皇后彼此之间不能相互攻击，也就是说需要满足任意两个皇后不能在同一行、同一列以及同一条斜线上。

![queens](./imgs/queens.jpg)

将 N 个位置对应成 N 个二进制位，0 代表可以选择，1 代表不能选择。比如八皇后当前第一行的第二位被选择时的状态是 00100000，那么下一行的第二位也不能被选择，正对角线(na)对应的第三位不能被选择(对应当前行右移了一位)，状态表示为：00100000。副对角线(pie)对应的第一位不能被选择(对应当前行左移了一位)，状态表示为 10000000。

- `n：n层`
- `row：当前层`
- `cols：列`
- `pie：撇，左斜线(副对角线)`
- `na：捺，右斜线(正对角线)`
- `二进制为 1，代表不可放置，0 相反`
- `x & -x ：得到最低位的1 (代表除最后一位 1 保留，其他位全部为 0)`
- `x & (x - 1)：清零最低位的 1 (代表将最后一位 1 变成 0)`
- `x & ((1 << n) - 1)：将 x 的最高位至第 n 位(含)清零`

```js
const totalNQueens = function(n) {
  let res = 0;
  const dfs = (n, row, cols, pie, na) => {
    if (row >= n) {
      res++;
      return;
    }
    let bits = ~(cols | pie | na) & ((1 << n) - 1); // 1
    while (bits) {
      // 2
      let p = bits & -bits; // 3
      dfs(n, row + 1, cols | p, (pie | p) << 1, (na | p) >> 1); // 4
      bits = bits & (bits - 1); // 5
    }
  };
  dfs(n, 0, 0, 0, 0);
  return res;
};
```

1.`cols ｜ pie ｜ na` 表示所有能够被皇后攻击的格子，`~(cols | pie | na)` 取反表示将没有被占的格子从 0 变为 1，以便后续的位遍历。这里用到公式：`x & ((1 << n) - 1)`：将 x 的最高位至第 n 位(含)清零。一个 int 的二进制位至少有 32 位，我们将前面不需要的位置清零。所以，这行代码表示得到当前所有的空位，也就是可以放置皇后的格子。

2.只要 bits 中有 1，就说明还有格子可以放置皇后，每次遍历都会将其清零(表示在 p 位置放入了皇后)，也就是注释 5 的代码含义。对应公式：`x & (x - 1)`：清零最低位的 1 (代表将最后一位 1 变成 0)。

3.对应公式：`x & -x` ：得到最低位的 1 (代表除最后一位 1 保留，其他位全部为 0)，表示当前皇后可放入的位置。

4.修改状态，进入下一层递归。`row + 1` 代表搜索下一行，`cols ｜ p` 代表目前所有可以放置皇后的列。`(pie | p) << 1` ，`(na | p) >> 1`，在上面思路中已经说过了，不再赘述。

## Vue3 中的位运算

shapeFlags

```js
// packages/shared/src/shapeFlags.ts
export const enum ShapeFlags {
  ELEMENT = 1, // HTML 或 SVG 标签 普通 DOM 元素
  FUNCTIONAL_COMPONENT = 1 << 1, // 函数式组件  1 << 1 -> 2
  STATEFUL_COMPONENT = 1 << 2, // 普通有状态组件 1 << 2 -> 4
  TEXT_CHILDREN = 1 << 3, // 子节点是纯文本
  ARRAY_CHILDREN = 1 << 4, // 子节点是数组
  SLOTS_CHILDREN = 1 << 5, // 子节点是插槽
  TELEPORT = 1 << 6, // Teleport
  SUSPENSE = 1 << 7, // Suspense
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8, // 需要被 keep-alive 的有状态组件
  COMPONENT_KEPT_ALIVE = 1 << 9, // 已经被 keep-alive 的有状态组件
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT // 有状态组件和函数组件都是组件，用 COMPONENT 表示
}
```

patchFlags

```js
// packages/shared/src/patchFlags.ts
export const enum PatchFlags {
  TEXT = 1, // 动态文本节点
  CLASS = 1 << 1, // 动态 class
  STYLE = 1 << 2, // 动态 style
  PROPS = 1 << 3, // 动态属性
  FULL_PROPS = 1 << 4, // 具有动态 key 属性，当 key 改变时，需要进行完整的 diff 比较
  HYDRATE_EVENTS = 1 << 5, // 具有监听事件的节点
  STABLE_FRAGMENT = 1 << 6, // 子节点顺序不会被改变的 fragment
  KEYED_FRAGMENT = 1 << 7, // 带有 key 属或部分子节点有 key 的 fragment
  UNKEYED_FRAGMENT = 1 << 8, // 子节点没有 key 的 fragment
  NEED_PATCH = 1 << 9, // 非 props 的比较，比如 ref 或指令
  DYNAMIC_SLOTS = 1 << 10, // 动态插槽
  DEV_ROOT_FRAGMENT = 1 << 11, // 仅供开发时使用，表示将注释放在模板根级别的片段
  HOISTED = -1, // 静态节点
  BAIL = -2 // diff 算法要退出优化模式
}
```

## 0b & 0x

```js
let val1 = 0b10101;
let val2 = 0xff;
```

阅读资料：

- 阮一峰[运算符](http://javascript.ruanyifeng.com/grammar/operator.html#toc21)
- [前端玩转位运算(N 皇后+Vue3 位运算应用)](https://juejin.cn/post/6904595258915422215/#heading-28)
- [where-would-i-use-a-bitwise-operator-in-javascript](https://stackoverflow.com/questions/654057/where-would-i-use-a-bitwise-operator-in-javascript)
- [Interesting use cases for JavaScript bitwise operators](https://blog.logrocket.com/interesting-use-cases-for-javascript-bitwise-operators/)
