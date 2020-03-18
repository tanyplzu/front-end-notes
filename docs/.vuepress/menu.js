const getNav = () => {
  return [
    { text: '首页', link: '/index.html' },
    // { text: 'JavaScript', link: '/JavaScript/JS基础/' },
    { text: '前端知识点', link: '/FrontEnd/JavaScript' },
    { text: 'Vue', link: '/vue/vue基础/' },
    { text: 'Webpack', link: '/Webpack/' }
  ];
};
const getSidebar = () => {
  return {
    '/JavaScript/': [
      // {
      //   title: 'JS基础',
      //   collapsable: true,
      //   children: [['JS基础/', 'Introduction'], 'JS基础/前端参考资料']
      // },
      // {
      //   title: 'JS-WEB-API',
      //   collapsable: true,
      //   children: [['JS-WEB-API/', 'Introduction'], 'JS-WEB-API/router']
      // }
    ],
    '/FrontEnd/': [
      {
        title: 'JS基础',
        collapsable: true,
        children: ['JavaScript/JavaScript基础']
      },
      {
        title: '数据结构与算法',
        collapsable: true,
        children: ['DSA/DesignPattern']
      }
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
