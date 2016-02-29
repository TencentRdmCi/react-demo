import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import config from './config';

import autoprefixer from 'autoprefixer';
import precss from 'precss';

import ExtractTextPlugin from 'extract-text-webpack-plugin';

const paths = config.get('utils_paths');

const resolve = require('path').resolve;

const webpackConfig = {
  name: 'client',
  target: 'web',
  entry: {
    todo: [
      paths.project(config.get('dir_src')) + '/todo/index.js'
    ],
    async: [
      paths.project(config.get('dir_src')) + '/async/index.js'
    ],
    vendor: config.get('vendor_dependencies')
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 version']
    }),
    precss
  ],
  output: {
    filename: '[name].[hash].js',
    path: paths.project(config.get('dir_dist')),
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin(config.get('globals')),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      // template: paths.src('index.html'),
      template: resolve(__dirname, '../src/app/todo/index.html'),
      hash: true,
      chunks: ['todo', 'vendor'],
      filename: 'todo/index.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      // template: paths.src('index.html'),
      template: resolve(__dirname, '../src/app/async/index.html'),
      hash: true,
      chunks: ['async', 'vendor'],
      filename: 'async/index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin('[name].[hash].css', {
      allChunks: true
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss', '.png', '.jpg', '.svg'],
    //alias: config.get('utils_aliases')
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          stage: 0,
          optional: ['runtime'],
          env: {
            development: {
              plugins: ['react-transform'],
              extra: {
                'react-transform': {
                  transforms: [
                    {
                      transform: 'react-transform-catch-errors',
                      imports: ['react', 'redbox-react']
                    }
                  ]
                }
              }
            }
          }
        }
      },
      // expose jquery
      {
        test: require.resolve('jquery'),
        loader: 'expose?jQuery'
      },
      //{
      //  test: /\.scss$/,
      //  loader: ExtractTextPlugin.extract('css!postcss!sass')
      //  // loaders: [
      //  //  'style-loader',
      //  //  'css-loader',
      //  //  // 'autoprefixer?browsers=last 2 version',
      //  //  'sass-loader'
      //  // ]
      //},
      {
        test: /\.css/,
        // loaders: [
        //  'style-loader',
        //  'css-loader'
        // ]
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          // 'image?{bypassOnDebug: true, progressive:true, \
          //    optimizationLevel: 3, pngquant:{quality: "65-80", speed: 4}}',
          // url-loader更好用，小于10KB的图片会自动转成dataUrl，
          // 否则则调用file-loader，参数直接传入
          'url?limit=10000&name=images/[hash:8].[name].[ext]'
        ]
      },
      /* eslint-disable */
      {
        test: /\.woff(\?.*)?$/,
        loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2"
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream"
      },
      { test: /\.eot(\?.*)?$/, loader: "file-loader?prefix=fonts/&name=[path][name].[ext]" },
      {
        test: /\.svg(\?.*)?$/,
        loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml"
      }
      /* eslint-enable */
    ]
  },
  sassLoader: {
    includePaths: paths.src('styles')
  }
};

// NOTE: this is a temporary workaround. I don't know how to get Karma
// to include the vendor bundle that webpack creates, so to get around that
// we remove the bundle splitting when webpack is used with Karma.
const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin(
  'vendor', '[name].[hash].js'
);
commonChunkPlugin.__KARMA_IGNORE__ = true;
webpackConfig.plugins.push(commonChunkPlugin);

export default webpackConfig;
