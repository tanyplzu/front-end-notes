// const pluginConf = require('./config/pluginConf');
// const path = require('path');
const { getNav, getSidebar } = require('./menu');
const { plugins } = require('./plugins');
module.exports = {
  base: '/front-end/',
  title: '七月有风',
  description: '七月有风技术空间',
  dest: 'dist',
  serviceWorker: false,
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1,maximum-scale=1, minimum-scale=1' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  themeConfig: {
    repo: 'https://gitee.com/tanyplzu/front-end',
    repoLabel: 'Gitee',
    editLinks: true,
    sidebarDepth: 3,
    // displayAllHeaders: true,
    docsDir: 'docs',
    editLinkText: '编辑此页',
    lastUpdated: '上次更新',
    wide: true,
    nav: getNav(),
    sidebar: getSidebar(),
  },
  markdown: {
    lineNumbers: false
  },
  plugins: plugins,
  extraWatchFiles: [
    '.vuepress/menu.js',
    '.vuepress/plugins.js'
  ]
};