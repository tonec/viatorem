import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  isLoading: PropTypes.bool,
  pastDelay: PropTypes.bool,
  error: PropTypes.object
}

const defaultProps = {
  isLoading: false,
  pastDelay: false,
  error: null
}

const Loading = ({ isLoading, pastDelay, error }) => {
  if (isLoading && pastDelay) {
    return <p>Loading...</p>
  } else if (error && !isLoading) {
    return <p>Error!</p>
  } else {
    return null
  }
}

Loading.propTypes = propTypes
Loading.defaultProps = defaultProps

export default Loading
