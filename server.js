const server = require('pushstate-server');

server.start({
  port: 3000,
  directory: './dist',
});
