const pluginConf = require('./config/pluginConf');
const path = require('path');
const { nav, sidebar } = require('./menu');
module.exports = {
  base: '/front-end/',
  title: '七月有风',
  description: '七月有风技术空间',
  dest: 'dist',
  serviceWorker: false,
  head: [['link', { rel: 'icon', href: `/logo.png` }]],
  themeConfig: {
    repo: 'tanyplzu',
    editLinks: true,
    sidebarDepth: 0,
    sidebar: true,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    nav: nav,
    sidebar: sidebar,
    serviceWorker: {
      updatePopup: true,
      updatePopup: {
        message: 'New content is available.',
        buttonText: 'Refresh'
      }
    }
  },
  markdown: {
    lineNumbers: false
  },
  plugins: [
    '@vuepress/back-to-top',
    {
      '@vuepress/medium-zoom': {
        selector: '.theme-default-content img',
        options: {
          margin: 16,
          background: '#BADA55',
          scrollOffset: 0
        }
      }
    }
  ]
};
