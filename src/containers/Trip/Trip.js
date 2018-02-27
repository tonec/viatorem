import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { OneColumnThin } from 'components'
import AddTripForm from './AddTripForm/AddTripForm'

class AddTrip extends Component {

  handleSubmit = async data => {
    // await this.props.addTrip(data)
  }

  render () {
    return (
      <OneColumnThin title="Register">
        <AddTripForm onSubmit={this.handleSubmit} />
      </OneColumnThin>
    )
  }
}

export default AddTrip
