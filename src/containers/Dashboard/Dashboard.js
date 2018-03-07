import React from 'react'
import { OneColumn } from 'components'
import { provideHooks } from 'redial'
import { fetchTrips } from 'redux/modules/trip/actions'
import TripListContainer from './TripList/TripListContainer'

const Dashboard = () => (
  <OneColumn title="Dashboard">
    <h1>Dashboard</h1>
    <h2>Welcome to your Dashboard</h2>
    <TripListContainer />
  </OneColumn>
)

const hooks = {
  fetch: ({ store }) => store.dispatch(fetchTrips())
}

export default provideHooks(hooks)(Dashboard)
