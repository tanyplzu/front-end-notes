module.exports = {
  plugins: [
    '@vuepress/back-to-top',
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: {
        message: "New content is available.",
        popupComponent: 'MySWUpdatePopup',
        buttonText: "Refresh"
      }
    }],
    ['@vuepress/active-header-links', {
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor'
    }],
    ['@vuepress/medium-zoom', {
      selector: '.theme-default-content:not(.custom) img',
      options: {
        margin: 30,
        background: 'rgba(33, 37, 48, 0.9)',
      }
    }],
    // ['copyright', {
    //   noCopy: true, // 选中的文字将无法被复制
    //   minLength: 20, // 如果长度超过 100 个字符
    // }],
  ]
};