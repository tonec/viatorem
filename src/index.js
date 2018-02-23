import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import qhistory from 'qhistory'
import { stringify, parse } from 'qs'
import { ConnectedRouter } from 'react-router-redux'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import { renderRoutes } from 'react-router-config'
import asyncMatchRoutes from 'utils/asyncMatchRoutes'
import Loadable from 'react-loadable'
import { trigger } from 'redial'
import routes from 'routes'
import configureStore from 'redux/configureStore'

const history = qhistory(createHistory(), stringify, parse)
const { store } = configureStore(history, window.REDUX_STATE)

const render = async routes => {
  const { components, match, params } = await asyncMatchRoutes(
    routes,
    history.location.pathname
  )

  const triggerLocals = {
    store,
    match,
    params,
    history,
    location: history.location
  }

  await trigger('fetch', components, triggerLocals)
  await trigger('defer', components, triggerLocals)

  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>{renderRoutes(routes)}</div>
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

Loadable.preloadReady().then(() => render(routes))

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default
    render(newRoutes)
  })
}
