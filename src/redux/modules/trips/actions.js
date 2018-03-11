import { normalize } from 'normalizr'
import { tripSchema, tripsListSchema } from './schema'

/*
* Actions
* * * * */

const prefix = '@trips'

export const FETCH = `${prefix}/FETCH`
export const FETCH_SUCCESS = `${prefix}/FETCH_SUCCESS`
export const FETCH_FAIL = `${prefix}/FETCH_FAIL`

export const FETCH_ALL = `${prefix}/FETCH_ALL`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`
export const FETCH_ALL_FAIL = `${prefix}/FETCH_ALL_FAIL`

export const ADD = `${prefix}/ADD`
export const ADD_SUCCESS = `${prefix}/ADD_SUCCESS`
export const ADD_FAIL = `${prefix}/ADD_FAIL`

/*
* Action creators
* * * * * * * * */

export const fetchTrip = (id) => {
  return {
    types: [ FETCH, FETCH_SUCCESS, FETCH_FAIL ],
    promise: async ({ client }) => {
      try {
        const { data } = await client.get(`/trips/${id}`)
        return normalize(data, tripSchema)
      } catch (error) {
        throw error
      }
    }
  }
}

export const fetchTrips = (pageNum = 1) => {
  return {
    types: [ FETCH_ALL, FETCH_ALL_SUCCESS, FETCH_ALL_FAIL ],
    promise: async ({ client }) => {
      const perPage = 5

      try {
        const { data } = await client.get(`/trips?per_page=${perPage}&page=${pageNum}`)
        return {
          ...normalize(data.trips, tripsListSchema),
          meta: data.meta,
          paginationKey: 'trips',
          pagination: data.pages
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export const addTrip = (tripProps) => {
  return {
    types: [ ADD, ADD_SUCCESS, ADD_FAIL ],
    promise: async () => {
      try {
        console.log(tripProps)
      } catch (error) {
        throw error
      }
    }
  }
}
