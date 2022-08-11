(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{506:function(t,s,a){"use strict";a.r(s);var n=a(15),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"rollup-配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rollup-配置"}},[t._v("#")]),t._v(" rollup 配置")]),t._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#rollup-config-js"}},[t._v("rollup.config.js")])]),a("li",[a("a",{attrs:{href:"#banner"}},[t._v("banner")])]),a("li",[a("a",{attrs:{href:"#format"}},[t._v("format")])]),a("li",[a("a",{attrs:{href:"#plugins"}},[t._v("plugins")]),a("ul",[a("li",[a("a",{attrs:{href:"#rollup-plugin-buble"}},[t._v("@rollup/plugin-buble")])]),a("li",[a("a",{attrs:{href:"#rollup-plugin-babel"}},[t._v("rollup-plugin-babel")])]),a("li",[a("a",{attrs:{href:"#rollup-plugin-node-resolve"}},[t._v("rollup/plugin-node-resolve")])]),a("li",[a("a",{attrs:{href:"#rollup-plugin-terser"}},[t._v("rollup-plugin-terser")])])])]),a("li",[a("a",{attrs:{href:"#rollup-的优势和不足"}},[t._v("Rollup 的优势和不足")])])])]),a("p"),t._v(" "),a("p",[t._v("一个高效的 ES Modules 打包器，充分利用 ES Modules 的各项特性，构建出结构扁平，性能出众的类库。")]),t._v(" "),a("h2",{attrs:{id:"rollup-config-js"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rollup-config-js"}},[t._v("#")]),t._v(" rollup.config.js")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  input"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'src/main.js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  output"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    banner"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    file"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'dist/bundle.js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 输出文件")]),t._v("\n    format"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" 'cjs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'A'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    sourcemap"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    globals"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'jquery'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'$'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//告诉rollup 全局变量$即是jquery")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    external"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    plugins"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("buble")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("commonjs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("terser")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" module"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("format "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'es'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"banner"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#banner"}},[t._v("#")]),t._v(" banner")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" banner "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("/*!\n * v")]),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("pkg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("version"),a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("\n * (c) ")]),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Date")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getFullYear")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("\n * @license MIT\n */")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"format"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#format"}},[t._v("#")]),t._v(" format")]),t._v(" "),a("ul",[a("li",[t._v("amd – 异步模块定义，用于像 RequireJS 这样的模块加载器")]),t._v(" "),a("li",[t._v("cjs – CommonJS，适用于 Node 和 Browserify/Webpack")]),t._v(" "),a("li",[t._v("esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 "),a("code",[t._v("<script type=module>")]),t._v(" 标签引入")]),t._v(" "),a("li",[t._v("iife – 一个自动执行的功能，适合作为 "),a("code",[t._v("<script>")]),t._v(" 标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）")]),t._v(" "),a("li",[t._v("umd – 通用模块定义，以 amd，cjs 和 iife 为一体")]),t._v(" "),a("li",[t._v("system - SystemJS 加载器格式")])]),t._v(" "),a("h2",{attrs:{id:"plugins"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#plugins"}},[t._v("#")]),t._v(" plugins")]),t._v(" "),a("h3",{attrs:{id:"rollup-plugin-buble"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rollup-plugin-buble"}},[t._v("#")]),t._v(" @rollup/plugin-buble")]),t._v(" "),a("p",[t._v("将 ES6 代码编译成 ES5。")]),t._v(" "),a("h3",{attrs:{id:"rollup-plugin-babel"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rollup-plugin-babel"}},[t._v("#")]),t._v(" rollup-plugin-babel")]),t._v(" "),a("p",[a("code",[t._v(".babelrc")])]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"presets"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@babel/preset-env"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"exclude"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"transform-regenerator"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ul",[a("li",[t._v('设置 "modules": false ，否则 Babel 会在 Rollup 做处理之前，将我们的模块转成 CommonJS。')]),t._v(" "),a("li",[t._v("将 "),a("code",[t._v(".babelrc")]),t._v(" 文件放在 src 中，而不是根目录下。 这允许我们对于不同的任务有不同的 "),a("code",[t._v(".babelrc")]),t._v(" 配置，比如像测试，如果我们以后需要的话 - 通常为单独的任务单独配置会更好。")])]),t._v(" "),a("h3",{attrs:{id:"rollup-plugin-node-resolve"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rollup-plugin-node-resolve"}},[t._v("#")]),t._v(" rollup/plugin-node-resolve")]),t._v(" "),a("ul",[a("li",[t._v("@rollup/plugin-node-resolve 插件允许我们加载第三方模块")]),t._v(" "),a("li",[t._v("@rollup/plugin-commons 插件将它们转换为 ES6 版本")])]),t._v(" "),a("h3",{attrs:{id:"rollup-plugin-terser"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rollup-plugin-terser"}},[t._v("#")]),t._v(" rollup-plugin-terser")]),t._v(" "),a("p",[t._v("terser 使用 terser 压缩代码")]),t._v(" "),a("h2",{attrs:{id:"rollup-的优势和不足"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rollup-的优势和不足"}},[t._v("#")]),t._v(" Rollup 的优势和不足")]),t._v(" "),a("ul",[a("li",[t._v("输出结果更加扁平，执行效率更高；")]),t._v(" "),a("li",[t._v("自动移除未引用代码；")]),t._v(" "),a("li",[t._v("打包结果依然完全可读。")]),t._v(" "),a("li",[t._v("但是它的缺点也同样明显：")])]),t._v(" "),a("p",[t._v("不足：")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("加载非 ESM 的第三方模块比较复杂；")])]),t._v(" "),a("li",[a("p",[t._v("因为模块最终都被打包到全局中，所以无法实现 HMR；")])]),t._v(" "),a("li",[a("p",[t._v("浏览器环境中，代码拆分功能必须使用 Require.js 这样的 AMD 库。")])]),t._v(" "),a("li",[a("p",[a("a",{attrs:{href:"https://rollupjs.org",target:"_blank",rel:"noopener noreferrer"}},[t._v("rollup.js"),a("OutboundLink")],1)])])])])}),[],!1,null,null,null);s.default=r.exports}}]);