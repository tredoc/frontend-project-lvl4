/* eslint react/prop-types: 0 */
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';
import UserContext from '../userContext';
import routes from '../routes';
import validationSchema from '../utils/messageValidationSchema';

const MessageForm = ({ t }) => {
  const userName = React.useContext(UserContext);
  const channelId = useSelector(({ channels }) => channels.channelId);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const onSubmit = async (values, { resetForm, setErrors }) => {
    const message = { text: values.message, userName, channelId };

    const { channelMessagesPath } = routes;
    try {
      await axios.post(channelMessagesPath(channelId), {
        data: {
          type: 'messages',
          id: message.id,
          attributes: message,
        },
      });
      resetForm();
    } catch (error) {
      setErrors({ network: error.message });
    }
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: validationSchema(),
    onSubmit,
  });

  const {
    isSubmitting, errors, handleSubmit, handleChange, values, touched,
  } = formik;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row className="d-flex flex-row">
        <Col md={10}>
          <Form.Control
            size="lg"
            disabled={isSubmitting || errors.network}
            isInvalid={errors.network}
            onChange={handleChange}
            value={values.message}
            type="text"
            id="message"
            name="message"
            placeholder={t('typeHere')}
            ref={inputRef}
          />
        </Col>
        <Col>
          <Button
            size="lg"
            disabled={isSubmitting}
            variant="primary"
            type="submit"
          >
            {t('send')}
          </Button>
        </Col>
      </Form.Row>
      <Row>
        <Col lg={10} className="text-danger">
          {errors.message && touched.message && (
            <p className="text-danger">
              {t(`errors.${errors.message}`)}
            </p>
          )}
          <p className="text-danger">
            {errors.network && t(`errors.${errors.network}`)}
          </p>
        </Col>
      </Row>
    </Form>
  );
};

export default withNamespaces()(MessageForm);
