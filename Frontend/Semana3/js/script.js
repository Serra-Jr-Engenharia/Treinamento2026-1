const btn = document.querySelector(".submit-btn")

const input = document.querySelector(".input-cep")

input.addEventListener("input", () => {
  input.value = input.value.replace(/\D/g, "")
})

btn.addEventListener("click", async () =>{

  let url = "https://viacep.com.br/ws/"
  let cep = pegarCEP()
  let urlCompleta = url + cep +"/json/"


  try{ 
    let json = await fetch(urlCompleta)
    let resp = await json.json()
    if(resp.erro)
      limpar()
    else
      montarExibicao(resp)
  }catch(error){

  limpar()

  }
})


function pegarCEP(){
  let input = document.querySelector(".input-cep")

  let valor = input.value
  input.value = ""
  return valor
}


function montarExibicao(obj) {
  let titulo = document.querySelector(".card-title-text")
  let content = document.querySelector(".card-body")
  let cardTitle = document.querySelector(".card-title")

  content.classList.remove("ativo")
  cardTitle.classList.remove("ativo")


  titulo.textContent = "CEP"
  while(content.firstChild){
    content.removeChild(content.firstChild)
  }

  titulo.textContent += ": " + obj["cep"]


  let ul = document.createElement("ul")

  let li1 = document.createElement("li")
  li1.textContent = `Logradouro : ${obj.logradouro || "Não informado"}`
  ul.append(li1)

  let li2 = document.createElement("li")
  li2.textContent = `Complemento : ${obj.complemento || "Não informado"}`
  ul.append(li2)

  let li3 = document.createElement("li")
  li3.textContent = `Bairro : ${obj.bairro || "Não informado"}`
  ul.append(li3)

  let li4 = document.createElement("li")
  li4.textContent = `Localidade : ${obj.localidade}`
  ul.append(li4)

  let li5 = document.createElement("li")
  li5.textContent = `UF : ${obj.uf}`
  ul.append(li5)

  let li6 = document.createElement("li")
  li6.textContent = `Estado : ${obj.estado}`
  ul.append(li6)

  content.append(ul)
}

function limpar (){
  alert("Forneça um CEP válido.")
  let titulo = document.querySelector(".card-title-text")
  let content = document.querySelector(".card-body")
  let cardTitle = document.querySelector(".card-title")

  content.classList.add("ativo")
  cardTitle.classList.add("ativo")


  titulo.textContent = "CEP"
  while(content.firstChild){
    content.removeChild(content.firstChild)
  }
}