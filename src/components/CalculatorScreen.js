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
  state = {
    value: 0
  }

  validateInput = (value) => {
    return /^[0-9]*\.?[0-9]+$/.test(value);
  }

  handleInputChange = (event) => {
    event.persist();
    let inputValue = event.target.value;
    if(inputValue.startsWith('0')) {
      inputValue = inputValue.substring(1);
    }
    if (this.validateInput(inputValue)) {
      this.setState(() => ({ value: inputValue }));
    } else {
      return;
    }
  }

  handleKeyPress = (event) => {
    const { target: { value }, keyCode } = event;
    if (value.length === 1 && keyCode === 8) {
      this.setState(() => ({ value: 0 }));
    }
  }

  render() {
    const {
      state: { value },
      handleInputChange,
      handleKeyPress,
    } = this;

    return (
      <div className="border">
        <input
          type="text"
          value={value}
          style={inputFieldStyle}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
      </div>
    )
  }
}
