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
  ]
};
