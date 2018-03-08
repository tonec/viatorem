
export const getVisibleTrips = (state) => {
  return state.trips.visibleTrips.map(id => state.entities.trips[id])
}
