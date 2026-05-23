const formulario = document.getElementById('form-cadastro');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    if (email === "" || senha === "" || confirmarSenha === "") {
        alert("Preencha todos os campos obrigatórios");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não são iguais");
        return;
    }

    alert(`Dados preenchidos:\nEmail: ${email}\nSenha: ${senha}`);
    
});