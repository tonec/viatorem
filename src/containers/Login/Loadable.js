import Loadable from 'react-loadable'
import { Loading } from 'components'

let LoadableExample = Loadable({
  loader: () => import('./Login'),
  loading: Loading
})

export default LoadableExample
