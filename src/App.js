import React from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import 'assets/stylesheets/index.scss'

const App = ({ route }) => {
  return (
    <div>
      {renderRoutes(route.routes)}
    </div>
  )
}

App.propTypes = {
  route: PropTypes.object.isRequired
}

export default App
