/* 
Lydia Francis 
calculate.js
June 2017

Performs basic four function calculator 
math to be displayed in virtual calculator
*/
output = document.getElementById("output");
numberButton = document.getElementsByClassName("number");
opButton = document.getElementsByClassName("op");
clearButton = document.getElementById("clear");
addButton = document.getElementById("add");
subtractButton = document.getElementById("subtract");
multiplyButton = document.getElementById("multiply");
divideButton = document.getElementById("divide");
sqrtButton = document.getElementById("sqrt");
equalsButton = document.getElementById("equals");
percentButton = document.getElementById("percent");
signButton = document.getElementById("sign");
mrcButton = document.getElementById("mrc");
msubtractButton = document.getElementById("msubtract");
maddButton = document.getElementById("madd");

stack = [];
screenClear = false;
allowOp = true;
storedNumber = "0";


output.textContent = "0";



//Evaluates equation in stack 
function evaluate(stack) {
  let equation = stack.join(" ");
  const result = eval(equation);
  return result.toString();
}


//Display number to screen
function display(number) {
  if (number.length < 16) {
  } else {
    number = parseFloat(number);
    if (number > 100000000000000) {
      number = number.toPrecision(10);
    }
    else {
      number = number.toPrecision(14);
    }
  }
  number.toString();
  output.textContent = number;
}


//Append character to end of display string
for (let i = 0; i < numberButton.length; i++) {
  const number = numberButton[i].textContent;
  numberButton[i].addEventListener("click", () => {
    if (output.textContent.charAt(0) === "0" &&
      output.textContent.length == 1) {
      output.textContent = "";
    }
    if (screenClear) { output.textContent = ""; }
    if (output.textContent.length < 16) {
      output.textContent += number;
      screenClear = false;
    }
    if (output.textContent.charAt(0) === ".") {
      output.textContent = "0.";
    }
    allowOp = true;
  });
}


//Clear display when ON/C clicked
clearButton.addEventListener("click", () => {
  output.textContent = "0";
  stack = [];
});



//Creates appropriate stack based on operator
//Sets screenClear and allowOp
function createStack(stack, operator, screenClear, allowOp) {
  if (allowOp) {
    if (stack.length == 0) {
      stack.push(output.textContent);
      stack.push(operator);
    } else if (stack.length == 2) {
      stack.push(output.textContent);
      let result = evaluate(stack);
      display(result);
      stack = [result, operator];
    }
    screenClear = true;
    allowOp = false;
  }
}




//Add
addButton.addEventListener("click", () => {
  if (allowOp) {
    if (stack.length == 0) {
      stack.push(output.textContent);
      stack.push("+");
    } else if (stack.length == 2) {
      stack.push(output.textContent);
      let result = evaluate(stack);
      display(result);
      stack = [result, "+"];
    }
    screenClear = true;
    allowOp = false;
  }
});

//Subtract
subtractButton.addEventListener("click", () => {
  if (allowOp) {
    if (stack.length == 0) {
      stack.push(output.textContent);
      stack.push("-");
    } else if (stack.length == 2) {
      stack.push(output.textContent);
      let result = evaluate(stack);
      display(result);
      stack = [result, "-"];
    }
    screenClear = true;
    allowOp = false;
  }
});

//Multiply
multiplyButton.addEventListener("click", () => {
  if (allowOp) {
    if (stack.length == 0) {
      stack.push(output.textContent);
      stack.push("*");
    } else if (stack.length == 2) {
      stack.push(output.textContent);
      let result = evaluate(stack);
      display(result);
      stack = [result, "*"];
    }
    screenClear = true;
    allowOp = false;
  }
});

//Divide
divideButton.addEventListener("click", () => {
  if (allowOp) {
    if (stack.length == 0) {
      stack.push(output.textContent);
      stack.push("/");
    } else if (stack.length == 2) {
      stack.push(output.textContent);
      let result = evaluate(stack);
      display(result);
      stack = [result, "/"];
    }
    screenClear = true;
    allowOp = false;
  }
});


//Sqrt
sqrtButton.addEventListener("click", () => {
  if (allowOp) {
    if (stack.length == 0) {
      let equation = output.textContent + "** (1/2)";
      let result = eval(equation);
      display(result);
    }
  }
});



//Equals
equalsButton.addEventListener("click", () => {
  if (allowOp) {
    if (stack.length == 2) {
      stack.push(output.textContent);
      let result = evaluate(stack);
      display(result);
      stack = [];
    }
    screenClear = true;
    allowOp = true;
  }
});



//Percent
percentButton.addEventListener("click", () => {
  if (allowOp) {
    if (stack.length == 2) {
      let percent = eval(stack[0] + "*" + output.textContent / 100);
      stack.push(percent);
      let result = evaluate(stack);
      display(result);
      stack = [];
    }
    screenClear = true;
  }
});


//Sign
signButton.addEventListener("click", () => {
  if (output.textContent.charAt(0) === "0") { }
  else if (output.textContent.charAt(0) === "-") {
    output.textContent = output.textContent.substring(1);
  } else {
    output.textContent = "-" + output.textContent;
  }
});



//MRC
mrcButton.addEventListener("click", () => {
  display(storedNumber);
});



//M+
maddButton.addEventListener("click", () => {
  if (allowOp) {
    storedNumber = eval(storedNumber.toString() + "+" + output.textContent);
    storedNumber = storedNumber.toString();
    display(storedNumber);
  }
  screenClear = true;
});



//M-
msubtractButton.addEventListener("click", () => {
  if (allowOp) {
    storedNumber = eval(storedNumber.toString() + "-" + output.textContent);
    storedNumber = storedNumber.toString();
    display(storedNumber);
  }
  screenClear = true;
});



