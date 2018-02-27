import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from 'redux/modules/auth/actions'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { Anchor } from 'components'

@connect(({ auth }) => ({
  user: auth.user
}), { logout })
class Navigation extends Component {

  static propTypes = {
    user: PropTypes.shape({ name: PropTypes.string }),
    logout: PropTypes.func.isRequired
  }

  static defaultProps = {
    user: null
  }

  handleLogout = event => {
    console.log('handling logout')
    this.props.logout()
  }

  render () {
    const { user } = this.props

    return (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        {!user && (
          <Menu.Item key="/login">
            <Link to="/login">Log in</Link>
          </Menu.Item>
        )}
        {!user && (
          <Menu.Item key="/register">
            <Link to="/register">Register</Link>
          </Menu.Item>
        )}
        {user && (
          <Menu.Item key="/dashboard">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
        )}
        {user && (
          <Menu.Item key="/trip">
            <Link to="/trip">Trip</Link>
          </Menu.Item>
        )}
        {user && (
          <Menu.Item key="/logout">
            <Anchor onClick={this.handleLogout}>
              Log out
            </Anchor>
          </Menu.Item>
        )}
      </Menu>
    )
  }
}

export default Navigation
