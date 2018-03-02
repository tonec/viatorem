import Immutable from 'seamless-immutable'
import reducer, { initialState } from '../reducer'
import * as actions from '../actions'

describe('Auth reducer - Logout', () => {

  const userData = {
    email: 'test123@test.com',
    name: 'test123'
  }

  it('should handle LOGOUT', () => {
    const state = Immutable({
      ...initialState,
      user: userData
    })

    expect(reducer(state, {
      type: actions.LOGOUT,
      error: 'Error message'
    })).toEqual({
      ...initialState,
      user: null
    })
  })
})
