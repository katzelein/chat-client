import React, { Component } from 'react';
import './App.css';
import ChatClient from './components/ChatClient';

class App extends Component {
  render() {
    return (
      <div className="app">
        <ChatClient userId={1}/>
        <ChatClient userId={2}/>
      </div>
    );
  }
}

export default App;
