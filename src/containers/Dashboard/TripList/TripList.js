import React from 'react'
import PropTypes from 'prop-types'
import Item from './TripListItem'

import styles from './styles.scss'

const propTypes = {
  trips: PropTypes.arrayOf(PropTypes.object)
}

const defaultProps = {
  trips: []
}

const TripList = ({ trips }) => {
  return (
    <ul className={styles.tripList}>
      {trips.map(trip => <Item trip={trip} />)}
    </ul>
  )
}

TripList.propTypes = propTypes
TripList.defaultProps = defaultProps

export default TripList
