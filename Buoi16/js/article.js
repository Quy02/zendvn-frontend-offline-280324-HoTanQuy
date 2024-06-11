// Khai báo biến thêm bài viết
let elmListCategory = document.getElementById('list-category')
let elmAddTitle = document.getElementById('input-title')
let elmAddDescription = document.getElementById('input-description')
let elmAddContent = document.getElementById('input-content')
let elmBtnSave = document.getElementById('btnSave')
let elmAddCategory = document.getElementById('add-category')
// Khai báo biến edit
let isEditing = false;
let currentId = null;
let elmStatusActive = document.getElementById('radioStatusActive');
let elmStatusInactive = document.getElementById('radioStatusInactive');
// Khai báo biến save
const elBtnSave = document.getElementById('btnSave');
// Biến Xóa hàng loạt
let arr = [];
let elmBtnDelete = document.getElementById('btnDelete');
// Biến sắp xếp
let clickCount = 0;
let elmBtnSort = document.getElementById('btn-sort')

let CATEGORIES = JSON.parse(localStorage.getItem('CATEGORIES'));
let POST = JSON.parse(localStorage.getItem('POST'));

elmList = document.getElementById("post");
renderList(POST, CATEGORIES)

// khởi tạo modal
const formModal = new bootstrap.Modal(document.getElementById('formModal'), {
  backdrop: 'static',
});
const elBtnCreate = document.getElementById('btnCreate');

// mở modal khi click vào button thêm mới
elBtnCreate.addEventListener('click', () => {
  formModal.show();
  elmAddCategory.textContent = "Thêm mới danh mục";
  elmListCategory.innerHTML = optionCategory("null");
  elmAddTitle.value = ""
  elmAddDescription.value = ""
  elmAddContent.value = ""
  elThumbPreview.src = ""
});
// Event Search
let elInputSearch = document.getElementById('inputSearch')
let elBtnSearch = document.getElementById('btnSearch')
elBtnSearch.addEventListener('click', () => {
  let searchValue = elInputSearch.value.trim();
  if (!searchValue) {
    alert('Vui lòng nhập từ khóa cần tìm!');
  } else {
    let searchList = POST.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
    renderList(searchList, CATEGORIES);
  }
});
// image
const elInputThumb = document.getElementById('inputThumb');
const elThumbPreview = document.getElementById('thumbPreview');

// js preview image before upload
elInputThumb.addEventListener('change', () => {
  if (elInputThumb.files.length) {
    const reader = new FileReader();
    reader.readAsDataURL(elInputThumb.files[0]);
    reader.onload = function (e) {
      const srcImage = e.target.result; // base64
      elThumbPreview.src = srcImage;
    };
  }
});

// Even Save
elBtnSave.addEventListener('click', () => {
  if (isEditing && currentId) {
    const index = POST.findIndex(post => post.id === currentId);
    if (!elmAddTitle.value || !elmAddDescription.value || !elmAddContent.value || !elmListCategory.value) {
      alert('Lỗi: Không được bỏ trống!');
      return;
    }
    POST[index].title = elmAddTitle.value;
    POST[index].description = elmAddDescription.value;
    POST[index].content = elmAddContent.value;
    POST[index].thumb = elThumbPreview.src;
    POST[index].status = elmStatusActive.checked;
    POST[index].categoryId = elmListCategory.value;
    localStorage.setItem('POST', JSON.stringify(POST));
  } else {
    if (!elmAddTitle.value || !elmAddDescription.value || !elmAddContent.value || !elmListCategory.value) {
      alert('Lỗi: Không được bỏ trống!');
      return;
    }
    let obj = {
      id: self.crypto.randomUUID(),
      title: elmAddTitle.value,
      description: elmAddDescription.value,
      content: elmAddContent.value,
      thumb: elThumbPreview.src,
      status: elmStatusActive.checked,
      categoryId: elmListCategory.value,
    };
    console.log(obj)
    POST.push(obj);
    localStorage.setItem('POST', JSON.stringify(POST));
  }
  renderList(POST, CATEGORIES);
  isEditing = false;
  currentId = null;
  formModal.hide();
});

//Xóa hàng loạt
elmBtnDelete.addEventListener('click', function () {
  if (arr.length === 0) {
    alert('Bạn chưa chọn bài viết nào');
    return;
  }
  if (confirm('Bạn chắc chắn muốn xóa bài viết này?')) {
    arr.forEach(item => {
      const index = POST.findIndex(post => post.id === item.id);
      if (index !== -1) {
        POST.splice(index, 1);
      }
    });
    localStorage.setItem('POST', JSON.stringify(POST));
    renderList(POST, CATEGORIES);
  }
});
// Sắp xếp
elmBtnSort.addEventListener('click', function () {
  sortTodos();
})
//Xóa và edit
elmList.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('btn-edit')) {
    elmAddCategory.textContent = "Chỉnh sửa bài viết";
    formModal.show();
    isEditing = true;
    currentId = el.dataset.id;
    console.log(currentId)
    const post = POST.find(post => post.id === currentId);
    if (post.status === true) {
      elmStatusActive.checked = true;
    } else {
      elmStatusInactive.checked = true;
    }
    elmListCategory.innerHTML = optionCategory(post.categoryId);
    elmAddTitle.value = post.title
    elmAddDescription.value = post.description
    elmAddContent.value = post.content
    elThumbPreview.src = post.thumb
  }
  if (el.classList.contains('btn-delete')) {
    const id = el.dataset.id;
    const index = POST.findIndex(post => post.id === id);
    if (confirm('Bạn chắc chắn muốn xóa bài viết này?')) {
      POST.splice(index, 1);
      localStorage.setItem('POST', JSON.stringify(POST));
      renderList(POST, CATEGORIES);
    }
  }
  if (el.classList.contains('btn-choose')) {
    let id2 = el.dataset.id;
    const post = POST.find(post => post.id === id2);
    const index = arr.findIndex(item => item.id === id2);
    if (index !== -1) {
      arr.splice(index, 1);
      console.log(arr)
      console.log("Đã xóa")
    } else {
      arr.push(post);
      console.log(arr)
      console.log("Đã thêm")
    }
  }
});

function renderList(POST, CATEGORIES) {
  let html = '';
  POST.forEach((item, index) => {
    const category = CATEGORIES.find(category => category.id === item.categoryId);
    html += `
      <tr>
        <td>
          <input type="checkbox" class="form-check-input btn-choose" data-id= ${item.id} />
        </td>
        <td>${index + 1}</td>
        <td class="col-img">
          <img
            src="${item.thumb}"
            alt="${item.title}"
            class="img-fluid"
          />
        </td>
        <td class="col-title">${item.title}</td>
        <td class="col-category">
          <select class="form-select" id="list-category">
            ${optionCategory(category.id)}
          </select>
        </td>
        <td>
          <input class="form-check-input" type="checkbox" ${item.status ? 'checked' : ''} />
        </td>
        <td>
          <button class="btn btn-sm btn-info btn-edit" data-id= ${item.id}>Edit</button>
          <button class="btn btn-sm btn-danger btn-delete" data-id= ${item.id}>Delete</button>
        </td>
      </tr>`;
  });
  elmList.innerHTML = html;
  console.log(POST)
}

function optionCategory(currentCategory) {
  let html = '';
  for (let i = 0; i < CATEGORIES.length; i++) {
    if (CATEGORIES[i].id === currentCategory) {
      html += `<option value="${CATEGORIES[i].id}">${CATEGORIES[i].name}</option>`;
    }
  }
  for (let i = 0; i < CATEGORIES.length; i++) {
    if (CATEGORIES[i].id !== currentCategory) {
      html += `<option value="${CATEGORIES[i].id}">${CATEGORIES[i].name}</option>`;
    }
  }
  return html;
}

function sortTodos() {
  clickCount++;
  if (clickCount === 1) {
    let sortedList = POST.toSorted((a, b) => {
      let titleA = a.title.toLowerCase();
      let titleB = b.title.toLowerCase();
      return titleA < titleB ? -1 : 1;
    });
    renderList(sortedList, CATEGORIES);

  } else if (clickCount === 2) {
    let sortedList = POST.toSorted((a, b) => {
      let titleA = a.title.toLowerCase();
      let titleB = b.title.toLowerCase();
      return titleA < titleB ? 1 : -1;
    });
    renderList(sortedList, CATEGORIES);
  } else if (clickCount === 3) {
    renderList(POST, CATEGORIES);
    clickCount = 0;
  }
}

