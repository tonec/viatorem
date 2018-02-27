import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { routerActions } from 'react-router-redux'
import App from './App'
import Home from 'containers/Home/Home'
import Login from 'containers/Login/Loadable'
import Register from 'containers/Register/Loadable'
import Dashboard from 'containers/Dashboard/Loadable'

const locationHelper = locationHelperBuilder({})

const isAuthenticated = connectedReduxRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => state.auth.user !== null,
  wrapperDisplayName: 'UserIsAuthenticated',
  redirectAction: routerActions.replace
})

const isNotAuthenticated = connectedReduxRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  authenticatedSelector: state => state.auth.user === null,
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  redirectAction: routerActions.replace
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
        component: isAuthenticated(Dashboard),
        path: '/dashboard'
      }
    ]
  }
]
