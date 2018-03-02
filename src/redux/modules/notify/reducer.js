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

    case types.SHOW_MESSAGE:
      return state.merge({
        notifyType: 'message',
        statusType: action.statusType,
        message: action.message
      })

    case types.SHOW_NOTIFICATION:
      return state.merge({
        notifyType: 'notification',
        statusType: action.statusType,
        message: action.message,
        description: action.notification
      })

    case types.CLEAR:
      return state.merge({ ...initialState })

    default:
      return state
  }
}
