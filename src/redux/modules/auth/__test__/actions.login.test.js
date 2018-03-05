import configureMockStore from 'redux-mock-store'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import clientMiddleware from 'redux/middleware/clientMiddleware'
import * as actions from '../actions'

const mockAxios = new MockAdapter(axios)
const middleware = [clientMiddleware({ client: axios })]
const mockStore = configureMockStore(middleware)

const responseData = {
  user: {
    _id: '1234',
    name: 'Test User'
  },
  auth: {
    accessToken: 'testtoken',
    expires: 1
  }
}

describe('Auth actions - Login', () => {
  it('should dispatch the correct actions if login is successful', done => {

    const store = mockStore({})

    const expectedActions = [
      { type: actions.LOGIN },
      { type: actions.LOGIN_SUCCESS, result: responseData.user }
    ]

    mockAxios.onPost('/auth/login').reply(200, responseData)

    return store.dispatch(actions.login())
      .then(result => {
        expect(store.getActions()).toEqual(expectedActions)
        done()
      })
      .catch(error => {
        console.log(error)
        done()
      })
  })

  it('should dispatch the correct actions if login fails', done => {

    const store = mockStore({})

    const expectedActions = [
      { type: actions.LOGIN },
      { type: actions.LOGIN_FAIL }
    ]

    mockAxios.onPost('/auth/login').reply(401)

    return store.dispatch(actions.login())
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
        done()
      })
  })
})
