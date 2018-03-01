import configureMockStore from 'redux-mock-store'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import clientMiddleware from 'redux/middleware/clientMiddleware'
import * as actions from '../actions'

const mockAxios = new MockAdapter(axios)
const middleware = [clientMiddleware({ client: axios })]
const mockStore = configureMockStore(middleware)

const data = {
  email: 'test@example.com',
  password: '1234'
}

describe('Auth actions - login', () => {
  it('should dispatch the correct actions and data when successful', () => {

    const store = mockStore({})

    const expectedActions = [
      { type: actions.LOGIN },
      { type: actions.LOGIN_SUCCESS }
    ]

    mockAxios.onPost('/auth/login').reply(200, data)

    return store.dispatch(actions.login()).then(result => {
      const storeActions = store.getActions()
      expect(storeActions[0].type).toBe(expectedActions[0].type)
      expect(storeActions[1].type).toBe(expectedActions[1].type)
      expect(storeActions[1].result.data).toEqual(data)
    })
  })

  it('should dispatch the correct actions and data when unsuccessful', () => {

    const store = mockStore({})

    const expectedActions = [
      { type: actions.LOGIN },
      { type: actions.LOGIN_FAIL }
    ]

    mockAxios.onPost('/auth/login').reply(401)

    return store.dispatch(actions.login()).catch(() => {
      const storeActions = store.getActions()
      expect(storeActions[0].type).toBe(expectedActions[0].type)
      expect(storeActions[1].type).toBe(expectedActions[1].type)
    })
  })
})
