import React, { Component } from 'react'
import { connect } from 'react-redux'
import { provideHooks } from 'redial'
import { fetchTrips } from 'redux/modules/trips/actions'

@provideHooks()
class Home extends Component {
  render () {
    return (
      <div>
        <h1>homes</h1>
      </div>
    )
  }
}

const mapStateToProps = ({ trips }) => ({
  isFetching: trips.isFetching,
  trips: trips.trips
})

export default connect(mapStateToProps)(Home)
