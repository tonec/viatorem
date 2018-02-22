import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import createHistory from 'history/createMemoryHistory'
import qhistory from 'qhistory'
import { stringify, parse } from 'qs'
import configureStore from '../src/redux/configureStore'
import { renderRoutes } from 'react-router-config'
import routes from '../src/routes'

export default ({ clientStats }) => async (req, res, next) => {
  const history = qhistory(
    createHistory({ initialEntries: [req.path] }),
    stringify,
    parse
  )
  const { store } = configureStore(history, {}, req)

  const loadDataPromises = matchRoutes(routes, req.path).map(({ route }) => {
    return route.loadData && route.loadData(store)
  })

  await Promise.all(loadDataPromises)

  if (!store) return // no store means redirect was already served

  const app = createApp(req, store, {})
  const appString = ReactDOM.renderToString(app)
  const state = store.getState()
  const stateJson = JSON.stringify(state)
  const chunkNames = flushChunkNames()
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })

  console.log('REQUESTED PATH:', req.path)
  console.log('CHUNK NAMES RENDERED', chunkNames)

  return res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${state.title}</title>
          ${styles}
        </head>
        <body>
          <script>window.REDUX_STATE = ${stateJson}</script>
          <div id="root">${appString}</div>
          ${cssHash}
          <script type='text/javascript' src='/static/vendor.js'></script>
          ${js}
        </body>
      </html>`
  )
}

const createApp = (req, store, context) => (
  <Provider store={store}>
    <StaticRouter location={req.path} context={context}>
      <div>{renderRoutes(routes)}</div>
    </StaticRouter>
  </Provider>
)
