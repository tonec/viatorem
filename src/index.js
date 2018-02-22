import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import qhistory from 'qhistory'
import { stringify, parse } from 'qs'
import { BrowserRouter } from 'react-router-dom'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import { renderRoutes } from 'react-router-config'
import routes from 'routes'
import configureStore from 'redux/configureStore'

const history = qhistory(createHistory(), stringify, parse)
const { store } = configureStore(history, window.REDUX_STATE)

const render = routes => {
  const root = document.getElementById('root')

  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <div>{renderRoutes(routes)}</div>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root
  )
}

render(routes)

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default
    render(newRoutes)
  })
}
