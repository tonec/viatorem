import React, { Component } from 'react'
import { OneColumnThin } from 'components'
import LoginFormContainer from './LoginForm/LoginFormContainer'

export class Login extends Component {
  render () {
    return (
      <OneColumnThin title="Login">
        <LoginFormContainer />
      </OneColumnThin>
    )
  }
}

export default Login
