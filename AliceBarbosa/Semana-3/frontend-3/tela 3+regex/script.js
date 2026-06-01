const cepInput = document.getElementById('cepInput');
const btnPesquisar = document.getElementById('btnPesquisar');
const cepHeader = document.getElementById('cepHeader');

const els = {
    logradouro: document.getElementById('logradouro'),
    complemento: document.getElementById('complemento'),
    bairro: document.getElementById('bairro'),
    localidade: document.getElementById('localidade'),
    uf: document.getElementById('uf'),
    estado: document.getElementById('estado')
};

cepInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    e.target.value = value;
});

const buscarCep = async () => {
    const cepLimpo = cepInput.value.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
        alert('Por favor, digite um CEP válido com 8 dígitos.');
        return;
    }

    btnPesquisar.textContent = 'Buscando...';
    btnPesquisar.disabled = true;

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();

        if (data.erro) {
            alert('CEP não encontrado na base de dados.');
            limparCampos();
            return;
        }

        const { cep, logradouro, complemento, bairro, localidade, uf, estado } = data;

        cepHeader.textContent = `CEP ${cep}`;
        els.logradouro.textContent = logradouro || '';
        els.complemento.textContent = complemento || '';
        els.bairro.textContent = bairro || '';
        els.localidade.textContent = localidade || '';
        els.uf.textContent = uf || '';
        els.estado.textContent = estado || '';

    } catch (error) {
        alert('Erro ao buscar o CEP. Tente novamente mais tarde.');
    } finally {
        btnPesquisar.textContent = 'Pesquisar';
        btnPesquisar.disabled = false;
    }
};

const limparCampos = () => {
    cepHeader.textContent = 'CEP <numero_do_cep>';
    Object.values(els).forEach(el => el.textContent = '');
};

btnPesquisar.addEventListener('click', buscarCep);

cepInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buscarCep();
});