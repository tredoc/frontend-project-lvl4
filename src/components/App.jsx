/* eslint react/prop-types: 0 */
import React from 'react';
import { useSelector } from 'react-redux';
import Channels from './Channels';
import Chat from './Chat';
import getModal from './modals';

const App = () => {
  const { show: showModal, type: modalType } = useSelector(({ ui }) => ui.modal);
  const Modal = getModal(modalType);

  return (
    <>
      {showModal && <Modal />}
      <div className="row h-100 pb-3">
        <Channels />
        <Chat />
      </div>
    </>
  );
};

export default App;
