import React from 'react';
import Messages from './Messages';
import MessageFrom from './MessageForm';

const Chat = () => (
  <div className="message-window col h-100 border-right d-flex flex-column justify-content-between">
    <Messages />
    <MessageFrom />
  </div>
);

export default Chat;
