const form = document.querySelector('.fields');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const alertSpan = document.getElementById('alert');

form.addEventListener('submit', (event) => {
    if (password.value !== confirmPassword.value) {
        event.preventDefault();
        alertSpan.classList.remove('hidden');
        password.style.borderColor = 'red';
        confirmPassword.style.borderColor = 'red';
    } else {
        alertSpan.classList.add('hidden');
        alert("Cadastro realizado com sucesso!");
    }
});

[password, confirmPassword].forEach(input => {
    input.addEventListener('input', () => {
        alertSpan.classList.add('hidden');
        password.style.borderColor = '';
        confirmPassword.style.borderColor = '';
    });
});