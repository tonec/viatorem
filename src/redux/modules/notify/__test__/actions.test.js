import * as actions from '../actions'

describe('Notify actions', () => {
  it('showMessage should dispatch the correct action', () => {
    const data = {
      statusType: 'success',
      message: 'Success message'
    }

    const expectedAction = {
      type: actions.SHOW_MESSAGE,
      ...data
    }

    expect(actions.showMessage(data)).toEqual(expectedAction)
  })

  it('showNotification should dispatch the correct action', () => {
    const data = {
      statusType: 'success',
      message: 'Success message',
      description: 'Success message'
    }

    const expectedAction = {
      type: actions.SHOW_NOTIFICATION,
      ...data
    }

    expect(actions.showNotification(data)).toEqual(expectedAction)
  })

  it('clear should dispatch the correct action', () => {
    const expectedAction = { type: actions.CLEAR }
    expect(actions.clear()).toEqual(expectedAction)
  })
})
