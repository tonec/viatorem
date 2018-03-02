/*
* Actions
* * * * */

const prefix = '@notify'

export const SHOW = `${prefix}/SHOW`
export const CLEAR = `${prefix}/CLEAR`

/*
* Action creators
* * * * * * * * */

export const show = ({ notifyType, statusType, message, description }) => {
  return {
    type: SHOW,
    notifyType,
    statusType,
    message,
    description
  }
}

export const clear = () => {
  return { type: CLEAR }
}
