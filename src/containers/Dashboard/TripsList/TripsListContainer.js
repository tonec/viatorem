import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchTrips } from 'redux/modules/trips/actions'
import { getVisibleTrips } from 'redux/selectors/trips'
import TripsList from './TripsList'

export class TripsListContainer extends Component {

  static propTypes = {
    trips: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object.isRequired,
    fetchTrips: PropTypes.func.isRequired
  }

  render () {
    const { trips, pagination, fetchTrips } = this.props

    return (
      <TripsList
        trips={trips}
        pagination={pagination}
        fetchAction={fetchTrips}
      />
    )
  }
}

const mapStateToProps = ({ pagination, ...state }) => ({
  trips: getVisibleTrips(state),
  pagination: pagination.trips
})

export default compose(
  connect(mapStateToProps, { fetchTrips }),
  withRouter
)(TripsListContainer)
