// https://redux-toolkit.js.org/tutorials/intermediate-tutorial#writing-the-slice-reducer

import { createSlice } from '@reduxjs/toolkit'

const messagesSlice = createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        addMessage(state, action) {
            const addedMessage = action.payload
            return [...state, addedMessage]
        },
        removeMessages(state, action) {
            state = state.filter((m) => m.channelId !== action.payload)
            return state
        }
    }
})

export const { addMessage, removeMessages } = messagesSlice.actions

export default messagesSlice.reducer