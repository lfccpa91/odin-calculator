let numeroUno = "";
let numeroDos =  "";
const displayNumber = document.querySelector("#numberDisplay");
displayNumber.textContent = "0";
let operator = "";
let operatorStatus = false;
let equalStatus = false;

function add(num1, num2) {
    return num1+num2;
}
function subtract(num1, num2) {
    return num1-num2;
}
function multiply(num1,num2) {
    return num1*num2;
}
function divide(num1, num2) {
    if (num2 != 0) {
        return num1/num2;
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
        numeroUno = displayNumber.textContent*1;
        operator=button.id;
        operatorStatus = true;
    });
})


const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () =>{
    if (equalStatus === false){
        numeroDos =displayNumber.textContent*1
    }
    numeroUno= operate(numeroUno,numeroDos,operator);
    displayNumber.textContent=String(numeroUno);
    equalStatus =true; 
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