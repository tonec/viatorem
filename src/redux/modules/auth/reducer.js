import Immutable from 'seamless-immutable'
import * as types from './actions'

const initialState = Immutable({
  verifying: false,
  verified: false,
  loggingIn: false,
  loggedIn: false,
  loginError: '',
  registering: false,
  registerError: '',
  user: null,
  error: null
})

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {

    case types.VERIFY:
      return state.set('verifying', true)

    case types.VERIFY_SUCCESS:
      return state.merge({
        verifying: false,
        verified: true,
        user: Immutable(action.result)
      })

    case types.VERIFY_FAIL:
      return state.merge({
        verifying: false,
        verified: false,
        user: null,
        error: action.error
      })

    case types.LOGIN:
      return state.set('loggingIn': true)

    case types.LOGIN_SUCCESS:
      return state.merge({
        loggingIn: false,
        verified: true,
        user: Immutable(action.result)
      })

    case types.LOGIN_FAIL:
      return state.merge({
        loggingIn: false,
        loginError: action.error
      })

    case types.REGISTER:
      return state.set('registering': true)

    case types.REGISTER_SUCCESS:
      return state.set('registering': false)

    case types.REGISTER_FAIL:
      return state.merge({
        registering: false,
        registerError: action.error
      })

    case types.LOGOUT:
      return state.merge({
        loggedout: true,
        user: null
      })

    default:
      return state
  }
}
