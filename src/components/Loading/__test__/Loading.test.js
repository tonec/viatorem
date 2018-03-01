import React from 'react'
import { shallow } from 'enzyme'
import Loading from '../Loading'

describe('Loading (snapshot)', () => {
  it('renders according to snapshot when isLoading & pastDelay are both true', () => {
    const component = shallow(<Loading isLoading pastDelay />)
    expect(component).toMatchSnapshot()
  })

  it('renders according to snapshot when error is true', () => {
    const component = shallow(<Loading error />)
    expect(component).toMatchSnapshot()
  })

  it('renders according to snapshot when no props are passed in', () => {
    const component = shallow(<Loading />)
    expect(component).toMatchSnapshot()
  })
})
