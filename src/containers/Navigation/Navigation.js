import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from 'redux/modules/auth/actions'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { Anchor } from 'components'

class Navigation extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentPath: PropTypes.string.isRequired,
    user: PropTypes.shape({ name: PropTypes.string })
  }

  handleLogout = event => {
    this.props.dispatch(logout())
  }

  renderMenuItem (path, name, handler) {
    if (handler) {
      return (
        <Menu.Item key={path}>
          <Anchor onClick={handler}>{name}</Anchor>
        </Menu.Item>
      )
    }

    return (
      <Menu.Item key={path}>
        <Link to={path}>{name}</Link>
      </Menu.Item>
    )
  }

  render () {
    const { user, currentPath } = this.props

    return (
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[currentPath]}
      >
        {this.renderMenuItem('/', 'Home')}
        {!user && this.renderMenuItem('/login', 'Login')}
        {!user && this.renderMenuItem('/register', 'Register')}
        {user && this.renderMenuItem('/dashboard', 'Dashboard')}
        {user && this.renderMenuItem('/logout', 'Logout', this.handleLogout)}
      </Menu>
    )
  }
}

const mapState = ({ auth, routing }) => ({
  user: auth.user,
  currentPath: routing.locationBeforeTransitions.pathname
})

export default connect(mapState)(Navigation)
