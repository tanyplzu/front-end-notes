const getNav = () => {
  return [
    { text: '首页', link: '/index.html' },
    { text: '前端知识点', link: '/FrontEnd/JavaScript/01-JavaScript基础' },
    // {
    //   text: '前端知识点',
    //   ariaLabel: 'Language Menu',
    //   items: [
    //     { text: 'JavaScript', link: '/FrontEnd/JavaScript/01-JavaScript基础' },
    //     { text: '数据结构与算法', link: '/FrontEnd/DSA/DesignPattern' },
    //     { text: 'Vue', link: '/vue/vue基础/' },
    //   ]
    // },
    { text: 'Vue', link: '/Vue/index' },
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
          'JavaScript/JavaScript的执行机制',
          'JavaScript/V8'
        ]
      },
      'Html&Css',
      'Network',
      {
        title: 'vue基础',
        collapsable: true,
        children: [
          '/Vue/Vue知识点',
        ]
      },
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
      'Vue知识点',
      '响应式原理',
      'Vue组件通信',
    ],
    '/Notes/': [
      ['./', '前端资料'],
      'vuepress',
      'router',
      '密码学',
    ],
  };
};

module.exports = {
  getNav,
  getSidebar
};