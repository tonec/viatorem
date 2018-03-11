import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { OneColumnThin } from 'components'
import AddTripForm from './AddTripForm/AddTripForm'

class AddTrip extends Component {

  render () {
    return (
      <OneColumnThin title="Register">
        <p>trip</p>
      </OneColumnThin>
    )
  }
}

const mapState = {

}

export default connect(mapState)(AddTrip)
