export default function clientMiddleware (helpers) {
  return ({ dispatch, getState }) => next => action => {

    // Is thunk
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    const { promise, types, ...rest } = action

    // Is pain object
    if (!promise) {
      return next(action)
    }

    // Is async
    const [REQUEST, SUCCESS, FAILURE] = types

    // async action started
    next({ ...rest, type: REQUEST })

    // Inject helpers (eg. apiClient as client) and dispatch to action promise
    const actionPromise = promise(helpers, dispatch)

    // Dispatch appropriate SUCCESS or FAIL action depending on whether action promise is resolved/value is returned or rejected
    actionPromise
      .then(response => next({ ...rest, response, type: SUCCESS }), () => next({ ...rest, type: FAILURE }))
      .catch(error => {
        console.error('MIDDLEWARE ERROR:', error)
        next({ ...rest, error, type: FAILURE })
      })

    return actionPromise
  }
}
