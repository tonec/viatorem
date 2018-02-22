import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import qhistory from 'qhistory'
import { stringify, parse } from 'qs'
import { Router } from 'react-router-dom'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import App from './App'
import configureStore from './redux/configureStore'

const history = qhistory(createHistory(), stringify, parse)
const { store } = configureStore(history, window.REDUX_STATE)

const render = Component => {
  const root = document.getElementById('root')

  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    </AppContainer>,
    root
  )
}

render(App)

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./App', () => {
    const App = require('./App').default
    render(App)
  })
}
