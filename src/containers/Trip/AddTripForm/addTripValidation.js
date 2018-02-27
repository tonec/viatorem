import memoize from 'lru-memoize'
import { createValidator, required } from 'utils/validation'

const loginValidation = createValidator({
  title: required,
  dates: required
})
export default memoize(10)(loginValidation)
