
export const getVisibleTrips = (state) => {
  return state.trips && state.trips.visibleTrips.map(id => state.entities.trips[id])
}

export const getPaginationTrips = (state) => {
  return state.pagination && state.pagination.trips
}
