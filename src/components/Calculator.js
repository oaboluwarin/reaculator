import React, { Component } from 'react';
import { CalculatorScreen } from '.';
import CalculatorBody from './CalculatorBody';

class Calculator extends Component {
  render() {
    return (
      <div>
        <CalculatorScreen />
        <CalculatorBody />
      </div>
    );
  }
}

export default Calculator;
