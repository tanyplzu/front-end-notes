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

// 代码回滚


### 提交格式

```text
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style：格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
```
