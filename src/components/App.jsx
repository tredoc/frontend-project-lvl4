import React from 'react'
import Channels from './Channels'
import Chat from './Chat'
import { connect } from 'react-redux'
import getModal from '../modals'



const mapStateToProps = (state) => {
  const props = {
      showModal: state.ui.modal.show,
      modalType: state.ui.modal.type
  }
  return props
}

class App extends React.Component {

  render() {
    const { modalType, showModal } = this.props
    const Modal = getModal(modalType)
    return (
      <>
        {showModal && <Modal />}
        <div className="row h-100 pb-3">
          <Channels />
          <Chat />
        </div>
      </>
    )
  }
}

export default connect(mapStateToProps)(App)