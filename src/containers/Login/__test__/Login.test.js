import React from 'react'
import { shallow } from 'enzyme'
import { Login } from '../Login'

describe('Login', () => {
  let mockLogin

  beforeEach(() => {
    mockLogin = jest.fn()
  })

  it('renders according to snapshot when enabled', () => {
    const component = shallow(<Login login={mockLogin} />)
    expect(component).toMatchSnapshot()
  })

  it('shoulc call the login function when form submitted', () => {
    const component = shallow(<Login login={mockLogin} />)
    component.find('ReduxForm').simulate('submit')
    expect(mockLogin.mock.calls).toHaveLength(1)
  })
})
