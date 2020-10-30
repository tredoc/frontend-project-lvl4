// https://redux-toolkit.js.org/tutorials/intermediate-tutorial#writing-the-slice-reducer

import { createSlice } from '@reduxjs/toolkit'

const channelsSlice = createSlice({
    name: 'channels',
    initialState: {
        channelsList: [],
        channelId: 1 
    },
    reducers: {
        addChannel({ channelsList }, action) {
            channelsList.push(action.payload)
        },
        removeChannel(state, action) {
            state.channelsList =  state.channelsList.filter(channel => channel.id !== action.payload)
            state.channelId = 1
        },
        renameChannel(state, action)  {
            state.channelsList.find(c => c.id === action.payload.id).name = action.payload.name
        },
        selectChannel(state, action) {
            state.channelId = action.payload
        }
    }
})

export const { addChannel, removeChannel, renameChannel, selectChannel } = channelsSlice.actions

export default channelsSlice.reducer