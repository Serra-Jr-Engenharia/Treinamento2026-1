

if(!(localStorage.getItem("registros"))){
  let registros = []
  localStorage.setItem("registros", JSON.stringify(registros))
}

document.addEventListener( "click", (event) => {
  let classe = event.target.classList
  let toast = document.querySelector(".toast")
  let overlay = document.querySelector(".overlay")

  
  if(classe.value == "card-form-btn"){

  let email = document.querySelector(".input-email").value
  let senha = document.querySelector(".input-senha").value
  let confirmar = document.querySelector(".input-confirmar").value

 
  let toast = document.querySelector(".toast")
 
  let overlay = document.querySelector(".overlay")


  let toastBody = document.querySelector(".toast-body-content")
  let aviso = document.createElement("p")
  
   while(toastBody.firstChild){
      toastBody.removeChild(toastBody.firstChild)
    }

  if(email == "" || senha == "" || confirmar == ""){
  
    aviso.textContent = "Preencha todos os elementos obrigatórios do formulario"
    aviso.classList.add("toast-body-aviso")
    toastBody.prepend(aviso)
    toast.classList.add("ativo")
    overlay.classList.add("ativo")
    return
  }
  else if(senha == senha.toLowerCase()){
    aviso.textContent = "A senha deve conter ao menos um caracter maiusculo"
    aviso.classList.add("toast-body-aviso")
    toastBody.prepend(aviso)
    toast.classList.add("ativo")
    overlay.classList.add("ativo")
    return
  }
  else if(senha != confirmar){
    aviso.textContent = "A senhas não são iguais"
    aviso.classList.add("toast-body-aviso")
    toastBody.prepend(aviso)
    toast.classList.add("ativo")
    return
  }
  else{
    
    document.querySelector(".input-confirmar").value= ""
    document.querySelector(".input-senha").value = ""
    document.querySelector(".input-email").value = ""


    let lista = document.createElement("ul")
    lista.classList.add("toast-body-list")



    let liemail = document.createElement("li")
    let lisenha = document.createElement("li")
    let liconfirmar = document.createElement("li")

    liemail.textContent = `Email: ${email}`
    lisenha.textContent = `Senha: ${senha}`
    liconfirmar.textContent = `Confirmação: ${confirmar}`


    lista.append(liemail)
    lista.append(lisenha)
    lista.append(liconfirmar)
   
  

    toastBody.prepend(lista)
    toast.classList.add("ativo")
    overlay.classList.add("ativo")
    
    let registros = JSON.parse(localStorage.getItem("registros"))
   
    let formularioPreenchido = {
    email: email,
    senha: senha
    }
    registros.push(formularioPreenchido)
    localStorage.setItem("registros",  JSON.stringify(registros))

    return
  }
  }

  if(classe.value == "toast-body-btn"){
    window.location.href = "Registros/registros.html"
  }
  let nomedaclasse = classe.value
  if(!(nomedaclasse.includes("toast")) && (toast.classList.contains("ativo")) && (overlay.classList.contains("ativo"))){

    toast.classList.remove("ativo")
    overlay.classList.remove("ativo")
  }
})

  