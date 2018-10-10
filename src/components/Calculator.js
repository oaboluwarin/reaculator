import React, { Component } from 'react';
import { CalculatorScreen, CalculatorBody } from '.';

const initialState = {
  onScreenInput: 0,
  inputHolder: [0, '', 0],
  computationResult: 0,
  inputOnOpKeyPress: 0,
  signClicked: false
}

const valueIsOperator = value => /^[-+*\/]$/.test(value); // eslint-disable-line

class Calculator extends Component {
  state = {...initialState}

  handleInputChange = (event) => {
    event.persist();

    let inputValue = event.target.value || event.target.innerHTML;
    if (event.target.innerHTML) {
      if (!isNaN(inputValue)) {
        const signClickedValue = this.state.onScreenInput + inputValue;
        this.handleSignClicked(signClickedValue, inputValue);
      }
      else {
        this.makeComputation();
        this.keepValues(inputValue);
        const { inputHolder, computationResult } = this.state;
        inputHolder[0] = computationResult;
        inputHolder[2] = 0;
        this.setState((state) => ({
          onScreenInput: state.computationResult,
          inputHolder
        }))
      }
    }

    if (event.target.value) {
      if (!isNaN(inputValue)) {
        this.handleSignClicked(inputValue, inputValue.slice(-1));
      } else {
        this.keepValues(inputValue);
        this.handleEqualitySignPress()
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
    const lastCharacterOfValue = value.slice(-1);
    if (valueIsOperator(lastCharacterOfValue)) {
      inputHolder[1] = lastCharacterOfValue;
    }
    if(!isNaN(value)) {
      inputHolder[2] = Number(value);
    }
    console.log('00000',inputHolder)
    this.setState(() => ({ inputHolder }));
  }

  makeComputation = () => {
    const { inputHolder, computationResult } = this.state;
    let operationResult = 0;
    console.log('=====>', inputHolder[1]);
    switch(inputHolder[1]) {
      case('+'):
      default:
        operationResult = Number(computationResult) + Number(inputHolder[2]);
        break;
      case('-'):
        if(computationResult){
          operationResult = Number(computationResult) - Number(inputHolder[2]);
        }
        else {
          operationResult = Number(inputHolder[2])
        }
        break;
      case('/'):
        operationResult = Number(computationResult) / Number(inputHolder[2]);
        break;
      case('*'):
        operationResult = Number(computationResult) * Number(inputHolder[2]);
        break;
    }
    this.setState(() => {
      return {
        signClicked: true,
        // onScreenInput: operationResult,
        computationResult: operationResult
      }
    })
  }

  handleEqualitySignPress = async () => {
    await this.makeComputation();
    const { inputHolder, computationResult } = this.state;
    inputHolder[0] = computationResult;
    inputHolder[2] = 0;
    this.setState((state) => ({
      onScreenInput: state.computationResult,
      inputHolder
    }));
  }

  resetInput = () => {
    this.setState(() => initialState);
  }

  render() {
    const {
      state: { onScreenInput },
      handleEqualitySignPress,
      handleInputChange,
      makeComputation,
      resetInput,
    } = this;

    return (
      <div>
        <CalculatorScreen
          value={onScreenInput}
          handleInputChange={handleInputChange}
        />
        <CalculatorBody
          handleInputChange={handleInputChange}
          makeComputation={makeComputation}
          handleEqualitySignPress={handleEqualitySignPress}
          resetInput={resetInput}
        />
      </div>
    );
  }
}

export default Calculator;
