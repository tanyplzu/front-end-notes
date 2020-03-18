const getNav = () => {
  return [
    { text: '首页', link: '/index.html' },
    { text: '前端知识点', link: '/FrontEnd/JavaScript/01-JavaScript基础' },
    {
      text: '前端知识点',
      ariaLabel: 'Language Menu',
      items: [
        { text: 'JavaScript', link: '/FrontEnd/JavaScript/01-JavaScript基础' },
        { text: '数据结构与算法', link: '/FrontEnd/DSA/DesignPattern' },
        { text: 'Vue', link: '/vue/vue基础/' },
      ]
    },
    { text: 'Vue', link: '/vue/vue基础/' },
    { text: 'Webpack', link: '/Webpack/' }
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
      {
        title: '数据结构与算法',
        collapsable: true,
        children: [
          'DSA/Algorithms'
        ]
      },
      'Html&Css',
      'Node',
      'Webpack',
      'DesignPattern',
    ],
    '/vue/': [
    {
      title: 'vue基础语法',
      collapsable: true,
      children: [
        ['vue基础/', 'Introduction'], 'vue基础/响应式原理'
      ]
    }]
  };
};

module.exports = {
  getNav,
  getSidebar
};