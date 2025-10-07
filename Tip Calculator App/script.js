const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const customTipInput = document.getElementById('custom');
const tipButtons = document.querySelectorAll('.grid button');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalDisplay = document.getElementById('total');
const resetButton = document.getElementById('btn-reset');
const alertMessage = document.querySelector('.alert');

let billValue = 0;
let peopleValue = 0;
let tipValue = 0;

billInput.addEventListener('input', () => {
  billValue = parseFloat(billInput.value);
  calculateTip();
});


peopleInput.addEventListener('input', () => {
  peopleValue = parseInt(peopleInput.value);

  if (peopleValue <= 0 || isNaN(peopleValue)) {
    alertMessage.style.display = 'block';
    peopleInput.classList.add('input-error'); 
    
  } else {
    alertMessage.style.display = 'none';
    peopleInput.classList.remove('input-error'); 
  }
  calculateTip();
});


tipButtons.forEach((button) => {
  button.addEventListener('click', () => {
    tipValue = parseFloat(button.innerHTML) / 100;
    customTipInput.value = ''; 

 
    tipButtons.forEach((btn) => {
      btn.classList.remove('bg-cyan', 'text-cyan-500');
      btn.classList.add('bg-cyan-500', 'text-white');
    });


    button.classList.remove('bg-cyan-500', 'text-white');
    button.classList.add('bg-cyan', 'text-cyan-500');

    calculateTip();
  });
});

customTipInput.addEventListener('input', () => {
  tipValue = parseFloat(customTipInput.value) / 100;


  tipButtons.forEach((btn) => {
    btn.classList.remove('bg-cyan', 'text-cyan-500');
    btn.classList.add('bg-cyan-500', 'text-white');
  });

  calculateTip();
});


function calculateTip() {
  if (billValue > 0 && peopleValue > 0) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let totalAmount = (billValue + billValue * tipValue) / peopleValue;


    tipAmountDisplay.innerHTML = `$${tipAmount.toFixed(2)}`;
    totalDisplay.innerHTML = `$${totalAmount.toFixed(2)}`;
  }
}


resetButton.addEventListener('click', () => {

  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';
  tipAmountDisplay.innerHTML = '$0.00';
  totalDisplay.innerHTML = '$0.00';
  alertMessage.style.display = 'none'; 
  peopleInput.classList.remove('input-error'); 
  billValue = 0;
  peopleValue = 0;
  tipValue = 0;

 
  tipButtons.forEach((btn) => {
    btn.classList.remove('bg-cyan', 'text-cyan-500');
    btn.classList.add('bg-cyan-500', 'text-white');
  });
});