---
sidebarDepth: 1
---

# 牛客网算法精选

[[toc]]

## 加起来和为目标值的组合

::: tip 题目

输入：[100,10,20,70,60,10,50], 80  
返回值：[[10,10,60],[10,20,50], [10,70],[20,60]]

:::

数组排序后：[10, 10, 20, 50, 60, 70, 100]

```js
function combinationSum2(num, target) {
  num = num.sort((a, b) => a - b);

  function helper(tmp, num, res, start, target) {
    if (target == 0) {
      return res.push(tmp);
    }
    for (let i = start; i < num.length; i++) {
      if (num[i] > target) return;
      if (i > start && num[i - 1] == num[i]) continue;
      helper([...tmp, num[i]], num, res, i + 1, target - num[i]);
    }
  }

  res = [];
  helper([], num, res, 0, target);
  return res;
}
```
