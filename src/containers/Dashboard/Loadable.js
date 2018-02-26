import Loadable from 'react-loadable'
import { Loading } from 'components'

let DashboardLoadable = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading
})

export default DashboardLoadable
