(window.webpackJsonp=window.webpackJsonp||[]).push([[112],{438:function(t,s,a){"use strict";a.r(s);var n=a(5),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"docker-基础"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#docker-基础"}},[t._v("#")]),t._v(" Docker 基础")]),t._v(" "),s("h2",{attrs:{id:"dockerfile"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dockerfile"}},[t._v("#")]),t._v(" Dockerfile")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 使用node版本11.12.0")]),t._v("\nFROM node:11.12.0\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 代表生产环境")]),t._v("\nENV PROJECT_ENV production\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 许多 package 会根据此环境变量，做出不同的行为")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 另外，在 webpack 中打包也会根据此环境变量做出优化，但是 create-react-app 在打包时会写死该环境变量")]),t._v("\nENV NODE_ENV production\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 进入code文件夹，如果没有则会生成，并进入文件夹")]),t._v("\nWORKDIR /code\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 将当前内容 放入code文件夹")]),t._v("\nADD "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v(" /code\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 执行指令")]),t._v("\nRUN "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" build "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-g")]),t._v(" http-server\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 暴露容器端口 8080")]),t._v("\nEXPOSE "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8080")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 当执行docker run的时候会执行以下shell 脚本。")]),t._v("\nCMD http-server ./build "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-p")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8080")]),t._v("\n\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);