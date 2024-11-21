let numeroUno = "";
let numeroDos =  "";
const displayNumber = document.querySelector("#numberDisplay");
displayNumber.textContent = "0";
let operator = "";
let operatorStatus = false;
let equalStatus = false;

//This function keeps results of both large and small numbers under the nine character threshold for the display field
function resultRounder(number=0) {
    if (String(number).length <=9) {
        return number;
    } else if (number>99999999){
        return number.toExponential(3);
    } else {
        return number.toFixed(8-String(number).indexOf('.'));
    }
}

function add(num1, num2) {
    return resultRounder(num1+num2);
}
function subtract(num1, num2) {
    return resultRounder(num1-num2);
}
function multiply(num1,num2) {
    return resultRounder(num1*num2);
}
function divide(num1, num2) {
    if (num2 != 0) {
        return resultRounder(num1/num2);
    } else {
        return "Error!";
    }
}

function operate(num1=0, num2=0, toDo="add"){
    switch (toDo) {
        case  "add":
            return add(num1,num2);
        case "subtract":
            return subtract(num1, num2);
        case "multiply":
            return multiply(num1, num2);
        case "divide":
            return divide(num1,num2);
        default:
            break;
    }
}

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (operatorStatus === true || equalStatus === true) {
            displayNumber.textContent = "0";
            operatorStatus = false;
            equalStatus = false;
        }
        if (displayNumber.textContent === "0") {
            if (button.textContent === "0") {
                displayNumber.textContent = "0";
            } else if (button.textContent===".") {
                displayNumber.textContent+=button.textContent;
            } else {
                displayNumber.textContent = button.textContent;
            }
        } else if (displayNumber.textContent.length<9) {
            if(button.textContent !=="." || !displayNumber.textContent.includes("."))
            displayNumber.textContent+=button.textContent;
        }
    });
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (numeroUno!=="" && equalStatus===false) {
            numeroDos=displayNumber.textContent*1;
            numeroUno= operate(numeroUno,numeroDos,operator);
            displayNumber.textContent=String(numeroUno);
        } else if (numeroDos==="") {
            numeroUno = displayNumber.textContent*1;
        }
        operator=button.id;
        operatorStatus = true; //operatorStatus is a flag that the operator button has been pressed.
        
    });
})

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () =>{
    if (equalStatus === false){
        numeroDos =displayNumber.textContent*1
    }
    numeroUno= operate(numeroUno,numeroDos,operator);
    displayNumber.textContent=String(numeroUno);
    equalStatus =true; //equalStatus is a flag to indicate that the equals button has been pressed - its used in cases where the equals button is being pressed in succession and when a calculation is being made
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    equalStatus=false;
    operatorStatus =false;
    operator ="";
    numeroDos = "";
    numeroUno ="";
    displayNumber.textContent="0";
});

const percentageButton = document.querySelector("#percentage");
percentageButton.addEventListener("click",()=>{
    displayNumber.textContent = displayNumber.textContent/100;
});

const flipSignButton = document.querySelector("#flipSign");
flipSignButton.addEventListener("click",() => {
    displayNumber.textContent = displayNumber.textContent*-1;
});

const delButton = document.querySelector("#delete");
delButton.addEventListener("click", () => {
    if (displayNumber.textContent.length>1){
        displayNumber.textContent = displayNumber.textContent.slice(0,-1);
    } else {
        displayNumber.textContent = "0";
    }
});

/* Future fixes:
1. delete button works on inputs, but not when used on a calculated value
(should it just be disabled in those cases anyway?)

2. Changing signs also works on inputs, but not when used on calculated values..*/