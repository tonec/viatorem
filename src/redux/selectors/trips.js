import _get from 'lodash/get'

export const getVisibleTrips = (state) => {
  return state.trips && state.trips.visibleTrips.map(id => state.entities.trips[id])
}

export const getPaginationTrips = (state) => {
  return _get(state, 'pagination.trips', {})
}

export const getTrip = (state, id) => {
  return _get(state, 'entities.trips', null) ? state.entities.trips[id] : null
}
