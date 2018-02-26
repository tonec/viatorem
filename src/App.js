import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push as pushState } from 'react-router-redux'
import { renderRoutes } from 'react-router-config'
import { provideHooks } from 'redial'
import { isVerified, verify } from 'redux/modules/auth/actions'

import 'assets/stylesheets/theme.global.scss'

@provideHooks({
  fetch: ({ store: { dispatch, getState }, location }) => {
    if (!isVerified(getState())) {
      dispatch(verify()).catch(() => null)
    }
  }
})
@connect(({ auth }) => ({
  user: auth.user
}))
export default class App extends Component {

  static propTypes = {
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    route: PropTypes.objectOf(PropTypes.any).isRequired,
    user: PropTypes.shape({ name: PropTypes.string }),
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    user: null
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillReceiveProps (nextProps) {
    const { dispatch, user, location } = this.props

    // On login or else on logout
    if (!user && nextProps.user) {
      const redirect = location.query && location.query.redirect
      dispatch(pushState(redirect || '/dashboard'))
    } else if (user && !nextProps.user) {
      dispatch(pushState('/'))
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render () {
    return <div>{renderRoutes(this.props.route.routes)}</div>
  }
}
