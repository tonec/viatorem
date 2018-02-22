import App from './App'
import { Home, About } from 'containers'

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