API.callWithToken().get('/auth/me').then((res) => {
    
})
.catch((error)=> {
    window.location.href = 'index-6.html';
})
const token = localStorage.getItem(ACCESS_TOKEN);
const elFormMessage = document.getElementById('form-message');
const elPassword = document.getElementById('password');
const elPasswordCurrent = document.getElementById('password_current');
const elPasswordConfirmation = document.getElementById('password_confirmation');
const elAuthForm = document.getElementById('auth-form');

elAuthForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(elAuthForm);
    const data = Object.fromEntries(formData);

    API.callWithToken().put('/auth/change-password', data).then(res => {
        elPassword.value = ''
        elPasswordCurrent.value = ''
        elPasswordConfirmation.value = ''
        elFormMessage.innerHTML = `<div class="alert alert-success" role="alert"><ul>Thay đổi mật khẩu thành công!</ul></div>`;
    })
    .catch((error) => {
        const errors = error.response.data.errors;
        showFormErrorMessage(errors, elFormMessage)
    })
})