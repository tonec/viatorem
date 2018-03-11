import Immutable from 'seamless-immutable'
import * as types from './actions'

export const initialState = Immutable({
  fetching: false,
  visibleTrips: Immutable([]),
  pagination: Immutable({})
})

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {

    case types.FETCH:
      return state.set('fetching', true)

    case types.FETCH_SUCCESS:
      return state.set('fetching', false)

    case types.FETCH_FAIL:
      return state.set('fetching', false)

    case types.FETCH_ALL:
      return state.set('fetching', true)

    case types.FETCH_ALL_SUCCESS:
      return state.merge({
        fetching: false,
        visibleTrips: Immutable(action.response.result)
      })

    case types.FETCH_ALL_FAIL:
      return state.merge({
        fetching: false
      })

    default:
      return state
  }
}
