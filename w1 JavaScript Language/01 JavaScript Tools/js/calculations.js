const form = document.getElementById("form");
const result = document.getElementById("result");
const firstErr = document.getElementById("firstErr");
const secondErr = document.getElementById("secondErr");
const firstNumber = document.getElementById("firstNumber");
const secondNumber = document.getElementById("secondNumber");

const validate = () => {
  let valid = true;

  if (!firstNumber.value || !secondNumber.value) valid = false;

  if (isNaN(firstNumber.value)) {
    firstErr.innerText = "Please input a number!";
    valid = false;
  } else firstErr.innerText = "";
  
  if (isNaN(secondNumber.value)) {
    secondErr.innerText = "Please input a number!";
    valid = false;
  } else secondErr.innerText = "";
  
  return valid;
}

function multiplyBy() {
  if (validate()) {
    result.innerText = firstNumber.value * secondNumber.value;
  } else {
    result.innerText = "";
  }
}

function divideBy() { 
  if (validate()) {
    if (secondNumber.value != 0) {
      result.innerText = firstNumber.value / secondNumber.value;
    } else {
      secondErr.innerText = "Cannot divide by zero!";
      result.innerText = "";
    }
  } else {
    result.innerText = "";
  }
}

window.onload = () => form.oninput = validate;