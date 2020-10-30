import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import axios from 'axios'
import { hideModal } from '../slices/uiSlice';
import * as Yup from 'yup'

const mapStateToProps = (state) => {
    const props = {
        showModal: state.ui.modal.show,
        channelsList: state.channels.channelsList
    }
    return props
}
const Add = (props) => {
    const { showModal, channelsList, dispatch } = props
    const channelsNames = channelsList.map(c => c.name)

    const formik = useFormik({
        initialValues: {
            channelName: '',
        },
        validationSchema: Yup.object({
            channelName: Yup.string()
            .min(3, 'Min name length is 3 letters')
            .max(20, 'Max name length is 20 letters')
            .required("Required!")
            .notOneOf(channelsNames, "Channel with this name already exists")
        }),
        onSubmit: values => {
            const channelName = values.channelName
            if (!channelName) return

            axios.post('/api/v1/channels', {
                data: {
                    type: 'channels',
                    attributes: {name: channelName, removable: true},
                  }
            })
            handleClose()
        },
    });

    const handleClose = () => {
        dispatch(hideModal())
    } 

    const { handleSubmit, handleChange, values, errors, touched } = formik

    return (
        <Modal show={showModal} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Adding channel</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                    <Form.Group>
                        <Form.Label>What's the name for new Channel, Sir?</Form.Label>
                        <Form.Control type="text" id="channelName" name="channelName" onChange={handleChange} value={values.channelName} />
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
                            Submit
                        </Button>
                    </Form.Group>
            </Form>
            </Modal.Body>
        </Modal>
    )
}

export default connect(mapStateToProps)(Add)