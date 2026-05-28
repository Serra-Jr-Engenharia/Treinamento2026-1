const cepInput = document.getElementById('cepInput');
const btnPesquisar = document.getElementById('btnPesquisar');
const resultCard = document.getElementById('resultCard');
const feedbackMessage = document.getElementById('feedbackMessage');
const cepTitleNumber = document.getElementById('cepTitleNumber');
const cepLink = document.getElementById('cepLink');


cepInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    e.target.value = value;
});


async function buscarCEP() {
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        showFeedback('Por favor, digite um CEP válido com 8 dígitos.', true);
        return;
    }

    showFeedback('Buscando...');

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            showFeedback('CEP não encontrado.', true);
            return;
        }

        exibirDados(data);

    } catch (error) {
        showFeedback('Erro ao conectar com o servidor.', true);
        console.error(error);
    }
}

function exibirDados(data) {
    feedbackMessage.textContent = '';
    
    
    cepTitleNumber.textContent = data.cep;
    
    // Configura o link para abrir a busca direta no Google com o CEP correspondente
    cepLink.href = `https://www.google.com/search?q=CEP+${data.cep}`;

   
    document.getElementById('logradouro').textContent = data.logradouro || '-';
    document.getElementById('complemento').textContent = data.complemento || '-';
    document.getElementById('bairro').textContent = data.bairro || '-';
    document.getElementById('localidade').textContent = data.localidade || '-';
    document.getElementById('uf').textContent = data.uf || '-';
    document.getElementById('estado').textContent = data.estado || '-';

    
    resultCard.style.display = 'block';
}

function showFeedback(msg, isError = false) {
    resultCard.style.display = 'none'; 
    feedbackMessage.textContent = msg;
    feedbackMessage.style.color = isError ? '#e53e3e' : '#666';
}


btnPesquisar.addEventListener('click', buscarCEP);
cepInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarCEP();
    }
});