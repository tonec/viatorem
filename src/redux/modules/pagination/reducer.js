import Immutable from 'seamless-immutable'

export const initialState = Immutable({})

export default function reducer (state = initialState, action = {}) {
  if (action.response && action.response.pagination) {
    const { response: { paginationKey, pagination, meta } } = action

    if (!state[paginationKey]) {
      return state.set(paginationKey, pagination)
    }

    return state.update(paginationKey, () => ({ ...pagination, total: meta.total }))
  }

  return state
}
