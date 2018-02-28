import React, { Component } from 'react'
import PropTypes from 'prop-types'
import createChainedFunction from 'utils/createChainedFunction'

class Anchor extends Component {

  static propTypes = {
    href: PropTypes.string,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    href: '',
    onClick: null,
    onKeyDown: null,
    disabled: false,
    tabIndex: 0,
    className: ''
  }

  isTrivialHref (href) {
    return !href || href.trim() === '#'
  }

  handleClick = event => {
    const { disabled, href, onClick } = this.props

    if (disabled || this.isTrivialHref(href)) {
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
    const { tabIndex, disabled, onKeyDown, children, ...props } = this.props

    if (this.isTrivialHref(props.href)) {
      props.href = props.href || '#'
    }

    if (disabled) {
      props.tabIndex = -1
      props.style = { pointerEvents: 'none', ...props.style }
    }

    return (
      <a
        {...props}
        onClick={this.handleClick}
        onKeyDown={createChainedFunction(this.handleKeyDown, onKeyDown)}
      >
        {children}
      </a>
    )
  }
}

export default Anchor
