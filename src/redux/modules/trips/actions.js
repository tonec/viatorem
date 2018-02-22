/*
* Actions
* * * * */

export const FETCH = 'trip/FETCH'
export const FETCH_SUCCESS = 'trip/FETCH_SUCCESS'
export const FETCH_FAIL = 'trip/FETCH_FAIL'

/*
* Action creators
* * * * * * * * */

export const fetchTrips = () => {
  return async (dispatch, getState, client) => {
    dispatch({ type: FETCH })
    try {
      const response = await client.get('/trips')
      dispatch({ type: FETCH_SUCCESS, payload: response })
    } catch (error) {
      dispatch({ type: FETCH_FAIL })
    }
  }
}
