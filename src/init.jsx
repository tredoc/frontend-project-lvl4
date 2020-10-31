// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import Cookies from 'js-cookie';
import faker from 'faker';

import App from './components/App';
import UserContext from './userContext';
import rootReducer, {
  addMessage, removeMessages, addChannel, removeChannel, renameChannel,
} from './slices';

const userName = Cookies.get('userName') || faker.name.findName();
Cookies.set('userName', userName);

const initApp = (initialData, socket) => {
  const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  });

  const { channels, currentChannelId, messages } = initialData;
  const initialState = {
    channels: {
      channelsList: channels,
      channelId: currentChannelId,
    },
    messages,
  };

  const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
  });

  socket.on('newMessage', ({ data: { attributes } }) => store.dispatch(addMessage(attributes)));
  socket.on('newChannel', ({ data: { attributes } }) => store.dispatch(addChannel(attributes)));
  socket.on('removeChannel', ({ data: { id } }) => {
    store.dispatch(removeChannel(id));
    store.dispatch(removeMessages(id));
  });
  socket.on('renameChannel', ({ data: { attributes } }) => store.dispatch(renameChannel(attributes)));

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={userName}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default initApp;
