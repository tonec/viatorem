import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import apiClient from 'utils/apiClient'
import { routerMiddleware } from 'react-router-redux'
import * as reducers from './modules'

const { __CLIENT__, __DEVTOOLS__, NODE_ENV } = process.env

export default (history, preloadedState, req) => {
  const client = apiClient(req)
  const middleware = [thunk.withExtraArgument(client), routerMiddleware(history)]

  if (__CLIENT__ && NODE_ENV === 'development') {
    const logger = require('redux-logger').createLogger({
      collapsed: true
    })
    middleware.push(logger.__esModule ? logger.default : logger)
  }

  const enhancers = [applyMiddleware(...middleware)]

  if (__CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools')
    const DevTools = require('../components/DevTools/DevTools')

    Array.prototype.push.apply(enhancers, [
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    ])
  }

  const rootReducer = combineReducers({ ...reducers })
  const store = createStore(rootReducer, preloadedState, compose(...enhancers))

  if (module.hot && NODE_ENV === 'development') {
    module.hot.accept('./modules/index', () => {
      const reducers = require('./modules/index')
      store.replaceReducer(reducers)
    })
  }

  return { store }
}
