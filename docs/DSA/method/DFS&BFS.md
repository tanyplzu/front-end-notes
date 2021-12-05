---
sidebarDepth: 0
---

# DFS & BFS

[[toc]]

## DFS（深度优先搜索）

**深度优先搜索的本质——栈结构**

二叉树的先序遍历正是深度优先搜索思想的递归实现。

```js
// 所有遍历函数的入参都是树的根结点对象
function preorder(root) {
  // 递归边界，root 为空
  if (!root) {
    return;
  }

  // 输出当前遍历的结点值
  console.log('当前遍历的结点值是：', root.val);
  // 递归遍历左子树
  preorder(root.left);
  // 递归遍历右子树
  preorder(root.right);
}
```

## BFS（广度优先搜索）

```js
function BFS(root) {
  const queue = []; // 初始化队列queue
  // 根结点首先入队
  queue.push(root);
  // 队列不为空，说明没有遍历完全
  while (queue.length) {
    const top = queue[0]; // 取出队头元素
    // 访问 top
    console.log(top.val);
    // 如果左子树存在，左子树入队
    if (top.left) {
      queue.push(top.left);
    }
    // 如果右子树存在，右子树入队
    if (top.right) {
      queue.push(top.right);
    }
    queue.shift(); // 访问完毕，队头元素出队
  }
}
```

采用队列来来管理遍历顺序
