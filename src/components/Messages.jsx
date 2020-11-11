/* eslint react/prop-types: 0 */
import React from 'react';
import { useSelector } from 'react-redux';
import getChannelMessages from '../utils';

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
  const messagesList = useSelector(getChannelMessages);

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
