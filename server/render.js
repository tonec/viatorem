import path from 'path'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { renderRoutes } from 'react-router-config'
import createHistory from 'history/createMemoryHistory'
import qhistory from 'qhistory'
import { stringify, parse } from 'qs'
import asyncMatchRoutes from 'utils/asyncMatchRoutes'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import getChunks, { waitChunks } from '../src/utils/getChunks'
import stats from '../buildClient/react-loadable.json'
import { trigger } from 'redial'
import configureStore from '../src/redux/configureStore'
import routes from '../src/routes'

const chunksPath = path.join(__dirname, '..', 'static', 'loadable-chunks.json')

export default ({ clientStats }) => async (req, res, next) => {
  let modules = []

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

  const appString = ReactDOM.renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider store={store}>
        <ConnectedRouter location={req.path} history={history}>
          <div>{renderRoutes(routes)}</div>
        </ConnectedRouter>
      </Provider>
    </Loadable.Capture>
  )

  const bundles = getBundles(getChunks(), modules)
  const styles = bundles.filter(bundle => bundle.file.endsWith('.css'))
  const scripts = bundles.filter(bundle => bundle.file.endsWith('.js'))

  const state = store.getState()
  const stateJson = JSON.stringify(state)

  await Loadable.preloadAll()
  await waitChunks(chunksPath)

  return res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${state.title}</title>
          ${styles.map(style => `<link rel="stylesheet" href="/static/${style.file}">`).join('\n')}
        </head>
        <body>
          <script>window.REDUX_STATE = ${stateJson}</script>
          <div id="root">${appString}</div>
          <script type='text/javascript' src='/static/manifest.js'></script>
          ${scripts.map(script => `<script src="/static/${script.file}"></script>`).join('\n')}
        </body>
      </html>`
  )
}
