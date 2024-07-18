API.callWithToken().get('/auth/me').then((res) => {

})
    .catch((error) => {
        window.location.href = 'index-6.html';
    })

const elArticles = document.getElementById('articles')

API.callWithToken().get('/articles/my-articles').then(res => {
    const articles = res.data.data;
    let html = ''
    articles.forEach((item) => {
        const status = item.status === '1' ? 'checked' : ''
        html += /*html*/`                
            <tr>
                <td>${item.id}</td>
                <td><img src="${item.thumb}" alt="Thumbnail 1" class="img-thumbnail" width="100" height="100"></td>
                <td>${item.title}</td>
                <td>${renderSlbCategory(item.category.id, item.id)}</td>
                <td><input type ="checkbox" class="form-check-input text-center chk-status" data-id="${item.id}" ${status}/></td>
                <td class="text-center w-auto">
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <a href="admin-update-articles.html?id=${item.id}" class="btn btn-primary me-1"  style="background-color: rgb(192, 61, 0);">View</a>
                        <a href="admin-update-articles.html?id=${item.id}" class="btn btn-secondary me-1" style="background-color: rgb(0, 106, 192);">Edit</a>
                        <button type="button" class="btn btn-danger me-1 delete-articles" style="background-color: rgb(30, 198, 0);" data-id="${item.id}">Delete</button>
                    </div>
                </td>
            </tr>`
    })
    elArticles.innerHTML = html
})
    .catch((error) => {
        const errors = error.response.data.errors;
        showFormErrorMessage(errors, elFormMessage)
    })
elArticles.addEventListener('change', function(e){
    const el = e.target
    if (el.classList.contains('category')) {
        const CategoryId = el.value;
        const articlesId = el.dataset.id
        API.callWithToken().patch(`/articles/${articlesId}`, {category_id: CategoryId})
        .then((res)=>{
            showToastMessage("Thay đổi danh mục thành công!")
        })
    }

    if (el.classList.contains('chk-status')) {
        const status = el.checked ? 1 : 0;
        const articlesId = el.dataset.id
        API.callWithToken().patch(`/articles/${articlesId}`, {status})
        .then((res)=>{
            showToastMessage("Thay đổi trạng thái thành công!")
        })
    }

})

elArticles.addEventListener('click', function(e){
    const el = e.target
    if (el.classList.contains('delete-articles')) {
        const articlesId = el.dataset.id
        
        API.callWithToken().delete(`/articles/${articlesId}`)
        .then((res)=>{
            showToastMessage("Xóa bài viết thành công!")
            el.parentElement.parentElement.parentElement.remove();
        })
    }

})
function renderSlbCategory(id, articlesID) {
    const categories = [
        { id: 1, name: 'Thế giới' },
        { id: 2, name: 'Thời sự' },
        { id: 3, name: 'Kinh doanh' },
        { id: 5, name: 'Giải trí' },
        { id: 6, name: 'Thể thao' },
        { id: 7, name: 'Pháp luật' },
        { id: 8, name: 'Giáo dục' },
        { id: 9, name: 'Sức khỏe' },
        { id: 10, name: 'Đời sống' },
        { id: 11, name: 'Du lịch' },
        { id: 12, name: 'Khoa học' },
        { id: 13, name: 'Số hóa' },
        { id: 14, name: 'Xe' },
    ]

    let html = '';
    categories.forEach((item)=> {
        const selected = item.id === id ? 'selected' : '';
        html += `<option value="${item.id}" ${selected}>${item.name}</option>`
    })
        return /*html*/`
        <select class="form-select category" id="category_id" data-id="${articlesID}" name="category_id">
            ${html}
        </select>`;
}
    