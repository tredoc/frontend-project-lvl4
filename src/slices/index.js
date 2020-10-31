import { combineReducers } from 'redux';

import messagesReducer, { addMessage, removeMessages } from './messagesSlice';
import channelsReducer, {
  addChannel, removeChannel, renameChannel, selectChannel,
} from './channelsSlice';
import uiReducer, { showModal, hideModal } from './uiSlice';

const rootReducer = combineReducers({
  messages: messagesReducer,
  channels: channelsReducer,
  ui: uiReducer,
});

export { addMessage, removeMessages };
export {
  addChannel, removeChannel, renameChannel, selectChannel,
};
export { showModal, hideModal };

export default rootReducer;
