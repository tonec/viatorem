import React, { Component } from 'react'
import { reduxForm, Field, propTypes } from 'redux-form'
import { Form, Button } from 'antd'
import { TextField } from 'components/Forms/Inputs'
import registerValidation from './registerValidation'

@reduxForm({
  form: 'register',
  validate: registerValidation
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
          component={TextField}
          label="Name"
        />
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
        <Field
          name="password_confirmation"
          type="password"
          component={TextField}
          label="Password confirmation"
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
