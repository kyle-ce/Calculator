const calculator ={
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};


updateScreen();

const buttons = document.querySelector('.buttons');

//--- EVENT LISTENER ---
buttons.addEventListener('click', (e) => {
  
  //get button clicked
  const {target} = event;
  const {value} = target;
  console.log(target, value);
 
  //exit if target is not button
  if(!target.matches('button')){
    console.log('exit gracefullly.')
    return;
  }
  
  switch(value){
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'AC':
      resetCalculator();
      break;
    case '+/-':
    case '%':
      console.log(value);
      break;
    default:
      if(Number.isInteger(parseFloat(value))){
        inputDigit(value);
      }
      
  }
  updateScreen();

})

function updateScreen(){
  const screen = document.querySelector('.screen');
  screen.value = calculator.displayValue;
}

function inputDigit(digit){
  const {displayValue, waitingForSecondOperand} = calculator;
  
  //sets second operand
  if(waitingForSecondOperand){
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
    
    //removes leading zero from display
  } else {calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;}
  
  console.log(calculator);
}

function inputDecimal(dot){
  //if user appends decimal after operator
  //append 0. to display and concat user input
  if(calculator.waitingForSecondOperand === true){
    calculator.displayValue = '0.';
    calculator.waitingForSecondOperand = false;
    return;
  }
  if(!calculator.displayValue.includes(dot)){
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator){
  const {firstOperand, displayValue, operator} = calculator;
  const inputValue = parseFloat(displayValue);
  
  //Operator entered when expecting secondOperand
  //changes calculator.operator to nextOperator for calculation 
  if(operator && calculator.waitingForSecondOperand){
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }
  
  //set firstOperand to displayValue
  if(firstOperand === null && !isNaN(inputValue)){
    calculator.firstOperand = inputValue;
    
//--- OPERATOR CHANING ---   
    //first-operand and operator already supplied 
    //calculate {firstOperand} {operator} {secondOperand}
  } else if(operator) {
    const result = calculate(firstOperand, inputValue, operator);
    
    calculator.displayValue = String(result);
    //sets firstOperand to result for chaining operations
    calculator.firstOperand = result;
  }
  //operator set waiting for secondOperand
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
  
}

function calculate(firstOperand, secondOperand, operator){
  switch(operator){
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '*':
      return firstOperand * secondOperand;
    case '/': 
      return firstOperand / secondOperand;
    defalut:
      //equals operator 
      return secondOperand;
  }
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}