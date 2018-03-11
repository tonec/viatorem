import { schema } from 'normalizr'

export const tripSchema = new schema.Entity('trips')
export const tripsListSchema = new schema.Array(tripSchema)
