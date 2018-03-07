import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Form, Button, Alert } from 'antd'
import { TextField } from 'components/Forms/Inputs'

import styles from './styles.scss'

export default class LoginForm extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    error: PropTypes.any
  }

  render () {
    const { handleSubmit, onSubmit, submitting, error } = this.props

    return (
      <Form layout="vertical" onSubmit={handleSubmit(onSubmit)}>
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
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={submitting}
            className={styles.button}
          >
            Log In
          </Button>
        </Form.Item>
        {error && <Alert showIcon type="error" message={error} />}
      </Form>
    )
  }
}
