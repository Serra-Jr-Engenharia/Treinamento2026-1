function pesquisar() {
  let cep = document.getElementById('cep').value;
  let digitos = cep.length;
  if (digitos !== 8) {
    alert("CEP Invalido")
    return;
  }
  
  
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
  .then((r) => r.json())
  .then ((json) =>{
    
    if (json.erro) {
        alert("CEP não encontrado!")
        return
    }

    document.getElementById('ncep').innerText = cep
    document.getElementById('logradouro').innerText = json.logradouro || "-";
    document.getElementById('complemento').innerText = json.complemento || "-"; 
    document.getElementById('bairro').innerText = json.bairro || "-";
    document.getElementById('localidade').innerText = json.localidade || "-";
    document.getElementById('uf').innerText = json.uf || "-";
    document.getElementById('estado').innerText = json.estado || "-";

  })
  .catch(()=>{
    alert("Erro ao buscar o CEP!")
  })
}