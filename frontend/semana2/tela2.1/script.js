const numero = document.getElementById('numero-contador');
const remover = document.getElementById('btn-remover');
const adicionar = document.getElementById('btn-adicionar');

let contador = 0;

function atualizarTela() {
    numero.textContent = contador;
}

remover.addEventListener('click', () => {

    if (contador > 0) {
        contador--; 
        atualizarTela();
    } else {
        alert("Não é possível ter menos que zero membros!")
    }

});

adicionar.addEventListener('click', () => {
    contador++; 
    atualizarTela(); 
});


