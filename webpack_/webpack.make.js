require('babel-core/register');

// Modules
import webpack from 'webpack';
import autoprefixer from 'autoprefixer-core';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import path from 'path';
import precss from 'precss';

module.exports = function makeWebpackConfig(options) {
  /**
   * Environment type
   * BUILD is for generating minified builds
   * TEST is for generating test builds
   */
  const BUILD = !!options.BUILD;
  const TEST = !!options.TEST;
  // 发布路径
  const RELEASE_PATH = options.RELEASE_PATH || false;
  // 接口代理地址
  const SERVER_PROXY = options.SERVER_PROXY || false;

  const DEV_SERVER = options.DEV_SERVER || false;

  console.log('release to ' + RELEASE_PATH);

  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  const config = new Map();

  config.plugins = [
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    // Assign the module and chunk ids by occurrence count. Ids that are used often get lower (shorter) ids.
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    // Dedupe modules in the output
    new webpack.optimize.DedupePlugin()
  ];

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  if (TEST) {
    config.entry = {};
  } else {
    config.entry = {
      app: './src/app.es6',
      // vendors: './src/vendors.es6'
      log: './src/others/log/log.es6'
    };
  }

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  if (TEST) {
    config.output = {};
  } else {
    config.output = {
      // Absolute output directory
      // path: __dirname + '/public',
      path: RELEASE_PATH,

      // Output path from the view of the page
      // Uses webpack-dev-server in development
      publicPath: DEV_SERVER ? '/' : '/ci/',
      // publicPath: '/',

      // Filename for entry points
      // Only adds hash in build mode
      filename: BUILD ? 'static/js/[name].[hash].js' : 'static/js/[name].bundle.js',

      // Filename for non-entry points
      // Only adds hash in build mode
      chunkFilename: BUILD ? 'static/js/[name].[hash].js' : 'static/js/[name].bundle.js'
    };
  }

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (TEST) {
    config.devtool = 'inline-source-map';
  } else if (BUILD) {
    // config.devtool = 'source-map';
  } else {
    config.devtool = 'eval';
  }

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */

    // Initialize module
  config.module = {
    // {
    //   test: /\.es6$/,
    //   loader: 'baggage?[Dir].html&[Dir].css'
    // }
    preLoaders: [],
    loaders: [
      {
        // JS LOADER
        // Reference: https://github.com/babel/babel-loader
        // Transpile .js files using babel-loader
        // Compiles ES6 and ES7 into ES5 code
        test: /\.(js|jsx)$/,
        // loader: 'babel?optional[]=runtime',
        loader: 'babel',
        exclude: /node_modules/,
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
      }, {
        test: /\.(jpg|jpeg|gif|png)/,
        loaders: [
          'url?limit=10000&name=images/[hash:8].[name].[ext]'
        ]
      },
      {
        test: /\.woff(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      {test: /\.eot(\?.*)?$/, loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]'},
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
      },
      // expose jquery
      {
        test: require.resolve('jquery'),
        loader: 'expose?jQuery'
      }
    ]
  };

  // ISPARTA LOADER
  // Reference: https://github.com/ColCh/isparta-instrumenter-loader
  // Instrument JS files with Isparta for subsequent code coverage reporting
  // Skips node_modules and files that end with .test.js
  if (TEST) {
    config.module.preLoaders.push({
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /\.test\.js$/
      ],
      loader: 'isparta-instrumenter'
    });
  }

  // CSS LOADER
  // Reference: https://github.com/webpack/css-loader
  // Allow loading css through js
  // Reference: https://github.com/postcss/postcss-loader
  // Postprocess your css with PostCSS plugins
  const cssLoader = {
    test: /\.css$/,
    // loader: "style-loader!css-loader"
    // loader: BUILD ? ExtractTextPlugin.extract("css!postcss") : "style!css!postcss"
    loader: ExtractTextPlugin.extract('css!postcss')
  };

  // LESS LOADER
  const lessLoader = {
    test: /\.less$/,
    // exclude: path.resolve(__dirname, "./src/static/less/app.less"),
    // loader: "style!css?sourceMap!less"
    // loader: BUILD ? ExtractTextPlugin.extract("style!css!postcss!less") : "style!css?sourceMap!postcss!less"
    loader: ExtractTextPlugin.extract('css!postcss!less')
    // loader: "style-loader!css-loader!less-loader"
  };

  // SASS LOADER
  const sassLoader = {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('css!postcss!sass')
  };

  // var appLessLoader = {
  //   test: /app\.less/,
  //   loader: "style!raw!less"
  // };

  // Skip loading css in test mode
  if (TEST) {
    // Reference: https://github.com/webpack/null-loader
    // Return an empty module
    sassLoader.loader = lessLoader.loader = cssLoader.loader = 'null';
  }

  // Add cssLoader to the loader list
  // config.module.loaders.push(appLessLoader);
  config.module.loaders.push(cssLoader);
  config.module.loaders.push(lessLoader);
  config.module.loaders.push(sassLoader);

  /**
   * PostCSS
   * Reference: https://github.com/postcss/autoprefixer-core
   * Add vendor prefixes to your css
   */
  config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    }),
    precss
  ];

  config.plugins.push(new ExtractTextPlugin('static/css/[name].[hash].css', {
    allChunks: true
  }));

  /**
   * ContextReplacementPlugin
   *
   *  Usage: new webpack.ContextReplacementPlugin(
   *            resourceRegExp,
   *            [newContentResource],
   *            [newContentRecursive],
   *            [newContentRegExp])
   */
  config.plugins.push(
    // 用ContextReplacementPlugin替换调所有moment/xxlocale，仅保留zh-cn
    // 避免moment加载所有语言文件
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)
  );

  /**
   *   Resolve
   *
   */
  config.resolve = {
    root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
    alias: {
      // uiBootstrap: 'angular-ui-router',
      // images: path.resolve(__dirname, './src/static/images'),
      // less: path.resolve(__dirname, './src/static/less')
    },
    extensions: ['', '.js', '.jsx', '.css', '.scss', '.png', '.jpg', '.svg', '.less']
  };


  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins.push(
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      filesize: "filesize",
      humanizeDuration: 'humanize-duration-ci-dev',
      autosize: 'autosize',
      _: 'underscore'
      // breadcrumb: 'angular-ci-dev-breadcrumb'
    })
  )


  //  else {
  //   config.plugins.push(new ExtractTextPlugin('[name].[contenthash].css', {
  //     disable: !BUILD || TEST
  //   }))
  // }

  // Skip rendering index.html in test mode
  if (!TEST) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
        chunks: ['commons', 'app', 'vendors'],
        minify: BUILD ? {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true
        } : BUILD
      })
    );
  }

  /**
   *  See https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
   *
   *  Usage: new webpack.optimize.CommonsChunkPlugin(options)
   *
   *  options.name or options.names (string|string[]): The chunk name of the commons chunk. An existing chunk can be
   * selected by passing a name of an existing chunk. If an array of strings is passed this is equal to invoking the
   * plugin multiple times for each chunk name. If omitted and options.async or options.children is set all chunks are
   * used, otherwise options.filename is used as chunk name.
   *
   * options.filename (string): The filename template for the commons chunk. Can contain the same placeholder as
   * output.filename. If omitted the original filename is not modified (usually output.filename or
   * output.chunkFilename.
   *
   * options.minChunks (number|Infinity|function(module, count) -> boolean): The minimum number of chunks which need to
   * contain a module before it’s moved into the commons chunk. The number must be greater than or equal 2 and lower
   * than or equal to the number of chunks. Passing Infinity just creates the commons chunk, but moves no modules into
   * it. By providing a function you can add custom logic. (Defaults to the number of chunks)
   *
   * options.chunks (string[]`): Select the source chunks by chunk names. The chunk must be a child of the commons
   * chunk. If omitted all entry chunks are selected.
   *
   * options.children (boolean): If true all children of the commons chunk are selected
   *
   * options.async (boolean): If true a new asnyc commons chunk is created as child of options.name and sibling of
   * options.chunks. It is loaded in parallel with options.chunks.
   *
   * options.minSize (number): Minimum size of all common module before a commons chunk is created.
   *
   */
  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      // (the commons chunk name)

      filename: 'static/js/commons.[hash].js',
      // (the filename of the commons chunk)

      // minChunks: 3,
      // (Modules must be shared between 3 entries)

      chunks: ['app', 'log']
      // (Only use these entries)
    })
  );


  // Add build specific plugins
  if (BUILD) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        }
      })
    );
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  // console.log('using proxy ' + SERVER_PROXY);

  // var devServerConfig = ;

  // console.log(devServerConfig)
  if (DEV_SERVER) {

    // console.log(SERVER_PROXY);
    //
    // devServerConfig.proxy = {
    //   '*': {
    //     target: SERVER_PROXY,
    //     secure: false,
    //   },
    // };
    config.devServer = {
      contentBase: './public',
      stats: {
        modules: false,
        cached: false,
        colors: true,
        chunk: false
      }
    };

    if (SERVER_PROXY) {

      config.devServer.proxy = {
        '/ci/api/*': {
          target: SERVER_PROXY,
          secure: false,
          bypass: function(req, res, proxyOptions) {
            if (req.headers.accept.indexOf('html') !== -1) {
              console.log('Skipping proxy for browser request.');
              return '/index.html';
            }
          }
        }
      };
    }
  }

  return config;
};
