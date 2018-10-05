import React, { Component } from 'react';
import './App.css';
import { Calculator } from './components';

const containerStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 200
}

class App extends Component {
  render() {
    return (
      <div className="App" style={containerStyle}>
        <Calculator />
      </div>
    );
  }
}

export default App;
