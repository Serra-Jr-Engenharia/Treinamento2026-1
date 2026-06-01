async function buscarCep() {
    const cep = document.getElementById('input_cep').value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert('Digite um CEP válido com 8 dígitos.');
        return;
    }

    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    if (dados.erro) {
        alert('CEP não encontrado.');
        return;
    }

    document.getElementById('cep_numero').textContent = dados.cep;
    document.getElementById('logradouro').textContent = dados.logradouro;
    document.getElementById('complemento').textContent = dados.complemento;
    document.getElementById('bairro').textContent = dados.bairro;
    document.getElementById('localidade').textContent = dados.localidade;
    document.getElementById('uf').textContent = dados.uf;
    document.getElementById('estado').textContent = dados.estado;
}

document.getElementById('input_cep').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') buscarCep();
});
