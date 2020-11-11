const getChannelMessages = (state) => {
  const { channels: { channelId }, messages } = state;
  return messages.filter((message) => message.channelId === channelId);
};

export default getChannelMessages;
