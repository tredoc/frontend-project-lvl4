import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

const mapStateToProps = (state) => {
    const props = {
        messages: state.messages,
        channelId: state.currentChannelId
    }
    return props
}

const Messages = (props) => {
    const messages = props.messages.filter(m => m.channelId === props.channelId)
        .map(m => <div key={m.id}>{m.userName}: {m.text}</div>)
    
        return (
        <div className="mb-5">
            {messages}
        </div>
    )
}

export default connect(mapStateToProps)(Messages)