import App from './App'
import Home from 'containers/Home/Loadable'
import Login from 'containers/Login/Loadable'

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
        path: '/login',
        exact: true
      }
    ]
  }
]
