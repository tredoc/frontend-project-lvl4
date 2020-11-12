export const getChannelMessages = (state) => {
  const { channels: { channelId }, messages } = state;
  return messages.filter((message) => message.channelId === channelId);
};
export const getChannelsList = (state) => state.channels.channelsList;
export const getIsModalShown = (state) => state.ui.modal.show;
export const getModalUi = (state) => state.ui.modal;
export const getChannels = (state) => state.channels;
export const getCurrentChannelId = (state) => state.channels.channelId;
