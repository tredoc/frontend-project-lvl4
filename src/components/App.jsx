/* eslint react/prop-types: 0 */
import React from 'react';
import { connect } from 'react-redux';
import Channels from './Channels';
import Chat from './Chat';
import getModal from './modals';

const mapStateToProps = ({ ui }) => {
  const props = {
    showModal: ui.modal.show,
    modalType: ui.modal.type,
  };
  return props;
};

const App = ({ modalType, showModal }) => {
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

export default connect(mapStateToProps)(App);
