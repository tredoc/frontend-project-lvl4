/* eslint react/prop-types: 0 */
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ channels: { channelId }, messages }) => {
  const props = {
    messagesList: messages.filter((message) => message.channelId === channelId),
  };
  return props;
};

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

const Messages = ({ messagesList }) => {
  const messages = messagesList.map((message) => (
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

export default connect(mapStateToProps)(Messages);
