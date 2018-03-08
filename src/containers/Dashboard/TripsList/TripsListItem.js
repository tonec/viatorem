import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'

import styles from './styles.scss'

const propTypes = {
  trip: PropTypes.object
}

const defaultProps = {
  trip: {}
}

const TripsListItem = ({ trip }) => {
  const startDate = moment.utc(trip.startDate).format('DD MMM').split(' ')

  return (
    <li key={trip.id} className={styles.tripListItem}>
      <hr />
      <Link to="/trips/:id">
        <span className={styles.date}>
          <span className={styles.start}>
            <span>{startDate[0]}</span>
            <span>{startDate[1]}</span>
          </span>
        </span>
        <span className={styles.meta}>
          <h3>{trip.title}</h3>
          <p>{trip.description}</p>
        </span>
        <span className={styles.actions}>
          <span>actions</span>
        </span>
      </Link>
    </li>
  )
}

TripsListItem.propTypes = propTypes
TripsListItem.defaultProps = defaultProps

export default TripsListItem

// <span className={styles.end}>{moment.utc(trip.endDate).format('DD MMM')}</span>
