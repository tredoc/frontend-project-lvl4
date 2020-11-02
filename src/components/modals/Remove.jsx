/* eslint react/prop-types: 0 */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { hideModal } from '../../slices/uiSlice';
import routes from '../../routes';

const Rename = () => {
  const dispatch = useDispatch();
  const { show: showModal, extra: channelId } = useSelector(({ ui }) => ui.modal);

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

export default Rename;
