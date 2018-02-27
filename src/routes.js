import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { routerActions } from 'react-router-redux'
import App from './App'
import Home from 'containers/Home/Home'
import Login from 'containers/Login/Loadable'
import Register from 'containers/Register/Loadable'
import Dashboard from 'containers/Dashboard/Loadable'
import Trip from 'containers/Trip/Loadable'
import { NotFound } from 'components'

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
      { path: '/', exact: true, component: Home },
      { path: '/login', component: Login },
      { path: '/register', component: isNotAuthenticated(Register) },
      { path: '/dashboard', component: isAuthenticated(Dashboard) },
      { path: '/trip', component: isAuthenticated(Trip) },
      { component: NotFound }
    ]
  }
]
