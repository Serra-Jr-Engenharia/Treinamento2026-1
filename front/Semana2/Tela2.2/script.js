function criar(){
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var confirmar = document.getElementById("confirmar").value;

    if (email === ""||senha === ""||confirmar === "") {
        alert("Preencha todos os campos obrigatórios");
        return;
    }

    if (senha!==confirmar){
        alert("As senhas não são iguais");
        return;
    }

    alert(
        "Cadastro Criado!\n"+"Email:"+" "+ email +"\n"+"Senha:"+" "+senha    
    )
}