import React from 'react'
import { ErrorMessage, useFormik } from 'formik';
import { connect } from 'react-redux'
import axios from 'axios'
import UserContext from '../userContext'
import { Form, Button, Row, Col } from 'react-bootstrap';


const mapStateToProps = (state) => {
    return ({ userName: state.userName, channelId: state.channels.channelId})
} 

const SendMessage = (props) => {
    const userName = React.useContext(UserContext)

    const { channelId } = props
    const formik = useFormik({
        initialValues: {
            message: '',
        },
        onSubmit: async (values, {resetForm, setErrors, setFieldError}) => {
            const message = {text: values.message, userName: userName, channelId: channelId}
            if (values.message.trim().length === 0) {
                return
            }
            try {
                await axios.post(`/api/v1/channels/${channelId}/messages`, {
                    data: { 
                        type: 'messages',
                        id: message.id,
                        attributes: message
                    }
                })
                .then(
                    resetForm()
                )
            } catch (error) {
                setErrors({network: error.message})
            }
        }
    });

    const { isSubmitting, errors, handleChange, values } = formik

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
                <Row>
                    <Col lg={10}>
                    <Form.Control 
                        disabled={isSubmitting || errors.network} 
                        isInvalid={errors.network} 
                        onChange={handleChange} 
                        value={values.message} 
                        type="text" 
                        id="message" 
                        name="message" 
                        placeholder="введите сообщение"/>
                    </Col>
                    <Col lg={2}>
                    <Button lg={2} disabled={isSubmitting} variant="primary" type="submit">Чиркануть</Button>
                    </Col>
                </Row>
            </Form.Group>
            <Row>
                <Col lg={10} className="text-danger">   
                    {errors.network}
                </Col>
            </Row>  
        </Form>
    )
}

export default connect(mapStateToProps)(SendMessage)