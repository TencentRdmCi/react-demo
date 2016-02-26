/**
 * Webpack config for builds
 */
module.exports = require('./webpack.make')({
  BUILD: true,
  TEST: false,
  // RELEASE_PATH: '/Users/xyz/Sites/tencent/newci/ci/WebRoot/',
  RELEASE_PATH: '/Users/xyz/Sites/tencent/IdeaProjects/ci/WebRoot/',
  SERVER_PROXY: false
});
