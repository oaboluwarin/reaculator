import React, { Component } from 'react';
import { CalculatorScreen, CalculatorBody } from '.';

const initialState = {
  onScreenInput: 0,
  inputHolder: [0, '', 0],
  computationResult: 0,
  signClicked: false,
  equalitySignHasBeenPressed: false,
}

const valueIsOperator = value => /^[-+÷*x\/]$/.test(value); // eslint-disable-line
const operatorIsMultDiv = value => /^[÷*x\/]$/.test(value); // eslint-disable-line
const operatorIsBasic = value => /^[+-]$/.test(value); // eslint-disable-line
const keyboardOperator = value => /^[-+÷*\/]$/.test(value); // eslint-disable-line

class Calculator extends Component {
  state = {...initialState}

  handleInputChange = async (event) => {
    event.persist();
    let inputValue = event.target.value || event.target.innerHTML;

    if (event.target.innerHTML) {
      if (!isNaN(inputValue)) {
        const inputDisplayed = this.state.onScreenInput + inputValue;

        const { signClicked } = this.state;
        const onDisplay = signClicked ? inputValue : inputDisplayed;
        this.keepValues(onDisplay);
        this.setDisplayedScreenInput(onDisplay);
      }
      else {
        await this.makeComputation(event.target.innerHTML);
        this.keepValues(inputValue);
        const { inputHolder, computationResult } = this.state;
        inputHolder[0] = computationResult;
        operatorIsBasic(inputValue) ? inputHolder[2] = 0 : inputHolder[2] = 1;
        this.setState((state) => ({
          onScreenInput: state.computationResult,
          inputHolder
        }))
      }
    }

    if (event.target.value) {
      const keyboardInputValue = isNaN(inputValue) ? inputValue.slice(-1) : inputValue;
      if (isNaN(inputValue) && keyboardOperator(keyboardInputValue)) {
        this.handleSignClicked(keyboardInputValue, keyboardInputValue);
      } else {
        this.keepValues(keyboardInputValue);
      }
    } else if (event.target.value === '') {
      this.resetInput();
    }
    console.log(this.state.inputHolder)
  }

  setDisplayedScreenInput = value => this.setState(() => ({ onScreenInput: Number(value)}));

  handleSignClicked = (valueOnScreen, mostRecentCharacter) => {
    // To remove
    const { signClicked } = this.state;
    if (signClicked) {
      this.keepValues(mostRecentCharacter);
      this.setState(() => ({
        onScreenInput: Number(mostRecentCharacter),
        signClicked: false
      }))
    }
  }

  keepValues = value => {
    const { inputHolder, computationResult } = this.state;
    inputHolder[0] = computationResult;
    const mostRecentCharacter = value.slice(-1);
    if (valueIsOperator(mostRecentCharacter)) {
      inputHolder[1] = mostRecentCharacter;
    }
    if(!isNaN(value)) {
      inputHolder[2] = Number(value);
    }
    this.setState(() => ({ inputHolder }));
  }

  makeComputation = (currentOperator) => {
    let operationResult = 0;
    if (currentOperator !== '=' && this.state.equalitySignHasBeenPressed) {
      const { inputHolder } = this.state;
      if (operatorIsMultDiv(currentOperator)) {
        inputHolder[2] = 1;
      } else if (operatorIsBasic(currentOperator)) {
        inputHolder[2] = 0;
      }
      inputHolder[1] = currentOperator;
      this.setState(() => ({ inputHolder }))
    }

    const { inputHolder, computationResult } = this.state;

    switch(inputHolder[1]) {
      case('+'):
        operationResult = Number(computationResult) + Number(inputHolder[2]);
        break;
      case('-'):
        computationResult ? operationResult = Number(computationResult) - Number(inputHolder[2]) : operationResult = Number(inputHolder[2]);
        break;
      case('/'):
      case('÷'):
        computationResult ? operationResult = Number(computationResult) / Number(inputHolder[2]) : operationResult = Number(inputHolder[2]);
        break;
      case('*'):
      case('x'):
        computationResult ? operationResult = Number(computationResult) * Number(inputHolder[2]) : operationResult = Number(inputHolder[2]);
        break;
      default:
        operationResult = Number(inputHolder[2]);
        break;
    }
    console.log('===========', operationResult)
    this.setState(() => {
      return {
        signClicked: true,
        computationResult: operationResult,
      }
    });
  }

  handleEqualitySignPress = async (event) => {
    event.persist();
    await this.setState(() => ({ equalitySignHasBeenPressed: true }))
    await this.makeComputation(event.target.innerHTML);
    const { inputHolder, computationResult } = this.state;
    inputHolder[0] = computationResult;
    this.setState((state) => ({
      onScreenInput: state.computationResult,
      inputHolder,
    }));
  }

  resetInput = () => {
    this.setState(() => initialState);
  }

  toggleDisplayedInputSign = () => {
    const { onScreenInput, inputHolder } = this.state;
    const newScreenInput = (-onScreenInput);
    inputHolder[2] = newScreenInput
    this.setState(() => ({
      onScreenInput: newScreenInput,
      inputHolder
    }));
  }

  convertToPercentage = () => {
    const { onScreenInput, inputHolder } = this.state;
    const newScreenInput = onScreenInput / 100;
    inputHolder[2] = newScreenInput
    this.setState(() => ({
      onScreenInput: (onScreenInput / 100),
      inputHolder
    }));
  }

  render() {
    const {
      state: { onScreenInput },
      convertToPercentage,
      handleEqualitySignPress,
      handleInputChange,
      makeComputation,
      resetInput,
      toggleDisplayedInputSign,
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
          convertToPercentage={convertToPercentage}
          toggleDisplayedInputSign={toggleDisplayedInputSign}
        />
      </div>
    );
  }
}

export default Calculator;
