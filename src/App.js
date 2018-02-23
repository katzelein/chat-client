import React, { Component } from 'react';
import ChatClient from './components/ChatClient';
import USER_MODE from './constants';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="interface">
          <ChatClient mode={USER_MODE.sender} />
          <ChatClient mode={USER_MODE.receiver} />
        </div>
      </div>
    );
  }
}

export default App;
