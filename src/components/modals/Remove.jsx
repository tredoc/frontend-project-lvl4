/* eslint react/prop-types: 0 */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { withNamespaces } from 'react-i18next';
import { hideModal } from '../../slices/uiSlice';
import routes from '../../routes';

const Rename = ({ t }) => {
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
        <Modal.Title>{t('modal.removingChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex justify-content-between">
        <Button onClick={handleClose} variant="secondary" type="reset">
          {t('modal.cancelBtn')}
        </Button>
        <Button onClick={handleRemove} variant="danger" type="submit">
          {t('modal.confirmBtn')}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default withNamespaces()(Rename);
