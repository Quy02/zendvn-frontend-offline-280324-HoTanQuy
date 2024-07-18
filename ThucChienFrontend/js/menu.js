const elMainMenu = document.getElementById('mainMenu');
const elAccount = document.getElementById('account');

API.call().get(`categories_news`)
    .then((response) => {
        const data = response.data;
        const categories = data.data;

        let htmlMenu = '';
        let htmlMenuOther = '';
        categories.forEach((item, index) => {
            if (index < 3) {
                htmlMenu += `<li><a href="blog-2.html?id=${item.id}">${item.name}</a></li>`;
            } else {
                htmlMenuOther += `<li><a href="blog-2.html?id=${item.id}">${item.name}</a></li>`;
            }
        });
        elMainMenu.innerHTML = htmlMenu + `
            <li class="menu-item-has-children"><a href="#">Danh mục khác</a>
                <ul class="sub-menu">
                    ${htmlMenuOther}
                </ul>
            </li>`;

        const token = localStorage.getItem(ACCESS_TOKEN);

        API.callWithToken().get('/auth/me').then(resMe => {
            console.log(resMe);
            const name = resMe.data.data.name;
            elAccount.innerHTML = `
                <a href="#">${name}</a>
                <ul class="sub-menu">
                    <li><a href="profile.html">Thông tin tài khoản</a></li>
                    <li><a href="change-password.html">Thay đổi mật khẩu</a></li>
                    <li><a href="admin-create-articles.html">Thêm bài viết</a></li>
                    <li><a href="admin-list-articles.html">Quản lí bài viết</a></li>
                    <li><a href="register.html" id="logOut">Đăng xuất</a></li>
            </ul>`;
        }).catch((err) => {
            elAccount.innerHTML = `
        <a href="#">Tài khoản</a>
        <ul class="sub-menu">
            <li><a href="login.html">Đăng nhập</a></li>
            <li><a href="register.html">Đăng ký</a></li>
        </ul>`;
        });
    })
    .catch((err) => {
        console.error('Error fetching categories:', err);
    });
elAccount.addEventListener('click', function (e) {

    const el = e.target;
    if (el.id === 'logOut') {  // Change 'LogOut' to 'logOut'
        e.preventDefault();
        console.log('123')
        localStorage.removeItem(ACCESS_TOKEN)
        window.location.href = 'index-6.html'
    }
});

