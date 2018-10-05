import React, { Component } from 'react';
import './App.css';
import { Calculator } from './components';

const containerStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '10%',
  width: '25%',
  margin: '0 auto'
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
