import Immutable from 'seamless-immutable'
import reducer, { initialState } from '../reducer'
import * as actions from '../actions'

describe('Auth reducer - Login', () => {

  const userData = {
    email: 'test123@test.com',
    name: 'test123'
  }

  it('should handle LOGIN', () => {
    expect(reducer(initialState, {
      type: actions.LOGIN
    })).toEqual({
      ...initialState,
      loggingIn: true
    })
  })

  it('should handle LOGIN_SUCCESS', () => {
    expect(reducer(initialState, {
      type: actions.LOGIN_SUCCESS,
      response: userData
    })).toEqual({
      ...initialState,
      loggingIn: false,
      user: userData
    })
  })

  it('should handle LOGIN_FAIL', () => {
    const state = Immutable({
      ...initialState,
      loggingIn: true,
      user: userData
    })

    expect(reducer(state, {
      type: actions.LOGIN_FAIL,
      error: 'Error message'
    })).toEqual({
      ...initialState,
      loggingIn: false,
      user: null
    })
  })
})
