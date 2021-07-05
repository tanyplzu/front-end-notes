---
sidebarDepth: 1
---

# LeetCode 算法精选(3)

[[toc]]

## 剑指 Offer 47. 礼物的最大价值

在一个 m\*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？

```
输入:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 12
解释: 路径 1→3→5→2→1 可以拿到最多价值的礼物.
```

```
解题：
状态转移方程：
dp[i][j] = max(dp[i−1][j],dp[i][j−1]) + grid[i][j]
```

对于边界情况，我们有两种常用处理办法:

- 单独初始化边界
- 多开一行一列数组，就能统一化边界处理

单独处理边界

```js
function maxValue(grid) {
  let n = grid.length;
  let m = grid[0].length;
  const dp = new Array(n);
  for (var i = 0; i < dp.length; i++) {
    dp[i] = new Array(m);
  }
  dp[0][0] = grid[0][0];
  // 初始化第一行
  for (let i = 1; i < m; i++) {
    dp[0][i] = dp[0][i - 1] + grid[0][i];
  }
  // 初始化第一列
  for (let i = 1; i < n; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }
  // 动态规划
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }
  return dp[n - 1][m - 1];
}
```

## 计算最大公约数

```js
function gcd(a, b) {
  if (b == 0) {
    return a;
  }
  var r = a % b;
  console.log(r);
  return gcd(b, r);
}
```

```js
function gcd(a, b) {
  var temp;
  while (b != 0) {
    temp = a % b;
    a = b;
    b = temp;
  }
  return a;
}
```

### 最小公倍数

```js
function scm(a, b) {
  return (a * b) / gcd(a, b);
}
```

## 16.25. LRU 缓存

设计和构建一个“最近最少使用”缓存，该缓存会删除最近最少使用的项目。缓存应该从键映射到值(允许你插入和检索特定键对应的值)，并在初始化时指定最大容量。当缓存被填满时，它应该删除最近最少使用的项目。

它应该支持以下操作： 获取数据 get 和 写入数据 put 。

获取数据 get(key) - 如果密钥 (key) 存在于缓存中，则获取密钥的值（总是正数），否则返回 -1。写入数据 put(key, value) - 如果密钥不存在，则写入其数据值。当缓存容量达到上限时，它应该在写入新数据之前删除最近最少使用的数据值，从而为新的数据值留出空间。

```text
LRUCache cache = new LRUCache( 2 /* 缓存容量 */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
cache.get(2);       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回  3
cache.get(4);       // 返回  4
```

利用 ES6 的 Map 对象，时间复杂度应该是 O(1)

```js
//  一个Map对象在迭代时会根据对象中元素的插入顺序来进行
// 新添加的元素会被插入到map的末尾，整个栈倒序查看
class LRUCache {
  constructor(capacity) {
    this.secretKey = new Map();
    this.capacity = capacity;
  }
  get(key) {
    if (this.secretKey.has(key)) {
      let tempValue = this.secretKey.get(key);
      this.secretKey.delete(key);
      this.secretKey.set(key, tempValue);
      return tempValue;
    } else {
      return -1;
    }
  }
  put(key, value) {
    // key存在，仅修改值
    if (this.secretKey.has(key)) {
      this.secretKey.delete(key);
      this.secretKey.set(key, value);
    }
    // key不存在，cache未满
    else if (this.secretKey.size < this.capacity) {
      this.secretKey.set(key, value);
    }
    // 添加新key，删除旧key
    else {
      this.secretKey.set(key, value);
      // 删除map的第一个元素，即为最长未使用的
      this.secretKey.delete(this.secretKey.keys().next().value);
    }
  }
}
let cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log('cache.get(1)', cache.get(1)); // 返回  1
cache.put(3, 3); // 该操作会使得密钥 2 作废
console.log('cache.get(2)', cache.get(2)); // 返回 -1 (未找到)
cache.put(4, 4); // 该操作会使得密钥 1 作废
console.log('cache.get(1)', cache.get(1)); // 返回 -1 (未找到)
console.log('cache.get(3)', cache.get(3)); // 返回  3
console.log('cache.get(4)', cache.get(4)); // 返回  4
```
