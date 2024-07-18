
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get('id'));

const elCategoryName = document.getElementById('categoryName');
const elArticlesTitle = document.getElementById('articlesTitle');
const elArticlesAuthor = document.getElementById('articlesAuthor');
const elArticlesPublishDate = document.getElementById('articlesPublishDate');
const elArticleDecripstion = document.getElementById('articleDecripstion');
const elArticlesThumb = document.getElementById('articlesThumb')
const elTitle = document.getElementById('title')


//Comment
const elTotalComment = document.getElementById('totalComment')
const COMMENTS = JSON.parse(localStorage.getItem('COMMENTS')) || []
const commentByArticle = COMMENTS.filter(item => item.articleId === id);
let email = ''
const elCommentForm = document.getElementById('commentForm')
const elCommentNotice = document.getElementById('commentNotice')
const elcommentContent = document.getElementById('commentContent')
const elListComment = document.getElementById('listComment')
const elCommentMessageReply = document.getElementById('commentMessageReply')
const elCancelReply = document.getElementById('cancelReply')
const elReplyEmail = document.getElementById('replyEmail')
let parentCommentId = null
let level = 1

API.callWithToken().get('/auth/me').then((res) => {
    email = res.data.data.email
    elCommentForm.classList.remove('d-none');
    elCommentNotice.classList.add('d-none')
    email = res.data.data.email
})
    .catch((error) => {
        elCommentForm.classList.add('d-none');
        elCommentNotice.classList.remove('d-none')
    })
    .finally((res) => {
        renderComment(commentByArticle)
    })

//Hot Category
//detail
API.call().get(`articles/${id}`).then((res) => {
    console.log(res)
    const article = res.data.data;
    elCategoryName.innerText = article.category.name;
    elArticlesTitle.innerText = article.title;
    elTitle.innerText = article.title;
    elArticlesAuthor.innerText = article.author;
    elArticlesPublishDate.innerText = dayjs(article.publish_date).fromNow();
    elArticlesThumb.innerHTML = `<img src="${article.thumb}" alt="">`
    elArticleDecripstion.innerHTML = article.content;
    if (!RECENT_POST.includes(id)) {
        if (RECENT_POST.length === 4) {
            RECENT_POST.shift();
        }
        RECENT_POST.push(id);
        localStorage.setItem('RECENT_POST', JSON.stringify(RECENT_POST));
    }

});

//Comment
elCommentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const content = elcommentContent.value.trim()
    if (content) {
        const newComment = {
            id: self.crypto.randomUUID(),
            email,
            content: level === 1 ? content : `<span class="text-danger">@${elReplyEmail.innerText}:</span> ${content}`,
            dateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            articleId: id,
        }
        if (parentCommentId) {
            const parentIdx = COMMENTS.findIndex(item => item.id === parentCommentId);
            COMMENTS[parentIdx].childItems.push(newComment)
            console.log('lv 2')
        }
        else {
            newComment.childItems = []
            console.log(newComment)
            COMMENTS.unshift(newComment)
        }
        localStorage.setItem('COMMENTS', JSON.stringify(COMMENTS))
        const commentByArticle2 = COMMENTS.filter(item => item.articleId === id);
        renderComment(commentByArticle2)
        elcommentContent.value = ''
        parentCommentId = null
        elCommentMessageReply.classList.add('d-none')
        level = 1;
    }
    else {
        alert('Vui lòng nhập nội dung bình luận!')
    }
})

elListComment.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('reply-btn')) {
        parentCommentId = el.dataset.parentId
        elCommentMessageReply.classList.remove('d-none')
        console.log(email)
        elReplyEmail.innerText = el.dataset.replyEmail;
        console.log(el.dataset.level);
        level = parseInt(el.dataset.level)
    }
})
elCancelReply.addEventListener('click', function (e) {
    e.preventDefault();
    parentCommentId = null
    elCommentMessageReply.classList.add('d-none')
    level = 1
})
function renderComment(list) {
    let html = ''
    list.forEach((item) => {
        dayjs.extend(window.dayjs_plugin_relativeTime);
        const dateTime = dayjs(item.dateTime).fromNow()
        let htmlChild = ''
        if (item.childItems.length > 0) {
            htmlChild = /*html*/`                                                    
            <h5 class="ms-5 text-primary d-inline-block bg-warning p-1" id="totalCommentReply">${item.childItems.length} Replies</h5>`
            item.childItems.forEach(itemChild => {
                htmlChild += renderCommentChild(itemChild, item.id)
            })
        }
        html += renderCommentParent(item, htmlChild, item.id)
    })
    elListComment.innerHTML = html
    elTotalComment.innerText = `${list.length} bình luận`
}

function renderCommentChild(itemChild, parenId = null) {
    const numberAvatar = Math.floor(Math.random() * 10) + 1;
    const reply = email ? `<a href="#commentRespond" class="reply-btn" data-reply-email="${itemChild.email}" data-level="2" data-parent-id="${parenId}">Reply</a>` : ''
    return /*html*/`
    <ul class="children" style="background-color: #e2e2e2;">
    <li>
        <div class="comments-box mb-0">
            <div class="comments-avatar">
                <img src="img/${numberAvatar}.png" alt="img">
            </div>
            <div class="comments-text">
                <div class="avatar-name">
                    <h6 class="name me-5">${itemChild.email}</h6>
                    <span class="date">${dayjs(itemChild.dateTime).fromNow()}</span>
                </div>
                <p>${itemChild.content}</p>
                ${reply}
            </div>
        </div>
    </li>
</ul>`
}

function renderCommentParent(item, htmlChild, parenId = null) {
    const numberAvatar = Math.floor(Math.random() * 10) + 1;
    const reply = email ? `<a href="#commentRespond" class="reply-btn" data-reply-email="${item.email}" data-level="1" data-parent-id="${parenId}">Reply</a>` : ''
    return /*html*/`
    <div class="latest-comments">
    <ul class="list-wrap">
        <li class="mb-0">
            <div class="comments-box">
                <div class="comments-avatar">
                    <img src="img/${numberAvatar}.png" alt="img">
                </div>
                <div class="comments-text">
                    <div class="avatar-name">
                        <h6 class="name me-5">${item.email}</h6>
                        <span class="date mr-10">${dayjs(item.dateTime).fromNow()}</span>
                    </div>
                    <p>${item.content}</p>
                    ${reply}
                </div>
            </div>
            ${htmlChild}
        </li>
    </ul>
</div>`
}
