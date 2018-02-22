import axios from 'axios'

export default req => {
  const { __SERVER__ } = process.env

  const apiClient = axios.create({
    baseURL: __SERVER__ ? 'http://localhost:3030/api' : '/api'
  })

  apiClient.interceptors.request.use(
    conf => {
      if (__SERVER__) {
        if (req.header('cookie')) {
          conf.headers.Cookie = req.header('cookie')
        }
      }

      return conf
    },
    error => Promise.reject(error)
  )

  apiClient.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error.response ? error.response.data : error)
  )

  return apiClient
}
