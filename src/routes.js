import { routerActions } from 'react-router-redux'
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect'
import App from './App'
import Home from 'containers/Home/Home'
import Login from 'containers/Login/Loadable'
import Register from 'containers/Register/Loadable'
import Dashboard from 'containers/Dashboard/Loadable'

const isAuthenticated = connectedReduxRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => state.auth.user !== null,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
})

const isNotAuthenticated = connectedReduxRedirect({
  redirectPath: '/',
  authenticatedSelector: state => state.auth.user === null,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: false
})

export default [
  {
    component: App,
    routes: [
      {
        component: Home,
        path: '/',
        exact: true
      },
      {
        component: Login,
        path: '/login'
      },
      {
        component: isNotAuthenticated(Register),
        path: '/register'
      },
      {
        component: Dashboard,
        path: '/dashboard'
      }
    ]
  }
]
