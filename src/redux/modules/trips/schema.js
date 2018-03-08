import { schema } from 'normalizr'

const tripSchema = new schema.Entity('trips')
export const tripsListSchema = new schema.Array(tripSchema)
