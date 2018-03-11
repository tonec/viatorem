import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { addTrip } from 'redux/modules/trips/actions'
import validation from './validation'
import AddTripForm from './AddTripForm'

export class AddTripFormContainer extends Component {

  static propTypes = {
    addTrip: PropTypes.func.isRequired
  }

  render () {
    return (
      <AddTripForm {...this.props} onSubmit={this.props.addTrip} />
    )
  }
}

const mapState = () => ({})

export default compose(
  connect(mapState, { addTrip }),
  reduxForm({
    form: 'addTrip',
    validate: validation
  })
)(AddTripFormContainer)
