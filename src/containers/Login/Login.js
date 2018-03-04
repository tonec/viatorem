import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from 'redux/modules/auth/actions'
import { OneColumnThin } from 'components'
import LoginForm from './LoginForm/LoginForm'

@connect(() => ({}))
export default class Login extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  handleSubmit = data => {
    return this.props.dispatch(login(data))
  }

  render () {
    return (
      <OneColumnThin title="Login">
        <LoginForm onSubmit={this.handleSubmit} />
      </OneColumnThin>
    )
  }
}
