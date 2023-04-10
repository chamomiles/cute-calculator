window.onload = function() {
  addHTMLandCSS();
  addFunctionalityToButtons();
}

const state = {
  mode: 'off',
  decimal: false,
  value: 0,
  valueOther: 0,
  displayValue: 0
}


function addHTMLandCSS() {

  // Main
  const body = document.querySelector('body');
  const main = document.createElement('main');
  document.body.appendChild(main);
  
  body.style.background = 'url(clouds.jpg)';
  body.style.backgroundSize = '200%';

  // to have buttons not move relative to the img
  body.style.display = 'flex';
  body.style.justifyContent = 'center';
  main.style.position = 'relative';
  main.style.height = '100vh';


  // Image
  const img = document.createElement('img');
  main.appendChild(img);
  img.setAttribute('src', 'cute-calculator.png');
  
  img.style.display = 'block';
  img.style.maxWidth = '100%';
  img.style.maxHeight = '90vh';
  img.style.margin = '5vh auto';

  // To disable selection & image dragging
  img.style.pointerEvents = 'none';
  body.style.userSelect = 'none';


  // Buttons
  addButtons();
  
  const buttons = Array.from(document.querySelectorAll('button'));

  const buttonStyles = {
    position: 'absolute',
    width: '6.5%',
    height: '3.9%',
    opacity: '0',
    borderRadius: '50%',
    border: 'none'
  }
  
  buttons.forEach( button => {
    button.setAttribute('type', 'button');
    Object.assign(button.style, buttonStyles)
  });

  // Value
  const valueField = document.createElement('span');
  main.appendChild(valueField);
  valueField.setAttribute('id', 'value-field');

  const valueFieldStyles = {
    // Box
    position: 'absolute',
    left: '31.2%',
    bottom: '52.6%',
    width: '35.2%',
    height: '4.7%',
    transform: 'rotate(-0.8deg)',
    borderRadius: '3px',
    border: 'none',

    // Text
    fontFamily: 'Calculator',
    fontSize: '24px',
    color: 'rgba(35, 35, 35, 1)',
    filter: 'blur(0.8px)',
    paddingTop: '3px',
    paddingRight: '7px',
    textAlign: 'right'
  }

  Object.assign(valueField.style, valueFieldStyles);

  // Mode Indicator

  const modeIndicator = document.createElement('span');
  main.appendChild(modeIndicator);
  modeIndicator.setAttribute('id', 'mode-indicator');
  
  const modeIndicatorStyles = {
    // Box
    position: 'absolute',
    left: '33%',
    bottom: '54.5%',
    width: '5.2%',
    height: '3.1%',
    border: 'none',
    
    // Text
    fontFamily: 'Arial',
    fontSize: '35px',
    color: 'rgba(60, 60, 60, 1)',
    filter: 'blur(0.8px)'
  }
  
  Object.assign(modeIndicator.style, modeIndicatorStyles);

}

function addFunctionalityToButtons() {
  document.querySelector('#percent').addEventListener('click', percentButton);
  document.querySelector('#seven').addEventListener('click', function() { numberButton(7); });
  document.querySelector('#four').addEventListener('click', function() { numberButton(4); });
  document.querySelector('#one').addEventListener('click', function() { numberButton(1); });
  document.querySelector('#zero').addEventListener('click', function() { numberButton(0); });
  document.querySelector('#root').addEventListener('click', rootButton);
  document.querySelector('#eight').addEventListener('click', function() { numberButton(8); });
  document.querySelector('#five').addEventListener('click', function() { numberButton(5); });
  document.querySelector('#two').addEventListener('click', function() { numberButton(2); });
  document.querySelector('#dot').addEventListener('click', dotButton);
  document.querySelector('#ce').addEventListener('click', ceButton);
  document.querySelector('#nine').addEventListener('click', function() { numberButton(9); });
  document.querySelector('#six').addEventListener('click', function() { numberButton(6); });
  document.querySelector('#three').addEventListener('click', function() { numberButton(3); });
  document.querySelector('#equals').addEventListener('click', equalsButton);
  document.querySelector('#on').addEventListener('click', onButton);
  document.querySelector('#divide').addEventListener('click', divideButton);
  document.querySelector('#multiply').addEventListener('click', multiplyButton);
  document.querySelector('#subtract').addEventListener('click', subtractButton);
  document.querySelector('#add').addEventListener('click', addButton); 
}

function addButtons() {
  // Array of button names to assign to them in the loop
  const buttonNames = ['percent', 'seven', 'four', 'one', 'zero', 'root', 'eight', 'five', 'two', 'dot', 'ce', 'nine', 'six', 'three', 'equals', 'on', 'divide', 'multiply', 'subtract', 'add'];

  const main = document.querySelector('main');
  
  let counter = 0;
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j<= 4; j++) {
      const newButton = document.createElement('button');
      main.appendChild(newButton);

      newButton.style.left = `${30 + 10.9*i}%`;
      newButton.style.bottom = `${42.5 + -5.85*j}%`;

      newButton.setAttribute('id', `${buttonNames[counter]}`);
      counter++;
    }
  }
}




// Calculator Button Functions


// State Buttons

function onButton() {
  if (state.mode === 'off') {
    state.mode = 'default';
    turnDisplayOn();
  }
}

function ceButton() {
  if (state.mode !== 'off') {
    state.mode = 'default';
    setModeIndicator('');
    state.decimal = false;
    state.value = 0;
    state.valueOther = 0;
    state.displayValue = 0;

    updateDisplay(state.value);
  }
}

function equalsButton() {
  if (state.mode !== 'off' && state.mode !== 'default') {
    switch (state.mode) {
      case 'addition':
        state.value += state.valueOther;
        break;
      case 'subtraction':
        state.value -= state.valueOther;
        break;
      case 'multiplication':
        state.value *= state.valueOther;
        break;
      case 'division':
        state.value /= state.valueOther;
        break;
      default:
        break;
    }

    state.mode = 'default';
    setModeIndicator('');
    state.decimal = false;
    state.valueOther = 0;
    updateDisplay(state.value);
  }
}

function dotButton() {
  if (state.mode !== 'off' && !state.decimal) {
    state.decimal = true;
  }
}



// Unary Operator Button Functions

function percentButton() {
  if (state.mode !== 'off') {
    if (state.mode === 'default') {
      state.value /= 100;
      updateDisplay(state.value);
    } else {
      state.valueOther /= 100;
      updateDisplay(state.valueOther);
    }

    state.decimal = false;
  }
}

function rootButton() {
  if (state.mode !== 'off') {
    if (state.mode === 'default') {
      state.value = Math.sqrt(state.value);
      updateDisplay(state.value);
    } else {
      state.valueOther = Math.sqrt(state.valueOther);
      updateDisplay(state.valueOther);
    }

    state.decimal = false;
  }
}



// Binary Operator Button Functions

function addButton() {
  if (state.mode === 'default') {
    state.mode = 'addition';
    state.decimal = false;
    setModeIndicator('+');
    updateDisplay(state.valueOther);
  }
}

function subtractButton() {
  if (state.mode === 'default') {
    state.mode = 'subtraction';
    state.decimal = false;
    setModeIndicator('-');
    updateDisplay(state.valueOther);
  }
}

function multiplyButton() {
  if (state.mode === 'default') {
    state.mode = 'multiplication';
    state.decimal = false;
    setModeIndicator('×');
    updateDisplay(state.valueOther);
  }
}

function divideButton() {
  if (state.mode === 'default') {
    state.mode = 'division';
    state.decimal = false;
    setModeIndicator('÷');
    updateDisplay(state.valueOther);
  }
}



// Number Button Functions

function numberButton(number) {
  if (state.mode !== 'off') {
    if (state.decimal) {
      if (state.mode === 'default') {
        if (hasLessThanNDigits(state.value, 7)) {
          state.value += number / Math.pow(10, decimalCount(state.value) + 1);
          updateDisplay(state.value);
        }
      } else if (hasLessThanNDigits(state.valueOther, 7)) {
        state.valueOther += number / Math.pow(10, decimalCount(state.valueOther) + 1);
        updateDisplay(state.valueOther);
      }
    } else {
      if (state.mode === 'default') {
        if (hasLessThanNDigits(state.value, 7)) {
          state.value *= 10;
          state.value += number;
          updateDisplay(state.value);
        }
      } else if (hasLessThanNDigits(state.valueOther, 7)) {
        state.valueOther *= 10;
        state.valueOther += number;
        updateDisplay(state.valueOther);
      }
    }
  }
}



// Helper Functions

function updateDisplay(value) {
  // Divide by zero
  if (value === Infinity) {
    document.querySelector('#value-field').innerText = 'REALLY?';

    // the calculator falls through the page
    const fallingStyles = {
      position: 'absolute',
      top: '0',
      animation: 'fall 2s forwards'
    }

    Object.assign(document.querySelector('main').style, fallingStyles);

    return;
  }

  if (hasLessThanNDigits(value, 8)) {
    document.querySelector('#value-field').innerText = value;
  } else {
    document.querySelector('#value-field').innerText = value.toExponential(2);
  }
}

function setModeIndicator(symbol) {
  document.querySelector('#mode-indicator').innerText = symbol;
}

function turnDisplayOn() {
  document.querySelector('#value-field').style.background = 'rgba(0, 200, 100, 0.25)';
  document.querySelector('#value-field').style.boxShadow = '0 0 5px 3px rgba(0, 200, 50, 0.25)';
}

function decimalCount(number) {
  if (Number.isInteger(number)) {
    return 0;
  } else {
    return number.toString().split('.')[1].length;
  }
}

function hasLessThanNDigits(value, numberOfDigits) {
  return value.toString().length < numberOfDigits;
}

function addDecimal(value, number) {
  number /= Math.pow(10, decimalCount(value));
  value += number;
}