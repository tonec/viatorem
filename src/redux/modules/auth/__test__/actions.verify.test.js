import configureMockStore from 'redux-mock-store'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import clientMiddleware from 'redux/middleware/clientMiddleware'
import * as actions from '../actions'

const mockAxios = new MockAdapter(axios)
const middleware = [clientMiddleware({ client: axios })]
const mockStore = configureMockStore(middleware)

describe('Auth actions - isVerified', () => {
  it.skip('should return true if the store contains user data', () => {

    const state = {
      auth: {
        id: '1234',
        user: 'Test user'
      }
    }

    expect(actions.isVerified(state)).toBe(true)
  })
})
