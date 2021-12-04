# vue3 diff 算法

## 使用贪心 + 二分查找替换

::: tip 题目

输入: [10,9,2,5,3,7,101,18] 输出: 4 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。

:::

可以使用动态规划解决。也可以使用贪心 + 二分查找替换的方法解决。

```js
const lengthOfLIS = function(nums) {
  let len = nums.length;
  if (len <= 1) {
    return len;
  }
  let tails = [nums[0]];
  for (let i = 0; i < len; i++) {
    // 当前遍历元素 nums[i] 大于 前一个递增子序列的 尾元素时，追加到后面即可
    if (nums[i] > tails[tails.length - 1]) {
      tails.push(nums[i]);
    } else {
      // 否则，查找递增子序列中第一个大于当前值的元素，用当前遍历元素 nums[i] 替换它
      // 递增序列，可以使用二分查找
      let left = 0;
      let right = tails.length - 1;
      while (left < right) {
        let mid = (left + right) >> 1;
        if (tails[mid] < nums[i]) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      tails[left] = nums[i];
    }
  }
  return tails.length;
};
```

上面 tails 的值： [10,9,2,5,3,7,101,18]

- `tails = [10]`
- `tails = [9]`
- `tails = [2]`
- `tails = [2,5]`
- `tails = [2,3]`
- `tails = [2,3,7]`
- `tails = [2,3,7,101]`
- `tails = [2,3,7,18]`

再看一组：[1,4,5,2,3,7,0]

- `tails = [1]`
- `tails = [1,4]`
- `tails = [1,4,5]`
- `tails = [1,2,5]`
- `tails = [1,2,3]`
- `tails = [1,2,3,7]`
- `tails = [0,2,3,7]`

最后 tails 的长度是正确的，但是里面的值不正确，因为最后一步的替换破坏了子序列的性质。

## Vue3 Diff

vue diff

- 头 - 头比较
- 尾 - 尾比较
- 基于最长递增子序列进行移动 / 删除 / 新增

如：

```text
oldChild [a,b,c,d,e,f,g]
newChild [a,b,f,c,d,e,h,g]
```

得出最长递增子序列 [2, 3, 4] 对应节点为 [c, d, e]

```js
// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function getSequence(arr: number[]): number[] {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      // arrI 比 arr[j] 小，二分查找找到后替换
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = (u + v) >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]; // 有可能替换会导致结果不正确，需要一个新数组 p 记录正确的结果
        }
        result[u] = i;
      }
    }
  }
  // 对result修正
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}
```

以 [1,4,5,6,2,3,7,0] 为例：

- `tails = [0]` `p=[1,4,5,6,2,3,7,0]`
- `tails = [0,1]` `p=[1,0,5,6,2,3,7,0]`
- `tails = [0,1,2]` `p=[1,0,1,6,2,3,7,0]`
- `tails = [0,1,2,3]` `p=[1,0,1,2,2,3,7,0]`
- `tails = [0,4,2,3]` `p=[1,0,1,2,0,3,7,0]`
- `tails = [0,4,5,3]` `p=[1,0,1,2,0,4,7,0]`
- `tails = [0,4,5,3,6]` `p=[1,0,1,2,0,4,3,0]`

vue3 diff 解决了上面贪心算法的问题。

结果： `result [0, 1, 2, 3, 6]`

- [你想知道的 Vue3 核心源码这里都有](https://mp.weixin.qq.com/s/71fWC3Tox0DTLOL-Nm-wQg)
- [Vue3 DOM Diff 核心算法解析](https://zhuanlan.zhihu.com/p/260434581)
- [「算法思想」分治、动态规划、回溯、贪心一锅炖](https://juejin.cn/post/6844904190578278414#heading-3)

> 分治：分而治之，先解决子问题，再将子问题的解合并求出原问题。  
> 贪心：一条路走到黑，选择当下局部最优的路线，没有后悔药。  
> 回溯：一条路走到黑，手握后悔药，可以无数次重来。(英雄联盟艾克大招无冷却)。  
> 动态规划：上帝视角，手握无数平行宇宙的历史存档，同时发展出无数个未来。
