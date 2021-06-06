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
        background: 'rgba(33, 37, 48, 0.9)',
      }
    }],
    // ['copyright', {
    //   noCopy: true, // 选中的文字将无法被复制
    //   minLength: 20, // 如果长度超过 100 个字符
    // }],
    // ['vuepress-plugin-code-copy', {
    //   align: "bottom",
    //   color: "#3963bc",
    //   successText: "复制成功~"
    // }],
    ['vuepress-plugin-container'],
    [
      '@vuepress/last-updated',
      {
        transformer(timestamp) {
          const date = new Date(timestamp);
          const digits = [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
          ].map((num) => String(num).padStart(2, '0'));

          return '{0}-{1}-{2} {3}:{4}:{5}'.replace(/{(\d)}/g, (_, num) => digits[num]);
        }
      }
    ],
  ]
};