const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const confirmarSenhaInput = document.getElementById('confirmarSenha');
const btnEntrar = document.getElementById('btnEntrar');
const toggleButtons = document.querySelectorAll('.toggle-password');

btnEntrar.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    const confirmarSenha = confirmarSenhaInput.value;

    if (!email || !senha || !confirmarSenha) {
        alert('Preencha todos os campos obrigatórios');
        return;
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não são iguais');
        return;
    }

    alert(`Dados preenchidos:\nEmail: ${email}\nSenha: ${senha}`);
});

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const inputElement = document.getElementById(targetId);

        if (inputElement.type === 'password') {
            inputElement.type = 'text';
        } else {
            inputElement.type = 'password';
        }
    });
});