// let title = 'asdhksd';
// element
// truy cập phần tử html thông qua id
let elTitle = document.getElementById('title');

// lấy ra nội dung text của một phần tử
let currentTitle = elTitle.textContent;
console.log(currentTitle);


// thay đổi nội dung của một thẻ html
// elTitle.textContent = 'noi dung moi'

// event -> sự kiện

function changeText() {
    elTitle.textContent = 'noi dung moi'
}