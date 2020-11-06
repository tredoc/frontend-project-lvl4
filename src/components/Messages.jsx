/* eslint react/prop-types: 0 */
import React from 'react';
import { useSelector } from 'react-redux';

const Message = ({ messageData }) => {
  const { userName, text } = messageData;
  return (
    <div>
      {userName}
      :
      {' '}
      {text}
    </div>
  );
};

const Messages = () => {
  const channelId = useSelector(({ channels }) => channels.channelId);
  const messagesList = useSelector(({ messages }) => messages
    .filter((message) => message.channelId === channelId));

  const messages = messagesList
    .map((message) => (
      <Message
        key={message.id}
        messageData={message}
      />
    ));

  return (
    <div className="mb-5">
      {messages}
    </div>
  );
};

export default Messages;
