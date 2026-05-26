const contadorEl = document.getElementById('contador');
const btnRemover = document.getElementById('btnRemover');
const btnAdicionar = document.getElementById('btnAdicionar');

let contador = 0;

function atualizarTela() {
    contadorEl.textContent = contador;
    if (contador === 0) {
        btnRemover.disabled = true;
    } else {
        btnRemover.disabled = false;
    }
}

btnAdicionar.addEventListener('click', () => {
    contador++;
    atualizarTela();
});

btnRemover.addEventListener('click', () => {
    if (contador > 0) {
        contador--;
        atualizarTela();
    }
});

atualizarTela();
