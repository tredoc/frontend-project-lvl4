import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

const mapStateToProps = (state) => {
    const props = {
        messagesList: state.messages,
        channelId: state.channels.channelId
    }
    return props
}

const Messages = (props) => {
    const {messagesList, channelId } = props
    const messages = messagesList.filter(m => m.channelId === channelId)
        .map(m => <div key={m.id}>{m.userName}: {m.text}</div>)

    return (
        <div className="mb-5">
            {messages}
        </div>
    )
}

export default connect(mapStateToProps)(Messages)