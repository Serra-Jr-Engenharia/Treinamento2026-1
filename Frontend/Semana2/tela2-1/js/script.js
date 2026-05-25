let number = document.querySelector(".card-counter-number");

let add = document.querySelector(".button-add")
let rmv = document.querySelector(".button-rmv")

if(localStorage.getItem("presidentes") == null){
  localStorage.setItem("presidentes", "0")
}

if(localStorage.getItem("diretores") == null){
  localStorage.setItem("diretores", "0")
}

if(localStorage.getItem("assessores") == null){
  localStorage.setItem("assessores", "0")
}

if(localStorage.getItem("estagiarios") == null){
  localStorage.setItem("estagiarios", "0")
}

document.querySelector(".contador-diretores").textContent = localStorage.getItem("diretores")
document.querySelector(".contador-presidentes").textContent = localStorage.getItem("presidentes")
document.querySelector(".contador-assessores").textContent = localStorage.getItem("assessores")
document.querySelector(".contador-estagiarios").textContent = localStorage.getItem("estagiarios")



let contador = localStorage.getItem("total") || 0


number.textContent = contador


attTotal()
document.addEventListener("click", (event) => {
  let classe = event.target.classList
  
  if( classe.value == "title-presidentes"){
    document.querySelector(".button-add").classList.remove("bloqueado")
    document.querySelector(".button-rmv").classList.remove("bloqueado")
    document.querySelector(".card-title-text").textContent = "Quantidade de Presidentes na Equipe"
  
    let x = document.querySelector(".contador-presidentes")

    number.textContent = parseInt(x.textContent)
    
    add.dataset.value = "presidentes"
    rmv.dataset.value = "presidentes"
    
  }

   if( classe.value == "title-diretores"){
    document.querySelector(".button-add").classList.remove("bloqueado")
    document.querySelector(".button-rmv").classList.remove("bloqueado")
    document.querySelector(".card-title-text").textContent = "Quantidade de Diretores na Equipe"
  
    let x = document.querySelector(".contador-diretores")

    number.textContent = parseInt(x.textContent)

    add.dataset.value = "diretores"
    rmv.dataset.value = "diretores"

  }

   if( classe.value == "title-assessores"){
    document.querySelector(".button-add").classList.remove("bloqueado")
    document.querySelector(".button-rmv").classList.remove("bloqueado")
    document.querySelector(".card-title-text").textContent = "Quantidade de Assessores na Equipe"
  
    let x = document.querySelector(".contador-assessores")

    number.textContent = parseInt(x.textContent)

    add.dataset.value = "assessores"
    rmv.dataset.value = "assessores"
  }

   if( classe.value == "title-estagiarios"){
    document.querySelector(".button-add").classList.remove("bloqueado")
    document.querySelector(".button-rmv").classList.remove("bloqueado")
    document.querySelector(".card-title-text").textContent = "Quantidade de Estagiarios na Equipe"
  
    let x = document.querySelector(".contador-estagiarios")

    number.textContent = parseInt(x.textContent)

    add.dataset.value = "estagiarios"
    rmv.dataset.value = "estagiarios"
  }

   if( classe.value == "title-total"){
    document.querySelector(".button-rmv").classList.add("bloqueado")
    document.querySelector(".button-add").classList.add("bloqueado")
    document.querySelector(".card-title-text").textContent = "Quantidade de Integrantes na Equipe"
  
    let x = document.querySelector(".contador-total")

    number.textContent = parseInt(x.textContent)

    add.dataset.value = "total"
    rmv.dataset.value = "total"

  }

  if(classe.value == "button-add"){

    let x = parseInt(number.textContent) + 1
    number.textContent = x

    if(add.dataset.value == "presidentes"){
    
      document.querySelector(".contador-presidentes").textContent = x
      attTotal()
      localStorage.setItem("presidentes", x)
    }

      if(add.dataset.value == "diretores"){
 
      document.querySelector(".contador-diretores").textContent = x
      attTotal()
      localStorage.setItem("diretores", x)
    }

     if(add.dataset.value == "assessores"){
      
      document.querySelector(".contador-assessores").textContent = x
      attTotal()
      localStorage.setItem("assessores", x)
    }

      if(add.dataset.value == "estagiarios"){

      document.querySelector(".contador-estagiarios").textContent = x
      attTotal()
      localStorage.setItem("estagiarios", x)
    }


  }

  else if(classe.value == "button-rmv" && number.textContent > 0){

    let x = parseInt(number.textContent) - 1
    number.textContent = x

    if(rmv.dataset.value == "presidentes"){

      document.querySelector(".contador-presidentes").textContent = x
      attTotal()
      localStorage.setItem("presidentes", x)
    }

      if(rmv.dataset.value == "diretores"){

      document.querySelector(".contador-diretores").textContent = x
      attTotal()
      localStorage.setItem("diretores", x)
    }

     if(rmv.dataset.value == "assessores"){

      document.querySelector(".contador-assessores").textContent = x
      attTotal()
      localStorage.setItem("assessores", x)
    }

      if(rmv.dataset.value == "estagiarios"){
 
      document.querySelector(".contador-estagiarios").textContent = x
      attTotal()
      localStorage.setItem("estagiarios", x)
      
    }

       if(rmv.dataset.value == "total"){
        document.querySelector(".button-rmv").classList.add("bloqueado")
    }

  }


})

function attTotal(){
   let total = parseInt(document.querySelector(".contador-presidentes").textContent) +
   parseInt(document.querySelector(".contador-diretores").textContent) + 
   parseInt(document.querySelector(".contador-assessores").textContent) + 
   parseInt(document.querySelector(".contador-estagiarios").textContent)

   document.querySelector(".contador-total").textContent = total

   localStorage.setItem("total", total)
}