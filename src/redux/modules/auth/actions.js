import catchValidation from 'utils/catchValidation'
import cookie from 'js-cookie'

/*
* Actions
* * * * */

const prefix = '@auth'

export const LOAD = `${prefix}/LOAD`
export const LOAD_SUCCESS = `${prefix}/LOAD_SUCCESS`
export const LOAD_FAIL = `${prefix}/LOAD_FAIL`
export const LOGIN = `${prefix}/LOGIN`
export const LOGIN_SUCCESS = `${prefix}/LOGIN_SUCCESS`
export const LOGIN_FAIL = `${prefix}/LOGIN_FAIL`
export const REGISTER = `${prefix}/REGISTER`
export const REGISTER_SUCCESS = `${prefix}/REGISTER_SUCCESS`
export const REGISTER_FAIL = `${prefix}/REGISTER_FAIL`
export const LOGOUT = `${prefix}/LOGOUT`
export const LOGOUT_SUCCESS = `${prefix}/LOGOUT_SUCCESS`
export const LOGOUT_FAIL = `${prefix}/LOGOUT_FAIL`

/*
* Action helpers
* * * * * * * * */

function checkCookie (req) {
  return new Promise((resolve, reject) => {
    let authCookie = null

    if (process.env.__SERVER__) {
      authCookie = req.cookies.viatorem ? JSON.parse(req.cookies.viatorem) : null
    } else {
      authCookie = cookie.getJSON('viatorem')
    }

    if (authCookie) {
      return resolve(authCookie)
    }

    return reject(new Error('Check cookie failed.'))
  })
}

function setCookie (response) {
  return new Promise((resolve, reject) => {
    try {
      const options = response.expires ? { expires: response.expires } : undefined
      resolve(cookie.set('viatorem', response, options))
    } catch (error) {
      reject(error)
    }
  })
}

function unsetCookie () {
  return new Promise((resolve, reject) => {
    try {
      resolve(cookie.remove('viatorem'))
    } catch (error) {
      reject(error)
    }
  })
}

/*
* Action creators
* * * * * * * * */

export function isLoaded (globalState) {
  return globalState.auth && globalState.auth.loaded
}

export function load () {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: async ({ client, req }) => {
      const response = await checkCookie(req)
      await setCookie(response)
      return response
    }
  }
}

export function register (data) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: async ({ client }) => {
      try {
        return await client.post('/api/auth/register', data)
      } catch (error) {
        throw error
      }
    }
  }
}

export function login (data) {
  console.log('login', data)
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: async ({ client }) => {
      try {
        const response = await client.post('/auth/login', data)
        await setCookie(response)
        return response
      } catch (error) {
        catchValidation(error)
        throw error
      }
    }
  }
}

export function logout () {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: async ({ client }) => {
      await unsetCookie()
    }
  }
}
