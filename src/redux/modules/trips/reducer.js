import * as types from './actions'

const initialState = {
  isFetching: false,
  trips: []
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        trips: action.payload
      }
    case types.ADD_FAIL:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}
