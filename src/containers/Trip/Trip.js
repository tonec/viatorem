import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { provideHooks } from 'redial'
import { fetchTrip } from 'redux/modules/trips/actions'
import { getTrip } from 'redux/selectors/trips'
import { OneColumn } from 'components'

class AddTrip extends Component {

  static propTypes = {
    trip: PropTypes.object.isRequired,
    fetching: PropTypes.bool.isRequired
  }

  render () {
    const { trip, fetching } = this.props

    if (fetching) {
      return null
    }

    return (
      <OneColumn title={trip.title}>
        <h1>{trip.title}</h1>
        <p>{trip.description}</p>
      </OneColumn>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    trip: getTrip(state, ownProps.match.params.id)
  }
}

const hooks = {
  fetch: ({ store, params }) => {
    if (!getTrip(store.getState(), params.id)) {
      return store.dispatch(fetchTrip(params.id))
    }
  }
}

export default compose(
  connect(mapState),
  provideHooks(hooks)
)(AddTrip)
