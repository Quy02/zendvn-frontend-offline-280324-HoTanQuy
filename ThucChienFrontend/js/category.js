

const elArticles = document.getElementById('articles');
const elCategoryTitle = document.getElementById('categoryTitle');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get('id'));
const elbtnLoadMore = document.getElementById('btnLoadMore')
const elmyPagination = document.getElementById('myPagination')
let currentPage = parseInt(urlParams.get('page'));
if (isNaN(currentPage)) currentPage = 1;
// if (isNaN(id)) window.location.href = 'index-6.html'

//categories_news/2/articles?limit=5&page=1
API.call().get(`categories_news/${id}/articles?limit=5&page=1`).then((response) => {
    const articles = response.data.data;
    let categoryName = '';
    let html = "";
    articles.forEach(item => {
        const title = item.title
        const thumb = item.thumb
        categoryName = item.category.name
        html += /* html */`                                   
        <div class="weekly-post-item weekly-post-four">
        <div class="weekly-post-thumb">
            <a href="blog-details-two.html?id=${item.id}"><img src="${thumb}" alt=""></a>
        </div>
        <div class="weekly-post-content">
            <a href="blog-2.html?id=${item.category.id}" class="post-tag">${item.category.name}</a>
            <h2 class="post-title"><a href="blog-details-two.html?id=${item.id}">${title}</a></h2>
            <div class="blog-post-meta">
                <ul class="list-wrap">
                    <li><i class="flaticon-calendar"></i>${dayjs(item.publish_date).fromNow()}</li>
                    <li><i class="flaticon-history"></i>20 Mins</li>
                </ul>
            </div>
            <p>${item.description}</p>
            <div class="view-all-btn">
                <a href="blog-details-two.html?id=${item.id}" class="link-btn">Read More
                    <span class="svg-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="none">
                            <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="currentColor" />
                            <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="currentColor" />
                        </svg>
                    </span>
                </a>
            </div>
        </div>
    </div>`
    })
    elArticles.innerHTML = html;
    elCategoryTitle.innerText = categoryName

})

// elbtnLoadMore.addEventListener('click', function (){
//     currentPage++;
//     elbtnLoadMore.innerText = "Dang tai them..."
//     elbtnLoadMore.disabled = true
//     getArticles(currentPage);

// })
getArticles();
function getArticles(page = 1) {
    API.call().get(`categories_news/${id}/articles?limit=5&page=${page}`).then((response) => {
        const articles = response.data.data;
        let categoryName = '';
        const totalPages = response.data.meta.last_page
        let html = "";
        articles.forEach(item => {
            const title = item.title
            const thumb = item.thumb
            categoryName = item.category.name
            html += /* html */`                                   
            <div class="weekly-post-item weekly-post-four">
            <div class="weekly-post-thumb">
                <a href="blog-details-two.html?id=${item.id}"><img src="${thumb}" alt=""></a>
            </div>
            <div class="weekly-post-content">
                <a href="blog-2.html?id=${item.category.id}" class="post-tag">${item.category.name}</a>
                <h2 class="post-title"><a href="blog-details-two.html?id=${item.id}">${title}</a></h2>
                <div class="blog-post-meta">
                    <ul class="list-wrap">
                        <li><i class="flaticon-calendar"></i>${dayjs(item.publish_date).fromNow()}</li>
                        <li><i class="flaticon-history"></i>20 Mins</li>
                    </ul>
                </div>
                <p>${item.description}</p>
                <div class="view-all-btn">
                    <a href="blog-details-two.html?id=${item.id}" class="link-btn">Read More
                        <span class="svg-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="none">
                                <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="currentColor" />
                                <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="currentColor" />
                            </svg>
                        </span>
                    </a>
                </div>
            </div>
        </div>`
        })
        elArticles.innerHTML = html;
        elCategoryTitle.innerText = categoryName
        RenderPagination(totalPages)
        // elbtnLoadMore.innerText = "Xem them"
        // elbtnLoadMore.disabled = false

    })
}
elmyPagination.addEventListener('click', function (e) {
    const el = e.target
    if (el.classList.contains('page-link') && !el.classList.contains('page-item-pre') && !el.classList.contains('page-item-next')) {
        currentPage = parseInt(el.innerText);
        getArticles(currentPage);
        addOrUpdateParameter('page', currentPage)

    }
    if (el.classList.contains('page-item-pre')) {
        currentPage--;
        getArticles(currentPage)
        addOrUpdateParameter('page', currentPage)
    }
    if (el.classList.contains('page-item-next')) {
        currentPage++;
        getArticles(currentPage)
        addOrUpdateParameter('page', currentPage)
    }
})
function RenderPagination(total) {
    const disabledPrev = currentPage === 1 ? 'pointer-events-none' : '';
    let html = `<li class="page-item"><a class="page-link page-item-pre ${disabledPrev}" href="#">Pre</a></li>`
    for (let index = 1; index < total; index++) {
        const active = index === currentPage ? 'active pointer-events-none' : ''
        html += /* html */ `<li class="page-item ${active}"><a class="page-link" href="#">${index}</a></li>`
    }
    const disabledNext = currentPage === total ? 'pointer-events-none' : '';
    console.log("tong trang", currentPage)
    console.log("tong trang", total)
    html += `<li class="page-item"><a class="page-link page-item-next ${disabledNext}" href="#">next</a></li>`
    elmyPagination.innerHTML = html
}

function addOrUpdateParameter(key, value) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.set(key, value)
    const newUrl = window.location.pathname + '?' + urlParams.toString();
    history.pushState(null, '', newUrl)
}