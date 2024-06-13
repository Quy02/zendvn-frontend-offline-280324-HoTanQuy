// khởi tạo modal
const formModal = new bootstrap.Modal(document.getElementById('formModal'), {
  backdrop: 'static',
});
const elBtnCreate = document.getElementById('btnCreate');

// mở modal khi click vào button thêm mới
elBtnCreate.addEventListener('click', () => {
  formModal.show();
});

// let CATEGORIES = [
//   {
//     id: self.crypto.randomUUID(),
//     name: 'Thế giới',
//     status: true,
//     ordering: 1,
//   },
//   {
//     id: self.crypto.randomUUID(),
//     name: 'Thời sự',
//     status: false,
//     ordering: 2,
//   },
//   {
//     id: self.crypto.randomUUID(),
//     name: 'Kinh doanh',
//     status: true,
//     ordering: 3,
//   },
//   {
//     id: self.crypto.randomUUID(),
//     name: 'Giải trí',
//     status: true,
//     ordering: 4,
//   },
//   {
//     id: self.crypto.randomUUID(),
//     name: 'Thể thao',
//     status: true,
//     ordering: 5,
//   },
//   {
//     id: self.crypto.randomUUID(),
//     name: 'Pháp luật',
//     status: true,
//     ordering: 6,
//   },
//   {
//     id: self.crypto.randomUUID(),
//     name: 'Sức khỏe',
//     status: true,
//     ordering: 7,
//   },
//   {
//     id: self.crypto.randomUUID(),
//     name: 'Giáo dục',
//     status: true,
//     ordering: 8,
//   },
//   {
//     id: self.crypto.randomUUID(),
//     name: 'Du lịch',
//     status: true,
//     ordering: 9,
//   },
//   {
// id: self.crypto.randomUUID(),
// name: 'Số hóa',
// status: true,
// ordering: 10,
//   },
// ];
let elmList = document.getElementById('list');
let CATEGORIES = JSON.parse(localStorage.getItem('CATEGORIES'));
let elmStatus = document.getElementById('status');
let elmSave = document.getElementById('save-add-edit');
let elmCreate = document.getElementById('btnCreate');
//Khai báo biến edit
let isEditing = false;
let currentId = null;
let elmAddEdit = document.getElementById('title-add-edit');
let elmNameEdit = document.getElementById('name-add-edit');
let elmStatusActive = document.getElementById('radioStatusActive');
let elmStatusInactive = document.getElementById('radioStatusInactive');
let elmSort = document.getElementById('sort-add-edit');
//Khai báo biến Search
let elInputSearch = document.getElementById('input-search');
let elBtnSearch = document.getElementById('btn-search')
let elBtnClear = document.getElementById('btn-clear')
//Phân trang
let currentPage = 1;
let perPage = 5;
let totalPage = Math.ceil(CATEGORIES.length / perPage);
let pagination = document.getElementById("pagination1");
renderList(CATEGORIES);
//Sắp xếp
let btnsortByName = document.getElementById('sortByName')
let btnsortByOder = document.getElementById('sortByOder')
let Count = 0;
let Count2 = 0;



// Event Search
elBtnSearch.addEventListener('click', () => {
  let searchValue = elInputSearch.value.trim();
  if (!searchValue) {
    alert('Vui lòng nhập từ khóa cần tìm!');
  } else {
    let searchList = CATEGORIES.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));
    renderList(searchList);
  }
});

// Event clear
elBtnClear.addEventListener('click', () => {
  renderList(CATEGORIES);
  elInputSearch.value = '';
})

// Event Create
elmCreate.addEventListener('click', function () {
  formModal.show();
  elmAddEdit.textContent = "Thêm mới danh mục";
  elmNameEdit.value = "";
  elmSort.value = "";
  elmStatusActive.checked = true;
  elmStatusInactive.checked = false;
  isEditing = false;
  currentId = null;
});
// Event Edit and Delete
elmList.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('btn-edit')) {
    formModal.show();
    isEditing = true;
    currentId = el.dataset.id;
    elmAddEdit.textContent = "Chỉnh sửa danh mục";
    const category = CATEGORIES.find(category => category.id === currentId);
    elmNameEdit.value = category.name;
    if (category.status === true) {
      elmStatusActive.checked = true;
    } else {
      elmStatusInactive.checked = true;
    }
    elmSort.value = category.ordering;
  }
  if (el.classList.contains('btn-delete')) {
    const id = el.dataset.id;
    const index = CATEGORIES.findIndex(category => category.id === id);
    if (confirm('Bạn chắc chắn muốn xóa công việc này?')) {
      CATEGORIES.splice(index, 1);
      localStorage.setItem('CATEGORIES', JSON.stringify(CATEGORIES));
      renderList(CATEGORIES);
    }
  }
});
// Event Save
elmSave.addEventListener('click', function () {
  if (isEditing && currentId) {
    const index = CATEGORIES.findIndex(category => category.id === currentId);
    CATEGORIES[index].name = elmNameEdit.value;
    CATEGORIES[index].status = elmStatusActive.checked;
    CATEGORIES[index].ordering = elmSort.value;
  } else {
    let obj = {
      id: self.crypto.randomUUID(),
      name: elmNameEdit.value,
      status: elmStatusActive.checked,
      ordering: elmSort.value
    };
    CATEGORIES.push(obj);
  }

  renderList(CATEGORIES);
  localStorage.setItem('CATEGORIES', JSON.stringify(CATEGORIES));
  formModal.hide();
  isEditing = false;
  currentId = null;
});

function checked(item) {
  if (item.status === true)
    return 'checked';
  else
    return '';
}
function handlePageNumber(num) {
  currentPage = num;
  console.log(currentPage);
  renderList(CATEGORIES);
}
function NextPage(currentPage2) {
  if (currentPage2 != totalPage) {
    currentPage = currentPage2 + 1;
    renderList(CATEGORIES);
  }
}
function PreviousPage(currentPage2) {
  if (currentPage2 != 1) {
    currentPage = currentPage2 - 1;
    renderList(CATEGORIES);
  }
}
function renderPageNumber() {

  pagination.innerHTML = '';

  pagination.innerHTML = `<button type="button" class="page-link" onclick="PreviousPage(${currentPage})" ${currentPage === 1 ? 'style="color: #c4c4c4;"' : ''} >prev</button>`
  for (let i = 1; i <= totalPage; i++) {
    pagination.innerHTML += `<li onclick="handlePageNumber(${i})" class="page-item ${i === currentPage ? 'active' : ''}"><button type="button" class="page-link">${i}</button></li>`;
  }
  pagination.innerHTML += `<button type="button" class="page-link" onclick="NextPage(${currentPage})" ${currentPage === totalPage ? 'style="color: #c4c4c4;"' : ''}>next</button>`
  console.log(totalPage)
}

function renderList(arr) {
  let html = '';
  let start = (currentPage - 1) * perPage;
  let end = start + perPage;
  let perCATEGORIES = arr.slice(start, end);

  console.log(perCATEGORIES);
  perCATEGORIES.forEach((item) => {
    console.log(item);
    html += /*html */ `
      <tr>
        <td>
          <input type="checkbox" class="form-check-input" />
        </td>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>
          <input id="status" class="form-check-input" type="checkbox"${checked(item)}/>
        </td>
        <td>
          <input type="number" class="form-control input-ordering" value="${item.ordering}"/>
        </td>
        <td>
          <button class="btn btn-sm btn-info btn-edit" data-id=${item.id}>Edit</button>
          <button class="btn btn-sm btn-danger btn-delete" data-id=${item.id}>Delete</button>
        </td>
      </tr>`;
  });
  elmList.innerHTML = html;
  renderPageNumber();
}


btnsortByName.addEventListener('click', function(){
  sort();
})
btnsortByOder.addEventListener('click', function(){
  sort2();
})
function sort() {
  Count++;
  if (Count === 1) {
    let sortedList = CATEGORIES.toSorted((a, b) => {
      let titleA = a.name.toLowerCase();
      let titleB = b.name.toLowerCase();
      return titleA < titleB ? -1 : 1;
    });
    renderList(sortedList);

  } else if (Count === 2) {
    let sortedList = CATEGORIES.toSorted((a, b) => {
      let titleA = a.name.toLowerCase();
      let titleB = b.name.toLowerCase();
      return titleA < titleB ? 1 : -1;
    });
    renderList(sortedList);
  } else if (Count === 3) {
    renderList(CATEGORIES);
    Count = 0;
  }
}

function sort2() {
  Count2++;
  if (Count2 === 1) {
    let sortedList = CATEGORIES.toSorted((a, b) => {
      let titleA = a.ordering;
      let titleB = b.ordering;
      return titleA < titleB ? -1 : 1;
    });
    renderList(sortedList);

  } else if (Count2 === 2) {
    let sortedList = CATEGORIES.toSorted((a, b) => {
      let titleA = a.ordering;
      let titleB = b.ordering;
      return titleA < titleB ? 1 : -1;
    });
    renderList(sortedList);
  } else if (Count2 === 3) {
    renderList(CATEGORIES);
    Count2 = 0;
  }
}