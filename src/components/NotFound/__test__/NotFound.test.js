import React from 'react'
import { shallow } from 'enzyme'
import NotFound from '../NotFound'

describe('NotFound (snapshot)', () => {
  it('renders according to snapshot', () => {
    const component = shallow(<NotFound />)
    expect(component).toMatchSnapshot()
  })
})
