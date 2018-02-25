import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import { provideHooks } from 'redial'
import 'assets/stylesheets/theme.global.scss'
import styles from './styles.scss'

// @provideHooks({
//   fetch: locals => console.log('App triggered!'),
//   defer: locals => console.log('App Defer triggered!')
// })
class App extends Component {
  render () {
    return (
      <div className={styles.container}>
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}

App.propTypes = {
  route: PropTypes.object.isRequired
}

export default App
