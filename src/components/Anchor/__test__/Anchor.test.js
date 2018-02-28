import React from 'react'
import { shallow } from 'enzyme'
import Anchor from '../Anchor'

const linkText = 'Link text'

describe('Anchor (snapshot)', () => {
  const props = {
    href: 'http://www.example.com',
    className: 'test-class-name'
  }

  it('renders according to snapshot when enabled', () => {
    const component = shallow(<Anchor {...props}>{linkText}</Anchor>)
    expect(component).toMatchSnapshot()
  })

  it('renders according to snapshot when disabled', () => {
    const component = shallow(<Anchor {...props} disabled >{linkText}</Anchor>)
    expect(component).toMatchSnapshot()
  })
})

describe('Anchor (rendering)', () => {
  const props = {
    className: 'test-class-name'
  }

  it('renders the correct link text and classes', () => {
    const component = shallow(<Anchor {...props}>{linkText}</Anchor>)
    expect(component.find('a').text()).toEqual(linkText)
    expect(component.find('a').hasClass(props.className)).toBe(true)
  })
})

describe('Anchor (behavior)', () => {
  let props

  beforeEach(() => {
    props = { onClick: jest.fn() }
  })

  it('required onClick prop', () => {
    const component = shallow(<Anchor {...props} >{linkText}</Anchor>)
    expect(component.props().onClick).toBeDefined()
  })

  it('handler should be called when clicked and is active', () => {
    const component = shallow(<Anchor {...props} >{linkText}</Anchor>)
    component.find('a').simulate('click', { preventDefault: () => {} })
    expect(props.onClick).toHaveBeenCalled()
  })

  it('handler should not be called if clicked and disabled', () => {
    const component = shallow(<Anchor {...props} disabled >{linkText}</Anchor>)
    component.find('a').simulate('click', {
      preventDefault: () => {},
      stopPropagation: () => {}
    })
    expect(props.onClick).not.toHaveBeenCalled()
  })
})
