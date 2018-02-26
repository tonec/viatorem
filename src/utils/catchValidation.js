import { SubmissionError } from 'redux-form'

export default function catchValidation (error) {
  if (error.message) {
    if (error.message === 'Validation failed' && error.data) {
      throw new SubmissionError(error.data)
    }
    throw new SubmissionError({ _error: error.message })
  }
  return Promise.reject(error)
}
