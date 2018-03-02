import configureMockStore from 'redux-mock-store'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import clientMiddleware from 'redux/middleware/clientMiddleware'
import * as actions from '../actions'

const mockAxios = new MockAdapter(axios)
const middleware = [clientMiddleware({ client: axios })]
const mockStore = configureMockStore(middleware)

jest.mock('utils/cookie')

describe('Auth actions - isVerified', () => {
  it('should return true if the store contains user data', () => {

    const state = {
      auth: {
        _id: '1234',
        user: 'Test user'
      }
    }

    expect(actions.isVerified(state)).toBe(true)
  })

  it('should return false if the store does not contain user data', () => {

    const state = { auth: {} }

    expect(actions.isVerified(state)).toBe(false)
  })
})

const responseData = {
  _id: '1234',
  name: 'Test User',
  email: 'test@example.com'
}

describe('Auth actions - Verify', () => {
  it('should dispatch the correct actions if verification is successful', done => {

    const store = mockStore({})

    const expectedActions = [
      { type: actions.VERIFY },
      { type: actions.VERIFY_SUCCESS, result: responseData }
    ]

    mockAxios.onGet('/auth/verify').reply(200, responseData)

    return store.dispatch(actions.verify())
      .then(result => {
        expect(store.getActions()).toEqual(expectedActions)
        done()
      })
      .catch(error => {
        console.log(error)
        done()
      })
  })

  it('should dispatch the correct actions if verification fails', done => {

    const store = mockStore({})

    const expectedActions = [
      { type: actions.VERIFY },
      { type: actions.VERIFY_FAIL }
    ]

    mockAxios.onGet('/auth/verify').reply(200, null)

    return store.dispatch(actions.verify())
      .then(result => {
        expect(store.getActions()).toEqual(expectedActions)
        done()
      })
      .catch(() => {
        // Rejected promise is expected
        done()
      })
  })
})
