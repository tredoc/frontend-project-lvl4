import React from 'react'
import { useFormik } from 'formik';
import { connect } from 'react-redux'
import axios from 'axios'

const mapStateToProps = (state) => {
    return ({ userName: state.userName, channelId: state.currentChannelId})
} 

const Send = (props) => {
    const { userName, channelId } = props
    const formik = useFormik({
        initialValues: {
            message: '',
        },
        onSubmit: values => {
            const message = {text: values.message, userName: userName, channelId: channelId}
            axios.post(`/api/v1/channels/${channelId}/messages`, {
                data: { 
                    type: 'messages',
                    id: message.id,
                    attributes: message
                }
            })
            formik.resetForm()
        },
    });

    return (
        <form className="form-group mt-auto" onSubmit={formik.handleSubmit}>
            <div className="input-group">
                <input className="mr-1 form-control" onChange={formik.handleChange} value={formik.values.message} type="text" id="message" name="message" placeholder="введите сообщение"/>
                <button className="btn btn-primary" type="submit">Чиркануть</button>
            </div>
        </form>
    )
}

export default connect(mapStateToProps)(Send)