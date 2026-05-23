const removeButton = document.getElementById("rmv-counter");
const resetButton = document.getElementById("reset-counter");
const addButton = document.getElementById("add-counter");
const counterText = document.getElementById("counter");

let counter = 0;

document.addEventListener("DOMContentLoaded", load);

removeButton.addEventListener('click', () => {
    if (counter > 0) {
        counter--;
        updateCounter();
    }
});

resetButton.addEventListener('click', () => {
    counter = 0;
    updateCounter();
});

addButton.addEventListener('click', () => {
    counter++;
    updateCounter();
});

function updateCounter(saveCounter = true) {
    removeButton.classList.toggle("block", counter === 0);

    counterText.textContent = counter;
    if (saveCounter) {
        save();
    }
}

function save() {
    localStorage.setItem("counter", counter);
}

function load() {
    const savedCounter = localStorage.getItem("counter");
    if (savedCounter !== null) {
        counter = parseInt(savedCounter, 10);
        updateCounter(false);
    }
}