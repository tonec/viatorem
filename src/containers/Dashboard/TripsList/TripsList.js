import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { Pagination } from 'antd'
import { createQueryObject } from 'helpers/querystring'
import Item from './TripsListItem'

import styles from './styles.scss'

export class TripsList extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    trips: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object.isRequired
  }

  static defaultProps = {
    trips: []
  }

  getPageNumber () {
    return parseInt(this.props.location.query.page) || 1
  }

  pageNumberHasChanged (nextPageNum) {
    return parseInt(nextPageNum) !== this.getPageNumber()
  }

  updatePageNumber (nextPageNum) {
    const { location, dispatch } = this.props
    const newQuery = createQueryObject({ page: nextPageNum })

    dispatch(push({ pathname: location.pathname, query: newQuery }))
  }

  handleOnChange = nextPageNum => {
    if (this.pageNumberHasChanged(nextPageNum)) {
      this.updatePageNumber(nextPageNum)
    }
  }

  render () {
    const { trips, pagination } = this.props

    return (
      <div>
        <ul className={styles.tripList}>
          {trips.map(trip => <Item key={trip.id} trip={trip} />)}
        </ul>
        <Pagination
          current={this.getPageNumber()}
          onChange={this.handleOnChange}
          total={parseInt(pagination.total)}
          pageSize={parseInt(pagination.perPage)}
        />
      </div>
    )
  }
}

export default compose(
  withRouter,
  connect()
)(TripsList)
