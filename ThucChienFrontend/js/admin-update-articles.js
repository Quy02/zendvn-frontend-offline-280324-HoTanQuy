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
const elTitle = document.getElementById('title')
const elCategory_id = document.getElementById('category_id')
const elThumbReview = document.getElementById('thumbReview')
const elRandomPhoto = document.getElementById('randomPhoto');
const elContent = document.getElementById('content')
const elDescription = document.getElementById('description')
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get('id'));
let editor;
ClassicEditor
.create(document.querySelector('#content'))
.then((newEditor) =>{
    editor = newEditor;
})
.catch(error => {
    console.error(error);
});

API.call().get(`/articles/${id}`).then((res)=>{
    const articles = res.data.data
    console.log(articles)
    elThumb.value = articles.thumb
    elThumbReview.src = articles.thumb
    elTitle.value = articles.title
    elCategory_id.value = articles.category.id
    elContent.value = articles.content
    editor.setData(articles.content);
    elDescription.value = articles.description
})
elRandomPhoto.addEventListener('click', function(e){
    e.preventDefault();
    API.call().get('https://api.unsplash.com/photos/random?client_id=xdvvEoA6bpVlTylU64l036V-jseW8j-nmzTy3exErc8&orientation=landscape').then(res => {
        const urlThumb = res.data.urls.regular;
        elThumb.value = urlThumb
        elThumbReview.src = urlThumb
    })
})
elAuthForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(elAuthForm);
    const data = Object.fromEntries(formData);

    API.callWithToken().put(`/articles/${id}`, data).then(res => {
        console.log(res)
        showToastMessage("Cập nhật bài viết thành công!")
        window.location.href = 'admin-list-articles.html';
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

