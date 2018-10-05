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

  preventLetterInput = (value) => {
    return /[a-z]/i.test(value);
  }

  handleInputChange = (event) => {
    event.persist();
    event.preventDefault();
    const inputValue = event.target.value;
    if (this.preventLetterInput(inputValue)) {
      return;
    } else {
      this.setState(() => ({ value: inputValue }));
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
