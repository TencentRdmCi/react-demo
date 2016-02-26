/**
 * 发布到dev-server服务器
 */
module.exports = require('./webpack.make')({
  BUILD: false,
  TEST: false,
  RELEASE_PATH: '/Users/xyz/Sites/tencent/resin/webapps/ci/',
  SERVER_PROXY: false,
  DEV_SERVER: false
});
