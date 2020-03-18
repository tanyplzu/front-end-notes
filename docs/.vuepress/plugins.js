module.exports = {
  plugins: [
    '@vuepress/back-to-top',
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          message: 'New content is available.',
          buttonText: 'Refresh'
        }
      }
    ],
    ['@vuepress/active-header-links']
    ['@vuepress/medium-zoom', {
      selector: 'img.zoom-custom-imgs',
      options: {
        margin: 16
      }
    }],
    ['copyright', {
      noCopy: true, // 选中的文字将无法被复制
      minLength: 20, // 如果长度超过 100 个字符
    }, ],
  ]
};