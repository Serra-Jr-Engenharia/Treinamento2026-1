const counterValueDisplay = document.getElementById('counterValue');
const btnRemover = document.getElementById('btnRemover');
const btnAdicionar = document.getElementById('btnAdicionar');

let count = 0;

function updateDisplay() {
    counterValueDisplay.textContent = count;
    btnRemover.disabled = count === 0;
    
    counterValueDisplay.classList.remove('animate-pulse');
    void counterValueDisplay.offsetWidth; 
    counterValueDisplay.classList.add('animate-pulse');
}

btnAdicionar.addEventListener('click', () => {
    count++;
    updateDisplay();
});

btnRemover.addEventListener('click', () => {
    if (count > 0) {
        count--;
        updateDisplay();
    }
});