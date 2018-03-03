import Immutable from 'seamless-immutable'
import reducer, { initialState } from '../reducer'
import * as actions from '../actions'

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SHOW_MESSAGE', () => {
    const data = {
      statusType: 'success',
      message: 'Success message'
    }

    expect(reducer(initialState, {
      type: actions.SHOW_MESSAGE,
      ...data
    })).toEqual({
      ...initialState,
      notifyType: 'message',
      ...data
    })
  })

  it('should handle SHOW_NOTIFICATION', () => {
    const data = {
      statusType: 'success',
      message: 'Success message',
      description: 'Success message'
    }

    expect(reducer(initialState, {
      type: actions.SHOW_NOTIFICATION,
      ...data
    })).toEqual({
      ...initialState,
      notifyType: 'notification',
      ...data
    })
  })

  it('should handle CLEAR', () => {
    const state = Immutable({
      notifyType: 'message',
      statusType: 'success',
      message: 'Success message',
      description: 'Success message'
    })

    expect(reducer(state, {
      type: actions.CLEAR
    })).toEqual(initialState)
  })
})
