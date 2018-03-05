import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class TripListContainer extends Component {
  render () {
    return (
      <p>trips</p>
    )
  }
}

export default connect()(TripListContainer)
