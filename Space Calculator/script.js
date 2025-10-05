const display = document.getElementById('display');
const buttonsContainer = document.querySelector('.buttons');

let currentInput = '';

buttonsContainer.addEventListener('click', (event) => {
    if (!event.target.matches('.btn')) return;

    const button = event.target;
    const value = button.dataset.value;

    handleInput(value);
});

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if ((key >= '0' && key <= '9') || key === '.') {
        handleInput(key);
    } else if (['+', '-', '*', '/', '%'].includes(key)) {
        handleInput(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleInput('=');
    } else if (key === 'Backspace') {
        handleInput('DEL');
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        handleInput('AC');
    }
});

function handleInput(value) {
    switch (value) {
        case 'AC':
            currentInput = '';
            break;
        case 'DEL':
            currentInput = currentInput.slice(0, -1);
            break;
        case '=':
            calculate();
            break;
        default:
            const lastChar = currentInput[currentInput.length - 1];
            const operators = ['+', '-', '*', '/', '%'];
            if (operators.includes(value) && operators.includes(lastChar)) {
                currentInput = currentInput.slice(0, -1) + value;
            } else {
                currentInput += value;
            }
            break;
    }
    updateDisplay();
}

function calculate() {
    if (currentInput === '') return;

    try {
        let sanitizedInput = currentInput.replace(/[^0-9+\-*/.%()]/g, '');
        const result = new Function('return ' + sanitizedInput)();

        if (Number.isNaN(result) || !Number.isFinite(result)) {
            currentInput = 'Error';
        } else {
            currentInput = String(result);
        }
    } catch (error) {
        currentInput = 'Error';
    }
}

function updateDisplay() {
    display.value = currentInput;
}
