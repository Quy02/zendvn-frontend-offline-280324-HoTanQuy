

const API = {
    call: function () {
        return axios.create({
            baseURL: 'https://apiforlearning.zendvn.com/api/v2/',
        });
    },
    callWithToken: function (token) {
        if (!token) token = localStorage.getItem('ACCESS_TOKEN');
        return axios.create({
            baseURL: 'https://apiforlearning.zendvn.com/api/v2/',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};
dayjs.extend(window.dayjs_plugin_relativeTime);
const elInputSearch = document.getElementById('inputSearch');
const elFormSearch = document.getElementById('formSearch');

const ACCESS_TOKEN = 'ACCESS_TOKEN'

elFormSearch.addEventListener('submit', function (e) {
    e.preventDefault()
})
elInputSearch.addEventListener('keyup', function (e2) {
    if (e2.key === 'Enter') {
        const keyword = elInputSearch.value.trim();
        if (keyword) {
            window.location.href = `blog-3.html?keyword=${keyword}`
        } else {
            alert('Vui long nhap tu khoa')
        }

    }
})
//Hot category
const elHotCategory = document.getElementById('hotCategory')
if (elHotCategory) {
    API.call().get(`categories_news`)
        .then((response) => {
            const data = response.data;
            const categories = data.data;
            let htmlMenu = '';
            categories.forEach((item, index) => {
                const numberAvatar = Math.floor(Math.random() * 5) + 1;
                if (index < 5) {
                    htmlMenu += /*html*/ `<li>
                <a href="blog-2.html?id=${item.id}" style="background-image: url('img/${numberAvatar}.jpg');">
                    <span class="post-tag post-tag-three">${item.name}</span>
                    <span class="right-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                            <path d="M1.72308 16L0 14.2769L11.8154 2.46154H1.23077V0H16V14.7692H13.5385V4.18462L1.72308 16Z" fill="currentcolor"></path>
                            <path d="M1.72308 16L0 14.2769L11.8154 2.46154H1.23077V0H16V14.7692H13.5385V4.18462L1.72308 16Z" fill="currentcolor"></path>
                        </svg>
                    </span>
                </a>
            </li>`
                }
            });
            elHotCategory.innerHTML = htmlMenu;
        })
}
//recent post
let RECENT_POST = JSON.parse(localStorage.getItem('RECENT_POST')) || [];
let recentPostIdString = RECENT_POST.toString()
const elRecentNews = document.getElementById('recentNews');
if (elRecentNews) {
    API.call().get(`articles?limit=3&ids=${recentPostIdString}`)
        .then((response) => {
            console.log(recentPostIdString)
            const articles = response.data.data;
            let html = '';
            articles.forEach((item, index) => {
            html += /*html*/ `                                            
    <div class="hot-post-item">
        ${index === 0 ? `
        <div class="hot-post-thumb">
            <a href="blog-details-two.html?id=${item.id}"><img src="${item.thumb}" alt=""></a>
        </div>` : ''}
        <div class="hot-post-content">
            <a href="blog-2.html?id=${item.category.id}" class="post-tag">${item.category.name}</a>
            <h4 class="post-title"><a href="blog-details-two.html?id=${item.id}">${item.title}</a></h4>
            <div class="blog-post-meta">
                <ul class="list-wrap">
                    <li><i class="flaticon-calendar"></i>${dayjs(item.publish_date).fromNow()}</li>
                    <li><i class="flaticon-history"></i>20 Mins</li>
                </ul>
            </div>
        </div>
    </div>`;
            });
            elRecentNews.innerHTML = html;
        })
}



function showFormErrorMessage(errors, el) {
    let errString = '';
    for (const property in errors) {
        errString += `<li>${errors[property]}</li>`;
    }
    el.innerHTML = `<div class="alert alert-danger" role="alert"><ul>${errString}</ul></div>`;
}

function showToastMessage(message) {
    Toastify({

        text: message,

        duration: 3000,
        close: true

    }).showToast();
}