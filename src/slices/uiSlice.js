import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    modal: {
      show: false,
      type: null,
      extra: null,
    },
  },
  reducers: {
    showModal(state, { payload }) {
      const { modalType, extra } = payload;
      state.modal = { show: true, type: modalType, extra };
    },
    hideModal(state) {
      state.modal = {
        show: false,
        type: null,
        extra: null,
      };
    },
  },
});

export const { showModal, hideModal } = uiSlice.actions;

export default uiSlice.reducer;
