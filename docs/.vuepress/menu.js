const getNav = () => {
  return [
    // { text: '首页', link: '/Introduction' },
    { text: '前端基础', link: '/FrontEnd/' },
    {
      text: '前端框架',
      ariaLabel: 'Language Menu',
      items: [
        { text: 'React', link: '/React/' },
        { text: 'Vue', link: '/Vue/' },
        { text: 'NodeJS', link: '/NodeJS/' },
        { text: 'AngularJS', link: '/AngularJS/' },
      ],
    },
    {
      text: '前端工程化',
      link: '/FrontEndTool/',
    },
    { text: 'Java', link: '/Java/' },
    { text: 'Reading', link: '/Reading/' },
    { text: 'Notes', link: '/notes/' },
    // { text: 'DumiApp', link: 'http://tanyplzu.gitee.io/dumi-app/' },
  ];
};
const getSidebar = () => {
  return {
    '/FrontEnd/': [
      '',
      {
        title: 'JavaScript基础',
        collapsable: true,
        children: [
          'JavaScript/01-JS数据类型',
          'JavaScript/02-JavaScript基础',
          'JavaScript/03-JavaScript进阶',
          'JavaScript/V8',
        ],
      },
      'Html&Css',
      'NetworkAndSecurity/Network',
      'NetworkAndSecurity/Security',
      'DesignPattern',
      {
        title: '前端可视化',
        collapsable: true,
        children: [
          'Canvas/SVG',
          'Canvas/Canvas',
          'Canvas/WebGL',
        ],
      },
      {
        title: '函数式编程',
        collapsable: true,
        children: [
          'Functional/curry',
          'Functional/compose',
        ],
      },
      {
        title: '数据结构与算法',
        collapsable: true,
        children: [
          'DSA/myPromise',
          'DSA/数据结构与算法1',
          'DSA/数据结构与算法2',
          'DSA/LeetCode1',
          'DSA/LeetCode2',
          'DSA/LeetCode3',
          'DSA/nowcoder',
        ],
      },
    ],
    '/Vue/': [
    {
      title: 'Vue基础', // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: [
        ['./', 'Vue相关'],
        'Vue知识点',
        'Vue路由',
        'Vuex',
        'nextTick',
      ],
    },
    {
      title: 'Vue进阶', // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: [
        'Vue的启动',
        '响应式原理',
        'Vue组件通信',
        'Vue组件进阶',
        'diff算法',
        '插件的注册原理',
      ],
    }, ],
    '/React/': [
    {
      title: 'React 基础', // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: [
        ['./', 'Introduction'],
        'setState',
        'react基础',
        'react数据流',
        'hooks',
        'hooks进阶',
        'react高级特性',
        'react高阶组件',
        'react性能优化',
        'react-router',
        'redux',
        'umijs',
      ],
    },
    {
      title: '项目构建',
      collapsable: false,
      sidebarDepth: 1,
      children: ['构建react项目', 'package', 'tsconfig', '开发中遇到的问题'],
    },
    {
      title: 'reactNative', // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: ['reactNative'],
    }, ],
    '/NodeJS/': ['', 'Node基础', 'Node的工具集', 'Koa', 'dev-server', 'Nest.js入门', ],
    '/FrontEndTool/': [
      {
        title: 'Webpack',
        collapsable: false,
        children: [
          'Webpack/Webpack的基本工作流程',
          'Webpack/Webpack打包结果',
          'Webpack/Webpack打包结果2',
          'Webpack/Webpack中常用的插件',
          'Webpack/Webpack性能优化',
          'Webpack/env',
          'Webpack/热更新',
          'Webpack/webpack-chain',
        ],
      },
      'ESLint&Prettier',
      '脚手架工具',
      'npmScript',
      'Git',
      'Monorepo',
      '组件库',
    ],
    '/Java/': [
    {
      title: 'Java',
      collapsable: false,
      children: ['Java 语法/java'],
    },
    {
      title: 'Spring Boot',
      collapsable: false,
      children: [
        'SpringBoot/SpringBoot基础',
        'SpringBoot/web',
        'SpringBoot/注解',
        'SpringBoot/MyBatis',
        'SpringBoot/IOC',
      ],
    }, ],
    '/Reading/': [
      {
        title: 'JavaScript高级程序设计',
        collapsable: false,
        children: [
          'JavaScript高级程序设计/数据类型',
        ],
      },
    {
      title: '浏览器工作原理与实践',
      collapsable: false,
      children: [
        '浏览器工作原理与实践/浏览器中的页面',
        '浏览器工作原理与实践/从输入 URL 到页面展示',
        '浏览器工作原理与实践/JavaScript的执行机制',
      ],
    },
    {
      title: '图解 Google V8',
      collapsable: false,
      children: ['v8/JavaScript设计思想', 'v8/V8编译流水线'],
    },
    {
      title: '运维相关',
      collapsable: false,
      children: ['运维/Linux', '运维/mac', '运维/Linux'],
    }, ],
    '/notes/': [
    {
      title: '基础语法：',
      collapsable: false,
      children: [
        'docs1/数组的方法',
        'docs1/对象静态方法总结分享',
        'docs1/regexp1',
        'docs1/regexp2',
        'docs1/TS1',
        'docs1/TS2',
      ],
    },
    {
      title: '微前端',
      collapsable: false,
      children: [
        'docs1/micro-front',
      ],
    },
    {
      title: '文档(一)：',
      collapsable: false,
      children: [
        'docs1/性能优化',
        'docs1/router',
        'docs1/Vue虚拟DOM和渲染流程',
        'docs1/编译型语言和解释型语言',
        'docs1/面向对象01',
        'docs1/手机端开发问题汇总',
        'docs1/前端面试',
      ],
    },
    {
      title: '文档(二)：',
      collapsable: false,
      children: [
        // 'docs2/数组操作方法',
        'docs2/数字',
        'docs2/字符串方法',
        'docs2/math',
      ],
    },
    {
      title: '文档(三)：',
      collapsable: false,
      children: ['docs4/密码学', 'docs4/vuepress', 'docs4/Java英语'],
    }, ],
    '/AngularJS/': ['Scope和Digest', '指令', 'parse和eval'],
  };
};

module.exports = {
  getNav,
  getSidebar,
};