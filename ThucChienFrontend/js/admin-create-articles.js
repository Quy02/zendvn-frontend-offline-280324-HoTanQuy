// Access Key: xdvvEoA6bpVlTylU64l036V-jseW8j-nmzTy3exErc8
// Secret Key: wYOaUDET3mGfA2YfYkSBYg3tvaZNdjTo7tVFbBLPSoI
// https://api.unsplash.com/photos/random?client_id=xdvvEoA6bpVlTylU64l036V-jseW8j-nmzTy3exErc8&orientation=landscape

API.callWithToken().get('/auth/me').then((res) => {
    
})
.catch((error)=> {
    window.location.href = 'index-6.html';
})
const elAuthForm = document.getElementById('auth-form');
const elFormMessage = document.getElementById('form-message');
const elThumb = document.getElementById('thumb')
const elThumbReview = document.getElementById('thumbReview')
const elRandomPhoto = document.getElementById('randomPhoto');

ClassicEditor
.create(document.querySelector('#content'))
.catch(error => {
    console.error(error);
});

elAuthForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(elAuthForm);
    const data = Object.fromEntries(formData);
    

    API.callWithToken().post('/articles/create', data).then(res => {
        console.log(data)
        elAuthForm.reset()
        elThumbReview.src='https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'
        showToastMessage("Thêm bài viết thành công!")
    })
    .catch((error) => {
        const errors = error.response.data.errors;
        showFormErrorMessage(errors, elFormMessage)
    })
})

elThumb.addEventListener('input', function (){
    if (elThumb.value) {
        elThumbReview.src = elThumb.value
    }
})

elRandomPhoto.addEventListener('click', function(){
    API.call().get('https://api.unsplash.com/photos/random?client_id=xdvvEoA6bpVlTylU64l036V-jseW8j-nmzTy3exErc8&orientation=landscape').then(res => {
        console.log(res)
        const urlThumb = res.data.urls.regular;
        elThumb.value = urlThumb
        elThumbReview.src = urlThumb
    })
})