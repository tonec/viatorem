const path = require('path')
const webpack = require('webpack')
const StatsPlugin = require('stats-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin
const postcssFunctions = require('postcss-functions')
const functions = require('../src/assets/stylesheets/antd/postcss.functions')

const ExtractGlobalCSS = new ExtractTextPlugin('styles.global.css')
const ExtractCSS = new ExtractTextPlugin({
  filename: 'styles.css',
  allChunks: true
})

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: ['babel-polyfill', path.resolve(__dirname, '../src/index.js')],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../buildClient'),
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.global.(sass|scss)$/,
        include: [path.resolve(__dirname, '../src')],
        use: ExtractGlobalCSS.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins () {
                  return [
                    postcssFunctions({ functions })
                  ]
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /^((?!\.global).)*(sass|scss)$/,
        include: [path.resolve(__dirname, '../src')],
        use: ExtractCSS.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ],
    extensions: ['.js']
  },
  plugins: [
    new ReactLoadablePlugin({
      filename: './buildClient/stats.json'
    }),
    new StatsPlugin('stats.json'),
    ExtractGlobalCSS,
    ExtractCSS,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        __CLIENT__: true,
        __SERVER__: false
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        screw_ie8: true,
        comments: false
      },
      sourceMap: true
    }),
    new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)
    new AutoDllPlugin({
      context: path.join(__dirname, '..'),
      filename: '[name].js',
      entry: {
        vendor: [
          'react',
          'react-dom',
          'react-redux',
          'redux',
          'redux-thunk',
          'react-router',
          'react-router-dom',
          'history/createBrowserHistory',
          'transition-group',
          'babel-polyfill',
          'redux-devtools-extension'
        ]
      }
    })
  ]
}
