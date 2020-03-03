const nav = [
  { text: '首页', link: '/index.html' },
  { text: 'JavaScript', link: '/JavaScript/JS基础/' },
  // { text: 'Html&&Css', link: '/css&html/css' },
  { text: 'Vue', link: '/vue/vue基础/' },
  { text: 'Webpack', link: '/Webpack/' }
];
const sidebar = {
  '/JavaScript/': [
    {
      title: 'JS基础',
      collapsable: true,
      children: [
        ['JS基础/', 'Introduction'],
        'JS基础/前端参考资料',
      ]
    },
    {
      title: 'JS-WEB-API',
      collapsable: true,
      children: [
        ['JS-WEB-API/', 'Introduction'],
        'JS-WEB-API/router',
      ]
    }
  ],
  '/vue/': [
    {
      title: 'vue基础语法',
      collapsable: true,
      children: [
        ['vue基础/', 'Introduction'],
        'vue基础/响应式原理'
      ]
    }
  ]
}

module.exports = {
  nav,
  sidebar
};
