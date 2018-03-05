import React from 'react'
import { shallow } from 'enzyme'
import { Register } from '../Register'

describe('Register', () => {
  let mockRegister

  beforeEach(() => {
    mockRegister = jest.fn()
  })

  it('renders according to snapshot when enabled', () => {
    const component = shallow(<Register register={mockRegister} />)
    expect(component).toMatchSnapshot()
  })

  it('should call the register function when form submitted', () => {
    const component = shallow(<Register register={mockRegister} />)
    component.find('ReduxForm').simulate('submit')
    expect(mockRegister.mock.calls).toHaveLength(1)
  })
})
