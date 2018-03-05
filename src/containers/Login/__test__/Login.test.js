import React from 'react'
import { shallow } from 'enzyme'
import { Login } from '../Login'

describe('Login (snapshot)', () => {
  it('renders according to snapshot', () => {
    const component = shallow(<Login />)
    expect(component).toMatchSnapshot()
  })
})
