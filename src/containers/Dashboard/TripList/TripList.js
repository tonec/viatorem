import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Pagination } from 'antd'
import { createQueryObject } from 'helpers/querystring'
import Item from './TripListItem'

import styles from './styles.scss'

export class TripList extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    trips: PropTypes.arrayOf(PropTypes.object)
  }

  static defaultProps = {
    trips: []
  }

  componentWillReceiveProps (nextProps) {
    const { location } = nextProps

    if (this.pageNumberHasChanged(location.query.page)) {

    }
  }

  getPageNumber () {
    return parseInt(this.props.location.query.page) || 1
  }

  pageNumberHasChanged (nextPageNum) {
    return nextPageNum !== this.getPageNumber()
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
    return (
      <div>
        <ul className={styles.tripList}>
          {this.props.trips.map(trip => <Item key={trip.id} trip={trip} />)}
        </ul>
        <Pagination current={this.getPageNumber()} onChange={this.handleOnChange} total={50} />
      </div>
    )
  }
}

export default withRouter(TripList)
