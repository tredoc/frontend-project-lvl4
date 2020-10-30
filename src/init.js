// @ts-check
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import UserContext from './userContext'

import { addMessage, removeMessages } from './slices/messagesSlice'
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice'

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import rootReducer from './reducers';
import io from 'socket.io-client';

import gon from 'gon';

import Cookies from 'js-cookie'
import faker from 'faker'

const getName = () => {
    const userName = Cookies.get('userName')
    if (userName) {
        return userName
    } 
    const fakeName = faker.name.findName()
    Cookies.set('userName', fakeName)
    return Cookies.get('userName')
}

const initApp = () => {

    const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
    });

    const initialState = {
        channels: {
            channelsList: gon.channels,
            channelId: gon.currentChannelId
        },
        messages: gon.messages
    }

    const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState
    });

    if (process.env.NODE_ENV !== 'production') {
        localStorage.debug = 'chat:*';
    }

    console.log('gon', gon);

    const socket = io()

    socket.on('connect', () => console.log('connected to socket!!!'));

    socket.on('newMessage', ({ data: {attributes}}) => store.dispatch(addMessage(attributes)))
    socket.on('newChannel', ({ data: {attributes}}) => store.dispatch(addChannel(attributes)))
    socket.on('removeChannel', ({data: { id }}) => { 
            store.dispatch(removeChannel(id))
            store.dispatch(removeMessages(id))
        }
    )
    socket.on('renameChannel', ({data: { attributes }}) => store.dispatch(renameChannel(attributes)))

    ReactDOM.render (
        <Provider store={store}>
            <UserContext.Provider value={getName()}>
                <App />
            </UserContext.Provider>
        </Provider>,
        document.getElementById('chat')
    )
}

export default initApp

