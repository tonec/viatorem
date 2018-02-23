import Loadable from 'react-loadable'
import Loading from 'components/Loading'

let LoadableExample = Loadable({
  loader: () => import('./Home'),
  loading: Loading
})

export default LoadableExample
