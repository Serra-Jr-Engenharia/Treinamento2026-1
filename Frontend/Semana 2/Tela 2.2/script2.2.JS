function criar(){
        var email = document.getElementById("email").value;
        var senha = document.getElementById("senha").value;
        var confirmarSenha = document.getElementById("confirmar-senha").value;

        if(email === "" || senha === "" || confirmarSenha === ""){
            alert("Por favor, preencha todos os campos.");
            return;
        }

        if(senha === confirmarSenha){
            alert("Cadastro realizado com sucesso!");
        } else {
            alert("As senhas não coincidem. Por favor, tente novamente.");
        }
    }