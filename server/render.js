import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { renderRoutes } from 'react-router-config'
import createHistory from 'history/createMemoryHistory'
import qhistory from 'qhistory'
import { stringify, parse } from 'qs'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import asyncMatchRoutes from 'utils/asyncMatchRoutes'
import { trigger } from 'redial'
import stats from '../buildClient/stats.json'
import configureStore from '../src/redux/configureStore'
import routes from '../src/routes'

export default ({ clientStats }) => async (req, res, next) => {
  let modules = []

  const history = qhistory(
    createHistory({ initialEntries: [req.path] }),
    stringify,
    parse
  )

  const { store } = configureStore(history, {}, req)
  const { components, match, params } = await asyncMatchRoutes(
    routes,
    req.originalUrl
  )

  await trigger('fetch', components, {
    store,
    match,
    params,
    history,
    location: history.location
  })

  if (!store) return // no store means redirect was already serve

  const appString = ReactDOM.renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider store={store}>
        <ConnectedRouter location={req.path} history={history}>
          <div>{renderRoutes(routes)}</div>
        </ConnectedRouter>
      </Provider>
    </Loadable.Capture>
  )

  const state = store.getState()
  const stateJson = JSON.stringify(state)
  const bundles = getBundles(stats, modules)
  const styles = bundles.filter(bundle => bundle.file.endsWith('.css'))
  const scripts = bundles.filter(bundle => bundle.file.endsWith('.js'))

  return res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Viatorem</title>
          <link rel="stylesheet" type="text/css" href="/static/styles.css">
          ${styles
    .map(
      style => `<link rel="stylesheet" href="/static/${style.file}">`
    )
    .join('\n')}
        </head>
        <body>
          <script>window.REDUX_STATE = ${stateJson}</script>
          <div id="root">${appString}</div>
          <script type='text/javascript' src='/static/vendor.js'></script>
          <script type='text/javascript' src='/static/manifest.js'></script>
          <script type='text/javascript' src='/static/main.js'></script>
          ${scripts
    .map(script => `<script src="/static/${script.file}"></script>`)
    .join('\n')}
        </body>
      </html>`
  )
}
