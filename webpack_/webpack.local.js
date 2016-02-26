/**
 * 发布到dev-server服务器
 */
module.exports = require('./webpack.make')({
  BUILD: false,
  TEST: false,
  RELEASE_PATH: 'http://localhost:8888/',
  SERVER_PROXY: 'http://127.0.0.1:8889',
  DEV_SERVER: true
});
