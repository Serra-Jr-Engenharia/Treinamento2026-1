const formulario = document.querySelector('.formulario-cadastro');

const campos = [
    document.getElementById('email'),
    document.getElementById('senha'),
    document.getElementById('confirm-senha')
];

formulario.addEventListener('submit', (evento) =>{

    evento.preventDefault();

    const email = campos[0].value.trim();
    const senha = campos[1].value.trim();
    const confirm = campos[2].value.trim();

    const campoVazio = campos.some(input => input.value.trim() === "");
    if (campoVazio) {
        alert("Atenção, preencha todos os campos obrigatórios!");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, digite um email válido!");
        return;
    }

    if (senha !== confirm) {
        alert("As senhas não são iguais!");
        return;
    }

    alert("Cadastro realizado!\n\nEmail: " + campos[0].value + "\nSenha: " + senha);

});

const olhos = document.querySelectorAll('.olho-aberto');

olhos[0].addEventListener('click', () => {
    if (campos[1].type === 'password') {
        campos[1].type = 'text';
        olhos[0].src = 'olho_fechado.svg'; 
    } else {
        campos[1].type = 'password';
        olhos[0].src = 'olho_aberto.svg';  
    }
});


olhos[1].addEventListener('click', () => {
    if (campos[2].type === 'password') {
        campos[2].type = 'text';
        olhos[1].src = 'olho_fechado.svg';
    } else {
        campos[2].type = 'password';
        olhos[1].src = 'olho_aberto.svg';
    }
});

