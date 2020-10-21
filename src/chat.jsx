import React from 'react'
import Messages from './messages'
import Send from './send'

const Chat = () => {
    return (
        <div className="message-window col h-100 border-right d-flex flex-column justify-content-between">
            <Messages />
            <Send />
        </div>   
    )
}

export default Chat