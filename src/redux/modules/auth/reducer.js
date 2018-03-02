import Immutable from 'seamless-immutable'
import * as types from './actions'

export const initialState = Immutable({
  verifying: false,
  loggingIn: false,
  registering: false,
  user: null
})

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {

    case types.VERIFY:
      return state.set('verifying', true)

    case types.VERIFY_SUCCESS:
      return state.merge({
        verifying: false,
        user: Immutable(action.result)
      })

    case types.VERIFY_FAIL:
      return state.merge({
        verifying: false,
        user: null
      })

    case types.LOGIN:
      return state.set('loggingIn', true)

    case types.LOGIN_SUCCESS:
      return state.merge({
        loggingIn: false,
        user: Immutable(action.result)
      })

    case types.LOGIN_FAIL:
      return state.merge({
        loggingIn: false,
        user: null
      })

    case types.REGISTER:
      return state.set('registering', true)

    case types.REGISTER_SUCCESS:
      return state.set('registering', false)

    case types.REGISTER_FAIL:
      return state.set('registering', false)

    case types.LOGOUT:
      return state.set('user', null)

    default:
      return state
  }
}
