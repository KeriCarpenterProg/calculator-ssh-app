import React from 'react';

class CreateButton extends React.Component {
  render(){
  return <button class={this.props.number[0]} onClick={() => this.props.onClickHandler(this.props.number[2])} data-number>{this.props.number[2]}</button>;
  }
  }

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.currentOperand = '';
    this.previousOperand = '';
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  updateDisplay() {
    document.querySelector(".current-operand").innerText = 
    this.getDisplayNumber(this.currentOperand);
    if(this.operation != null){
        document.querySelector(".previous-operand").innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      document.querySelector(".previous-operand").innerText = ''; 
    }
  }

  getDisplayNumber(number){
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.'));
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay
    if(isNaN(integerDigits)) {
        integerDisplay = ''
    } else {
        integerDisplay = integerDigits.toLocaleString('en', {
         maximumFractionDigits: 0   
        })
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay;
    }
  }

  delete() {
  this.currentOperand = this.currentOperand.toString().slice(0,-1);
  }
  
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    // console.log("Previous Number is "+ this.previousOperand);
    // console.log("Current Operand is "+ this.currentOperand);
    const curr = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(curr)) return;
    switch(this.operation) {
        case '+':
            computation = prev + curr;
            break;
        case '-':
            computation = prev - curr;
            break;
        case '*':
            computation = prev * curr;
            break;
        case '%':
            computation = prev / curr;
            break;
        default:
            return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
    // console.log("The value of computation is " + computation);
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
        this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  appendNumber(number) {
    // if(wasEqual === true) {
    //     this.currentOperand = '';
    //     wasEqual = false;
    // }
    if(number === '.' && this.currentOperand.includes('.')) return;
    if(isNaN(this.currentOperand)) 
    { 
            this.currentOperand = number.toString();
    } else this.currentOperand = this.currentOperand.toString() + number.toString();
    }

  onClickHandler(theButton){
    // console.log("It made it in to onClickHandler.  The parameter value is ",theButton);
    switch(theButton){
      case "AC":
          this.clear();
          this.updateDisplay();
          break;
      case "DEL":
          this.delete();
          this.updateDisplay();
          break;
      case "=":
      default:
          this.compute();
          this.updateDisplay();
          // This is a hack I used because the numbers weren't clearing after equals.
          // wasEqual = true;
          this.currentOperand = '';
          this.previousOperand = '';
          this.operation = undefined;
          break;
      case "%":
      case "*":
      case "+":
      case "-":
          this.chooseOperation(theButton);
          this.updateDisplay();
          break;
      case ".":
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 0:
          this.appendNumber(theButton);
          this.updateDisplay();
          break;
  }
  }


  render() {
    const printButtons = 
    [
        ['span-two','data-all-clear','AC'],
        [null,'data-delete','DEL'],
        [null,'data-operation','%'],
        [null,'data-number',1],
        [null,'data-number',2], 
        [null,'data-number',3], 
        [null,'data-operation','*'],
        [null,'data-number',4],
        [null,'data-number',5], 
        [null,'data-number',6], 
        [null,'data-operation','+'],
        [null,'data-number',7],
        [null,'data-number',8], 
        [null,'data-number',9], 
        [null,'data-operation','-'],
        [null,'data-operation','.'], 
        [null,'data-number',0], 
        ['span-two', 'data-equals', "="],
    ];

    return(
    <div>
    <IntroText />
    <div className='onecolumnwrapper'>
      <div className="calculator-grid">
        <Output />
        {printButtons.map((number) =>{
          return (
            <CreateButton number={number} onClickHandler={this.onClickHandler} />
          )
        
        })}
      </div>
    </div>
    </div>
    )
  }

}

class IntroText extends React.Component{
	render(){
		return(
      <div>
			    <h1>Calculator refactored into React</h1>
          <p>Goal:  Refactor <a href="https://kericarpenterprog.github.io/my-app/calculator.html">my existing javascript calculator </a> into a React app.</p>
          <h5>I did this in Summer 2022 with Kevin Chan, my tutor's help to improve my React skills.</h5>
      </div>
		);
	}
};

class Output extends React.Component{
	render(){
		return(
			<div className='output'>
          <div className='previous-operand' data-previous-operand></div>
          <div className='current-operand' data-current-operand></div>
      </div>
		);
	}
};

export default Calculator;
