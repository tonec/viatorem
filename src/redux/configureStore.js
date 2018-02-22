import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import apiClient from '../utils/apiClient'
import { composeWithDevTools } from 'redux-devtools-extension'
import * as reducers from './modules'

export default (history, preloadedState, req) => {
  const client = apiClient(req)
  const middlewares = applyMiddleware(thunk.withExtraArgument(client))
  const enhanced = composeWithDevTools(middlewares)
  const rootReducer = combineReducers({ ...reducers })
  const store = createStore(rootReducer, preloadedState, enhanced)

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('./modules/index', () => {
      const reducers = require('./modules/index')
      store.replaceReducer(reducers)
    })
  }

  return { store }
}
