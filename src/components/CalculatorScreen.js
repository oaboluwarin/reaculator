import React, { Component } from 'react';

const inputFieldStyle = {
  height: '70px',
  width: '350px',
  fontSize: '50px',
  color: 'white',
  backgroundColor: '#6b6b6b',
  textAlign: 'right',
}

export default class CalculatorScreen extends Component {
  state = {
    value: ''
  }

  validateInput = (value) => {
    return /^[0-9]*\.?[0-9]+$/.test(value);
  }

  handleInputChange = (event) => {
    event.persist();
    event.preventDefault();
    const inputValue = event.target.value;
    if (this.validateInput(inputValue)) {
      this.setState(() => ({ value: inputValue }));
    } else {
      return;
    }
  }

  render() {
    const {
      state: { value },
      handleInputChange,
    } = this;

    return (
      <input
        type="text"
        value={value}
        style={inputFieldStyle}
        onChange={handleInputChange}
      />
    )
  }
}
