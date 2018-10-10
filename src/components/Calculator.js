import React, { Component } from 'react';
import { CalculatorScreen, CalculatorBody } from '.';

const initialState = {
  onScreenInput: 0,
  inputHolder: [0, '+', 0],
  computationResult: 0,
  inputOnOpKeyPress: 0,
  signClicked: false
}

class Calculator extends Component {
  state = {...initialState}

  handleInputChange = (event) => {
    event.persist();

    let inputValue = event.target.value || event.target.innerHTML;
    if (event.target.innerHTML) {
      if (!isNaN(inputValue)) {
        const signClickedValue = this.state.onScreenInput + inputValue;
        this.handleSignClicked(signClickedValue, inputValue);
      } else {
        this.addInput();
      }
    }

    if (event.target.value) {
      if (!isNaN(inputValue)) {
        this.handleSignClicked(inputValue, inputValue.slice(-1));
      } else {
        this.addInput();
      }
    } else if (event.target.value === '') {
      this.resetInput();
    }
  }

  handleSignClicked = (signClickedValue, inputValue) => {
    const { signClicked } = this.state;
    if (!signClicked) {
      this.keepValues(signClickedValue);
      this.setState(() => ({
        onScreenInput: Number(signClickedValue),
      }))
    }
    if (signClicked) {
      this.keepValues(inputValue);
      this.setState(() => ({
        onScreenInput: Number(inputValue),
        signClicked: false
      }))
    }
  }

  keepValues = (value) => {
    const { inputHolder, computationResult } = this.state;
    inputHolder[0] = computationResult;
    if (isNaN(value)) {
      inputHolder[1] = value;
    } else {
      inputHolder[2] = Number(value);
    }
    this.setState(() => ({ inputHolder }));
  }

  addInput = () => {
    const { inputHolder, computationResult } = this.state;
    this.setState(() => {
      const additionResult = Number(computationResult) + Number(inputHolder[2]);
      return {
        signClicked: true,
        onScreenInput: additionResult,
        computationResult: additionResult
      }
    })
  }

  onEqualSignPress = () => {
    this.addInput();
    this.setState((state) => ({ onScreenInput: state.computationResult }));
  }

  resetInput = () => {
    this.setState(() => initialState);
  }

  render() {
    const {
      state: { onScreenInput },
      handleInputChange,
      resetInput,
      addInput,
      onEqualSignPress
    } = this;

    return (
      <div>
        <CalculatorScreen
          value={onScreenInput}
          handleInputChange={handleInputChange}
        />
        <CalculatorBody
          handleInputChange={handleInputChange}
          addInput={addInput}
          onEqualSignPress={onEqualSignPress}
          resetInput={resetInput}
        />
      </div>
    );
  }
}

export default Calculator;
