import catchValidation from 'utils/catchValidation'
import cookie from 'js-cookie'

/*
* Actions
* * * * */

const prefix = '@auth'

export const VERIFY = `${prefix}/VERIFY`
export const VERIFY_SUCCESS = `${prefix}/VERIFY_SUCCESS`
export const VERIFY_FAIL = `${prefix}/VERIFY_FAIL`

export const LOGIN = `${prefix}/LOGIN`
export const LOGIN_SUCCESS = `${prefix}/LOGIN_SUCCESS`
export const LOGIN_FAIL = `${prefix}/LOGIN_FAIL`

export const REGISTER = `${prefix}/REGISTER`
export const REGISTER_SUCCESS = `${prefix}/REGISTER_SUCCESS`
export const REGISTER_FAIL = `${prefix}/REGISTER_FAIL`

export const LOGOUT = `${prefix}/LOGOUT`

/*
* Action helpers
* * * * * * * * */

function getCookie (req) {
  let authCookie = null

  if (process.env.__SERVER__) {
    authCookie = req.cookies && req.cookies.viatorem ? JSON.parse(req.cookies.viatorem) : null
  } else {
    authCookie = cookie.getJSON('viatorem')
  }

  return authCookie
}

function setCookie (response) {
  const options = response.expires ? { expires: response.expires } : undefined
  cookie.set('viatorem', response, options)
}

function unsetCookie () {
  cookie.remove('viatorem')
}

/*
* Action creators
* * * * * * * * */

export const isVerified = ({ auth }) => {
  return auth && !!auth.user
}

export const verify = () => {
  return {
    types: [ VERIFY, VERIFY_SUCCESS, VERIFY_FAIL ],
    promise: async ({ client }) => {
      if (!getCookie()) {
        return Promise.reject(new Error('No cookie to verify'))
      }

      try {
        return await client.get('/auth/verify')
      } catch (error) {
        throw error
      }
    }
  }
}

export const register = userProps => {
  return {
    types: [ REGISTER, REGISTER_SUCCESS, REGISTER_FAIL ],
    promise: async ({ client }) => {
      try {
        await client.post('/auth/register', userProps).data
      } catch (error) {
        throw error
      }
    }
  }
}

export const login = credentials => {
  return {
    types: [ LOGIN, LOGIN_SUCCESS, LOGIN_FAIL ],
    promise: async ({ client }) => {
      try {
        const response = await client.post('/auth/login', credentials)
        setCookie(response.data.auth)
        return response.data.user
      } catch (error) {
        catchValidation(error)
        throw error
      }
    }
  }
}

export const logout = () => {
  unsetCookie()
  return {
    type: LOGOUT
  }
}
