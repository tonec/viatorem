import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { register } from 'redux/modules/auth/actions'
import { OneColumnThin } from 'components'
import RegisterForm from 'containers/Register/RegisterForm/RegisterForm'

export class Register extends Component {

  static propTypes = {
    register: PropTypes.func.isRequired
  }

  register = data => {
    return this.props.register(data)
  }

  render () {
    return (
      <OneColumnThin title="Register">
        <RegisterForm onSubmit={this.register} />
      </OneColumnThin>
    )
  }
}

export default connect(() => ({}), { register })(Register)
