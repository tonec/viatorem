import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Form, Button, Alert } from 'antd'
import { TextField, TextAreaField, DatePickerFieldRU } from 'components/Forms/Inputs'

export default class AddTripForm extends Component {

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
          name="title"
          type="text"
          component={TextField}
          label="Title"
        />
        <Field
          name="description"
          type="text"
          component={TextAreaField}
          label="Description"
          rows={10}
        />
        <Field
          name="dates"
          type="text"
          component={DatePickerFieldRU}
          label="Dates"
        />
        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={submitting}
          >
            Add trip
          </Button>
        </Form.Item>
        {error && <Alert showIcon type="error" message={error} />}
      </Form>
    )
  }
}
