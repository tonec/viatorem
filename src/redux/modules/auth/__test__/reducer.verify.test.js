import Immutable from 'seamless-immutable'
import reducer, { initialState } from '../reducer'
import * as actions from '../actions'

describe('Auth reducer - Verify', () => {

  const userData = {
    email: 'test123@test.com',
    name: 'test123',
    _id: '1234'
  }

  it('should handle VERIFY', () => {
    expect(reducer(initialState, {
      type: actions.VERIFY
    })).toEqual({
      ...initialState,
      verifying: true
    })
  })

  it('should handle VERIFY_SUCCESS', () => {
    expect(reducer(initialState, {
      type: actions.VERIFY_SUCCESS,
      response: userData
    })).toEqual({
      ...initialState,
      verifying: false,
      user: userData
    })
  })

  it('should handle VERIFY_FAIL', () => {
    const state = Immutable({
      ...initialState,
      verifying: true,
      user: userData
    })

    expect(reducer(state, {
      type: actions.VERIFY_FAIL,
      error: 'Error message'
    })).toEqual({
      ...initialState,
      verifying: false,
      user: null
    })
  })
})
