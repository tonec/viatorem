import Loadable from 'react-loadable'
import { Loading } from 'components'

let LoginLoadable = Loadable({
  loader: () => import('./Login'),
  loading: Loading
})

export default LoginLoadable
