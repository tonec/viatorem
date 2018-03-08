import React from 'react'
import { OneColumn } from 'components'
import { provideHooks } from 'redial'
import { fetchTrips } from 'redux/modules/trip/actions'
import TripListContainer from './TripList/TripListContainer'

const Dashboard = () => (
  <OneColumn title="Dashboard">
    <h1>Dashboard</h1>
    <TripListContainer />
  </OneColumn>
)

const hooks = {
  fetch: ({ store, location }) => store.dispatch(fetchTrips(location.query.page))
}

export default provideHooks(hooks)(Dashboard)
