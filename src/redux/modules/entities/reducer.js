import Immutable from 'seamless-immutable'

export const initialState = Immutable({})

export default function reducer (state = initialState, action = {}) {
  if (action.response && action.response.entities) {
    return state.merge(action.response.entities)
  }

  return state
}
