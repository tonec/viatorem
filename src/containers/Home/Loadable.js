import React from 'react'
import Loadable from 'react-loadable'

const HomeLoadable = Loadable({
  loader: () => import('./Home'),
  loading: () => <div>Loading</div>
})

export default HomeLoadable
