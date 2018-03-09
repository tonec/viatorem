import Immutable from 'seamless-immutable'

export const initialState = Immutable({})

export default function reducer (state = initialState, action = {}) {
  if (action.response && action.response.pagination) {
    const { response: { paginationKey, pagination } } = action

    if (!state[paginationKey]) {
      return state.set(paginationKey, pagination)
    }

    return state.update(paginationKey, () => (pagination))
  }

  return state
}
