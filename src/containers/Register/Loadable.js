import Loadable from 'react-loadable'
import { Loading } from 'components'

let RegisterLoadable = Loadable({
  loader: () => import('./Register'),
  loading: Loading
})

export default RegisterLoadable
