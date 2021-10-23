---
sidebarDepth: 1
---

# shell 命令

## tree

- tree -L n 显示项目的层级。n 表示层级数。比如想要显示项目三层结构，可以用 tree -l 3；
- tree -I pattern 用于过滤不想要显示的文件或者文件夹。比如你想要过滤项目中的 vendor 文件夹，可以使用 tree -I “vendor”；
- tree > tree.md 将项目结构输出到 tree.md 这个文件。

```sh
$ tree -L 3 -I "vendor" > tree.md
```

windows 提供的 tree 命令太过于鸡肋，只提供了两个参数供我们使用
