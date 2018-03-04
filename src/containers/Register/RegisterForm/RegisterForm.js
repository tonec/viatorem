import React, { Component } from 'react'
import { reduxForm, Field, propTypes } from 'redux-form'
import { Form, Button, Alert } from 'antd'
import { TextField } from 'components/Forms/Inputs'
import validation from './validation'

@reduxForm({
  form: 'register',
  validate: validation
})
export default class RegisterForm extends Component {

  static propTypes = {
    ...propTypes
  }

  render () {
    const { handleSubmit, error } = this.props

    return (
      <Form layout="vertical" onSubmit={handleSubmit}>
        <Field
          name="name"
          type="text"
          size="large"
          component={TextField}
          placeholder="Name"
        />
        <Field
          name="email"
          type="text"
          size="large"
          component={TextField}
          placeholder="Email"
        />
        <Field
          name="password"
          type="password"
          size="large"
          component={TextField}
          placeholder="Password"
        />
        <Field
          name="password_confirmation"
          type="password"
          size="large"
          component={TextField}
          placeholder="Password confirmation"
        />
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
        {error && <Alert showIcon type="error" message={error} />}
      </Form>
    )
  }
}
