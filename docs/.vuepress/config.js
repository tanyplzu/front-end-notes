// const pluginConf = require('./config/pluginConf');
// const path = require('path');
const { getNav, getSidebar } = require('./menu');
const { plugins } = require('./plugins');
module.exports = {
  // base: '/front-end/',
  title: '朝花夕拾',
  description: '朝花夕拾技术空间',
  dest: 'dist',
  serviceWorker: false,
  // theme: 'antdocs',
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1,maximum-scale=1, minimum-scale=1' }],
    ['meta', { name: 'theme-color', content: '#000' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  themeConfig: {
    // repo: 'https://gitee.com/tanyplzu/front-end',
    // repoLabel: 'Gitee',
    editLinks: true,
    sidebarDepth: 2,
    // displayAllHeaders: true,
    docsDir: 'docs',
    editLinkText: 'Edit page',
    // lastUpdated: 'Last updated',
    // wide: true,
    nav: getNav(),
    sidebar: getSidebar(),
    smoothScroll: true,
  },
  markdown: {
    lineNumbers: false
  },
  plugins: plugins,
  extraWatchFiles: [
    '.vuepress/menu.js',
    '.vuepress/plugins.js'
  ],
  chainWebpack: (config, isServer) => {
    // config 是 ChainableConfig 的一个实例
  }
};
