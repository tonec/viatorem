import Immutable from 'seamless-immutable'
import * as types from './actions'

const initialState = Immutable({
  isFetching: false,
  trips: null
})

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH:
      return state.set('isFetching': true)

    case types.FETCH_SUCCESS:
      return state.merge({
        isFetching: false,
        trips: action.payload
      })

    case types.ADD_FAIL:
      return state.set('isFetching': false)

    default:
      return state
  }
}
