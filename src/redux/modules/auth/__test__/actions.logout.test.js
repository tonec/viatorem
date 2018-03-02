import * as actions from '../actions'

describe('Auth actions - Logout', () => {
  it('should dispatch the correct action', done => {

    const expectedActions = { type: actions.LOGOUT }

    expect(actions.logout()).toEqual(expectedActions)
  })
})
