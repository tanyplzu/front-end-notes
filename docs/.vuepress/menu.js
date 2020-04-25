const getNav = () => {
  return [
    { text: '首页', link: '/Introduction' },
    { text: '前端知识点', link: '/FrontEnd/JavaScript/01-JavaScript基础' },
    {
      text: '前端框架',
      ariaLabel: 'Language Menu',
      items: [
        { text: 'React', link: '/React/index' },
        { text: 'Vue', link: '/Vue/index' },
        { text: 'NodeJS', link: '/NodeJS/Node基础' },
        { text: 'AngularJS', link: '/AngularJS/Scope和Digest' },
      ]
    },
    { text: 'Reading', link: '/Reading/浏览器工作原理与实践/浏览器中的页面' },
    { text: 'Notes', link: '/Notes/docs4/vuepress' }
  ];
};
const getSidebar = () => {
  return {
    '/FrontEnd/': [
      'JavaScript/01-JavaScript基础',
      'JavaScript/02-JavaScript进阶',
      'JavaScript/V8',
      'JavaScript/TS',
      'Html&Css',
      'NetworkAndSecurity/Network',
      // 'NetworkAndSecurity/网络协议进阶',
      'NetworkAndSecurity/Security',
      'DesignPattern',
      'DSA/Algorithms',
      'Git'
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
        'nextTick'
      ]
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
      ]
    }],
    '/React/': [
    {
      title: 'React 基础', // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: [
        ['./', 'Introduction'],
        'setState',
        'react基础',
        'react高级特性',
        'react-router',
        'redux',
        '构建react项目'
      ]
    },
    {
      title: 'reactNative', // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: [
        'reactNative'
      ]
    }],
    '/NodeJS/': [
      'Node基础',
      'Koa',
      'Nest.js入门',
    ],
    '/Reading/': [
    {
      title: '浏览器工作原理与实践',
      collapsable: false,
      children: [
        '浏览器工作原理与实践/浏览器中的页面',
        '浏览器工作原理与实践/从输入 URL 到页面展示',
        '浏览器工作原理与实践/JavaScript的执行机制'
      ]
    },
    {
      title: '图解 Google V8',
      collapsable: false,
      children: [
        'v8/JavaScript设计思想',
        'v8/V8编译流水线'
      ]
    },
    {
      title: 'Webpack',
      collapsable: false,
      children: [
        'Webpack/env',
        'Webpack/Webpack运行原理',
        'Webpack/Webpack基础知识',
        'Webpack/Webpack优化',
      ]
    }, ],
    '/Notes/': [
      {
        title: '基础语法：',
        collapsable: false,
        children: [
          'docs1/数组的方法',
          'docs1/对象静态方法总结分享', 
          'docs1/javascript-regexp',
        ]
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
          'docs1/前端面试'
        ]
      },
      {
        title: '文档(二)：',
        collapsable: false,
        children: [
          // 'docs2/数组操作方法',
          'docs2/数字',
          'docs2/字符串方法',
          'docs2/math',
        ]
      },
      {
        title: '文档(三)：',
        collapsable: false,
        children: [
          'docs3/Vue 项目构建',
          'docs3/WebGL 基础',
          'docs3/数学',
        ]
      },
      {
        title: '文档(四)：',
        collapsable: false,
        children: [
          'docs4/密码学',
          'docs4/vuepress',
          'docs4/Java英语'
        ]
      },
    ],
    '/AngularJS/': [
      'Scope和Digest',
      '指令',
      'parse和eval'
    ],
  };
};

module.exports = {
  getNav,
  getSidebar
};