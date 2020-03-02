const nav = [
  { text: '首页', link: '/' },
  // { text: 'JavaScript', link: '/JavaScript/' },
  // { text: 'Html&&Css', link: '/css&html/css' },
  { text: 'Vue', link: '/vue/vue/' },
  { text: 'Webpack', link: '/Webpack/' }
];
const sidebar = {
  // '/JavaScript/': [
  //   {
  //     title: 'JavaScript',
  //     collapsable: true,
  //     children: [
  //       ['JavaScript/', 'Introduction'],
  //       'JavaScript/前端参考资料',
  //       'JavaScript/router'
  //     ]
  //   },
  //   {
  //     title: 'css&html',
  //     collapsable: true,
  //     children: ['css&html/清除浮动']
  //   }
  // ],
  '/vue/': [
    {
      title: 'vue',
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
