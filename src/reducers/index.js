import { combineReducers } from 'redux'
import _ from 'lodash'
const messages = (state = {}, action) => {

  if (action.type === 'ADD_MESSAGE') {
    const addedMessage = action.payload
    return [...state, addedMessage]
  } else {console.log(action)
    return state
  }
}
const channels = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CHANNEL':
      return [...state, action.payload]
    case 'REMOVE_CHANNEL':
      return state.filter(channel => channel.id !== action.payload)
    case 'RENAME_CHANNEL':
      const newState = [...state]
      newState.find(c => c.id === action.payload.id).name = action.payload.name
      return newState
    default:
      return state
  }
}

const currentChannelId = (state = '', action) => {
  if (action.type === 'SELECT_CHANNEL') {
    return action.payload
  }
  return state
}

const userName = (state = '', action) => {
  if (action.type === 'SET_USER_NAME') {
    return action.payload
  }
  return state
}

const rootReducer = combineReducers({
  messages,
  channels,
  currentChannelId,
  userName
}) 

export default rootReducer