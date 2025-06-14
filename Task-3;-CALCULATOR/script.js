const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
let current = '0';

function updateDisplay() {
  display.value = current;
}

function append(value) {
  if (current === '0' && value !== '.') {
    current = value;
  } else {
    current += value;
  }
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;
    if (value) {
      append(value);
    } else if (action) {
      switch (action) {
        case 'clear':
          current = '0';
          break;
        case 'delete':
          current = current.slice(0, -1) || '0';
          break;
        case 'equal':
          try {
            current = Function(`'use strict'; return (${current});`)().toString();
          } catch (e) {
            current = 'Error';
          }
          break;
      }
    }
    updateDisplay();
  });
});

updateDisplay();
