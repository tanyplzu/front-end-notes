(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{402:function(t,a,s){"use strict";s.r(a);var e=s(5),n=Object(e.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"git-常用命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-常用命令"}},[t._v("#")]),t._v(" Git 常用命令")]),t._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#查看历史"}},[t._v("查看历史")])]),a("li",[a("a",{attrs:{href:"#重置本地仓库"}},[t._v("重置本地仓库")])]),a("li",[a("a",{attrs:{href:"#操作分支"}},[t._v("操作分支")])]),a("li",[a("a",{attrs:{href:"#提交代码"}},[t._v("提交代码")])]),a("li",[a("a",{attrs:{href:"#拉取和推送"}},[t._v("拉取和推送")])]),a("li",[a("a",{attrs:{href:"#标签"}},[t._v("标签")])]),a("li",[a("a",{attrs:{href:"#暂存"}},[t._v("暂存")])]),a("li",[a("a",{attrs:{href:"#获取上游代码"}},[t._v("获取上游代码")])]),a("li",[a("a",{attrs:{href:"#回退到某次-commit"}},[t._v("回退到某次 commit")])]),a("li",[a("a",{attrs:{href:"#清理"}},[t._v("清理")])]),a("li",[a("a",{attrs:{href:"#cherry-pick"}},[t._v("cherry-pick")])]),a("li",[a("a",{attrs:{href:"#创建项目"}},[t._v("创建项目")])]),a("li",[a("a",{attrs:{href:"#其他"}},[t._v("其他")])]),a("li",[a("a",{attrs:{href:"#vim-基本操作"}},[t._v("vim 基本操作")])]),a("li",[a("a",{attrs:{href:"#提交格式"}},[t._v("提交格式")])]),a("li",[a("a",{attrs:{href:"#资料"}},[t._v("资料")])])])]),a("p"),t._v(" "),a("h3",{attrs:{id:"查看历史"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查看历史"}},[t._v("#")]),t._v(" 查看历史")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 每个提交在一行内显示")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--oneline")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 在所有提交日志中搜索包含「homepage」的提交")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--all")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--grep")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'homepage'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--grep")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"homepage"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 获取某人的提交日志")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--author")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"linghuchong"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看今日的提交")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--since")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0 am"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 获取所有的操作历史，包括被删除的")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reflog\n")])])]),a("h3",{attrs:{id:"重置本地仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#重置本地仓库"}},[t._v("#")]),t._v(" 重置本地仓库")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" fetch origin\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout master\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--hard")]),t._v(" origin/master\n")])])]),a("h3",{attrs:{id:"操作分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#操作分支"}},[t._v("#")]),t._v(" 操作分支")]),t._v(" "),a("p",[t._v("查看分支")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-v")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 分支信息更加详细，可以看到分支是 origin 或 upstream")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-vv")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看本地和远程分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-a")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看所有远程分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-r")]),t._v("\n")])])]),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("* master\n  remotes/origin/HEAD -> origin/master\n  remotes/origin/gh-pages\n  remotes/origin/master\n")])])]),a("p",[t._v("新建分支")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-b")]),t._v(" books\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin books\n")])])]),a("p",[t._v("删除分支")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-d")]),t._v(" books\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-D")]),t._v(" books "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 有没有提交的merge")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 删除远程分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-d")]),t._v(" books\n")])])]),a("p",[t._v("合并分支")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout test4.0\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" pull origin test4.0\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" merge develop4.0\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin test4.0\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout develop4.0\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 对没有合并成功的代码，撤销合并")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" merge "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--abort")]),t._v("\n")])])]),a("p",[t._v("重命名分支")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 把本地的 master 分支重命名为 test")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-m")]),t._v(" master "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("test")]),t._v("\n")])])]),a("h3",{attrs:{id:"提交代码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#提交代码"}},[t._v("#")]),t._v(" 提交代码")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看文件状态")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" status\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 提交代码")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit –a –m "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit –am "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 修改commit信息")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--amend")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-m")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"add new file"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--amend")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 直接编辑提交记录")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 清除当前目录下所有没add的修改")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# git format-patch 用来对某次提交生成patch，方便发送给其他人员进行参考或者同步")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" format-patch "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-n")]),t._v(" HEAD^ "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 生成path")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" am "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 同步path")]),t._v("\n")])])]),a("p",[t._v("切换到之前分支")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout -\n")])])]),a("h3",{attrs:{id:"拉取和推送"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#拉取和推送"}},[t._v("#")]),t._v(" 拉取和推送")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 拉取 remote origin 对应的远程仓库的 master 分支合并到本地的 test 分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" pull origin master:test\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 不获取tags")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" fetch --no-tags\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config remote.origin.tagopt --no-tags\n")])])]),a("p",[a("code",[t._v("pull")]),t._v(" 和 "),a("code",[t._v("fetch")]),t._v(" 拉去新的更新，区别是 "),a("code",[t._v("pull")]),t._v(" 会和当前分支合并，"),a("code",[t._v("fetch")]),t._v(" 不会。")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 推送并设置默认远程分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-u")]),t._v(" origin master\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 强制推送，就算本地和远程有差异也推上去")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-f")]),t._v(" origin master\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 删除远程主机的 master 分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-d")]),t._v(" master\n")])])]),a("h3",{attrs:{id:"标签"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#标签"}},[t._v("#")]),t._v(" 标签")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" tag "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-a")]),t._v(" v1.0\n")])])]),a("p",[t._v("如果我们忘了给某个提交打标签，又将它发布了，我们可以给它追加标签。")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" tag "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-a")]),t._v(" v0.9 85fc7e7\n")])])]),a("p",[t._v("提交")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--tags")]),t._v("\n")])])]),a("h3",{attrs:{id:"暂存"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#暂存"}},[t._v("#")]),t._v(" 暂存")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash list\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash pop\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("clear")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 保存所有正在追踪的文件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash save "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"日志信息"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 获取并删除暂存项")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash apply stash@"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash drop stash@"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash pop stash@"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"获取上游代码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#获取上游代码"}},[t._v("#")]),t._v(" 获取上游代码")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-v")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("remote name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("url"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" upstream https://github.com/xxxxx/xxxx.git\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 从远程存储库中获取更改，但不和本地的合并")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" fetch upstream\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 从特定分支获取更改")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" fetch "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("remote name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("branch"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" merge upstream/master\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin master\n")])])]),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 删除远程仓库")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote remove "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("remote name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 重命名远程存储库")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rename")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("old name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("new name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 修改 url")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote set-url "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--add")]),t._v(" github https:/xxxx.git\n")])])]),a("h3",{attrs:{id:"回退到某次-commit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#回退到某次-commit"}},[t._v("#")]),t._v(" 回退到某次 commit")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# git commit之后，想撤销 commit，撤回后保留更改")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--soft")]),t._v(" HEAD^\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 代码回退删除远程")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--oneline")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--hard")]),t._v(" HEAD@"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--hard")]),t._v(" commit_hash\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-f")]),t._v(" 删除远程分支\n")])])]),a("ul",[a("li",[a("code",[t._v("HEAD^")]),t._v("的意思是上一个版本，也可以写成"),a("code",[t._v("HEAD~1")]),t._v("。如果你进行了 2 次 commit，想都撤回，可以使用"),a("code",[t._v("HEAD~2")])]),t._v(" "),a("li",[a("code",[t._v("--soft")]),t._v("：不删除工作空间改动代码，撤销 commit，不撤销"),a("code",[t._v("git add .")]),t._v(";")]),t._v(" "),a("li",[a("code",[t._v("--hard")]),t._v("：删除工作空间改动代码，撤销 commit，撤销"),a("code",[t._v("git add .")]),t._v(", 注意完成这个操作后，就恢复到了上一次的 commit 状态。")])]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# revert 针对某一次commit的反向操作，会生成一次空的commit")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" revert "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-n")]),t._v(" commit_hash\n")])])]),a("h3",{attrs:{id:"清理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#清理"}},[t._v("#")]),t._v(" 清理")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 移除远程仓库上不存在的分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" fetch "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-p")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 清除当前目录下所有没add的修改")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n")])])]),a("h3",{attrs:{id:"cherry-pick"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cherry-pick"}},[t._v("#")]),t._v(" cherry-pick")]),t._v(" "),a("p",[t._v("经常需要从一个分支选择性的合并 commit 到另一个分支，可使用 cherry-pick 实现：")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 单个commit合并")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" cherry-pick "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("commitHash"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),a("p",[t._v("这会在当前分支产生一个新的提交")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 转移多个提交")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" cherry-pick "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("HashA"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("HashB"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 转移一串提交，提交 A 将不会包含在 Cherry pick 中")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" cherry-pick A"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v("B\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 包含提交 A")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" cherry-pick A^"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v("B\n")])])]),a("h4",{attrs:{id:"代码冲突"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#代码冲突"}},[t._v("#")]),t._v(" 代码冲突")]),t._v(" "),a("p",[t._v("用户解决代码冲突后，第一步将修改的文件重新加入暂存区（git add .），第二步使用下面的命令，让 Cherry pick 过程继续执行。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("git cherry-pick --continue\n")])])]),a("ul",[a("li",[a("code",[t._v("--abort")]),t._v(" 发生代码冲突后，放弃合并，回到操作前的样子。")]),t._v(" "),a("li",[a("code",[t._v("--quit")]),t._v(" 发生代码冲突后，退出 Cherry pick，但是不回到操作前的样子。")])]),t._v(" "),a("h3",{attrs:{id:"创建项目"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建项目"}},[t._v("#")]),t._v(" 创建项目")]),t._v(" "),a("p",[t._v("第一次配置 Git")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--global")]),t._v(" user.name "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"xxx"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--global")]),t._v(" user.email "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"xxxxxx@qq.com"')]),t._v("\n")])])]),a("p",[t._v("克隆某个项目")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone ssh://git@code.xxxxxx.git\n")])])]),a("p",[t._v("如果代码已经准备好推送到仓库，请在终端中执行该命令")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" existing-project\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" init\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--all")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-m")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Initial Commit"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" origin ssh://git@code.xxxxxx.git\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-u")]),t._v(" origin master\n")])])]),a("p",[t._v("我的代码已经由 Git 跟踪")]),t._v(" "),a("p",[t._v("如果你的代码已经由 Git 跟踪，然后设置这个仓库作为你的“origin”推送。")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" existing-project\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote set-url origin ssh://git@code.xxxxxx.git\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-u")]),t._v(" origin "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--all")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--tags")]),t._v("\n")])])]),a("h3",{attrs:{id:"其他"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#其他"}},[t._v("#")]),t._v(" 其他")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 统计项目")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" shortlog "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-sn")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 强制推送")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-f")]),t._v(" git@github.com:xxx/xxx.git master:gh-pages\n")])])]),a("p",[t._v("pull 根据不同的配置，可等于 fetch + merge 或 fetch + rebase")]),t._v(" "),a("h3",{attrs:{id:"vim-基本操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vim-基本操作"}},[t._v("#")]),t._v(" vim 基本操作")]),t._v(" "),a("p",[t._v("vim 打开默认是不能输入的，要按 "),a("code",[t._v("a")]),t._v(" 或者 "),a("code",[t._v("i")]),t._v(" 进入编辑模式，输入完成后，再按 "),a("code",[t._v("Esc")]),t._v(" 退出编辑模式，这时左下角会有输入框，输入如下英文字符，注意冒号别打成中文字符，回车即可退出 vim 回到终端:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v(":w")]),t._v("：保存")]),t._v(" "),a("li",[a("code",[t._v(":q")]),t._v("：退出")]),t._v(" "),a("li",[a("code",[t._v(":wq")]),t._v("：保存并退出")]),t._v(" "),a("li",[a("code",[t._v("!")]),t._v("：强制的意思，不能保存时")]),t._v(" "),a("li",[a("code",[t._v(":w!")]),t._v(" 强制保存，不能退出时")]),t._v(" "),a("li",[a("code",[t._v(":q!")]),t._v(" 或 "),a("code",[t._v(":wq!")]),t._v(" 强制退出")])]),t._v(" "),a("h3",{attrs:{id:"提交格式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#提交格式"}},[t._v("#")]),t._v(" 提交格式")]),t._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("feat：新功能（feature）\nfix：修补bug\ndocs：文档（documentation）\nstyle：格式（不影响代码运行的变动）\nupdate：格式（不影响代码运行的变动）\nrefactor：重构（即不是新增功能，也不是修改bug的代码变动）\ntest：增加测试\nchore：构建过程或辅助工具的变动\n")])])]),a("h3",{attrs:{id:"资料"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#资料"}},[t._v("#")]),t._v(" 资料")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("git cherry-pick 教程"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=n.exports}}]);