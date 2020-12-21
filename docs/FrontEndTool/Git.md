---
sidebarDepth: 1
---

# Git 常用命令

### 如何合并分之中的某一次提交

```sh
cherry-pick  [commitID]
```

### 常用功能

```sh
// 提交代码
git commit –a –m ""

// 修改commit信息
$ git commit --amend -m "add new file"
$ git commit --amend // 直接编辑提交记录


// 清除当前目录下所有没add的修改
git checkout .

// 合并分支
git checkout test4.0
git pull origin test4.0
git merge develop4.0
git push origin test4.0
git checkout develop4.0

// 暂存
git stash
git stash list
git stash pop
git stash clear

// 新建
git checkout -b books
git push origin books

// 删除
git branch -d books
git push origin -d books
```

### 创建项目

你有一个空的存储库 To get started you will need to run these commands in your terminal.

第一次使用 Git？ 学习基本的 Git 命令

第一次配置 Git

```bash
git config --global user.name ""
git config --global user.email ""
```

使用您的存储库

我只想克隆这个存储库

如果要简单地克隆此空存储库，请在终端中运行此命令。

```bash
git clone ssh://git@code.xxxxxx.git
```

我的代码已经准备好推送

如果你代码已经准备好推送到仓库，请在终端中执行该命令

```bash
cd existing-project
git init
git add --all
git commit -m "Initial Commit"
git remote add origin ssh://git@code.xxxxxx.git
git push -u origin master
```

我的代码已经由 Git 跟踪

如果你的代码已经由 Git 跟踪，然后设置这个仓库作为你的“origin”推送。

```bash
cd existing-project
git remote set-url origin ssh://git@code.xxxxxx.git
git push -u origin --all
git push origin --tags
```

### 提交格式

```text
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style：格式（不影响代码运行的变动）
update：格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
```
