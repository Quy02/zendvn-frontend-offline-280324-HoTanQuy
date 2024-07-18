const token = localStorage.getItem(ACCESS_TOKEN);
API.callWithToken().get('/auth/me').then((res)=> {
    window.location.href = 'index-6.html';
});
const elAuthForm = document.getElementById('auth-form');
const elEmail = document.getElementById('email');
const elPassword = document.getElementById('password');
const elFormMessage = document.getElementById('form-message');

elAuthForm.addEventListener('submit', function(e){
    e.preventDefault();
    const formData = new FormData(elAuthForm);
    const data = Object.fromEntries(formData)

    API.call().post('auth/login', data)
      .then(function (response) {
        console.log(response);
        const token = response.data.access_token
        localStorage.setItem(ACCESS_TOKEN, token)
        window.location.href = 'index-6.html'
      })
      .catch(function (error) {
        console.log(error);
        elFormMessage.innerHTML = `<div class="alert alert-danger" role="alert">Thông đăng nhập không đúng</div>`;
        elEmail.value = ''
        elPassword.value = ''
      });
});
