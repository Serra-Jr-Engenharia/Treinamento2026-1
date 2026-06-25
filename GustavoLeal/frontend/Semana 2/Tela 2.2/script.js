function criar() {

    const email = document.querySelector('input[type="email"]').value;
    const senha = document.querySelectorAll('input[type="password"]')[0].value;
    const confirmarSenha = document.querySelectorAll('input[type="password"]')[1].value;

    if(email === "" || senha === "" || confirmarSenha === "") {
        mostrarAlerta("Preencha todos os campos obrigatórios");
        return;
    }

    if(senha !== confirmarSenha) {
        mostrarAlerta("As senhas não são iguais");
        return;
    }

        mostrarAlerta(
            "Email: " + email +
            "\nSenha: " + senha
        );
}

function mostrarSenha(id) {

    const input = document.getElementById(id);

    if(input.type === "password") {
        input.type = "text";
    } 
    
    else {
        input.type = "password";
    }
}

function mostrarAlerta(texto){

    const alerta = document.getElementById("alerta");
    const mensagem = document.getElementById("mensagem");

    mensagem.innerText = texto;
    alerta.style.display = "flex";
}

function fecharAlerta(){
    
    document.getElementById("alerta").style.display = "none";
}