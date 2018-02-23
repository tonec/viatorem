const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin

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
        test: /\.scss$/,
        use: ExtractCssChunks.extract({
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }]
        })
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ],
    extensions: ['.js', '.css']
  },
  plugins: [
    new WriteFilePlugin(), // used so you can see what chunks are produced in dev
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new ReactLoadablePlugin({
      filename: './buildClient/react-loadable.json',
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
    })
  ]
}
