require('babel-core/register');

const config = require('./webpack/config');
module.exports = require('./webpack/' + config.get('env'));
