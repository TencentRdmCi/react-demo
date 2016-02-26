/**
 * 压缩打包并发布到dev-server服务器，用于查看压缩合并是否正常
 */
module.exports = require('./webpack.make')({
  BUILD: true,
  TEST: false,
  RELEASE_PATH: 'http://localhost:8080/',
  SERVER_PROXY: 'http://10.17.86.87:8080'
  // SERVER_PROXY: 'http://localhost:8888'
});
