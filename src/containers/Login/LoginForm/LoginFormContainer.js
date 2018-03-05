import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { login } from 'redux/modules/auth/actions'
import validation from './validation'
import LoginForm from './LoginForm'

export class LoginFormContainer extends Component {

  static propTypes = {
    login: PropTypes.func.isRequired
  }

  render () {
    return (
      <LoginForm {...this.props} onSubmit={this.props.login} />
    )
  }
}

const mapStateToProps = () => ({})

export default compose(
  connect(mapStateToProps, { login }),
  reduxForm({
    form: 'login',
    validate: validation
  })
)(LoginFormContainer)
