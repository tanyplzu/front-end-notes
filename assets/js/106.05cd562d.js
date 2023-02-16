(window.webpackJsonp=window.webpackJsonp||[]).push([[106],{439:function(a,t,s){"use strict";s.r(t);var n=s(5),e=Object(n.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"web-项目开发"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#web-项目开发"}},[a._v("#")]),a._v(" Web 项目开发")]),a._v(" "),t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#前端参数"}},[a._v("前端参数")]),t("ul",[t("li",[t("a",{attrs:{href:"#接收参数"}},[a._v("接收参数")])]),t("li",[t("a",{attrs:{href:"#lombok"}},[a._v("lombok")])]),t("li",[t("a",{attrs:{href:"#参数校验"}},[a._v("参数校验")])]),t("li",[t("a",{attrs:{href:"#valid-和-validated"}},[a._v("@valid 和 @validated")])]),t("li",[t("a",{attrs:{href:"#自定义校验"}},[a._v("自定义校验")])])])]),t("li",[t("a",{attrs:{href:"#数据库"}},[a._v("数据库")]),t("ul",[t("li",[t("a",{attrs:{href:"#数据表如何去创建"}},[a._v("数据表如何去创建")])]),t("li",[t("a",{attrs:{href:"#配置"}},[a._v("配置")])]),t("li",[t("a",{attrs:{href:"#打包配置"}},[a._v("打包配置")])]),t("li",[t("a",{attrs:{href:"#maven"}},[a._v("maven")])]),t("li",[t("a",{attrs:{href:"#jpa-的配置"}},[a._v("JPA 的配置")])]),t("li",[t("a",{attrs:{href:"#使用实体创建表"}},[a._v("使用实体创建表")])]),t("li",[t("a",{attrs:{href:"#表与表之间的关系"}},[a._v("表与表之间的关系")])]),t("li",[t("a",{attrs:{href:"#数据库的设计"}},[a._v("数据库的设计")])]),t("li",[t("a",{attrs:{href:"#数据设计例子"}},[a._v("数据设计例子")])]),t("li",[t("a",{attrs:{href:"#jpa-repository"}},[a._v("JPA Repository")])])])]),t("li",[t("a",{attrs:{href:"#orm"}},[a._v("ORM")]),t("ul",[t("li",[t("a",{attrs:{href:"#字段类型"}},[a._v("字段类型")])]),t("li",[t("a",{attrs:{href:"#序列化"}},[a._v("序列化")])]),t("li",[t("a",{attrs:{href:"#扩展数据库"}},[a._v("扩展数据库")])]),t("li",[t("a",{attrs:{href:"#静态资源"}},[a._v("静态资源")])]),t("li",[t("a",{attrs:{href:"#spu"}},[a._v("SPU")])])])])])]),t("p"),a._v(" "),t("h2",{attrs:{id:"前端参数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#前端参数"}},[a._v("#")]),a._v(" 前端参数")]),a._v(" "),t("ul",[t("li",[a._v("检验代码不能写到控制器，最好分离出去")]),a._v(" "),t("li",[a._v("控制器最好不要写业务逻辑")])]),a._v(" "),t("h3",{attrs:{id:"接收参数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#接收参数"}},[a._v("#")]),a._v(" 接收参数")]),a._v(" "),t("ul",[t("li",[a._v("@PathVariable 接收"),t("code",[a._v("{name}")]),a._v("形式的参数")]),a._v(" "),t("li",[a._v("@requestParam 接收"),t("code",[a._v("?name")]),a._v("形式的参数")])]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("class")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("BannerController")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@GetMapping")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/name/{name}"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Banner")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("getByName")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@PathVariable")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@NotBlank")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("String")]),a._v(" name"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n        "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Banner")]),a._v(" banner "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" bannerService"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("getByName")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("name"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("return")]),a._v(" banner"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),t("p",[a._v("post 格式的参数")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("class")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("UserController")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@PostMapping")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/wx_info"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@ScopeLevel")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("SuccessDTO")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("updateUserInfo")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@RequestBody")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Map")]),t("span",{pre:!0,attrs:{class:"token generics"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("String")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Object")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" user"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("return")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("SuccessDTO")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),t("ul",[t("li",[a._v("@RequestBody 接收 post body 中传入的参数")]),a._v(" "),t("li",[t("code",[a._v("Map<String,Object>")]),a._v(",键是 Sting,值不确定，有个拆箱和装箱的而过程，不建议这样写。")]),a._v(" "),t("li",[a._v("使用 DTO（数据传输对象）的方式去接收")])]),a._v(" "),t("h3",{attrs:{id:"lombok"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#lombok"}},[a._v("#")]),a._v(" lombok")]),a._v(" "),t("ul",[t("li",[a._v("使用@getter 和@setter 注解生成 get 和 set 方法；")]),a._v(" "),t("li",[a._v("@NoArgsConstructor 无参的构造函数")]),a._v(" "),t("li",[a._v("@RequireArgsConstructor 生成一个必填项的构造函数")]),a._v(" "),t("li",[a._v("@NonNull，该字段不能为空")]),a._v(" "),t("li",[a._v("@build 模式使代码简洁")])]),a._v(" "),t("p",[a._v("一个类下面没有定义构造函数时，java 会默认一个无参的构造函数")]),a._v(" "),t("h3",{attrs:{id:"参数校验"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参数校验"}},[a._v("#")]),a._v(" 参数校验")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("import")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token import"}},[t("span",{pre:!0,attrs:{class:"token namespace"}},[a._v("javax"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("validation"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("constraints"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")])]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("DecimalMax")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("import")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token import"}},[t("span",{pre:!0,attrs:{class:"token namespace"}},[a._v("javax"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("validation"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("constraints"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")])]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("DecimalMin")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("class")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("OrderDTO")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@DecimalMin")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("value"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"0.00"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" message "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"不在合法范围内"')]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@DecimalMax")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("value"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"99999999.99"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" message "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"不在合法范围内"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("BigDecimal")]),a._v(" totalPrice"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Length")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("min"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" max"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("10")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" message "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"xxxxx"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("String")]),a._v(" name"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@NotBlank")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("message "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"account不允许为空"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("String")]),a._v(" account"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@TokenPassword")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("max"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("30")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" message "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"{token.password}"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("String")]),a._v(" password"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),t("p",[a._v("关联 DTO 的校验，需要打上 @valid 注解")]),a._v(" "),t("h3",{attrs:{id:"valid-和-validated"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#valid-和-validated"}},[a._v("#")]),a._v(" @valid 和 @validated")]),a._v(" "),t("ul",[t("li",[a._v("都用于参数校验")]),a._v(" "),t("li",[a._v("开启验证一般用 @validated")]),a._v(" "),t("li",[a._v("关联 DTO 的校验，需要打上 @valid 注解")]),a._v(" "),t("li",[a._v("其它情况一般优先考虑 @validated")])]),a._v(" "),t("h3",{attrs:{id:"自定义校验"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#自定义校验"}},[a._v("#")]),a._v(" 自定义校验")]),a._v(" "),t("p",[t("a",{attrs:{href:"https://www.cnblogs.com/leeego-123/p/10820099.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("springboot使用hibernate validator校验"),t("OutboundLink")],1)]),a._v(" "),t("ul",[t("li",[a._v("验证密码两次是否相等")])]),a._v(" "),t("h2",{attrs:{id:"数据库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据库"}},[a._v("#")]),a._v(" 数据库")]),a._v(" "),t("h3",{attrs:{id:"数据表如何去创建"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据表如何去创建"}},[a._v("#")]),a._v(" 数据表如何去创建")]),a._v(" "),t("ul",[t("li",[a._v("可视化工具")]),a._v(" "),t("li",[a._v("sql 语句")]),a._v(" "),t("li",[a._v("Model 映射表")])]),a._v(" "),t("h3",{attrs:{id:"配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#配置"}},[a._v("#")]),a._v(" 配置")]),a._v(" "),t("ul",[t("li",[a._v("在 application.properties 文件中或 application.yml")]),a._v(" "),t("li",[a._v("yml 文件层架较好，推荐使用")]),a._v(" "),t("li",[a._v("区分环境")])]),a._v(" "),t("div",{staticClass:"language-yml extra-class"},[t("pre",{pre:!0,attrs:{class:"language-yml"}},[t("code",[t("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("spring")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("profiles")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" active"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("dev\n")])])]),t("h3",{attrs:{id:"打包配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#打包配置"}},[a._v("#")]),a._v(" 打包配置")]),a._v(" "),t("p",[a._v("spring boot 打出来的 jar 包叫 uber jar,内置了 tomcat 服务器。启动:")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("java")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-jar")]),a._v(" xxx.jar\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("java")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-jar")]),a._v(" xxx.jar "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--spring.profiles.active")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("dev\n")])])]),t("h3",{attrs:{id:"maven"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#maven"}},[a._v("#")]),a._v(" maven")]),a._v(" "),t("p",[a._v("idea 中 maven work offline，取消离线模式。\n数据源的更改：在本项目或 maven 中修改")]),a._v(" "),t("h3",{attrs:{id:"jpa-的配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jpa-的配置"}},[a._v("#")]),a._v(" JPA 的配置")]),a._v(" "),t("p",[a._v("application.yml 中配置 jpa")]),a._v(" "),t("h3",{attrs:{id:"使用实体创建表"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用实体创建表"}},[a._v("#")]),a._v(" 使用实体创建表")]),a._v(" "),t("ul",[t("li",[a._v("实体类中设置比较麻烦")]),a._v(" "),t("li",[a._v("关联表的关系")]),a._v(" "),t("li",[a._v("外键的问题，物理外键，逻辑外键")])]),a._v(" "),t("h3",{attrs:{id:"表与表之间的关系"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#表与表之间的关系"}},[a._v("#")]),a._v(" 表与表之间的关系")]),a._v(" "),t("ul",[t("li",[a._v("1 对 1 一般字段太多，分成多个表")]),a._v(" "),t("li",[a._v("1 对多 班级和学生")]),a._v(" "),t("li",[a._v("多对多 老师和学生")])]),a._v(" "),t("p",[a._v("为什么要 1 对 1：")]),a._v(" "),t("ul",[t("li",[a._v("查询效率")]),a._v(" "),t("li",[a._v("业务的角度")])]),a._v(" "),t("p",[a._v("多对多：")]),a._v(" "),t("ul",[t("li",[a._v("中间表，记录关系")]),a._v(" "),t("li",[a._v("用户和优惠券，是否使用过的状态需要记录在第三张表中")])]),a._v(" "),t("h3",{attrs:{id:"数据库的设计"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据库的设计"}},[a._v("#")]),a._v(" 数据库的设计")]),a._v(" "),t("ul",[t("li",[a._v("把表当成一个模型，把一个表当成一个实体模型")]),a._v(" "),t("li",[a._v("再考虑对象与对象的关系（使用外键建立关系）")]),a._v(" "),t("li",[a._v("细化：字段、限制、长度、小数点、索引")])]),a._v(" "),t("p",[a._v("优化")]),a._v(" "),t("ul",[t("li",[a._v("垂直分表和水平分表")]),a._v(" "),t("li",[a._v("查询方式（数据库的优化，更多再查询方式上），like 的效率很低")]),a._v(" "),t("li",[a._v("缓存多数据库最有效")])]),a._v(" "),t("h3",{attrs:{id:"数据设计例子"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据设计例子"}},[a._v("#")]),a._v(" 数据设计例子")]),a._v(" "),t("ul",[t("li",[a._v("@oneToMany 一对多")]),a._v(" "),t("li",[a._v("banner 和 banner_item")]),a._v(" "),t("li",[a._v("消除第三张表，使用外键，@JionColumn")]),a._v(" "),t("li",[a._v("@GeneratedValue(strategy = GenerationType.IDENTITY)")]),a._v(" "),t("li",[a._v("一般建议不要使用物理外键")])]),a._v(" "),t("h3",{attrs:{id:"jpa-repository"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jpa-repository"}},[a._v("#")]),a._v(" JPA Repository")]),a._v(" "),t("ul",[t("li",[a._v("Repository 接口规范(总接口)")]),a._v(" "),t("li",[a._v("CRUDRepository 接口(继承 Repository 接口)")]),a._v(" "),t("li",[a._v("PagingAndSorting 接口(继承 CRUDRepository 接口)")]),a._v(" "),t("li",[a._v("JPARepository 接口(继承 PagingAndSorting 接口)")]),a._v(" "),t("li",[a._v("JPASpecificationExecutor 接口")])]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("interface")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("UsersDao")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("extends")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Repository")]),t("span",{pre:!0,attrs:{class:"token generics"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Users")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Integer")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//方法名称命名规则")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("List")]),t("span",{pre:!0,attrs:{class:"token generics"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Users")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("findByUsername")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("String")]),a._v(" string"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("List")]),t("span",{pre:!0,attrs:{class:"token generics"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Users")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("findByUsernameLike")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("String")]),a._v(" string"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("List")]),t("span",{pre:!0,attrs:{class:"token generics"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Users")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("findByUsernameAndUserageGreaterThan")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("String")]),a._v(" string"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Integer")]),a._v(" age"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),t("p",[a._v("配置后再控制台可以打印 sql 语句，也可以格式化")]),a._v(" "),t("ul",[t("li",[a._v("懒加载，节约性能")]),a._v(" "),t("li",[a._v("急加载")])]),a._v(" "),t("h2",{attrs:{id:"orm"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#orm"}},[a._v("#")]),a._v(" ORM")]),a._v(" "),t("p",[a._v("用面向对象的方式去看待数据库")]),a._v(" "),t("p",[a._v("数据库的作用：")]),a._v(" "),t("ul",[t("li",[a._v("存储数据")]),a._v(" "),t("li",[a._v("存储关系")])]),a._v(" "),t("p",[a._v("表的创建：")]),a._v(" "),t("ul",[t("li",[a._v("数据库设计工具")]),a._v(" "),t("li",[a._v("SQL 定义 DDL")])]),a._v(" "),t("blockquote",[t("p",[a._v("DDL 是一种数据设计语言")])]),a._v(" "),t("p",[a._v("一个 Entity 例子：")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Entity")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Getter")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Setter")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Where")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("clause "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"delete_time is null "')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("class")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Banner")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("extends")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("BaseEntity")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Id")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Long")]),a._v(" id"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("String")]),a._v(" name"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("String")]),a._v(" description"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("String")]),a._v(" title"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("String")]),a._v(" img"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@OneToMany")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("fetch "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("FetchType")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token constant"}},[a._v("LAZY")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@JoinColumn")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("name"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"bannerId"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("List")]),t("span",{pre:!0,attrs:{class:"token generics"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("BannerItem")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" items"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),t("ul",[t("li",[a._v("@Getter 和 @Setter 不用给每个字段加 getter 和 setter 方法；")]),a._v(" "),t("li",[a._v("可以将时间公共的字段放在基类中 BaseEntity")]),a._v(" "),t("li",[a._v("如果用数据表生成实体，不需要给实体的每个字段加长度等设置")]),a._v(" "),t("li",[a._v("FetchType.LAZY 序列化会触发懒加载，可以使用序列化阻止")])]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Getter")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Setter")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@MappedSuperclass")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("abstract")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("class")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("BaseEntity")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@JsonIgnore")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Column")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("insertable"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("false")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" updatable"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("false")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Date")]),a._v(" createTime"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@JsonIgnore")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Column")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("insertable"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("false")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" updatable"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("false")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Date")]),a._v(" updateTime"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@JsonIgnore")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Date")]),a._v(" deleteTime"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),t("ul",[t("li",[a._v("abstract 抽象类")]),a._v(" "),t("li",[a._v("@MappedSuperclass 表示映射的基类，没有该注解，可能取不到时间的值")]),a._v(" "),t("li",[a._v("@JsonIgnore 结果不出现")])]),a._v(" "),t("h3",{attrs:{id:"字段类型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#字段类型"}},[a._v("#")]),a._v(" 字段类型")]),a._v(" "),t("ul",[t("li",[a._v("时间可以设置默认值")]),a._v(" "),t("li",[a._v("价格的表示 decimal(10,2),一定不能用")])]),a._v(" "),t("h3",{attrs:{id:"序列化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#序列化"}},[a._v("#")]),a._v(" 序列化")]),a._v(" "),t("ul",[t("li",[a._v("默认库 jackson；fastjson，阿里的，简单些")]),a._v(" "),t("li",[a._v("@JsonIgnore")])]),a._v(" "),t("h3",{attrs:{id:"扩展数据库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#扩展数据库"}},[a._v("#")]),a._v(" 扩展数据库")]),a._v(" "),t("ul",[t("li",[a._v("表里的数据字段不够用")]),a._v(" "),t("li",[a._v("列不具备扩展性，行不具备扩展性（有时候可以解决数据扩展的问题）")]),a._v(" "),t("li",[a._v("没有特殊理由，可以把一些字段设置成文本，会更灵活的")])]),a._v(" "),t("h3",{attrs:{id:"静态资源"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#静态资源"}},[a._v("#")]),a._v(" 静态资源")]),a._v(" "),t("ul",[t("li",[a._v("设置 controller 访问：容易控制权限，但速度较慢；")]),a._v(" "),t("li",[a._v("采用 thymeleaf,将图片放到路径'src\\main\\resources\\static\\imgs'下")]),a._v(" "),t("li",[a._v("不要把静态文件放到数据库")])]),a._v(" "),t("h3",{attrs:{id:"spu"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#spu"}},[a._v("#")]),a._v(" SPU")]),a._v(" "),t("p",[a._v("列表信息需要返回概要数据还是详情数据？")])])}),[],!1,null,null,null);t.default=e.exports}}]);