
function verificacao() {
    var email = document.getElementById('email').value
    var senha = document.getElementById('senha').value
    var confsenha = document.getElementById('confsenha').value

    if (email === '' || senha === '' || confsenha === '') {
        alert('Preencha todos os campos obrigatórios')
    }

    else if (senha === confsenha) {
        alert('Seus dados são: ' + 'Email: '+ email + ' Senha: '+' ' + senha)
    }

    else {
        alert('As senhas não são iguais')
    }

}