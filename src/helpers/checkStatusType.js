
export default (notifyType, status) => {
  const messageTypes = ['success', 'error', 'info', 'warning', 'warn', 'loading']
  const notificationTypes = ['success', 'error', 'info', 'warning']

  if (notifyType === 'notification') {
    return notificationTypes.includes(status) ? status : 'info'
  }

  return messageTypes.includes(status) ? status : 'info'
}
