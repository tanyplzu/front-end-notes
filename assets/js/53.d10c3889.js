(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{490:function(t,s,a){"use strict";a.r(s);var n=a(15),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"git-常用命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-常用命令"}},[t._v("#")]),t._v(" Git 常用命令")]),t._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#查看历史"}},[t._v("查看历史")])]),a("li",[a("a",{attrs:{href:"#重置本地仓库"}},[t._v("重置本地仓库")])]),a("li",[a("a",{attrs:{href:"#操作分支"}},[t._v("操作分支")])]),a("li",[a("a",{attrs:{href:"#提交代码"}},[t._v("提交代码")])]),a("li",[a("a",{attrs:{href:"#标签"}},[t._v("标签")])]),a("li",[a("a",{attrs:{href:"#暂存"}},[t._v("暂存")])]),a("li",[a("a",{attrs:{href:"#获取上游代码"}},[t._v("获取上游代码")])]),a("li",[a("a",{attrs:{href:"#回退到某次-commit"}},[t._v("回退到某次 commit")])]),a("li",[a("a",{attrs:{href:"#清理"}},[t._v("清理")])]),a("li",[a("a",{attrs:{href:"#cherry-pick"}},[t._v("cherry-pick")])]),a("li",[a("a",{attrs:{href:"#创建项目"}},[t._v("创建项目")])]),a("li",[a("a",{attrs:{href:"#其他"}},[t._v("其他")])]),a("li",[a("a",{attrs:{href:"#提交格式"}},[t._v("提交格式")])]),a("li",[a("a",{attrs:{href:"#资料"}},[t._v("资料")])])])]),a("p"),t._v(" "),a("h3",{attrs:{id:"查看历史"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查看历史"}},[t._v("#")]),t._v(" 查看历史")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 每个提交在一行内显示")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log --oneline\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 在所有提交日志中搜索包含「homepage」的提交")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log --all --grep"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'homepage'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log --grep"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"homepage"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 获取某人的提交日志")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log --author"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"linghuchong"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看今日的提交")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log --since"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0 am"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 获取所有的操作历史，包括被删除的")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reflog\n")])])]),a("h3",{attrs:{id:"重置本地仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#重置本地仓库"}},[t._v("#")]),t._v(" 重置本地仓库")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" fetch origin\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout master\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset --hard origin/master\n")])])]),a("h3",{attrs:{id:"操作分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#操作分支"}},[t._v("#")]),t._v(" 操作分支")]),t._v(" "),a("p",[t._v("查看分支")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -v\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 分支信息更加详细，可以看到分支是 origin 或 upstream")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -vv\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看本地和远程分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -a\n")])])]),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("* master\n  remotes/origin/HEAD -> origin/master\n  remotes/origin/gh-pages\n  remotes/origin/master\n")])])]),a("p",[t._v("新建分支")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout -b books\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin books\n")])])]),a("p",[t._v("删除分支")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -d books\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -D books "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 有没有提交的merge")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin -d books\n")])])]),a("p",[t._v("合并分支")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout test4.0\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" pull origin test4.0\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" merge develop4.0\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin test4.0\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout develop4.0\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 对没有合并成功的代码，撤销合并")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" merge --abort\n")])])]),a("h3",{attrs:{id:"提交代码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#提交代码"}},[t._v("#")]),t._v(" 提交代码")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看文件状态")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" status\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 提交代码")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit –a –m "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 修改commit信息")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit --amend -m "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"add new file"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit --amend "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 直接编辑提交记录")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 清除当前目录下所有没add的修改")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# git format-patch 用来对某次提交生成patch，方便发送给其他人员进行参考或者同步")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" format-patch -n HEAD^ "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 生成path")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" am "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 同步path")]),t._v("\n")])])]),a("p",[t._v("切换到之前分支")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout -\n")])])]),a("h3",{attrs:{id:"标签"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#标签"}},[t._v("#")]),t._v(" 标签")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" tag -a v1.0\n")])])]),a("p",[t._v("如果我们忘了给某个提交打标签，又将它发布了，我们可以给它追加标签。")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" tag -a v0.9 85fc7e7\n")])])]),a("h3",{attrs:{id:"暂存"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#暂存"}},[t._v("#")]),t._v(" 暂存")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash list\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash pop\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("clear")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 保存所有正在追踪的文件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash save "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"日志信息"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 获取并删除暂存项")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash apply stash@"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash drop stash@"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash pop stash@"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"获取上游代码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#获取上游代码"}},[t._v("#")]),t._v(" 获取上游代码")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote -v\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" upstream https://github.com/xxxxx/xxxx.git\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" fetch upstream\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" merge upstream/master\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin master\n")])])]),a("h3",{attrs:{id:"回退到某次-commit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#回退到某次-commit"}},[t._v("#")]),t._v(" 回退到某次 commit")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# git commit之后，想撤销 commit，撤回后保留更改")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset --soft HEAD^\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 代码回退删除远程")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log --oneline\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset --hard HEAD@"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset --hard commit_hash\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push -f 删除远程分支\n")])])]),a("ul",[a("li",[a("code",[t._v("HEAD^")]),t._v("的意思是上一个版本，也可以写成"),a("code",[t._v("HEAD~1")]),t._v("。如果你进行了 2 次 commit，想都撤回，可以使用"),a("code",[t._v("HEAD~2")])]),t._v(" "),a("li",[a("code",[t._v("--soft")]),t._v("：不删除工作空间改动代码，撤销 commit，不撤销"),a("code",[t._v("git add .")]),t._v(";")]),t._v(" "),a("li",[a("code",[t._v("--hard")]),t._v("：删除工作空间改动代码，撤销 commit，撤销"),a("code",[t._v("git add .")]),t._v(", 注意完成这个操作后，就恢复到了上一次的 commit 状态。")])]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# revert 针对某一次commit的反向操作，会生成一次空的commit")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" revert -n commit_hash\n")])])]),a("h3",{attrs:{id:"清理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#清理"}},[t._v("#")]),t._v(" 清理")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 移除远程仓库上不存在的分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" fetch -p\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 清除当前目录下所有没add的修改")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n")])])]),a("h3",{attrs:{id:"cherry-pick"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cherry-pick"}},[t._v("#")]),t._v(" cherry-pick")]),t._v(" "),a("p",[t._v("经常需要从一个分支选择性的合并 commit 到另一个分支，可使用 cherry-pick 实现：")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 单个commit合并")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" cherry-pick "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("commitHash"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),a("p",[t._v("这会在当前分支产生一个新的提交")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 转移多个提交")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" cherry-pick "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("HashA"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("HashB"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 转移一串提交，提交 A 将不会包含在 Cherry pick 中")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" cherry-pick A"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v("B\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 包含提交 A")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" cherry-pick A^"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v("B\n")])])]),a("h4",{attrs:{id:"代码冲突"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#代码冲突"}},[t._v("#")]),t._v(" 代码冲突")]),t._v(" "),a("p",[t._v("用户解决代码冲突后，第一步将修改的文件重新加入暂存区（git add .），第二步使用下面的命令，让 Cherry pick 过程继续执行。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("git cherry-pick --continue\n")])])]),a("ul",[a("li",[a("code",[t._v("--abort")]),t._v(" 发生代码冲突后，放弃合并，回到操作前的样子。")]),t._v(" "),a("li",[a("code",[t._v("--quit")]),t._v(" 发生代码冲突后，退出 Cherry pick，但是不回到操作前的样子。")])]),t._v(" "),a("h3",{attrs:{id:"创建项目"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建项目"}},[t._v("#")]),t._v(" 创建项目")]),t._v(" "),a("p",[t._v("第一次配置 Git")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global user.name "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"linghuchong"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global user.email "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"xxxxxx@qq.com"')]),t._v("\n")])])]),a("p",[t._v("克隆某个项目")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone ssh://git@code.xxxxxx.git\n")])])]),a("p",[t._v("如果代码已经准备好推送到仓库，请在终端中执行该命令")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" existing-project\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" init\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" --all\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Initial Commit"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" origin ssh://git@code.xxxxxx.git\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push -u origin master\n")])])]),a("p",[t._v("我的代码已经由 Git 跟踪")]),t._v(" "),a("p",[t._v("如果你的代码已经由 Git 跟踪，然后设置这个仓库作为你的“origin”推送。")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" existing-project\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote set-url origin ssh://git@code.xxxxxx.git\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push -u origin --all\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin --tags\n")])])]),a("h3",{attrs:{id:"其他"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#其他"}},[t._v("#")]),t._v(" 其他")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 统计项目")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" shortlog -sn\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 强制推送")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push -f git@github.com:xxx/xxx.git master:gh-pages\n")])])]),a("p",[t._v("pull 根据不同的配置，可等于 fetch + merge 或 fetch + rebase")]),t._v(" "),a("h3",{attrs:{id:"提交格式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#提交格式"}},[t._v("#")]),t._v(" 提交格式")]),t._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("feat：新功能（feature）\nfix：修补bug\ndocs：文档（documentation）\nstyle：格式（不影响代码运行的变动）\nupdate：格式（不影响代码运行的变动）\nrefactor：重构（即不是新增功能，也不是修改bug的代码变动）\ntest：增加测试\nchore：构建过程或辅助工具的变动\n")])])]),a("h3",{attrs:{id:"资料"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#资料"}},[t._v("#")]),t._v(" 资料")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("git cherry-pick 教程"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=e.exports}}]);