import 'babel-polyfill'
import express from 'express'
import httpProxy from 'http-proxy'
import webpack from 'webpack'
import Loadable from 'react-loadable'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import clientConfig from '../webpack/client.dev'
import serverConfig from '../webpack/server.dev'

process.on('unhandledRejection', error =>
  console.error('unhandledRejection error: ', error)
)

const DEV = process.env.NODE_ENV === 'development'
const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path
const app = express()

const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:3030/api'
})

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:3030/api' })
})

if (DEV) {
  const multiCompiler = webpack([clientConfig, serverConfig])
  const clientCompiler = multiCompiler.compilers[0]

  app.use(
    webpackDevMiddleware(multiCompiler, { publicPath, serverSideRender: true })
  )
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(
    // keeps serverRender updated with arg: { clientStats, outputPath }
    webpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: { outputPath }
    })
  )
} else {
  const clientStats = require('../buildClient/stats.json') // eslint-disable-line import/no-unresolved
  const serverRender = require('../buildServer/main.js').default // eslint-disable-line import/no-unresolved

  app.use(publicPath, express.static(outputPath))
  app.use(serverRender({ clientStats, outputPath }))
}

const start = async () => {
  try {
    await Loadable.preloadAll()
  } catch (error) {
    console.log('Error preloading loadable chunks')
  }

  app.listen(3000, () => {
    console.log('Listening @ http://localhost:3000/')
  })
}

start()
