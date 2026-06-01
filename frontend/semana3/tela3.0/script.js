const inputCep = document.getElementById('cep_input')
const botaoPesquisar = document.getElementById('btn_pesquisar')


inputCep.addEventListener('input', (event) => {
    let valor = event.target.value;

    valor = valor.replace(/\D/g, "")

    if (valor.length > 5) {
        valor = valor.replace(/^(\d{5})(\d)/, "$1-$2")
    }

    event.target.value = valor
})

botaoPesquisar.addEventListener('click', async () => {
    
   
    const cepLimpo = inputCep.value.replace(/\D/g, '')

   
    if (cepLimpo.length !== 8) {
        alert("Por favor, digite um CEP válido com 8 números.")
        return 
    }

    const url = `https://viacep.com.br/ws/${cepLimpo}/json/`

    try {
        const resposta = await fetch(url)
        const dados = await resposta.json()
        
        
        if (dados.erro) {
            alert("CEP não encontrado. Verifique os números e tente novamente.")
            return
        }
        
        console.log(dados)   

    const { cep, ibge, gia, ddd, siafi, ...endereco } = dados;

        const dadosCompletos = {
            ...endereco,
            horarioDaPesquisa: new Date().toLocaleTimeString()
        };
        console.log("Dados salvos:", dadosCompletos);


        const textoComplemento = dadosCompletos.complemento || "Não possui";

        document.getElementById('cep_title').innerText = "Buscando...";

        setTimeout(() => {
            
            document.getElementById('cep_title').innerText = cep;
            document.getElementById('logradouro_id').innerText = dadosCompletos.logradouro;
            document.getElementById('complemento_id').innerText = textoComplemento;
            document.getElementById('bairro_id').innerText = dadosCompletos.bairro;
            document.getElementById('localidade_id').innerText = dadosCompletos.localidade;
            document.getElementById('uf_id').innerText = dadosCompletos.uf;
            document.getElementById('estado_id').innerText = dadosCompletos.estado;
            
            inputCep.value = ''; 

        }, 700);    

    } catch (erro) {
        alert("Ocorreu um erro na comunicação com o servidor.")
        console.error(erro)
    }
})