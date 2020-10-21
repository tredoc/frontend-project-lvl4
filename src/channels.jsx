import React from 'react'
import {connect} from 'react-redux'
import cn from 'classnames'
import axios from 'axios'
import _ from 'lodash'

const mapStateToProps = (state) => {
    console.log(state)
    const props = {
        channels: state.channels,
        channelId: state.currentChannelId
    }
    return props
}

const Channels = (props) => {
    const { dispatch, channelId } = props
    
    const chatSelectHandler = (id) => {
        dispatch({type: 'SELECT_CHANNEL', payload: id})
    }

    const addChannelHandler = () => {
        const channelName =  prompt("Как назовем ?")
        axios.post('/api/v1/channels', {
            data: {
                type: 'channels',
                id: props.channelId + 1,
                attributes: {name: channelName, removable: true},
              }
        })
    }
    
    const renameHandler = (id) => {
        const channelName =  prompt("Ну и на что переименуем ?")
        axios.patch(`/api/v1/channels/${id}`, {
            data: {
                type: 'channels',
                id: props.channelId + 1,
                attributes: {
                  name: channelName
                },
              }
        })
    }

    const deleteHandler = (id) => {
        axios.delete(`/api/v1/channels/${id}`, {
            data: {
                id: id
            }
        })
    } 

    const getClassNames = (id) => {
        if (id === channelId) {
            return cn({
                ['d-flex']: true,
                ['justify-content-between']: true,
                ['nav-link']: true,
                ['btn-block']: true,
                ['mb-2']: true,
                ['text-left']: true, 
                ['btn']: true,
                ['btn-primary']: true
            })
        } else {
            return cn({
                ['d-flex']: true,
                ['justify-content-between']: true,
                ['nav-link']: true,
                ['btn-block']: true,
                ['mb-2']: true,
                ['text-left']: true, 
                ['btn']: true,
                ['btn-light']: true
            })
        }
    }

    const channels = props.channels.map(c => <li onClick={() => chatSelectHandler(c.id)} className={getClassNames(c.id)} key={c.id}>
        {c.name}{c.removable ? <div><span onClick={() => renameHandler(c.id)}> R </span> <span onClick={() => deleteHandler(c.id)}> D </span> </div>: null}</li>)

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
