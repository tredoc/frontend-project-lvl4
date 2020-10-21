import React from 'react'
import Channels from './channels'
import Chat from './chat'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import faker from 'faker'

const mapStateToProps = (state) => {
  const props = {
      userName: state.userName
  }
  return props
}

class App extends React.Component {

  componentDidMount = () => {
    const props = this.props
    const { dispatch } = props
    if (Cookies.get('userName')) {
      dispatch({type: 'SET_USER_NAME', payload: `${Cookies.get('userName')}`})
      return 
    } else {
      const fakeName = faker.name.findName()
    Cookies.set('userName', fakeName)
    dispatch({type: 'SET_USER_NAME', payload: `${Cookies.get('userName')}`})
    return
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="row h-100 pb-3">
          <Channels />
          <Chat />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)