// https://redux-toolkit.js.org/tutorials/intermediate-tutorial#writing-the-slice-reducer
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, { payload }) {
      const addedMessage = payload;
      return [...state, addedMessage];
    },
    removeMessages(state, { payload }) {
      state = state.filter((message) => message.channelId !== payload);
      return state;
    },
  },
});

export const { addMessage, removeMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
