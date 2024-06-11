// khởi tạo modal
const formModal = new bootstrap.Modal(document.getElementById('formModal'), {
  backdrop: 'static',
});

// lấy dữ liệu từ localStorage
const STORAGE_KEY = 'CATEGORIES';
let CATEGORIES = loadStorage();

// DEFINE
const elList = document.getElementById('list');
const elBtnCreate = document.getElementById('btnCreate');
const elBtnSave = document.getElementById('btnSave');
const elBtnSearch = document.getElementById('btnSearch');
const elBtnClear = document.getElementById('btnClear');
const elInputName = document.getElementById('inputName');
const elInputOrdering = document.getElementById('inputOrdering');
const elInputSearch = document.getElementById('inputSearch');
const elRadioStatusActive = document.getElementById('radioStatusActive');
const elRadioStatusInactive = document.getElementById('radioStatusInactive');
const elFormModalTitle = document.getElementById('formModalTitle');
let idxEdit = -1;

// INIT
renderList(CATEGORIES);

// EVENTS
elBtnCreate.addEventListener('click', () => {
  resetForm();
  formModal.show();
});

elBtnSave.addEventListener('click', () => {
  const name = elInputName.value.trim();
  const ordering = elInputOrdering.value.trim();
  const status = elRadioStatusActive.checked;

  if (!name || !ordering) {
    alert('Vui lòng nhập đầy đủ dữ liệu!');
    return;
  }

  const item = {
    id: idxEdit === -1 ? self.crypto.randomUUID() : CATEGORIES[idxEdit].id,
    name,
    ordering,
    status,
  };

  if (idxEdit === -1) {
    CATEGORIES.push(item);
  } else {
    CATEGORIES[idxEdit] = item;
  }

  renderList(CATEGORIES);
  saveStorage();
  resetForm();
  formModal.hide();
});

elList.addEventListener('click', (e) => {
  const el = e.target;

  if (el.classList.contains('btn-delete')) {
    if (confirm('Xác nhận xóa?')) {
      const id = el.dataset.id;

      CATEGORIES = CATEGORIES.filter((item) => item.id !== id);

      renderList(CATEGORIES);
      saveStorage();
    }
  }

  if (el.classList.contains('btn-edit')) {
    elFormModalTitle.textContent = 'Cập nhật danh mục';
    elBtnSave.textContent = 'Cập nhật';
    const id = el.dataset.id;
    idxEdit = CATEGORIES.findIndex((item) => item.id === id);
    const item = CATEGORIES[idxEdit];

    elInputName.value = item.name;
    elInputOrdering.value = item.ordering;
    elRadioStatusActive.checked = item.status;
    elRadioStatusInactive.checked = !item.status;

    formModal.show();
  }
});

elInputSearch.addEventListener('keyup', (e) => {
  if (e.code === 'Enter' || e.key === 'Enter') {
    handleSearch();
  }
});

elBtnSearch.addEventListener('click', () => {
  handleSearch();
});

elBtnClear.addEventListener('click', () => {
  elInputSearch.value = '';
  renderList(CATEGORIES);
});

// FUNCTIONS
function renderList(arr, keyword) {
  let html = '';
  arr.forEach((element) => {
    const id = element.id;
    let name = element.name;
    const status = element.status;
    const checked = status ? 'checked' : '';
    const ordering = element.ordering;

    if (keyword) {
      name = name.replaceAll(keyword, `<mark>${keyword}</mark>`);
    }

    html += /* html */ `
    <tr>
      <td>
        <input type="checkbox" class="form-check-input" />
      </td>
      <td>${id}</td>
      <td>${name}</td>
      <td>
        <input class="form-check-input" type="checkbox" ${checked} />
      </td>
      <td>
        <input type="number" class="form-control input-ordering" value="${ordering}" />
      </td>
      <td>
        <button class="btn btn-sm btn-info btn-edit" data-id="${id}">Edit</button>
        <button class="btn btn-sm btn-danger btn-delete" data-id="${id}">Delete</button>
      </td>
    </tr>`;
  });

  elList.innerHTML = html;
}

function resetForm() {
  idxEdit = -1;
  elFormModalTitle.textContent = 'Thêm mới danh mục';
  elBtnSave.textContent = 'Lưu';
  elInputName.value = '';
  elInputOrdering.value = '';
  elRadioStatusActive.checked = true;
}

function handleSearch() {
  const keyword = elInputSearch.value.trim();

  if (!keyword) {
    alert('Vui lòng nhập từ khóa cần tìm!');
    return;
  }

  const listSearch = CATEGORIES.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()));
  renderList(listSearch, keyword);
}

function loadStorage() {
  let items = JSON.parse(localStorage.getItem(STORAGE_KEY));

  // Khởi tạo dữ liệu demo nếu chưa có
  if (!items) {
    items = [
      {
        id: self.crypto.randomUUID(),
        name: 'Thế giới',
        status: true,
        ordering: 1,
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Thời sự',
        status: false,
        ordering: 2,
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Kinh doanh',
        status: true,
        ordering: 3,
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Giải trí',
        status: true,
        ordering: 4,
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Thể thao',
        status: true,
        ordering: 5,
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Pháp luật',
        status: true,
        ordering: 6,
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Sức khỏe',
        status: true,
        ordering: 7,
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Giáo dục',
        status: true,
        ordering: 8,
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Du lịch',
        status: true,
        ordering: 9,
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Số hóa',
        status: true,
        ordering: 10,
      },
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  return items;
}

function saveStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(CATEGORIES));
}
