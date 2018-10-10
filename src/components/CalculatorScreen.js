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

  // validateInput = value => /^(\d*\.)?\d*$/.test(value);


  // handleInputChange = (event) => {
  //   event.persist();
  //   let inputValue = event.target.value;
  //   if(inputValue.startsWith('0') && !inputValue.includes(".")) {
  //     inputValue = inputValue.substring(1);
  //   }
  //   if (this.validateInput(inputValue)) {
  //     this.setState(() => ({ value: inputValue }));
  //   }
  //   if(!inputValue) {
  //     this.setState(() => ({ value: 0 }));
  //   }
  // }

  render() {
    const {
      props: {
        handleInputChange,
        handleComputations,
        handleSpecialKeystrokes,
        // value
      }
    } = this;

    return (
      <div className="border">
        <input
          type="text"
          value={this.props.value}
          style={inputFieldStyle}
          onChange={handleInputChange}
          onKeyUp={handleSpecialKeystrokes}
        />
      </div>
    )
  }
}
