import { normalize } from 'normalizr'
import { tripsListSchema } from './schema'

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

export const fetchTrips = (pageNum = 1) => {
  return {
    types: [ FETCH, FETCH_SUCCESS, FETCH_FAIL ],
    promise: async ({ client }, dispatch) => {
      const perPage = 5

      try {
        const response = await client.get(`/trips?per_page=${perPage}&page=${pageNum}`)
        return normalize(response.data.trips, tripsListSchema)
      } catch (error) {
        throw error
      }
    }
  }
}
