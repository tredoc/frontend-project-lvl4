import React from 'react';
import Messages from './Messages';
import SendMessage from './SendMessage';

const Chat = () => (
  <div className="message-window col h-100 border-right d-flex flex-column justify-content-between">
    <Messages />
    <SendMessage />
  </div>
);

export default Chat;
