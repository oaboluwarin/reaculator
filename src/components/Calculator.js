import React, { Component } from 'react';
import { CalculatorScreen } from '.';
import CalculatorBody from './CalculatorBody';

class Calculator extends Component {
  state = {
    onScreenInput: 0,
    inputHolder: [0, '+', 0],
    computationResult: 0,
    inputOnOpKeyPress: 0,
    signClicked: false
  }

  handleInputChange = (event) => {
    event.persist();

    let inputValue = Number(event.target.value) || event.target.innerHTML;
    if (event.target.innerHTML) {
      if (!isNaN(inputValue)) {
        if (!this.state.signClicked) {
          this.keepValues(this.state.onScreenInput + inputValue)
          this.setState(() => ({
            onScreenInput: Number(this.state.onScreenInput + inputValue),
          }))
        }
        // if (this.state.signClicked) {
        //   console.log('----111111', inputValue)
        //   this.keepValues(inputValue)
        //   this.setState(() => ({
        //     onScreenInput: Number(inputValue),
        //     signClicked: false
        //   }))
        // }
      } else {
        this.keepValues(inputValue)
        this.addInput()
      }
    }

    if (event.target.value) {
      console.log('TARGETVALUE')
      if (inputValue && !isNaN(inputValue)) {
        if (!this.state.signClicked) {
          console.log('============' , inputValue)
          this.keepValues(inputValue)
          this.setState(() => ({
            onScreenInput: inputValue,
          }))
        }
        // if (this.state.signClicked) {
        //   console.log('----111111', inputValue)
        //   this.keepValues(inputValue)
        //   this.setState(() => ({
        //     onScreenInput: Number(inputValue),
        //     signClicked: false
        //   }))
        // }
      } else if (!inputValue) {
        console.log('do nothing, odebi')
      } else {
        this.keepValues(inputValue)
        this.addInput()
      }
    } else if(event.target.value === '') {
      this.setState(() => ({ onScreenInput: 0 }));
    }
    // if(!inputValue) {
    //   this.setState(() => ({ onScreenInput: 0, computationResult: 0 }));
    // }
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

    this.setState(() => {
      const additionResult = Number(computationResult) + Number(inputHolder[2]);
      return {
        signClicked: true,
        // onScreenInput: additionResult,
        computationResult: additionResult
      }
    })
    this.setState((state) => ({ onScreenInput: state.computationResult }))
  }

  onEqualSignPress = () => {
    this.addInput()
    this.setState((state) => ({ onScreenInput: state.computationResult }))
  }

  handleSpecialKeystrokes = (event) => {
    const { keyCode } = event;
    if (keyCode === 8) {
      if (this.state.onScreenInput.length === 1) {
        this.setState(() => ({
          onScreenInput: 0
        }))
      } else {
        const newDisplayedInput = String(this.state.onScreenInput).slice(0, -1)
        console.log(newDisplayedInput, '========')
        this.setState(() => {
          return {
            onScreenInput: newDisplayedInput
          }
        })
      }
    }
  }

  render() {
    const {
      state: { onScreenInput },
      handleInputChange,
      handleSpecialKeystrokes,
      addInput,
      onEqualSignPress
    } = this;

    return (
      <div>
        <CalculatorScreen
          value={onScreenInput}
          handleInputChange={handleInputChange}
          // handleSpecialKeystrokes={handleSpecialKeystrokes}
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
