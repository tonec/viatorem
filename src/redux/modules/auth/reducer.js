import * as types from './actions'

const initialState = {
  loading: false,
  loaded: false,
  loggingIn: false,
  loggedIn: false,
  loginError: '',
  registeringIn: false,
  registerError: '',
  accessToken: {},
  loggingOut: false,
  logoutError: '',
  user: null,
  error: null
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.LOAD:
      return {
        ...state,
        loading: true
      }
    case types.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        accessToken: action.result.accessToken,
        user: action.result.user
      }
    case types.LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
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
        loaded: true,
        accessToken: action.result.accessToken,
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
        registeringIn: true
      }
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        registeringIn: false
      }
    case types.REGISTER_FAIL:
      return {
        ...state,
        registeringIn: false,
        registerError: action.error
      }
    case types.LOGOUT:
      return {
        ...state,
        loggingOut: true
      }
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        accessToken: null,
        user: null
      }
    case types.LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      }
    default:
      return state
  }
}
