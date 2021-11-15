module.exports = {
  apps: [
    {
      name: 'front-end-notes',
      script: 'server.js --name react01',
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: '47.97.10.178',
      ref: 'origin/master',
      repo: 'git@github.com:tanyplzu/front-end-notes.git',
      path: '/www/website/front-end-notes',
      ssh_options: 'StrictHostKeyChecking=no',
      'post-deploy':
        'git reset --hard && git checkout master && git pull && npm i --production=false && npm run build && pm2 startOrReload ecosystem.config.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
