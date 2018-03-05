import React from 'react'
import { shallow } from 'enzyme'
import { Alert } from 'antd'
import RegisterForm from '../RegisterForm'

describe('RegisterForm', () => {

  const props = {
    handleSubmit: jest.fn(),
    onSubmit: jest.fn(),
    submitting: false,
    error: null
  }

  it('renders according to snapshot', () => {
    const component = shallow(<RegisterForm {...props} />)
    expect(component).toMatchSnapshot()
  })

  it('display the error response when submission fails', () => {
    const error = 'Authentication failed'
    const component = shallow(<RegisterForm {...props} error={error} />)
    expect(component.find(Alert)).toHaveLength(1)
  })
})
