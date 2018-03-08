import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Pagination } from 'antd'
import { createQueryObject } from 'helpers/querystring'
import Item from './TripsListItem'

import styles from './styles.scss'

export class TripsList extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    trips: PropTypes.arrayOf(PropTypes.object),
    fetchAction: PropTypes.func.isRequired
  }

  static defaultProps = {
    trips: []
  }

  componentWillReceiveProps (nextProps) {
    const { location: { query } } = nextProps

    if (this.pageNumberHasChanged(query.page)) {
      this.props.fetchAction(query.page)
    }
  }

  getPageNumber () {
    return parseInt(this.props.location.query.page) || 1
  }

  pageNumberHasChanged (nextPageNum) {
    return parseInt(nextPageNum) !== this.getPageNumber()
  }

  updatePageNumber (nextPageNum) {
    const { location, history } = this.props
    const newQuery = createQueryObject({ page: nextPageNum })

    history.push({ pathname: location.pathname, query: newQuery })
  }

  handleOnChange = nextPageNum => {
    if (this.pageNumberHasChanged(nextPageNum)) {
      this.updatePageNumber(nextPageNum)
    }
  }

  render () {
    const { trips } = this.props

    return (
      <div>
        <ul className={styles.tripList}>
          {trips.map(trip => <Item key={trip.id} trip={trip} />)}
        </ul>
        <Pagination current={this.getPageNumber()} onChange={this.handleOnChange} total={trips.length} />
      </div>
    )
  }
}

export default withRouter(TripsList)
