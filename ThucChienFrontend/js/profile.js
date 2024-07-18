API.callWithToken().get('/auth/me').then((res) => {
    
})
.catch((error)=> {
    window.location.href = 'index-6.html';
})
const token = localStorage.getItem(ACCESS_TOKEN);
const elEmail = document.getElementById('email');
const elFormMessage = document.getElementById('form-message');
const elName = document.getElementById('name');
const elAddress = document.getElementById('address');
const elPhone = document.getElementById('phone');
const elAuthForm = document.getElementById('auth-form');
API.callWithToken().get('/auth/me').then(resMe => {
    const data = resMe.data.data;
    elEmail.value = data.email
    elName.value = data.name
    elAddress.value = data.address
    elPhone.value = data.phone
}).catch((err) => {
    console.log(err)
});

elAuthForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(elAuthForm);
    const data = Object.fromEntries(formData);

    API.callWithToken().put('/auth/update', data)
        .then(function (responseRegister) {
            elFormMessage.innerHTML = `<div class="alert alert-success" role="alert"><ul>Cập nhật thông tin thành công!</ul></div>`;
        })
        .catch(function (error) {
            const errors = error.response.data.errors;
            showFormErrorMessage(errors, elFormMessage)
        });
});