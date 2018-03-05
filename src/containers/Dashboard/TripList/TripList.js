import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TripList extends Component {

  static propTypes = {
    trips: PropTypes.arrayOf(PropTypes.object)
  }

  renderTrip (trip) {
    return <li key={trip._id}>{trip.title}</li>
  }

  render () {
    const { trips } = this.props

    return (
      <ul>
        {trips.map(trip => this.renderTrip(trip))}
      </ul>
    )
  }
}

export default TripList
