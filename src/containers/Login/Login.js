import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { OneColumnThin } from 'components'
import LoginForm from './LoginForm/LoginForm'

class Login extends Component {

  static propTypes = {
    login: PropTypes.func
  }

  static defaultProps = {
    login: data => console.log(data)
  }

  handleSubmit = async data => {
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

export default Login
