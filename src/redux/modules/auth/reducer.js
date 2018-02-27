import * as types from './actions'

const initialState = {
  verifying: false,
  verified: false,
  loggingIn: false,
  loggedIn: false,
  loginError: '',
  registering: false,
  registerError: '',
  user: null,
  error: null
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.VERIFY:
      return {
        ...state,
        verifying: true
      }
    case types.VERIFY_SUCCESS:
      return {
        ...state,
        verifying: false,
        verified: true,
        user: action.result
      }
    case types.VERIFY_FAIL:
      return {
        ...state,
        verifying: false,
        verified: false,
        user: null,
        error: action.error
      }
    case types.LOGIN:
      return {
        ...state,
        loggingIn: true
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        verified: true,
        user: action.result
      }
    case types.LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      }
    case types.REGISTER:
      return {
        ...state,
        registering: true
      }
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        registering: false
      }
    case types.REGISTER_FAIL:
      return {
        ...state,
        registering: false,
        registerError: action.error
      }
    case types.LOGOUT:
      return {
        ...state,
        loggedout: true,
        user: null
      }
    default:
      return state
  }
}
