const path = require('path');
// const Webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  // mode: 'development'
  target: 'web',
  performance: {
    hints: 'warning',
    maxAssetSize: 4000000, // int (in bytes),
    maxEntrypointSize: 4000000, // int (in bytes)
    assetFilter(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  devtool: 'inline-source-map', // source-map | inline-source-map
  resolve: {
    // Add `.ts`, `.tsx`, '.js' and '.es6' as a resolvable extension.
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  entry: {
    appJs: './src/js/app_js.js',
    appTs: './src/ts/app_ts.ts'
  },
  output: {
    filename: '[name].build.js',
    path: path.resolve(__dirname, 'dist')
    // publicPath: ''
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    compress: true,
    port: 4500,
    watchOptions: {
      poll: true
    },
    hot: true,
    historyApiFallback: true,
    index: 'index.html',
    stats: 'errors-only',
    open: true
  },
  // stats normal is standard output
  // stats minimal will output when errors or new compilation happen
  // verbose Output everything
  // "errors-only" Only output when errors happen
  stats: 'errors-only',

  // module
  module: {
    rules: [
      // eslint loader
      {
        enforce: 'pre',
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
        options: {
          cache: true
        }
      },
      // .js and .jsx | ES 6 or Next using babel loader
      {
        test: /\.(js|jsx)$/,
        use: [
          'cache-loader',
          'source-map-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-proposal-object-rest-spread'
              ],
              cacheDirectory: true
            }
          }
        ],
        // enforce: 'pre',
        include: path.resolve('src/js'),
        exclude: /(node_modules|bower_components)/
      },
      // typescript (.tsx and .ts) rules
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, 'src/ts')],
        exclude: [path.resolve(__dirname, 'node_modules' || 'public/bower_components')],
        use: [
          'cache-loader',
          'source-map-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true // either happyPackMode or transpileOnly. One at a time
            }
          }
        ]
        // enforce: 'pre',
      },
      // css loader: This enables you to import './style.css' into the file that depends on that styling.
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // scss/sass
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          // compiles Sass to CSS, using Node Sass by default
          {
            loader: 'sass-loader',
            options: {
              // You can also pass options directly to Node Sass
              includePaths: ['./node_modules/node-sass'],
              implementation: require('node-sass')
            }
          }
        ]
      },
      // url loader: A loader for webpack which transforms files into base64 URIs.
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 8000,
          fallback: 'file-loader'
        }
      }
    ]
  },

  // plugins
  plugins: [
    // Cleaning up the /dist folder
    new CleanWebpackPlugin(),
    // ts type checking service...
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      eslint: true
    }),
    /**
     * MiniCssExtractPlugin extracts CSS into separate files. It creates a CSS file per JS
     * file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.
     */
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    // html plugin
    new HtmlWebpackPlugin({
      title: 'Webpack Eslint Prettier',
      filename: 'index.html',
      template: './public/index.html',
      favicon: '',
      inject: true, // all javascript resources will be placed at the bottom of the body element
      hash: true
    })
  ]
};
