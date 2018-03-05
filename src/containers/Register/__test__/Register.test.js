import React from 'react'
import { shallow } from 'enzyme'
import { Register } from '../Register'

describe('Register (snapshot)', () => {
  it('renders according to snapshot', () => {
    const component = shallow(<Register />)
    expect(component).toMatchSnapshot()
  })
})
