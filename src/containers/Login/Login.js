import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from 'redux/modules/auth/actions'
import { OneColumnThin } from 'components'
import LoginForm from './LoginForm/LoginForm'

export class Login extends Component {

  static propTypes = {
    login: PropTypes.func.isRequired
  }

  handleSubmit = data => {
    return this.props.login(data)
  }

  render () {
    return (
      <OneColumnThin title="Login">
        <LoginForm onSubmit={this.handleSubmit} />
      </OneColumnThin>
    )
  }
}

export default connect(() => ({}), { login })(Login)
