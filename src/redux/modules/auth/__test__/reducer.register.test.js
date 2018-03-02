import Immutable from 'seamless-immutable'
import reducer, { initialState } from '../reducer'
import * as actions from '../actions'

describe('Auth reducer - Register', () => {
  it('should handle REGISTER', () => {
    expect(reducer(initialState, {
      type: actions.REGISTER
    })).toEqual({
      ...initialState,
      registering: true
    })
  })

  it('should handle REGISTER_SUCCESS', () => {
    expect(reducer(initialState, {
      type: actions.REGISTER_SUCCESS
    })).toEqual({
      ...initialState,
      registering: false
    })
  })

  it('should handle REGISTER_FAIL', () => {
    const state = Immutable({
      ...initialState,
      registering: true
    })

    expect(reducer(state, {
      type: actions.REGISTER_FAIL,
      error: 'Error message'
    })).toEqual({
      ...initialState,
      registering: false
    })
  })
})
