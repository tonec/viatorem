import React from 'react'
import { shallow } from 'enzyme'
import Anchor from '../Anchor'

describe('Anchor (snapshot)', () => {

  const props = {
    href: 'http://www.example.com',
    onClick: () => {},
    className: 'test-class-name'
  }

  it('renders according to snapshot when enabled', () => {
    const component = shallow(<Anchor {...props}>Link text</Anchor>)
    expect(component).toMatchSnapshot()
  })

  it('renders according to snapshot when disabled', () => {
    const component = shallow(<Anchor {...props} disabled >Link text</Anchor>)
    expect(component).toMatchSnapshot()
  })
})
