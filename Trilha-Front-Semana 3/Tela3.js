function buscarCEP() {

    const cep = document.getElementById("CEP").value;
    

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((r) => r.json())
        .then((dados) => {

            
            document.getElementById("mapa").innerHTML =
                `Mapa: 📍 <a id="linkmapa" href="#" target="_blank">Ver no Google Maps</a>`;
            
            document.getElementById("titulo_cep").innerHTML =
                `CEP ${cep}`;

            document.getElementById("logradouro").innerHTML =
                `Logradouro: ${dados.logradouro}`;

            document.getElementById("complemento").innerHTML =
                `Complemento: ${dados.complemento}`;

            document.getElementById("bairro").innerHTML =
                `Bairro: ${dados.bairro}`;

            document.getElementById("localidade").innerHTML =
                `Localidade: ${dados.localidade}`;

            document.getElementById("uf").innerHTML =
                `UF: ${dados.uf}`;

            document.getElementById("estado").innerHTML =
                `Estado: ${dados.estado}`;
                        const endereco = `${dados.logradouro}, ${dados.localidade}, ${dados.uf}`;
            const urlMaps = `https://www.google.com/maps/search/?api=1&query=${endereco}`;

            document.getElementById("linkmapa").href = urlMaps;
        });
}
