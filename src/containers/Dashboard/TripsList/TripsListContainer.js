import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getVisibleTrips } from 'redux/selectors/trips'
import { Row, Col } from 'antd'
import TripsList from './TripsList'

export class TripsListContainer extends Component {

  static propTypes = {
    trips: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object.isRequired
  }

  render () {
    const { trips, pagination } = this.props

    return (
      <Row>
        <Col span={18} offset={3}>
          <TripsList
            trips={trips}
            pagination={pagination}
          />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = ({ pagination, ...state }) => ({
  trips: getVisibleTrips(state),
  pagination: pagination.trips
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(TripsListContainer)
