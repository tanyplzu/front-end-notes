---
sidebarDepth: 1
---

# LeetCode 算法精选(3)

[[toc]]

### 剑指 Offer 47. 礼物的最大价值

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
