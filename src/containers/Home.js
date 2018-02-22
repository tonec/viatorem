import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTrips } from '../redux/modules/trips/actions'

class Home extends Component {
  render () {
    return (
      <div>
        <h1>homes</h1>
      </div>
    )
  }
}

export const loadData = store => {
  return store.dispatch(fetchTrips())
}

const mapStateToProps = ({ trips }) => ({
  isFetching: trips.isFetching,
  trips: trips.trips
})

export default connect(mapStateToProps)(Home)
