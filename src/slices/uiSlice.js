import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        modal: {
            show: false,
            type: null,
            extra: null
        }
    },
    reducers: {
        showModal(state, action) {
            const {modalType, extra} = action.payload
            state.modal = { show: true, type: modalType, extra }
        },
        hideModal(state, action) {
            state.modal = {
                show: false,
                type: null,
                extra: null
            }
        }
    }
})

export const { showModal, hideModal } = uiSlice.actions

export default uiSlice.reducer