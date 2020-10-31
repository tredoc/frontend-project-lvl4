/* eslint react/prop-types: 0 */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { hideModal } from '../../slices/uiSlice';
import routes from '../../routes';

const mapStateToProps = ({ ui }) => {
  const props = {
    showModal: ui.modal.show,
    channelId: ui.modal.extra,
  };
  return props;
};
const Rename = (props) => {
  const { showModal, channelId, dispatch } = props;

  const handleClose = () => {
    dispatch(hideModal());
  };

  const handleRemove = () => {
    const { channelPath } = routes;
    axios.delete(channelPath(channelId), {
      data: {
        id: channelId,
      },
    });
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Remove channel?</Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex justify-content-between">
        <Button onClick={handleClose} variant="secondary" type="reset">
          Cancel
        </Button>
        <Button onClick={handleRemove} variant="danger" type="submit">
          Confirm
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps)(Rename);
