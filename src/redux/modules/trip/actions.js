import catchValidation from 'utils/catchValidation'

/*
* Actions
* * * * */

const prefix = '@auth'

export const FETCH = `${prefix}/FETCH`
export const FETCH_SUCCESS = `${prefix}/FETCH_SUCCESS`
export const FETCH_FAIL = `${prefix}/FETCH_FAIL`

/*
* Action creators
* * * * * * * * */

export const fetchTrips = userProps => {
  return {
    types: [ FETCH, FETCH_SUCCESS, FETCH_FAIL ],
    promise: async (client, dispatch) => {
      try {
        // const response = await client.get('/trips')
        // return response.data
      } catch (error) {
        return catchValidation(error.data)
      }
    }
  }
}
