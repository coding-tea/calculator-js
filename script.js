const display = document.querySelector('h1');
const inputBtn = document.querySelectorAll('button');
const clearBtn = document.querySelector('#clearBtn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

const calculate = {
    '/':(firstNumber, secondNumber) => firstNumber / secondNumber,
    '+':(firstNumber, secondNumber) => firstNumber + secondNumber,
    '*':(firstNumber, secondNumber) => firstNumber * secondNumber,
    '-':(firstNumber, secondNumber) => firstNumber - secondNumber
};

const sendNumberValue = (number) => {
    if(awaitingNextValue)
    {
        display.textContent = number;
        awaitingNextValue = false;
    }else {
        const displayValue = display.textContent;
        display.textContent = displayValue === '0' ?number: displayValue + number;
    }
};

function useOperator (operator){
    const currentValue = Number(display.textContent);
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    };
    if(!firstValue){
        firstValue = currentValue;
    }else{
        const calculation = calculate[operatorValue](firstValue, currentValue);
        display.textContent = calculation;
        firstValue = calculation;
    }
    awaitingNextValue = true;
    operatorValue = operator;
}

inputBtn.forEach((inputBtns) => {
    if (inputBtns.classList.length === 0)
    {
        inputBtns.onclick = () => { sendNumberValue(inputBtns.value) };
    }else if (inputBtns.classList.contains('operator'))
    {
        inputBtns.onclick = () => { useOperator(inputBtns.value) };
    }else if (inputBtns.classList.contains('decimal'))
    {
        inputBtns.onclick = () => {
            if(awaitingNextValue) return;
            if (!display.textContent.includes('.'))
            {
                display.textContent = `${display.textContent}.` ;
            }
        };
    }
});

clearBtn.onclick = () => { 
    display.textContent = '0';
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}; 