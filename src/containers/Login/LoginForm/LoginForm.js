import React, { Component } from 'react'
import { reduxForm, Field, propTypes } from 'redux-form'
import { Form, Button } from 'antd'
import { TextField } from 'components/Forms/Inputs'
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
      <Form layout="vertical" onSubmit={handleSubmit}>
        <Field
          name="email"
          type="text"
          component={TextField}
          label="Email"
        />
        <Field
          name="password"
          type="password"
          component={TextField}
          label="Password"
        />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
        {error && <p className="help is-danger">{error}</p>}
      </Form>
    )
  }
}
