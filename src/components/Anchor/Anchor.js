import React, { Component } from 'react'
import PropTypes from 'prop-types'
import createChainedFunction from 'utils/createChainedFunction'

function isTrivialHref (href) {
  return !href || href.trim() === '#'
}

class Anchor extends Component {
  static propTypes = {
    href: PropTypes.string,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    disabled: PropTypes.bool,
    role: PropTypes.string,
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    href: '',
    onClick: null,
    onKeyDown: null,
    disabled: false,
    role: 'a',
    tabIndex: 0,
    className: ''
  }

  handleClick = event => {
    const { disabled, href, onClick } = this.props

    if (disabled || isTrivialHref(href)) {
      event.preventDefault()
    }

    if (disabled) {
      event.stopPropagation()
      return
    }

    if (onClick) {
      onClick(event)
    }
  }

  handleKeyDown = event => {
    if (event.key === ' ') {
      event.preventDefault()
      this.handleClick(event)
    }
  }

  render () {
    const {
      tabIndex,
      role,
      disabled,
      onKeyDown,
      children,
      ...props
    } = this.props

    if (isTrivialHref(props.href)) {
      props.role = props.role || 'button'
      // we want to make sure there is a href attribute on the node
      // otherwise, the cursor incorrectly styled (except with role='button')
      props.href = props.href || '#'
    }

    if (disabled) {
      props.tabIndex = -1
      props.style = { pointerEvents: 'none', ...props.style }
    }

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <a
        {...props}
        onClick={this.handleClick}
        onKeyDown={createChainedFunction(this.handleKeyDown, onKeyDown)}
      >
        {children}
      </a>
    )
    /* eslint-disable jsx-a11y/no-static-element-interactions */
  }
}

export default Anchor
