import React from 'react'
import { shallow } from 'enzyme'
import { Alert } from 'antd'
import LoginForm from '../LoginForm'

describe('LoginForm', () => {

  const props = {
    handleSubmit: jest.fn(),
    onSubmit: jest.fn(),
    submitting: false,
    error: null
  }

  it('renders according to snapshot', () => {
    const component = shallow(<LoginForm {...props} />)
    expect(component).toMatchSnapshot()
  })

  it('display the error response when submission fails', () => {
    const error = 'Authentication failed'
    const component = shallow(<LoginForm {...props} error={error} />)
    expect(component.find(Alert)).toHaveLength(1)
  })
})
