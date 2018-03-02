import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { message, notification } from 'antd'
import checkStatusType from 'helpers/checkStatusType'
import { clear } from 'redux/modules/notify/actions'

@connect(({ notify }) => ({
  ...notify
}))
class Notify extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    notifyType: PropTypes.string,
    statusType: PropTypes.string,
    message: PropTypes.string,
    description: PropTypes.string
  }

  static defaultProps = {
    notifyType: 'message',
    statusType: 'info',
    message: null,
    description: null
  }

  componentDidUpdate () {
    const { notifyType, statusType, message, description } = this.props

    if (notifyType === 'message') {
      this.showMessage(statusType, message)
    }

    if (notifyType === 'notification') {
      this.showNotification(statusType, message, description)
    }

    this.props.dispatch(clear())
  }

  showMessage (status, text) {
    message[checkStatusType('message', status)](text)
  }

  showNotification (status, text, description) {
    notification[checkStatusType('notification', status)]({
      message: text,
      description
    })
  }

  render () {
    return null
  }
}

export default Notify
