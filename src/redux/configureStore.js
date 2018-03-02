import { createStore, applyMiddleware, compose } from 'redux'
import { stateTransformer } from 'redux-seamless-immutable'
import apiClient from 'utils/apiClient'
import { routerMiddleware } from 'react-router-redux'
import clientMiddleware from './middleware/clientMiddleware'
import rootReducer from './rootReducer'

const { __CLIENT__, __DEVTOOLS__, NODE_ENV } = process.env

export default (history, preloadedState, req) => {
  const client = apiClient(req)
  const middleware = [clientMiddleware(client), routerMiddleware(history)]

  if (__CLIENT__ && NODE_ENV === 'development') {
    const logger = require('redux-logger').createLogger({
      stateTransformer: stateTransformer
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

  const store = createStore(rootReducer, preloadedState, compose(...enhancers))

  if (module.hot && NODE_ENV === 'development') {
    module.hot.accept('./rootReducer', () => {
      const reducers = require('./rootReducer')
      store.replaceReducer(reducers)
    })
  }

  return { store }
}
