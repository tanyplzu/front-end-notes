---
sidebarDepth: 1
---

# Git 常用命令

### 查看历史

```sh
# 每个提交在一行内显示
git log --oneline

# 在所有提交日志中搜索包含「homepage」的提交
git log --all --grep='homepage'
git log --grep="homepage"

# 获取某人的提交日志
git log --author="小六"

# 查看今日的提交
git log --since="0 am"

# 获取所有的操作历史，包括被删除的
git reflog
```

### 重置本地仓库

```sh
git fetch origin
git checkout master
git reset --hard origin/master
```

### 合并 commit

经常需要从一个分支选择性的合并 commit 到另一个分支，可使用 cherry-pick 实现：

```sh
# 单个commit合并
git cherry-pick [commit_hash]

# ommit_id到commit_idn之间，包括两端
git cherry-pick commit_id..commit_idn
```

### 操作分支

查看分支

```sh
git branch -v

# 分支信息更加详细，可以看到分支是 origin 或 upstream
git branch -vv

# 查看本地和远程分支
git branch -a
```

```text
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/gh-pages
  remotes/origin/master
```

新建分支

```sh
git checkout -b books
git push origin books
```

删除分支

```sh
git branch -d books
git branch -D books # 有没有提交的merge
git push origin -d books
```

合并分支

```sh
git checkout test4.0
git pull origin test4.0
git merge develop4.0
git push origin test4.0
git checkout develop4.0

# 对没有合并成功的代码撤销合并
git merge --abort
```

### 提交代码

```sh
# 查看文件状态
git status

# 提交代码
git commit –a –m ""

# 修改commit信息
git commit --amend -m "add new file"
git commit --amend # 直接编辑提交记录

# 清除当前目录下所有没add的修改
git checkout .

# git format-patch 用来对某次提交生成patch，方便发送给其他人员进行参考或者同步
git format-patch -n HEAD^ # 生成path
git am # 同步path
```

切换到之前分支

```sh
git checkout -
```

### 标签

```sh
git tag -a v1.0 
```

如果我们忘了给某个提交打标签，又将它发布了，我们可以给它追加标签。

```sh
git tag -a v0.9 85fc7e7
```

### 暂存

```sh
git stash
git stash list
git stash pop
git stash clear

# 保存所有正在追踪的文件
git stash save "日志信息"

# 获取并删除暂存项
git stash apply stash@{1}
git stash drop stash@{1}

git stash pop stash@{1}
```

### 获取上游代码

```sh
git remote -v
git remote add upstream https://github.com/xxxxx/xxxx.git
git fetch upstream
git merge upstream/master
git push origin master
```

### 回退到某次 commit

```sh
# git commit之后，想撤销 commit，撤回后保留更改
git reset --soft HEAD^

# 代码回退删除远程
git log --oneline
git reset --hard HEAD@{4}
git reset --hard commit_hash
git push -f 删除远程分支
```

- `HEAD^`的意思是上一个版本，也可以写成`HEAD~1`。如果你进行了 2 次 commit，想都撤回，可以使用`HEAD~2`
- `--soft`：不删除工作空间改动代码，撤销 commit，不撤销`git add .`;
- `--hard`：删除工作空间改动代码，撤销 commit，撤销`git add .`, 注意完成这个操作后，就恢复到了上一次的 commit 状态。

```sh
# revert 针对某一次commit的反向操作，会生成一次空的commit
git revert -n commit_hash
```

### 清理

```sh
# 移除远程仓库上不存在的分支
git fetch -p

# 清除当前目录下所有没add的修改
git checkout .
```

### 创建项目

第一次配置 Git

```bash
git config --global user.name ""
git config --global user.email ""
```

克隆某个项目

```bash
git clone ssh://git@code.xxxxxx.git
```

如果代码已经准备好推送到仓库，请在终端中执行该命令

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

## 其他

```sh
# 统计项目
git shortlog -sn

# 强制推送
git push -f git@github.com:xxx/xxx.git master:gh-pages
```

pull 根据不同的配置，可等于 fetch + merge 或 fetch + rebase

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
