import Immutable from 'seamless-immutable'
import { combineReducers, routerReducer } from 'redux-seamless-immutable'
import { reducer as formReducer } from 'redux-form'
import auth from './modules/auth/reducer'
import entities from './modules/entities/reducer'
import pagination from './modules/pagination/reducer'
import notify from './modules/notify/reducer'
import trips from './modules/trips/reducer'

export default combineReducers(Immutable({
  routing: routerReducer,
  form: formReducer,
  auth,
  entities,
  pagination,
  notify,
  trips,
}))
