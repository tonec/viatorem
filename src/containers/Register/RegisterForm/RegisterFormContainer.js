import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { register } from 'redux/modules/auth/actions'
import validation from './validation'
import RegisterForm from './RegisterForm'

export class RegisterFormContainer extends Component {

  static propTypes = {
    register: PropTypes.func.isRequired
  }

  render () {
    return (
      <RegisterForm {...this.props} onSubmit={this.props.register} />
    )
  }
}

const mapState = () => ({})

export default compose(
  connect(mapState, { register }),
  reduxForm({
    form: 'register',
    validate: validation
  })
)(RegisterFormContainer)
