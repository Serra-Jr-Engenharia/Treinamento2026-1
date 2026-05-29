const searchForm = document.querySelector('.search-container');
const cepInput = document.getElementById('cep-input');

const cep = document.getElementById('cep');
const logradouro = document.getElementById('logradouro');
const complemento = document.getElementById('complemento');
const bairro = document.getElementById('bairro');
const localidade = document.getElementById('localidade');
const uf = document.getElementById('uf');
const estado = document.getElementById('estado');
const regiao = document.getElementById('regiao');
const ibge = document.getElementById('ibge');
const gia = document.getElementById('gia');
const ddd = document.getElementById('ddd');
const siafi = document.getElementById('siafi');

const seeMoreButton = document.getElementById('see-more');
const moreDetailsContainer = document.getElementById('more-details');
const mapsIframe = document.getElementById('maps-iframe');
const historyList = document.getElementById('history-list');

const getCep = async (cep) => {
  const cleanCep = cep.replace(/\D/g, '');
  if (cleanCep.length !== 8) {
    seeAlert('CEP inválido! O CEP deve conter 8 dígitos.');
    clear();
    return;
  }
  const cepURL = `https://viacep.com.br/ws/${cleanCep}/json/`;
  try {
    const response = await fetch(cepURL);
    const data = await response.json();
    if (data.erro) {
      seeAlert('CEP não encontrado!');
      clear();
      return;
    }
    fillScreen(data);
    saveToHistory(data);
  } catch (error) {
    console.error('Erro na requisição:', error);
    seeAlert('Erro ao buscar o CEP.');
  }
};

const fillScreen = (data) => {
  const {
    cep: cepValue,
    logradouro: log,
    complemento: comp,
    bairro: bair,
    localidade: loc,
    uf: ufValue,
    estado: est,
    regiao: reg,
    ibge: ibgeValue,
    gia: giaValue,
    ddd: dddValue,
    siafi: siafiValue
  } = data;
  cep.innerText = `CEP: ${cepValue}`;
  logradouro.innerText = `Logradouro: ${log || 'Não Informado'}`;
  complemento.innerText = `Complemento: ${comp || 'Não Informado'}`;
  bairro.innerText = `Bairro: ${bair || 'Não Informado'}`;
  localidade.innerText = `Localidade: ${loc || 'Não Informado'}`;
  uf.innerText = `UF: ${ufValue || 'Não Informado'}`;
  estado.innerText = `Estado: ${est || 'Não Informado'}`;
  regiao.innerText = `Região: ${reg || 'Não Informado'}`;
  ibge.innerText = `IBGE: ${ibgeValue || 'Não Informado'}`;
  gia.innerText = `GIA: ${giaValue || 'Não Informado'}`;
  ddd.innerText = `DDD: ${dddValue || 'Não Informado'}`;
  siafi.innerText = `SIAFI: ${siafiValue || 'Não Informado'}`;
  seeMoreButton.classList.remove('hidden');
  mapsIframe.src = `https://maps.google.com/maps?q=${cepValue}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  mapsIframe.classList.remove('hidden');
};

seeMoreButton.addEventListener('click', () => {
  if (moreDetailsContainer.classList.contains('hidden')) {
    moreDetailsContainer.classList.remove('hidden');
    seeMoreButton.textContent = 'Ver menos detalhes';
  } else {
    moreDetailsContainer.classList.add('hidden');
    seeMoreButton.textContent = 'Ver mais detalhes';
  }
});

const clear = () => {
  cep.innerText = 'CEP: 00000-000';
  logradouro.innerText = 'Logradouro: ';
  complemento.innerText = 'Complemento: ';
  bairro.innerText = 'Bairro: ';
  localidade.innerText = 'Localidade: ';
  uf.innerText = 'UF: ';
  estado.innerText = 'Estado: ';
  regiao.innerText = 'Região: ';
  ibge.innerText = 'IBGE: ';
  gia.innerText = 'GIA: ';
  ddd.innerText = 'DDD: ';
  siafi.innerText = 'SIAFI: ';
  seeMoreButton.classList.add('hidden');
  moreDetailsContainer.classList.add('hidden');
};

const seeAlert = (message, timeout = 3000) => {
  const container = document.getElementById('alert-container');
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.textContent = message;
  container.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, timeout);
};

const saveToHistory = (data) => {
  let history = JSON.parse(localStorage.getItem('cepHistory')) || [];
  history = history.filter(item => item.cep !== data.cep);
  history.unshift({
    cep: data.cep,
    localidade: data.localidade,
    uf: data.uf
  });
  if (history.length > 5) history.pop();
  localStorage.setItem('cepHistory', JSON.stringify(history));
  renderHistory();
};

const renderHistory = () => {
  const history = JSON.parse(localStorage.getItem('cepHistory')) || [];
  historyList.innerHTML = '';
  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.cep} - ${item.localidade}/${item.uf}`;
    li.addEventListener('click', () => {
      cepInput.value = item.cep;
      getCep(item.cep);
    });
    historyList.appendChild(li);
  });
};

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  getCep(cepInput.value);
});

renderHistory();