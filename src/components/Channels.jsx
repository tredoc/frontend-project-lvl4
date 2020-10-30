import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import cn from 'classnames'
import _ from 'lodash'

import { showModal } from '../slices/uiSlice'

import { selectChannel } from '../slices/channelsSlice'
import { ButtonGroup, Dropdown, Button } from 'react-bootstrap'

const mapStateToProps = (state) => {
    const props = {
        channelsList: state.channels.channelsList,
        channelId: state.channels.channelId,
        showModal: state.ui.showModal
    }
    return props
}

const Channels = (props) => {
    const { dispatch, channelId, channelsList } = props
    
    const chatSelectHandler = (id) => {
        dispatch(selectChannel(id))
    }

    const addChannelHandler = () => {
        dispatch(showModal({modalType: 'adding'}))
    }
    
    const renameHandler = (id) => {
        dispatch(showModal({modalType: 'renaming', extra: id}))
    }

    const deleteHandler = (id) => {
        dispatch(showModal({modalType: 'removing', extra: id}))
    } 

    const channels = channelsList.map(c => {
        if (!c.removable) {
            return (
                <li key={c.id} className="w-100"> 
                    <Button 
                        onClick={() => chatSelectHandler(c.id)} 
                        className="w-100 mb-1" 
                        variant={c.id === channelId ? 'primary' : 'light'}>
                            {c.name}
                    </Button>
                </li>
            )
        } 
        return (   
            <li key={c.id} className="w-100"> 
                <Dropdown as={ButtonGroup} className="mb-1 w-100">
                <Button onClick={() => chatSelectHandler(c.id)} className="w-100" variant={c.id === channelId ? 'primary' : 'light'}>{c.name}</Button>
                
                <Dropdown.Toggle split variant="light" id="dropdown-split-basic"/>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => renameHandler(c.id)}>Rename</Dropdown.Item>
                        <Dropdown.Item onClick={() => deleteHandler(c.id)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </li>
        ) 
    })

    return (
        <div className="mr-3 col-3 border-right">
            <div className="d-flex justify-content-between">
                <h3>Channels</h3>
                <button onClick={addChannelHandler} className="btn btn-link">+</button>
            </div>

            <ul className="nav flex-column">
                {channels}
            </ul>
        </div>
    )
}

export default connect(mapStateToProps)(Channels)
