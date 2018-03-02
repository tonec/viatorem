import Immutable from 'seamless-immutable'
import * as types from './actions'

const initialState = Immutable({
  notifyType: null,
  statusType: null,
  message: null,
  description: null
})

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {

    case types.SHOW:
      return state.merge({
        notifyType: action.notifyType,
        statusType: action.statusType,
        message: action.message,
        description: action.description
      })

    case types.CLEAR:
      return state.merge({ ...initialState })

    default:
      return state
  }
}
