const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ReactLoadablePlugin = require('react-loadable/webpack')
  .ReactLoadablePlugin

const ExtractGlobalCSS = new ExtractTextPlugin('styles.global.css')
const ExtractCSS = new ExtractTextPlugin({
  filename: 'styles.css',
  allChunks: true
})

module.exports = {
  name: 'client',
  target: 'web',
  // devtool: 'source-map',
  devtool: 'eval',
  context: path.resolve(__dirname, '..'),
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/index.js')
  ],
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
        test: /\.css$/,
        use: ExtractCSS.extract({
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          }
        })
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
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    extensions: ['.js', 'sass', '.scss']
  },
  plugins: [
    new WriteFilePlugin(),
    ExtractGlobalCSS,
    ExtractCSS,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new ReactLoadablePlugin({
      filename: './buildClient/stats.json'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        __CLIENT__: true,
        __SERVER__: false,
        __DEVTOOLS__: true // <-------- DISABLE redux-devtools HERE
      }
    }),
    new AutoDllPlugin({
      context: path.join(__dirname, '..'),
      filename: '[name].js',
      entry: {
        vendor: [
          'antd',
          'react',
          'react-dom',
          'react-redux',
          'redux',
          'redux-form',
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
