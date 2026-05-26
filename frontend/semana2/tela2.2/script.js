const formCadastro = document.getElementById('formCadastro');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const confirmarSenhaInput = document.getElementById('confirmarSenha');

formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    const confirmarSenha = confirmarSenhaInput.value;

    if (!email || !senha || !confirmarSenha) {
        alert("Preencha todos os campos obrigatórios");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não são iguais");
        return;
    }

    alert(`Dados preenchidos:\nEmail: ${email}\nSenha: ${senha}`);
});
