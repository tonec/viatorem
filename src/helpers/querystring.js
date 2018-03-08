import isEmpty from 'lodash/isEmpty'

export const getURLQueryObj = (curQuery, queryUpdates = {}) => {
  const query = Object.assign({}, curQuery)

  if (isEmpty(queryUpdates)) {
    return query
  }

  Object.keys(queryUpdates).forEach((key) => {
    const newVal = queryUpdates[key]

    if (typeof newVal === 'undefined' || newVal === null || newVal.length < 1) {
      return delete query[key]
    }

    query[key] = newVal
  })

  return query
}

export const getCurrentURLQueryObject = () => {
  let result = {}

  if (window.location.search) {
    const pairs = window.location.search.slice(1).split('&')
    pairs.forEach((pair) => {
      pair = pair.split('=')
      result[pair[0]] = decodeURIComponent(pair[1] || '')
    })
  }

  return JSON.parse(JSON.stringify(result))
}

export const createQueryString = (queryUpdates = {}) => {
  const currentQuery = getCurrentURLQueryObject()
  const newQueryObj = getURLQueryObj(currentQuery, queryUpdates)

  const queryStrings = Object.keys(newQueryObj)
    .filter((key) => newQueryObj[key].toString().length > 0)
    .map((key) => `${key}=${encodeURIComponent(newQueryObj[key])}`)

  return queryStrings.length > 0 ? `?${queryStrings.join('&')}` : ''
}

export const createQueryObject = (queryUpdates = {}) => {
  return getURLQueryObj(getCurrentURLQueryObject(), queryUpdates)
}
