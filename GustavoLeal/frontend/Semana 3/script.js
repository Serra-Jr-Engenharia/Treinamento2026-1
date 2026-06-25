const inputCep = document.getElementById("cep");
const botao = document.getElementById("buscar");

renderizarHistorico();

botao.addEventListener("click", buscarCEP);

inputCep.addEventListener("keydown", (event) => {

    if(event.key === "Enter"){
        buscarCEP();
    }

});

inputCep.addEventListener("input", () => {

    let valor = inputCep.value.replace(/\D/g, "");

    valor = valor.replace(
        /^(\d{5})(\d)/,
        "$1-$2"
    );

    inputCep.value = valor;

    if(valor.length === 9){
        buscarCEP();
    }
});

async function buscarCEP(){

    const cep = inputCep.value.replace(/\D/g, "");

    if(cep.length !== 8){

        abrirModal("Digite um CEP válido.");

        return;
    }

    botao.disabled = true;
    botao.textContent = "Buscando...";

    try{

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        const dados = await resposta.json();

        if(dados.erro){

            abrirModal("CEP não encontrado.");

            return;
        }

        preencherDados(dados);

        salvarHistorico(dados.cep);

    }
    catch(erro){

        abrirModal("Erro ao consultar CEP.");

        console.error(erro);

    }
    finally{

        botao.disabled = false;
        botao.textContent = "Pesquisar";

    }

}

function preencherDados(dados){

    document.getElementById("numeroCep").textContent = dados.cep;

    document.getElementById("logradouro").textContent =
        dados.logradouro;

    document.getElementById("complemento").textContent =
        dados.complemento || "-";

    document.getElementById("bairro").textContent =
        dados.bairro;

    document.getElementById("localidade").textContent =
        dados.localidade;

    document.getElementById("uf").textContent =
        dados.uf;

    document.getElementById("estado").textContent =
        dados.estado;

    const endereco =
        `${dados.logradouro}, ${dados.localidade}, ${dados.uf}`;

    const linkMapa =
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;

    document.getElementById("mapaLink").href =
        linkMapa;
}

function salvarHistorico(cep){

    let historico =
        JSON.parse(
            localStorage.getItem("historicoCep")
        ) || [];

    historico = historico.filter(
        item => item !== cep
    );

    historico.unshift(cep);

    historico = historico.slice(0, 5);

    localStorage.setItem(
        "historicoCep",
        JSON.stringify(historico)
    );

    renderizarHistorico();
}

function renderizarHistorico(){

    const lista =
        document.getElementById("listaHistorico");

    lista.innerHTML = "";

    const historico =
        JSON.parse(
            localStorage.getItem("historicoCep")
        ) || [];

    historico.forEach(cep => {

        const li =
            document.createElement("li");

        li.textContent = cep;

        li.addEventListener("click", () => {

            inputCep.value = cep;

            buscarCEP();

        });

        lista.appendChild(li);

    });

}

function abrirModal(mensagem){

    document.getElementById(
        "mensagemModal"
    ).textContent = mensagem;

    document.getElementById(
        "modal"
    ).style.display = "flex";
}

function fecharModal(){

    document.getElementById(
        "modal"
    ).style.display = "none";
}