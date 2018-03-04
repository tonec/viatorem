import React, { Component } from 'react'
import { reduxForm, Field, propTypes } from 'redux-form'
import { Form, Button, Alert } from 'antd'
import { TextField, TextAreaField, DatePickerFieldRU } from 'components/Forms/Inputs'
import validation from './validation'

@reduxForm({
  form: 'addTrip',
  validate: validation
})
export default class AddTripForm extends Component {

  static propTypes = {
    ...propTypes
  }

  handleSelect = date => {
    console.log(date)
  }

  render () {
    const { handleSubmit, error } = this.props

    return (
      <Form layout="vertical" onSubmit={handleSubmit}>
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
          <Button type="primary" htmlType="submit">
            Add trip
          </Button>
        </Form.Item>
        {error && <Alert showIcon type="error" message={error} />}
      </Form>
    )
  }
}
