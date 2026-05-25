let registros = JSON.parse(localStorage.getItem("registros"))
let content = document.querySelector(".content")

while(content.firstChild){
  content.removeChild(content.firstChild)
}

for(let i = 0; i < registros.length; i++){
  let div = document.createElement("div")
  div.classList.add("content-div")

  let email = document.createElement("p")
  let senha = document.createElement("p")
  let numero = document.createElement("h2")

  numero.textContent = `Número do registro : ${i}`
  email.textContent = `Email: ${registros[i].email}`
  senha.textContent = `Senha: ${registros[i].senha}`

  div.append(numero)
  div.append(email)
  div.append(senha)

  content.append(div)
}