import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from 'redux/modules/auth/actions'
import { OneColumnThin } from 'components'
import LoginForm from './LoginForm/LoginForm'

@connect(() => ({}), { login })
export default class Login extends Component {

  static propTypes = {
    login: PropTypes.func
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
