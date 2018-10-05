import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CalculatorBody from './components/CalculatorBody';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CalculatorBody />
      </div>
    );
  }
}

export default App;
