import Home, { loadData } from './containers/Home'
import About from './containers/About'

export default [
  {
    path: '/',
    component: Home,
    exact: true,
    loadData
  },
  {
    path: '/about',
    component: About
  }
]
