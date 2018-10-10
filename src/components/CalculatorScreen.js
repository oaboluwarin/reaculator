import React, { Component } from 'react';
import '../App.css';

const inputFieldStyle = {
  height: '70px',
  fontSize: '50px',
  color: 'white',
  width: '98%',
  backgroundColor: '#6b6b6b',
  textAlign: 'right',
}

export default class CalculatorScreen extends Component {

  render() {
    const {
      props: {
        handleInputChange,
        handleComputations,
        handleSpecialKeystrokes,
        value
      }
    } = this;

    return (
      <div className="border">
        <input
          type="text"
          value={value}
          style={inputFieldStyle}
          onChange={handleInputChange}
          onKeyUp={handleSpecialKeystrokes}
        />
      </div>
    )
  }
}
