const getNav = () => {
  return [
    { text: '首页', link: '/Introduction' },
    { text: '前端知识点', link: '/FrontEnd/JavaScript/01-JavaScript基础' },
    {
      text: '前端框架',
      ariaLabel: 'Language Menu',
      items: [
        { text: 'Vue', link: '/Vue/Vue知识点' },
        { text: 'React', link: '/React/index' },
        { text: 'AngularJS', link: '/AngularJS/Scope和Digest' },
      ]
    },
    { text: 'Reading', link: '/Reading/浏览器工作原理与实践/浏览器中的页面' },
    { text: 'Notes', link: '/Notes/vuepress' }
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
      'Webpack',
      'DesignPattern',
      {
        title: 'Node基础',
        collapsable: true,
        children: [
          'Node/Node基础',
          'Node/Koa',
          'Node/Nest.js入门',
        ]
      },
      'DSA/Algorithms',
      'Git'
    ],
    '/Vue/': [
      ['./', 'Vue相关'],
      ['Vue知识点', 'Vue 知识点'],
      'Vue的启动',
      '有关响应式原理',
      'Vue组件通信',
      '插件的注册原理',
      'Vue路由',
      'Vue组件',
    ],
    '/React/': [
      ['./', 'Introduction'],
      'react基础',
      'reactNative'
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
      title: '玩转webpack',
      collapsable: false,
      children: [
        'webpack/玩转webpack'
      ]
    }],
    '/Notes/': [
      {
        title: '文档(一)：',
        collapsable: false,
        children: [
          'docs1/数组的方法',
          'docs1/对象静态方法总结分享',
          'docs1/javascript-regexp',
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
          'docs2/数组操作方法',
          'docs2/数字',
          'docs2/array',
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
      '密码学',
      'vuepress',
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