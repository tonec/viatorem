import { Home, About } from 'containers'
import { loadData } from 'containers/Home/Home'

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
