import React, { Component } from 'react'
import { OneColumnThin } from 'components'
import RegisterFormContainer from './RegisterForm/RegisterFormContainer'

export class Register extends Component {
  render () {
    return (
      <OneColumnThin title="Register">
        <RegisterFormContainer />
      </OneColumnThin>
    )
  }
}

export default Register
