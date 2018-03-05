import configureMockStore from 'redux-mock-store'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import clientMiddleware from 'redux/middleware/clientMiddleware'
import * as actions from '../actions'

const mockAxios = new MockAdapter(axios)
const middleware = [clientMiddleware({ client: axios })]
const mockStore = configureMockStore(middleware)

const responseData = {
  _id: '1234',
  name: 'Test User',
  email: 'test@example.com',
  message: 'New user registered successfully.'
}

describe('Auth actions - Register', () => {
  it('should dispatch the correct actions if registration is successful', done => {

    const store = mockStore({})

    const expectedActions = [
      { type: actions.REGISTER },
      { type: actions.REGISTER_SUCCESS, result: responseData }
    ]

    mockAxios.onPost('/auth/register').reply(200, responseData)

    return store.dispatch(actions.register())
      .then(result => {
        expect(store.getActions()).toEqual(expectedActions)
        done()
      })
      .catch(error => {
        console.log(error)
        done()
      })
  })

  it('should dispatch the correct actions if register fails', done => {

    const store = mockStore({})

    const expectedActions = [
      { type: actions.REGISTER },
      { type: actions.REGISTER_FAIL }
    ]

    mockAxios.onPost('/auth/register').reply(401)

    return store.dispatch(actions.register())
      .catch(() => {
        const storeActions = store.getActions()
        expect(storeActions[0].type).toBe(expectedActions[0].type)
        expect(storeActions[1].type).toBe(expectedActions[1].type)
        done()
      })
  })
})
