import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'antd'
import AddTripForm from './Form/AddTripFormContainer'

const propTypes = {
  visible: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired
}

const AddTrip = ({ visible, showModal, hideModal }) => {
  return (
    <div>
      <Button type="primary" icon="plus-circle-o" onClick={showModal}>
        Add a new trip
      </Button>
      <Modal
        title="Add a new trip"
        visible={visible}
        footer={null}
        onCancel={hideModal}
      >
        <AddTripForm />
      </Modal>
    </div>
  )
}

AddTrip.propTypes = propTypes

export default AddTrip
