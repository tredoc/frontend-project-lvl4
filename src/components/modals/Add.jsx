/* eslint react/prop-types: 0 */
import React from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { hideModal } from '../../slices';
import routes from '../../routes';
import validationSchema from '../../utils/modalValidationSchema';

const mapStateToProps = ({ channels, ui }) => {
  const props = {
    showModal: ui.modal.show,
    channelsList: channels.channelsList,
  };
  return props;
};
const Add = (props) => {
  const { showModal, channelsList, dispatch } = props;
  const channelsNames = channelsList.map((channel) => channel.name);

  const handleClose = () => {
    dispatch(hideModal());
  };

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: validationSchema(channelsNames),
    onSubmit: (values) => {
      const { channelName } = values;
      if (!channelName) return;

      const { channelsPath } = routes;
      axios.post(channelsPath(), {
        data: {
          type: 'channels',
          attributes: { name: channelName, removable: true },
        },
      });
      handleClose();
    },
  });

  const {
    handleSubmit, handleChange, values, errors, touched,
  } = formik;

  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Adding channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>What`&apos;`s the name for a new channel ?</Form.Label>
            <Form.Control
              type="text"
              id="channelName"
              name="channelName"
              onChange={handleChange}
              value={values.channelName}
            />
            {errors.channelName && touched.channelName && (
            <p className="text-danger">
              {errors.channelName}
            </p>
            )}
          </Form.Group>
          <Form.Group className="d-flex justify-content-between">
            <Button onClick={handleClose} variant="secondary" type="reset">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps)(Add);
