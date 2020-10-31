/* eslint-disable */
import Rollbar from 'rollbar';
import io from 'socket.io-client';
import gon from 'gon';
import initApp from './init';

if (process.env.NODE_ENV === 'production') {
  const rollbar = new Rollbar({
    accessToken: 'd21a4c883215415fa5b7faa6e020ea5b',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
  rollbar.log('Rollbar connected');
}

const socket = io();

initApp(gon, socket);
