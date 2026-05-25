let contador = 0;

function adicionar() {
    contador++;
    document.getElementById("contador").textContent = contador;
}

function remover() {
    if (contador > 0) {
        contador--;
        document.getElementById("contador").textContent = contador;
    }
}

function resetar() {
    contador=0;
    document.getElementById("contador").textContent = contador;
}