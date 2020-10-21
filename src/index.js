// @ts-check
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import rootReducer from './reducers';
import io from 'socket.io-client';

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

import gon from 'gon';

const initialState = {
  channels: gon.channels,
  currentChannelId: gon.currentChannelId,
  messages: gon.messages
}

const store = configureStore({
 reducer: rootReducer,
 middleware,
 devTools: process.env.NODE_ENV !== 'production',
 preloadedState: initialState
});

// import faker from 'faker';
// import cookies from 'js-cookie';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('gon', gon);

const socket = io()

socket.on('connect', () => console.log('connected to socket!!!'));
socket.on('newMessage', ({ data: {attributes}}) => store.dispatch({ type: 'ADD_MESSAGE', payload: attributes}))
socket.on('newChannel', ({ data: {attributes}}) => store.dispatch({ type: 'ADD_CHANNEL', payload: attributes}))
socket.on('removeChannel', ({data: { id }}) => store.dispatch({ type: 'REMOVE_CHANNEL', payload: id}))
socket.on('renameChannel', ({data: { attributes }}) => store.dispatch({ type: 'RENAME_CHANNEL', payload: attributes}))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat')
 )
