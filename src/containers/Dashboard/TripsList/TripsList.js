import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'components'
import { Button } from 'antd'
import AddTrip from '../AddTrip/AddTripContainer'
import Item from './TripsListItem'
import styles from './styles.scss'

export class TripsList extends Component {

  static propTypes = {
    trips: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object.isRequired
  }

  static defaultProps = {
    trips: []
  }

  render () {
    const { trips, pagination } = this.props

    return (
      <div>
        <div className={styles.listActions}>
          <Button.Group>
            <AddTrip />
          </Button.Group>
        </div>
        <ul className={styles.tripList}>
          {trips.map(trip => <Item key={trip.id} trip={trip} />)}
        </ul>
        <Pagination pagination={pagination} />
      </div>
    )
  }
}

export default TripsList
