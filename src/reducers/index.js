import { combineReducers } from 'redux'

import messagesReducer from '../slices/messagesSlice'
import channelsReducer from '../slices/channelsSlice'
import uiReducer from '../slices/uiSlice'

const rootReducer = combineReducers({
  messages: messagesReducer,
  channels: channelsReducer,
  ui: uiReducer
}) 

export default rootReducer