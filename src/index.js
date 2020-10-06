// @ts-check
import React from 'react'
import ReactDOM from 'react-dom'

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);

class App extends React.Component {
  state = this.props.gon

  render() {
    const channels = this.state.channels.map(c => <li key={c.id}>{c.name}</li>)
    return (
      <ul> 
        {channels}
      </ul>
    )
  }
}

ReactDOM.render(<App gon={gon} />, document.getElementById('chat'))
