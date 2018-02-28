import React from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'seamless-immutable'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import qhistory from 'qhistory'
import { stringify, parse } from 'qs'
import { ConnectedRouter } from 'react-router-redux'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import { renderRoutes } from 'react-router-config'
import asyncMatchRoutes from 'utils/asyncMatchRoutes'
import { trigger } from 'redial'
import Loadable from 'react-loadable'
import routes from 'routes'
import configureStore from 'redux/configureStore'
import ReduxAsyncConnect from 'components/ReduxAsyncConnect/ReduxAsyncConnect'

const history = qhistory(createHistory(), stringify, parse)
const { store } = configureStore(history, Immutable(window.REDUX_STATE))

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
          <ReduxAsyncConnect routes={routes} store={store} helpers={{}}>
            <div>{renderRoutes(routes)}</div>
          </ReduxAsyncConnect>
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
