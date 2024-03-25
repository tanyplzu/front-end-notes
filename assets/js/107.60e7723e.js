(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{450:function(t,s,a){"use strict";a.r(s);var r=a(6),n=Object(r.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"rollup-配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rollup-配置"}},[t._v("#")]),t._v(" rollup 配置")]),t._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#rollup-config-js"}},[t._v("rollup.config.js")])]),s("li",[s("a",{attrs:{href:"#banner"}},[t._v("banner")])]),s("li",[s("a",{attrs:{href:"#format"}},[t._v("format")])]),s("li",[s("a",{attrs:{href:"#plugins"}},[t._v("plugins")]),s("ul",[s("li",[s("a",{attrs:{href:"#rollup-plugin-buble"}},[t._v("@rollup/plugin-buble")])]),s("li",[s("a",{attrs:{href:"#rollup-plugin-babel"}},[t._v("rollup-plugin-babel")])]),s("li",[s("a",{attrs:{href:"#rollup-plugin-node-resolve"}},[t._v("rollup/plugin-node-resolve")])]),s("li",[s("a",{attrs:{href:"#rollup-plugin-terser"}},[t._v("rollup-plugin-terser")])])])]),s("li",[s("a",{attrs:{href:"#rollup-的优势和不足"}},[t._v("Rollup 的优势和不足")])])])]),s("p"),t._v(" "),s("p",[t._v("一个高效的 ES Modules 打包器，充分利用 ES Modules 的各项特性，构建出结构扁平，性能出众的类库。")]),t._v(" "),s("h2",{attrs:{id:"rollup-config-js"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rollup-config-js"}},[t._v("#")]),t._v(" rollup.config.js")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("input")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'src/main.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("output")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("banner")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("file")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'dist/bundle.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 输出文件")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("format")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" 'cjs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'A'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("sourcemap")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("globals")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'jquery'")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'$'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//告诉rollup 全局变量$即是jquery")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("external")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("plugins")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("buble")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("commonjs")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("terser")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("module")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("format "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'es'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"banner"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#banner"}},[t._v("#")]),t._v(" banner")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" banner "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("/*!\n * v")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("pkg"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("version"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("\n * (c) ")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Date")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getFullYear")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("\n * @license MIT\n */")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"format"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#format"}},[t._v("#")]),t._v(" format")]),t._v(" "),s("ul",[s("li",[t._v("amd – 异步模块定义，用于像 RequireJS 这样的模块加载器")]),t._v(" "),s("li",[t._v("cjs – CommonJS，适用于 Node 和 Browserify/Webpack")]),t._v(" "),s("li",[t._v("esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 "),s("code",[t._v("<script type=module>")]),t._v(" 标签引入")]),t._v(" "),s("li",[t._v("iife – 一个自动执行的功能，适合作为 "),s("code",[t._v("<script>")]),t._v(" 标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）")]),t._v(" "),s("li",[t._v("umd – 通用模块定义，以 amd，cjs 和 iife 为一体")]),t._v(" "),s("li",[t._v("system - SystemJS 加载器格式")])]),t._v(" "),s("h2",{attrs:{id:"plugins"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#plugins"}},[t._v("#")]),t._v(" plugins")]),t._v(" "),s("h3",{attrs:{id:"rollup-plugin-buble"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rollup-plugin-buble"}},[t._v("#")]),t._v(" @rollup/plugin-buble")]),t._v(" "),s("p",[t._v("将 ES6 代码编译成 ES5。")]),t._v(" "),s("h3",{attrs:{id:"rollup-plugin-babel"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rollup-plugin-babel"}},[t._v("#")]),t._v(" rollup-plugin-babel")]),t._v(" "),s("p",[s("code",[t._v(".babelrc")])]),t._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"presets"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@babel/preset-env"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"exclude"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"transform-regenerator"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("ul",[s("li",[t._v('设置 "modules": false ，否则 Babel 会在 Rollup 做处理之前，将我们的模块转成 CommonJS。')]),t._v(" "),s("li",[t._v("将 "),s("code",[t._v(".babelrc")]),t._v(" 文件放在 src 中，而不是根目录下。 这允许我们对于不同的任务有不同的 "),s("code",[t._v(".babelrc")]),t._v(" 配置，比如像测试，如果我们以后需要的话 - 通常为单独的任务单独配置会更好。")])]),t._v(" "),s("h3",{attrs:{id:"rollup-plugin-node-resolve"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rollup-plugin-node-resolve"}},[t._v("#")]),t._v(" rollup/plugin-node-resolve")]),t._v(" "),s("ul",[s("li",[t._v("@rollup/plugin-node-resolve 插件允许我们加载第三方模块")]),t._v(" "),s("li",[t._v("@rollup/plugin-commons 插件将它们转换为 ES6 版本")])]),t._v(" "),s("h3",{attrs:{id:"rollup-plugin-terser"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rollup-plugin-terser"}},[t._v("#")]),t._v(" rollup-plugin-terser")]),t._v(" "),s("p",[t._v("terser 使用 terser 压缩代码")]),t._v(" "),s("h2",{attrs:{id:"rollup-的优势和不足"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rollup-的优势和不足"}},[t._v("#")]),t._v(" Rollup 的优势和不足")]),t._v(" "),s("ul",[s("li",[t._v("输出结果更加扁平，执行效率更高；")]),t._v(" "),s("li",[t._v("自动移除未引用代码；")]),t._v(" "),s("li",[t._v("打包结果依然完全可读。")]),t._v(" "),s("li",[t._v("但是它的缺点也同样明显：")])]),t._v(" "),s("p",[t._v("不足：")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("加载非 ESM 的第三方模块比较复杂；")])]),t._v(" "),s("li",[s("p",[t._v("因为模块最终都被打包到全局中，所以无法实现 HMR；")])]),t._v(" "),s("li",[s("p",[t._v("浏览器环境中，代码拆分功能必须使用 Require.js 这样的 AMD 库。")])]),t._v(" "),s("li",[s("p",[s("a",{attrs:{href:"https://rollupjs.org",target:"_blank",rel:"noopener noreferrer"}},[t._v("rollup.js"),s("OutboundLink")],1)])])])])}),[],!1,null,null,null);s.default=n.exports}}]);