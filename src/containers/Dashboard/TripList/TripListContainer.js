import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchTrips } from 'redux/modules/trip/actions'
import TripList from './TripList'

export class TripListContainer extends Component {

  static propTypes = {
    trips: PropTypes.arrayOf(PropTypes.object),
    fetchTrips: PropTypes.func.isRequired,
  }

  render () {
    return (
      <TripList trips={this.props.trips} fetchAction={this.props.fetchTrips} />
    )
  }
}

const mapStateToProps = ({ trip }) => {
  return {
    trips: trip.trips
  }
}

export default compose(
  connect(mapStateToProps, { fetchTrips }),
  withRouter
)(TripListContainer)
