import reducer, { initialState } from '../reducer'

describe('Auth reducer - initialState', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
})
