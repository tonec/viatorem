import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import auth from './modules/auth/reducer'
import trips from './modules/trips/reducer'

export default combineReducers({
  router: routerReducer,
  form: formReducer,
  auth,
  trips
})
