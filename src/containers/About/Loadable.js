import Loadable from 'react-loadable'
import delay from 'utils/fakeDelay'
import Loading from 'components/Loading'
import path from 'path'

let LoadableExample = Loadable({
  loader: () => delay(400).then(() => import('./About')),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, './About')
})

export default LoadableExample
