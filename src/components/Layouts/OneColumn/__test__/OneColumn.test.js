import React from 'react'
import { shallow } from 'enzyme'
import Helmet from 'react-helmet'
import OneColumn from '../OneColumn'

const props = {
  title: 'Test title',
  className: 'test-class-name'
}

const childContent = <p>Child content</p>

describe('OneColumn (snapshot)', () => {
  it('renders according to snapshot when enabled', () => {
    const component = shallow(<OneColumn {...props}>{childContent}</OneColumn>)
    expect(component).toMatchSnapshot()
  })
})

describe('OneColumn (rendering)', () => {
  let component

  beforeEach(() => {
    component = shallow(<OneColumn {...props}>{childContent}</OneColumn>)
  })

  it('renders the correct title', () => {
    expect(component.find(Helmet)).toHaveLength(1)
    expect(component.find(Helmet).props().title).toBe(props.title)
  })

  it('includes the correct class name', () => {
    expect(component.find('.one-column')).toHaveLength(1)
  })
})
