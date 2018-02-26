import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { register } from 'redux/modules/auth/actions'
import { OneColumnThin } from 'components'
import RegisterForm from 'containers/Register/RegisterForm/RegisterForm'

@connect(() => ({}), { register })
export default class Register extends Component {

  static propTypes = {
    location: PropTypes.shape({ state: PropTypes.object }).isRequired,
    register: PropTypes.func.isRequired
  }

  getInitialValues = () => {
    const { location } = this.props
    return location.state && location.state.oauth
  }

  register = async data => {
    const result = await this.props.register(data)
    this.successRegister()
    return result
  }

  successRegister = () => {
    console.log('Registered')
  }

  render () {
    return (
      <OneColumnThin title="Register">
        <RegisterForm onSubmit={this.register} />
      </OneColumnThin>
    )
  }
}
