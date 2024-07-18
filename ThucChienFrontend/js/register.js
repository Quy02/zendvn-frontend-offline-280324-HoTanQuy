
API.callWithToken().get('/auth/me').then((res) => {
    window.location.href = 'index-6.html';
});
const elAuthForm = document.getElementById('auth-form');
const elEmail = document.getElementById('email');
const elPassword = document.getElementById('password');
const elFormMessage = document.getElementById('form-message');
const elName = document.getElementById('name');
const elAddress = document.getElementById('address');
const elphone = document.getElementById('phone');


elAuthForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(elAuthForm);
    const data = Object.fromEntries(formData);

    API.call().post('users/register', data)
        .then(function (responseRegister) {
            const dataLogin = { email: data.email, password: data.password };
            API.call().post('/auth/login', dataLogin).then(function (responseLogin) {
                window.location.href = 'index-6.html';
            })
        })
        .catch(function (error) {
            const errors = error.response ? error.response.data.errors : ['An unknown error occurred'];
            showFormErrorMessage(errors, elFormMessage);
        });
});

