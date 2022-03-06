const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null;
let operator = null;
let secondExpectedValue = false; // transferring the second value entered
updateDisplay();

function updateDisplay() {
  display.value = displayValue;
}

keys.addEventListener("click", function (e) {
  // Clear, decimal and operator buttons actived

  const element = e.target;

  if (!element.matches("button")) return;

  if (element.classList.contains("operator")) {
    // console.log('operator', element.value);

    operatorOperation(element.value);
    updateDisplay();
    return;
  }

  if (element.classList.contains("decimal")) {
    inputDecimal();
    updateDisplay();
    return;
  }

  if (element.classList.contains("clear")) {
    clear();
    updateDisplay();
    return;
  }

  inputNumber(element.value);
  updateDisplay();
});

function operatorOperation(nextOperator) {
  const value = parseFloat(displayValue);

  if (operator && secondExpectedValue) {
    operator = nextOperator;
    return;
  }

  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);

    displayValue = `${parseFloat(result.toFixed(7))}`; // process of limiting the number of digits
    firstValue = result;
  }

  secondExpectedValue = true;
  operator = nextOperator;

  //   console.log(displayValue, firstValue, operator, secondExpectedValue);
}

function calculate(first, second, operator) {
  // Calculation operations
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }
  return second;
}

function inputNumber(num) {
  // When the second value is entered, the first value is deleted (not visible)
  if (secondExpectedValue) {
    displayValue = num;
    secondExpectedValue = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num;
  }

  console.log(displayValue, firstValue, operator, secondExpectedValue);
}

function inputDecimal() {
  // Converts the entered values to decimal by activating the decimal button
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}

function clear() {
  // I activited the clear (AC) button, resets the entered
  displayValue = "0";
}


