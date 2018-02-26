import React, { Component } from 'react'
import { reduxForm, Field, propTypes } from 'redux-form'
import { TextField } from 'redux-form-antd'
import loginValidation from './loginValidation'

@reduxForm({
  form: 'login',
  validate: loginValidation
})
export default class LoginForm extends Component {
  static propTypes = {
    ...propTypes
  }

  render () {
    const { handleSubmit, error } = this.props

    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <Field name="email" type="text" component={TextField} label="Email" />
        <Field
          name="password"
          type="password"
          component={TextField}
          label="Password"
        />
        {error && <p className="help is-danger">{error}</p>}
        <button className="button is-primary" type="submit">
          Log In
        </button>
      </form>
    )
  }
}
