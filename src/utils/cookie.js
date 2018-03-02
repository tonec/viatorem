import cookie from 'js-cookie'

export const getCookie = (req) => {
  let authCookie = null

  if (process.env.__SERVER__) {
    authCookie = req.cookies && req.cookies.viatorem ? JSON.parse(req.cookies.viatorem) : null
  } else {
    authCookie = cookie.getJSON('viatorem')
  }

  return authCookie
}

export const setCookie = (response) => {
  const options = response.expires ? { expires: response.expires } : undefined
  cookie.set('viatorem', response, options)
}

export const unsetCookie = () => {
  cookie.remove('viatorem')
}
