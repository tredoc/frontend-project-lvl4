// https://redux-toolkit.js.org/tutorials/intermediate-tutorial#writing-the-slice-reducer
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channelsList: [],
    channelId: 1,
  },
  reducers: {
    addChannel({ channelsList }, { payload }) {
      channelsList.push(payload);
    },
    removeChannel(state, { payload }) {
      state.channelsList = state.channelsList.filter((channel) => channel.id !== payload);
      state.channelId = 1;
    },
    renameChannel(state, { payload }) {
      state.channelsList.find((channel) => channel.id === payload.id).name = payload.name;
    },
    selectChannel(state, { payload }) {
      state.channelId = payload;
    },
  },
});

export const {
  addChannel, removeChannel, renameChannel, selectChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
