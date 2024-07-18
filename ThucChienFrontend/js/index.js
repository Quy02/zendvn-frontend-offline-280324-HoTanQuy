
const elArticlesTrending1 = document.getElementById('articlesTrending1');
const elArticlesTrending2 = document.getElementById('articlesTrending2');
const elBannerPostSix = document.getElementById('bannerPostSix');
const elNewsBannerSmallPost = document.getElementById('newsBannerSmallPost');

const elCategory1Main = document.getElementById('politicsPost');
const elCategory1Secondary = document.getElementById('politicsPostWrapTwo');
const elCategory1 = document.getElementById('PoliticsPostArea');

const elCategoryEntertainment = document.getElementById('categoryEntertainment')


API.call().get(`categories_news`)
    .then((response) => {
        const data = response.data;
        const categories = data.data;

        let htmlMenu = '';
        let htmlMenuOther = '';
        categories.forEach((item, index) => {
            if (index < 3) {
                htmlMenu += `<li><a href="blog-2.html?id=${item.id}">${item.name}</a></li>`
            }
            else {
                htmlMenuOther += `<li><a href="blog-2.html?id=${item.id}">${item.name}</a></li>`
            }
        });
        elMainMenu.innerHTML = htmlMenu + /* html */`                                                            
    <li class="menu-item-has-children"><a href="#">Danh muc khac</a>
        <ul class="sub-menu">
        ${htmlMenuOther}
        </ul>
    </li>`;
    })

// Render articles trending
// articles/popular?limit=3
API.call().get(`articles/popular?limit=5`)
    .then((response) => {
        const articles = response.data.data;

        let html = '';
        articles.forEach((item, index) => {
            html += renderArticleTrendingItem(item, index);
        })
        elArticlesTrending1.innerHTML = html;
    })
API.call().get(`articles/popular?limit=5`)
    .then((response) => {
        const articles = response.data.data;

        let html = '';
        articles.forEach((item, index) => {
            html += renderArticleTrendingItem2(item, index);
        })
        elArticlesTrending2.innerHTML = html;
    })
// Render articles new
// API.get(`articles?limit=3&page=2`).then((response) => {
API.call().get(`articles?limit=3&page=1`).then((response) => {
    const articles = response.data.data;
    let html = '';
    articles.forEach((item, index) => {
        const publishDate = dayjs(item.publish_date).fromNow();
        if (index === 0) {
            elBannerPostSix.innerHTML = /* html */ `
            <div class="banner-post-thumb-six">
            <a href="blog-details-two.html?id=${item.id}"><img src="${item.thumb}" alt=""></a>
        </div>
        <div class="banner-post-content-six">
            <a href="blog-2.html?id=${item.category.id}" class="post-tag-two">${item.category.name}</a>
            <h2 class="post-title bold-underline"><a href="blog-details-two.html?id=${item.id}">${item.title}</a>
            </h2>
            <div class="blog-post-meta">
                <ul class="list-wrap">
                    <li><i class="flaticon-user"></i>by<a href="author.html">${item.author}</a></li>
                    <li><i class="flaticon-calendar"></i>${publishDate}</li>
                    <li><i class="flaticon-history"></i>20 Mins</li>
                </ul>
            </div>
            <p>${item.description}</p>
        </div>`
        }
        else {
            html += renderArticleNewItem(item, index)
        }
        elNewsBannerSmallPost.innerHTML = html;
    })
})

// render category feature with article
API.call().get(`categories_news/articles?limit_cate=2&limit=4`).then((response) => {
    const data = response.data.data;
    elCategory1.innerHTML = '';
    data.forEach((item, index) => {
        const categoryName = item.name;
        const articles = item.articles;

        let htmlMain = '';
        let htmlSecondary = '';

        articles.forEach((article, articleIndex) => {
            if (articleIndex === 0) {
                htmlMain = /* html */ `
                <div class="politics-post-thumb">
                   <a href="blog-details-two.html?id=${article.id}"><img src="${article.thumb}" alt=""></a>
                </div>
                <div class="politics-post-content">
                   <a href="blog-details-two.html?id=${article.id}" class="post-tag-four">${categoryName}</a>
                   <h2 class="post-title"><a href="blog-details-two.html?id=${article.id}">${article.title}</a></h2>
                   <div class="blog-post-meta">
                      <ul class="list-wrap">
                         <li><i class="flaticon-user"></i>by<a href="author.html">${article.author_info}</a></li>
                         <li><i class="flaticon-calendar"></i>${dayjs(article.publish_date).fromNow()}</li>
                      </ul>
                   </div>
                   <p>${article.description}</p>
                   <div class="view-all-btn">
                      <a href="blog-2.html?id=${item.id}" class="link-btn">
                         Read More
                         <span class="svg-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="none">
                               <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="currentColor" />
                               <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="currentColor" />
                            </svg>
                         </span>
                      </a>
                   </div>
                </div>
                `;
            } else {
                htmlSecondary += /* html */ `                                                
                <div class="politics-post-two">
                <div class="politics-post-content-two">
                    <h2 class="post-title"><a href="blog-details-two.html?id=${article.id}">${article.title}</a></h2>
                    <div class="blog-post-meta">
                        <ul class="list-wrap">
                            <li><i class="flaticon-calendar"></i>${dayjs(article.publish_date).fromNow()}</li>
                        </ul>
                    </div>
                </div>
                </div>`;
            }
        });
        // const rowClass = index % 2 === 0 ? '' : 'flex-row-reverse'
        elCategory1.innerHTML += /* html */`
        <section class="politics-post-area" id="PoliticsPostArea">
        <div class="section-title-wrap">
            <div class="section-title section-title-four">
                <h2 class="title">${categoryName}</h2>
                <div class="section-title-line"></div>
            </div>
        </div>
        <div class="politics-post-wrap">
            <div class="row">
                <div class="col-69">
                    <div class="politics-post">
                        ${htmlMain}
                    </div>
                </div>
                <div class="col-31">
                    <div class="politics-post-wrap-two">
                        ${htmlSecondary}
                    </div>
                </div>
            </div>
        </div>
    </section>`;
    });
});

// Giải trí
API.call().get(`categories_news/5/articles?limit=3&page=5`).then((response) => {
    const data = response.data.data;
    let html = ''
    let categoryName = ''
    data.forEach((item, index) => {
        categoryName = item.category.name;
        html += /*html*/`                                        
    <div class="col-lg-4 col-md-6">
        <div class="banner-post-five banner-post-seven">
            <div class="banner-post-thumb-five">
                <a href="blog-details-two.html?id=${item.id}"><img src="${item.thumb}" alt=""></a>
            </div>
            <div class="banner-post-content-five">
                <a href="blog-2.html?id=${item.category.id}" class="post-tag-four">${categoryName}</a>
                <h2 class="post-title"><a href="blog-details-two.html?id=${item.id}">${item.description}</a></h2>
                <div class="blog-post-meta">
                    <ul class="list-wrap">
                        <li><i class="flaticon-user"></i>by<a href="author.html">${item.author}</a></li>
                        <li><i class="flaticon-calendar"></i>${dayjs(item.publish_date).fromNow()}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`
    });
    elCategoryEntertainment.innerHTML = html
    document.getElementById('entertainment').innerText = categoryName
});
// Editors' Picks
API.call().get(`articles?limit=8&page=3`).then((response) => {
    const data = response.data.data;
    let html = ''
    let categoryName = ''
    data.forEach((item, index) => {
        categoryName = item.category.name;
        const idx = index % 2 === 0 ? '' : '<a href="https://www.youtube.com/watch?v=G_AEL-Xo5l8" class="paly-btn popup-video"><i class="fas fa-play"></i></a>'
        html += /*html*/`                                        
        <div class="col-lg-3">
        <div class="editor-post-three">
            <div class="editor-post-thumb-three">
                <a href="blog-details-two.html?id=${item.id}"><img src="${item.thumb}" alt=""></a>
                ${idx}
            </div>
            <div class="editor-post-content-three">
                <a href="blog-2.html?id=${item.category.id}" class="post-tag-four">${categoryName}</a>
                <h2 class="post-title"><a href="blog-details-two.html?id=${item.id}">${item.title}</a></h2>
                <div class="blog-post-meta">
                    <ul class="list-wrap">
                        <li><i class="flaticon-calendar"></i>${dayjs(item.publish_date).fromNow()}</li>
                        <li><i class="flaticon-history"></i>20 Mins</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`
    });
    document.getElementById('editorPicks').innerHTML = html
    $('.editor-post-active-two').slick({
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: false,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
        appendArrows: ".editor-nav-two",
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    });


});
// World Top News
API.call().get(`articles?limit=4&page=8`).then((response) => {
    const data = response.data.data;
    let htmlMain = ''
    let htmlSecondary = ''
    let categoryName = ''
    data.forEach((item, index) => {
        categoryName = item.category.name;
        if (index === 0) {
            htmlMain = /*html*/`                                
            <div class="col-12">
            <div class="top-news-post">
                <div class="top-news-post-thumb">
                    <a href="blog-details-two.html?id=${item.id}"><img src="${item.thumb}" alt=""></a>
                    <a href="https://www.youtube.com/watch?v=G_AEL-Xo5l8" class="paly-btn popup-video"><i class="fas fa-play"></i></a>
                </div>
                <div class="top-news-post-content">
                    <a href="blog-2.html?id=${item.category.id}" class="post-tag-four">${categoryName}</a>
                    <h2 class="post-title bold-underline"><a href="blog-details-two.html?id=${item.id}">${item.title}</a></h2>
                    <div class="blog-post-meta">
                        <ul class="list-wrap">
                            <li><i class="flaticon-calendar"></i>${dayjs(item.publish_date).fromNow()}</li>
                            <li><i class="flaticon-history"></i>20 Mins</li>
                        </ul>
                    </div>
                    <p>${item.description}</p>
                    <div class="view-all-btn">
                        <a href="blog-2.html?id=${item.category.id}" class="link-btn">Read More
                            <span class="svg-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="none">
                                    <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="currentColor" />
                                    <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="currentColor" />
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>`
        }
        else {
            htmlSecondary += /*html*/ `                                
        <div class="col-lg-4">
            <div class="horizontal-post-four">
                <div class="horizontal-post-thumb-four">
                    <a href="blog-details-two.html?id=${item.id}"><img src="${item.thumb}" alt="" style="width:100%;height:100px;object-fit: cover;"></a>
                </div>
                <div class="horizontal-post-content-four">
                    <a href="blog-2.html?id=${item.category.id}" class="post-tag-four">${categoryName}</a>
                    <h4 class="post-title"><a href="blog-details-two.html?id=${item.id}">${item.title}</a></h4>
                    <div class="blog-post-meta">
                        <ul class="list-wrap">
                            <li><i class="flaticon-calendar"></i>${dayjs(item.publish_date).fromNow()}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>`
        }
    });
    document.getElementById('worldTopNews').innerHTML = htmlMain + htmlSecondary


});
// Sports
API.call().get(`categories_news/6/articles?limit=5&page=5`).then((response) => {
    const data = response.data.data;
    let htmlMain = ''
    let htmlSecondary = /*html*/`                                    
    <div class="col-lg-4">
        <div class="sidebar-wrap sidebar-wrap-four">`
    let categoryName = ''
    data.forEach((item, index) => {
        categoryName = item.category.name;
        if (index === 0) {
            htmlMain = /*html*/`                                
            <div class="col-lg-8">
            <div class="sports-post">
                <div class="sports-post-thumb">
                    <a href="blog-details-two.html?id=${item.id}"><img src="${item.thumb}" alt="" style="width:100%;height:500px;object-fit: cover;"></a>
                </div>
                <div class="sports-post-content">
                    <a href="blog-2.html?id=${item.category.id}" class="post-tag-four">${item.title}</a>
                    <h4 class="post-title bold-underline"><a href="blog-details-two.html?id=${item.id}">${item.description}</a></h4>
                    <div class="blog-post-meta">
                        <ul class="list-wrap">
                            <li><i class="flaticon-calendar"></i>${dayjs(item.publish_date).fromNow()}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>`
        }
        else {
            htmlSecondary += /*html*/ `                                
        <div class="horizontal-post-four horizontal-post-five">
            <div class="horizontal-post-thumb-four">
                <a href="blog-details-two.html?id=${item.id}"><img src="${item.thumb}" alt="" style="width:100%;height:100px;object-fit: cover;"></a>
            </div>
            <div class="horizontal-post-content-four">
                <a href="blog-2.html?id=${item.category.id}" class="post-tag-four">${categoryName}</a>
                <h4 class="post-title"><a href="blog-details-two.html?id=${item.id}">${item.title}</a></h4>
                <div class="blog-post-meta">
                    <ul class="list-wrap">
                        <li><i class="flaticon-calendar"></i>${dayjs(item.publish_date).fromNow()}</li>
                    </ul>
                </div>
            </div>
        </div>`
        }
    });
    htmlSecondary += /*html*/ `                                        
        </div>
    </div>`
    document.getElementById('categorySports').innerHTML = htmlMain + htmlSecondary


});



function renderArticleTrendingItem(item, index) {
    return /* html */`
            <div class="stories-post">
            <div class="stories-post-thumb">
                <a href="blog-details-two.html?id=${item.id}"><img src="${item.thumb}" alt=""></a>
            </div>
            <div class="stories-post-content">
                <a href="blog-2.html?id=${item.category.id}" class="post-tag-four">${item.category.name}</a>
                <h5 class="post-title"><a href="blog-details-two.html?id=${item.id}">${item.title}</a></h5>
                <div class="blog-post-meta">
                    <ul class="list-wrap">
                        <li><i class="flaticon-calendar"></i>${dayjs(item.publish_date).fromNow()}</li>
                    </ul>
                </div>
            </div>
        </div>`
}

function renderArticleTrendingItem2(item, index) {
    return /* html */ `
    <div class="stories-post-two">
                <h2 class="number">${index + 1}.</h2>
                <div class="stories-post-content">
                <h5 class="post-title"><a href="blog-details-two.html?id=${item.id}">${item.title}</a></h5>
                <div class="blog-post-meta">
                <ul class="list-wrap">
                <li><i class="flaticon-calendar"></i>${dayjs(item.publish_date).fromNow()}</li>
                </ul>
            </div>
    </div>
    </div>`
}

function renderArticleNewItem(item, index) {
    return /* html */ `
    <div class="banner-post-five">
    <div class="banner-post-thumb-five">
        <a href="blog-details-two.html?id=${item.id}"><img src="${item.thumb}" alt=""></a>
    </div>
    <div class="banner-post-content-five">
        <a href="blog-details-two.html?id=${item.id}" class="post-tag-four">${item.category.name}</a>
        <h2 class="post-title"><a href="blog-details-two.html?id=${item.id}">${item.title}</a>
        </h2>
        <div class="blog-post-meta">
            <ul class="list-wrap">
                <li><i class="flaticon-user"></i>by<a href="author.html">${item.author}</a></li>
                <li><i class="flaticon-calendar"></i>${dayjs(item.publish_date).fromNow()}</li>
            </ul>
        </div>
    </div>
</div>`
}
