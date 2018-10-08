import React, { Component } from 'react';
import { CalculatorScreen } from '.';
import CalculatorBody from './CalculatorBody';

class Calculator extends Component {
  state = {
    onScreenInput: 0,
    inputHolder: [0, 0, 0],
    computationResult: 0
  }

  handleInputChange = (event) => {
    event.persist();
    const currValue = event.target.innerHTML || event.target.value;

    if(!isNaN(currValue)) {
      this.keepValues(this.state.onScreenInput + currValue)
      this.setState((state) => ({
        onScreenInput: Number(state.onScreenInput + currValue)
      }))
    } else {
      this.keepValues(currValue)
    }
    if (currValue === "+") {
      this.addInput()
    }
  }

  keepValues = (value) => {
    const { inputHolder, computationResult } = this.state;
    inputHolder[0] = computationResult
    if (isNaN(value)) {
      inputHolder[1] = value
    } else {
      inputHolder[2] = Number(value)
    }
    this.setState(() => ({ inputHolder }))
  }

  addInput = () => {
    const { inputHolder, computationResult } = this.state;
    console.log(inputHolder, computationResult)
    this.setState(() => {
      const additionResult = computationResult + inputHolder[2];
      return {
        onScreenInput: additionResult,
        computationResult: additionResult
      }
    })
    // this.setState((state) => ({ onScreenInput: state.computationResult }))
  }

  onEqualSignPress = () => {
    this.addInput()
    this.setState((state) => ({ onScreenInput: state.computationResult }))
  }

  render() {
    const {
      state: { onScreenInput },
      handleInputChange,
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
        />
      </div>
    );
  }
}

export default Calculator;
