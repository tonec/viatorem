import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { renderRoutes } from 'react-router-config'
import createHistory from 'history/createMemoryHistory'
import qhistory from 'qhistory'
import { stringify, parse } from 'qs'
import asyncMatchRoutes from 'utils/asyncMatchRoutes'
import { trigger } from 'redial'
import configureStore from '../src/redux/configureStore'
import routes from '../src/routes'

export default ({ clientStats }) => async (req, res, next) => {
  const history = qhistory(
    createHistory({ initialEntries: [req.path] }),
    stringify,
    parse
  )
  const { store } = configureStore(history, {}, req)

  if (!store) return // no store means redirect was already served

  const { components, match, params } = await asyncMatchRoutes(routes, req.path)

  await trigger('fetch', components, {
    store,
    match,
    params,
    history,
    location: history.location
  })

  const app = createApp(req, store, history)
  const appString = ReactDOM.renderToString(app)
  const state = store.getState()
  const stateJson = JSON.stringify(state)

  return res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Viatorem</title>
          <link rel="stylesheet" type="text/css" href="/static/styles.css">
        </head>
        <body>
          <script>window.REDUX_STATE = ${stateJson}</script>
          <div id="root">${appString}</div>
          <script type='text/javascript' src='/static/vendor.js'></script>
          <script type='text/javascript' src='/static/manifest.js'></script>
          <script type='text/javascript' src='/static/main.js'></script>
        </body>
      </html>`
  )
}

const createApp = (req, store, history) => (
  <Provider store={store}>
    <ConnectedRouter location={req.path} history={history}>
      <div>{renderRoutes(routes)}</div>
    </ConnectedRouter>
  </Provider>
)
