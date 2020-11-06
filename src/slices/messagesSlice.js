// https://redux-toolkit.js.org/tutorials/intermediate-tutorial#writing-the-slice-reducer
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, { payload }) {
      const addedMessage = payload;
      state.push(addedMessage);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => state
      .filter((message) => message.channelId !== payload));
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
