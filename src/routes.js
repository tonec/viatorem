import App from './App'
import Home from 'containers/Home/Loadable'
import About from 'containers/About/Loadable'

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
        component: About,
        path: '/about',
        exact: true
      }
    ]
  }
]
