let contador = 0;
const textoContador = document.getElementById('valor_contador')
const botao_add = document.getElementById('add')
const botao_remove = document.getElementById('remove')

function adicionar(){
    contador ++
    textoContador.textContent = contador
}

function remover(){
    contador--
    textoContador.textContent = contador
}