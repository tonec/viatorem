import memoize from 'lru-memoize'
import { createValidator, required } from 'utils/validation'

const validation = createValidator({
  title: required,
  dates: required
})

export default memoize(10)(validation)
