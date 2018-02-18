import React, { Component } from 'react';
import './App.css';
import ChatClient from './components/ChatClient';

class App extends Component {
  render() {
    return (
      <div className="app">
        <ChatClient />
      </div>
    );
  }
}

export default App;
