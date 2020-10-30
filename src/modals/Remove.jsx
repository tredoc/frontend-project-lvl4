import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import axios from 'axios'
import { hideModal } from '../slices/uiSlice';

const mapStateToProps = (state) => {
    const props = {
        showModal: state.ui.modal.show,
        channelId: state.ui.modal.extra
    }
    return props
}
const Rename = (props) => {
    const { showModal, channelId, dispatch } = props

    const handleRemove = () => {
        axios.delete(`/api/v1/channels/${channelId}`, {
            data: {
                id: channelId
            }
        })
        handleClose()
    }

    const handleClose = () => {
        dispatch(hideModal())
    } 

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
    )
}

export default connect(mapStateToProps)(Rename)