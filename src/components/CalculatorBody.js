import React, { Component } from 'react';
import '../App.css';

class CalculatorBody extends Component {
  render() {
    const {
      onEqualSignPress,
      addInput,
      handleInputChange,
    } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col">
            <p className="button border-left">C</p>
            <p onClick={handleInputChange} className="button border-left">7</p>
            <p onClick={handleInputChange} className="button border-left">4</p>
            <p className="button border-left">1</p>
          </div>
          <div className="col">
            <p className="button"><span>&#177;</span></p>
            <p onClick={handleInputChange} className="button">8</p>
            <p onClick={handleInputChange} className="button">5</p>
            <p onClick={handleInputChange} className="button">2</p>
          </div>
          <div className="col">
            <p onClick={handleInputChange} className="button">%</p>
            <p onClick={handleInputChange} className="button">9</p>
            <p onClick={handleInputChange} className="button">6</p>
            <p onClick={handleInputChange} className="button">3</p>
          </div>
          <div className="col calc">
            <p className="button"><span>&#247;</span></p>
            <p className="button">x</p>
            <p className="button">-</p>
            <p onClick={handleInputChange} className="button">+</p>
          </div>
        </div>
        <div className="row">
          <p className="bottom-layer no-border border-left">0</p>
          <p className="bottom-layer"></p>
          <p className="bottom-layer">.</p>
          <p onClick={onEqualSignPress} className="bottom-layer bg-yellow">=</p>
        </div>
      </div>
    );
  }
}

export default CalculatorBody;
