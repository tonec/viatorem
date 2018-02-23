import Loadable from 'react-loadable'
import delay from 'utils/fakeDelay'
import Loading from 'components/Loading'
import path from 'path'

let LoadableExample = Loadable({
  loader: () => delay(2000).then(() => import('./Home')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, './Home')
})

export default LoadableExample
