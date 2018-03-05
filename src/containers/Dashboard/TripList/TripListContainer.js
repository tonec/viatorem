import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TripList from './TripList'

export class TripListContainer extends Component {

  static propTypes = {
    trips: PropTypes.arrayOf(PropTypes.object)
  }

  render () {
    return (
      <TripList trips={this.props.trips} />
    )
  }
}

const mapStateToProps = ({ trip }) => {
  return {
    trips: trip.trips
  }
}

export default connect(mapStateToProps)(TripListContainer)
