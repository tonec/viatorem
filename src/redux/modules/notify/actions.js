/*
* Actions
* * * * */

const prefix = '@notify'

export const SHOW_MESSAGE = `${prefix}/SHOW_MESSAGE`
export const SHOW_NOTIFICATION = `${prefix}/SHOW_NOTIFICATION`
export const CLEAR = `${prefix}/CLEAR`

/*
* Action creators
* * * * * * * * */

export const showMessage = ({ statusType, message }) => {
  return { type: SHOW_MESSAGE, statusType, message }
}

export const showNotification = ({ statusType, message, description }) => {
  return { type: SHOW_NOTIFICATION, statusType, message, description }
}

export const clear = () => {
  return { type: CLEAR }
}
