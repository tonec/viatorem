import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchTrips } from 'redux/modules/trips/actions'
import TripsList from './TripsList'

export class TripsListContainer extends Component {

  static propTypes = {
    trips: PropTypes.arrayOf(PropTypes.object),
    fetchTrips: PropTypes.func.isRequired,
  }

  render () {
    return (
      <TripsList trips={this.props.trips} fetchAction={this.props.fetchTrips} />
    )
  }
}

const mapStateToProps = ({ trips }) => {
  return {
    trips: trips.result.trips
  }
}

export default compose(
  connect(mapStateToProps, { fetchTrips }),
  withRouter
)(TripsListContainer)
