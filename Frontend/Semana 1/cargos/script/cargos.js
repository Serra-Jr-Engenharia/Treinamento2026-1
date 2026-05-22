document.addEventListener("DOMContentLoaded", async ()=>{
  try{
    respJson = await fetch("../funcionarios.json");
    resp = await respJson.json();

    classe = document.querySelector("h1").className
    montarExibição(classe, resp)
  }
  catch(error){
    console.log(error);
  }
})

function montarExibição(classe, obj){
  
   let listas = document.querySelector(".listas")
  
  
  obj[classe].forEach(element => {
    
    let lista = document.createElement("ul")

    let chave = Object.keys(element)
    let valor = Object.values(element)

    for(let i =0; i < chave.length; i++){

      let li = document.createElement("li")

      if(valor[i] == true)
        li.textContent = `${chave[i]} : Sim`
      else if(valor[i] == false)
        li.textContent = `${chave[i]} : Não`
      else
        li.textContent = `${chave[i]} : ${valor[i]}`

      if(chave[i] == "nome")
        li.classList.add("nome")
      lista.append(li)
    }
    listas.append(lista)
  })
  }
   