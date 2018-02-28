import React from 'react'
import { shallow } from 'enzyme'
import Anchor from '../Anchor'

describe('Anchor (snapshot)', () => {

  const props = {
    href: 'http://www.example.com',
    onClick: () => {},
    disabled: true,
    className: 'test-class-name'
  }

  it('renders according to snapshot', () => {
    const component = shallow(<Anchor {...props}>Link text</Anchor>)
    expect(component).toMatchSnapshot()
  })
})
