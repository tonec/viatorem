import React from 'react'
import { shallow } from 'enzyme'
import Helmet from 'react-helmet'
import OneColumnThin from '../OneColumnThin'

const props = {
  title: 'Test title',
  className: 'test-class-name'
}

const childContent = <p>Child content</p>

describe('OneColumnThin (snapshot)', () => {
  it('renders according to snapshot when enabled', () => {
    const component = shallow(<OneColumnThin {...props}>{childContent}</OneColumnThin>)
    expect(component).toMatchSnapshot()
  })
})

describe('OneColumnThin (rendering)', () => {
  let component

  beforeEach(() => {
    component = shallow(<OneColumnThin {...props}>{childContent}</OneColumnThin>)
  })

  it('renders the correct title', () => {
    expect(component.find(Helmet)).toHaveLength(1)
    expect(component.find(Helmet).props().title).toBe(props.title)
  })

  it('includes the correct class name', () => {
    expect(component.find('.one-column-thin')).toHaveLength(1)
  })
})
