import React, { Component } from 'react'
import { reduxForm, Field, propTypes } from 'redux-form'
import { Form, Button, Alert } from 'antd'
import { TextField } from 'components/Forms/Inputs'
import validation from './validation'

@reduxForm({
  form: 'login',
  validate: validation
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
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">Log In</Button>
        </Form.Item>
        {error && <Alert showIcon type="error" message={error} />}
      </Form>
    )
  }
}
