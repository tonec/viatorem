import App from './App'
import Home from 'containers/Home/Home'
import Login from 'containers/Login/Loadable'
import Register from 'containers/Register/Loadable'

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
        component: Register,
        path: '/register'
      }
    ]
  }
]
