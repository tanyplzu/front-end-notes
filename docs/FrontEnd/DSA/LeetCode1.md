---
sidebarDepth: 1
---

# LeetCode 算法精选(1)

[[toc]]

## 1.两数之和

::: tip 题目

https://leetcode-cn.com/problems/two-sum

输入：nums = [2,7,11,15], target = 9  
输出：[0,1]  
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

:::

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
  // 这里我用对象来模拟 map 的能力
  const diffs = {};
  // 缓存数组长度
  const len = nums.length;
  // 遍历数组
  for (let i = 0; i < len; i++) {
    // 判断当前值对应的 target 差值是否存在（是否已遍历过）
    if (diffs[target - nums[i]] !== undefined) {
      // 若有对应差值，那么答案get！
      return [diffs[target - nums[i]], i];
    }
    // 若没有对应差值，则记录当前值
    diffs[nums[i]] = i;
  }
};
```

空间换时间，也可以采用 map.

## 2.两数相加

::: tip 题目

https://leetcode-cn.com/problems/add-two-numbers/

给你两个非空 的链表，表示两个非负的整数。它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字。  
请你将两个数相加，并以相同形式返回一个表示和的链表。

输入：l1 = [2,4,3], l2 = [5,6,4]  
输出：[7,0,8]  
解释：342 + 465 = 807

:::

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  const dummyNode = new ListNode();
  let cur = dummyNode;
  let extra = 0;
  while (l1 || l2) {
    let sum = extra;
    if (l1) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2) {
      sum += l2.val;
      l2 = l2.next;
    }
    extra = Math.floor(sum / 10);
    cur.next = new ListNode(sum % 10);
    cur = cur.next;
  }
  if (extra) cur.next = new ListNode(extra);
  return dummyNode.next;
};
```

## 3.无重复字符的最长子串

::: tip 题目

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

输入: s = "abcabcbb"  
输出: 3  
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

:::

```js
var lengthOfLongestSubstring = function(s) {
  // 哈希集合，记录每个字符是否出现过
  const occ = new Set();
  const n = s.length;
  // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
  let rk = -1,
    ans = 0;
  for (let i = 0; i < n; ++i) {
    if (i != 0) {
      // 左指针向右移动一格，移除一个字符
      occ.delete(s.charAt(i - 1));
    }
    while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
      // 不断地移动右指针
      occ.add(s.charAt(rk + 1));
      ++rk;
    }
    // 第 i 到 rk 个字符是一个极长的无重复字符子串
    ans = Math.max(ans, rk - i + 1);
  }
  return ans;
};
```

## 9. 回文数

::: tip 题目

输入：x = 121 输出：true

:::

```js
function isPalindrome(str) {
  // 先反转字符串
  const reversedStr = str
    .split('')
    .reverse()
    .join('');
  // 判断反转前后是否相等
  return reversedStr === str;
}
```

## 14. 最长公共前缀

::: tip 题目

输入：strs = ["flower","flow","flight"]  
输出："fl"

输入：strs = ["dog","racecar","car"]  
输出：""  
解释：输入不存在公共前缀。

:::

解一：逐位比较，比较全部通过时 re 增加当前字符，不通过时直接返回 re

```js
var longestCommonPrefix = function(strs) {
  var re = '';
  if (!strs.length) return re;
  for (var j = 0; j < strs[0].length; j++) {
    //第j位
    for (var i = 1; i < strs.length; i++) {
      //第i个
      if (strs[i][j] != strs[0][j]) return re;
    }
    re += strs[0][j];
  }
  return re;
};
```

解二：解一的递归版本，需要增加一些判断语句。

```js
var longestCommonPrefix = function(strs, re = '') {
  if (!strs.length) return re;
  if (strs.length == 1) return strs[0];
  for (var i = 1; i < strs.length; i++) {
    if (!strs[i][0]) return re;
    if (strs[i][0] != strs[0][0]) return re;
    strs[i] = strs[i].slice(1, strs[i].length);
  }
  re += strs[0][0];
  strs[0] = strs[0].slice(1, strs[0].length);
  return longestCommonPrefix(strs, re);
};
```

解三：和解一恰好相反，re 初始化为数组中第一个元素，逐个比较，当比较通过时返回 re，否则削去末位直至比较通过。这里的比较使用了正则表达式。

```js
var longestCommonPrefix = function(strs) {
  var re = strs[0] ? strs[0] : '';
  for (var i = 1; i < strs.length; i++) {
    var regex = new RegExp('^' + re);
    while (!regex.test(strs[i]) && re.length) {
      re = re.slice(0, re.length - 1);
      regex = new RegExp('^' + re);
    }
  }
  return re;
};
```

## 20. 有效的括号

::: tip 题目

给定一个只包括 '('，')'，'{'，'}'，'['，']'  的字符串 s ，判断字符串是否有效。

有效字符串需满足：

- 左括号必须用相同类型的右括号闭合。
- 左括号必须以正确的顺序闭合。

输入：s = "()"  
输出：true

:::

```js
// 用一个 map 来维护左括号和右括号的对应关系
const leftToRight = {
  '(': ')',
  '[': ']',
  '{': '}',
};

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function(s) {
  // 结合题意，空字符串无条件判断为 true
  if (!s) {
    return true;
  }
  // 初始化 stack 数组
  const stack = [];
  // 缓存字符串长度
  const len = s.length;
  // 遍历字符串
  for (let i = 0; i < len; i++) {
    // 缓存单个字符
    const ch = s[i];
    // 判断是否是左括号，这里我为了实现加速，没有用数组的 includes 方法，直接手写判断逻辑
    if (ch === '(' || ch === '{' || ch === '[') stack.push(leftToRight[ch]);
    // 若不是左括号，则必须是和栈顶的左括号相配对的右括号
    else {
      // 若栈不为空，且栈顶的左括号没有和当前字符匹配上，那么判为无效
      if (!stack.length || stack.pop() !== ch) {
        return false;
      }
    }
  }
  // 若所有的括号都能配对成功，那么最后栈应该是空的
  return !stack.length;
};
```

## 26. 删除有序数组中的重复项

::: tip 题目

输入：nums = [0,0,1,1,1,2,2,3,3,4]  
输出：5, nums = [0,1,2,3,4]  
解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。

:::

一、双指针法

```js
var removeDuplicates = function(nums) {
  const n = nums.length;
  if (n === 0) {
    return 0;
  }
  let fast = 1,
    slow = 1;
  while (fast < n) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast];
      ++slow;
    }
    ++fast;
  }
  return slow;
};
```

二、数组方法

```js
function unique(arr) {
  return arr.filter((v, i, a) => {
    return a.indexOf(v) === i;
  });
}
```

## 53. 最大子序和

::: tip 题目

输入：nums = [-2,1,-3,4,-1,2,1,-5,4]  
输出：6  
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

:::

采用动态规划。从当前位置作为起始和和不从当前位置作为起始，如果累计大于当前位置的值，就不从当前位置起，如果小于当前位置的值，就舍弃。

```js
var maxSubArray = function(nums) {
  // 动态规划
  let len = nums.length;
  let max = nums[0];
  let prevSum = nums[0];

  for (let i = 1; i < len; i++) {
    prevSum = Math.max(nums[i], prevSum + nums[i]);
    max = Math.max(max, prevSum);
  }
  return max;
};
```

## 70. 爬楼梯

::: tip 题目

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

输入： 2  
输出： 2  
解释： 有两种方法可以爬到楼顶。

:::

解法一

```js
/**
 * @param {number} n
 * @return {number}
 */
const climbStairs = function(n) {
  // 处理递归边界
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }
  // 递归计算
  return climbStairs(n - 1) + climbStairs(n - 2);
};
```

解法二

```JS
/**
 * @param {number} n
 * @return {number}
 */
const climbStairs = function(n) {
  // 初始化状态数组
  const f = [];
  // 初始化已知值
  f[1] = 1;
  f[2] = 2;
  // 动态更新每一层楼梯对应的结果
  for (let i = 3; i <= n; i++) {
    f[i] = f[i - 2] + f[i - 1];
  }
  // 返回目标值
  return f[n];
};
```

## 76. 最小覆盖子串

给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 ""

::: tip 题目

输入：s = "ADOBECODEBANC", t = "ABC"  
输出："BANC"

:::

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(source, target) {
  if (source.length < target.length) {
    return '';
  }
  if (source.includes(target)) {
    return target;
  }

  // window和need两个哈希表，记录窗口中的字符和需要凑齐的字符
  // key是要匹配的字符，value值是1，即出现的次数
  const needs = new Map();
  for (let t of target) {
    const v = needs.get(t) || 0;
    needs.set(t, v + 1);
  }

  // 存滑动窗口出现的字符，key是出现在target的字符，value是出现的次数
  const window = new Map();

  let isValidCount = 0; // 存放滑动窗口中的key的个数满足needs条件的字符个数

  // 记录最小覆盖子串的起始索引及长度
  let start = 0;
  let len = Number.MAX_VALUE;

  // 左右指针
  let left = 0;
  let right = 0;

  while (right < source.length) {
    let rightLetter = source[right];

    // 1.进行窗口的数据更新，当前字符是需要的则加入窗口
    if (needs.has(rightLetter)) {
      const count = window.get(rightLetter) || 0;
      window.set(rightLetter, count + 1);

      // 2.如果相等则有效计数+1，排除掉窗口中值大于1的，即有重复的字符
      if (needs.get(rightLetter) === window.get(rightLetter)) {
        isValidCount++;
      }
    }

    right++; // 扩大窗口

    // 3.左移动窗口，window已经包含了needs所有的字符
    while (isValidCount === needs.size) {
      // 更新最小覆盖字串
      const curLen = right - left;
      if (curLen < len) {
        start = left;
        len = curLen;
      }

      let l = source[left];
      if (needs.has(l) && window.has(l)) {
        // 4.即将窗口左移动后，窗口已经不包含需要的字符了，有效计数需要减一
        if (window.get(l) === needs.get(l)) {
          isValidCount--;
        }
        window.set(l, window.get(l) - 1);
      }

      // 缩小窗口
      left++;
    }
  }

  return len === Number.MAX_VALUE ? '' : source.substr(start, len);
};
```

## 88. 合并两个有序数组

::: tip 题目

输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3  
输出：[1,2,2,3,5,6]

:::

## 104. 二叉树的最大深度

::: tip 题目

给定二叉树 [3,9,20,null,null,15,7]  
返回它的最大深度 3

:::

方法一：

```js
function maxDepth(root) {
  if (root == null) {
    return 0;
  }
  return max(maxDepth(root.Left), maxDepth(root.Right)) + 1;
}

function max(a, b) {
  if (a > b) {
    return a;
  }
  return b;
}
```

## 110. 平衡二叉树

**平衡二叉树要求的是左右子节点的高度不能超过 1**

::: tip 题目

输入：root = [3,9,20,null,null,15,7]  
输出：true

:::

```js
function isBalanced(root) {
  if (root == null) return true;
  return (
    Math.abs(depth(root.left) - depth(root.right)) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
}

function depth(root) {
  if (root == null) return 0;
  return Math.max(depth(root.left), depth(root.right)) + 1;
}
```

## 121. 买卖股票的最佳时机

你只能选择某一天买入这只股票，并选择在未来的某一个不同的日子卖出该股票。

::: tip 题目

输入：[7,1,5,3,6,4]  
输出：5  
在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。  
注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。

:::

```js
function maxProfit(prices = []) {
  let minprice = Number.MAX_VALUE;
  let maxprofit = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minprice) {
      minprice = prices[i];
    } else if (prices[i] - minprice > maxprofit) {
      maxprofit = prices[i] - minprice;
    }
  }
  return maxprofit;
}
```

## 122. 买卖股票的最佳时机 II

::: tip 题目

输入: prices = [7,1,5,3,6,4]  
输出: 7  
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。  
随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。

:::

```js
function maxProfit(prices = []) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    let tmp = prices[i] - prices[i - 1];
    if (tmp > 0) {
      profit += tmp;
    }
  }
  return profit;
}
```

## 139. 单词拆分

::: tip 题目

输入: s = "leetcode", wordDict = ["leet", "code"]  
输出: true  
解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。

:::

```js
function wordBreak(s: string, wordDict: string[]): boolean {
  const n: number = s.length;
  const wordDictSet: Set<string> = new Set(wordDict);
  const dp: Array<boolean> = new Array(n + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDictSet.has(s.substr(j, i - j))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[n];
}
```

## 146.LRU 缓存函数

## 155. 最小栈

::: tip 题目

设计一个支持 push，pop，top 操作，并能在常数时间内检索到最小元素的栈。

- push(x) —— 将元素 x 推入栈中。
- pop() —— 删除栈顶的元素。
- top() —— 获取栈顶元素。
- getMin() —— 检索栈中的最小元素。

:::

实现一：

```js
/**
 * 初始化你的栈结构
 */
const MinStack = function() {
  this.stack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
// 栈的入栈操作，其实就是数组的 push 方法
MinStack.prototype.push = function(x) {
  this.stack.push(x);
};

/**
 * @return {void}
 */
// 栈的入栈操作，其实就是数组的 pop 方法
MinStack.prototype.pop = function() {
  this.stack.pop();
};

/**
 * @return {number}
 */
// 取栈顶元素，咱们教过的哈，这里我本能地给它一个边界条件判断（其实不给也能通过，但是多做不错哈）
MinStack.prototype.top = function() {
  if (!this.stack || !this.stack.length) {
    return;
  }
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
// 按照一次遍历的思路取最小值
MinStack.prototype.getMin = function() {
  let minValue = Infinity;
  const { stack } = this;
  for (let i = 0; i < stack.length; i++) {
    if (stack[i] < minValue) {
      minValue = stack[i];
    }
  }
  return minValue;
};
```

实现二：

```js
const MinStack = function() {
  this.stack = [];
  // 定义辅助栈
  this.stack2 = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  this.stack.push(x);
  // 若入栈的值小于当前最小值，则推入辅助栈栈顶
  if (this.stack2.length == 0 || this.stack2[this.stack2.length - 1] >= x) {
    this.stack2.push(x);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  // 若出栈的值和当前最小值相等，那么辅助栈也要对栈顶元素进行出栈，确保最小值的有效性
  if (this.stack.pop() == this.stack2[this.stack2.length - 1]) {
    this.stack2.pop();
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  // 辅助栈的栈顶，存的就是目标中的最小值
  return this.stack2[this.stack2.length - 1];
};
```