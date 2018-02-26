import Loadable from 'react-loadable'
import { Loading } from 'components'

let LoadableExample = Loadable({
  loader: () => import('./Home'),
  loading: Loading
})

export default LoadableExample
