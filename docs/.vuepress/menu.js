const getNav = () => {
  return [
    { text: '首页', link: '/Introduction' },
    { text: '前端知识点', link: '/FrontEnd/JavaScript/01-JavaScript基础' },
    {
      text: '前端框架',
      ariaLabel: 'Language Menu',
      items: [
        { text: 'Vue', link: '/Vue/Vue知识点' },
        { text: 'React', link: '' },
        { text: 'react Native', link: '' },
        { text: 'AngularJS', link: '/AngularJS/Scope和Digest' },
      ]
    },
    // { text: 'Vue', link: '/Vue/index' },
    { text: 'Notes', link: '/Notes/vuepress' }
  ];
};
const getSidebar = () => {
  return {
    '/FrontEnd/': [
      {
        title: 'JS基础',
        collapsable: true,
        children: [
          'JavaScript/01-JavaScript基础',
          'JavaScript/02-JavaScript进阶',
          'JavaScript/JavaScript的执行机制',
          'JavaScript/V8',
          'JavaScript/TS'
        ]
      },
      'Html&Css',
      'Network',
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
      {
        title: '数据结构与算法',
        collapsable: true,
        children: [
          'DSA/Algorithms'
        ]
      },
    ],
    '/Vue/': [
      ['./', 'Vue相关'],
      'Vue知识点',
      'Vue的启动',
      '响应式原理',
      'Vue组件通信',
      '插件的注册原理',
      'Vue路由',
      'Vue组件',
    ],
    '/Notes/': [
      'vuepress',
      'router',
      '密码学',
      {
        title: '文档：',
        collapsable: false,
        children: [
          'docs1/对象静态方法总结分享',
          'docs1/数字',
          'docs1/array',
          'docs1/数组操作方法',
        ]
      }
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