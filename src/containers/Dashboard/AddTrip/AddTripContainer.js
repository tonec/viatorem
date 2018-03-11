import React, { Component } from 'react'
import AddTrip from './AddTrip'

class AddTripContainer extends Component {

  constructor (props) {
    super(props)

    this.state = {
      visible: false
    }
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  hideModal = () => {
    this.setState({ visible: false })
  }

  render () {
    const { visible } = this.state

    return (
      <AddTrip
        visible={visible}
        showModal={this.showModal}
        hideModal={this.hideModal}
      />
    )
  }
}

export default AddTripContainer
