let TODO_LIST = ['Complete Javascript course', 'record video', 'Learning', 'reading Book', 'GYM', 'Laragon GUIde'];

// DEFINE
let elTodoList = document.getElementById('todoList');
let elInputTodo = document.getElementById('inputTodo');
let elInputSearch = document.getElementById('inputSearch');
let elBtnCreate = document.getElementById('btnCreate');
let elBtnCancel = document.getElementById('btnCancel');
let elBtnSearch = document.getElementById('btnSearch');
let elBtnClear = document.getElementById('btnClear');
let elBtnSorts = document.getElementsByClassName('btnSort');
let idxEdit = -1;

localStorage.setItem("",)

// INIT
renderList(TODO_LIST);
//
elTodoList.addEventListener('click', (e) => {
  const e1 = e.target;
  if(e1.classList.contains('btn-delete')){
    let index = parseInt(e1.dataset.index);
    
      if (confirm('Bạn chắc chắn muốn xóa công việc này?')) {
        TODO_LIST.splice(index, 1);
        renderList(TODO_LIST);
      }
  }
  if(e1.classList.contains('btn-edit')){
    idxEdit = parseInt(e1.dataset.index);
    elInputTodo.value = TODO_LIST[idxEdit];
  }
})
// EVENTS
elBtnCreate.addEventListener('click', () => {
  const todoName = elInputTodo.value.trim();
  if (!todoName) {
    alert('Vui lòng nhập tên công việc!');
  } else {
    if (idxEdit === -1) {
      TODO_LIST.unshift(todoName);
    } else {
      TODO_LIST[idxEdit] = todoName;
      idxEdit = -1;
    }
    renderList(TODO_LIST);
    elInputTodo.value = '';
  }
});

elBtnCancel.addEventListener('click', () => {
  elInputTodo.value = '';
  idxEdit = -1;
});

elBtnSearch.addEventListener('click', () => {
  let searchValue = elInputSearch.value.trim();
  if (!searchValue) {
    alert('Vui lòng nhập từ khóa cần tìm!');
  } else {
    let searchList = TODO_LIST.filter((item) => item.toLowerCase().includes(searchValue.toLowerCase()));
    renderList(searchList);
  }
});

elBtnClear.addEventListener('click', () => {
  renderList(TODO_LIST);
  elInputSearch.value = '';
});

for (let i = 0; i < elBtnSorts.length; i++) {
  let el = elBtnSorts[i];
  el.addEventListener('click', () => {
    let sort = el.dataset.sort;
    sortTodos(sort);
  });
}

// FUNCTIONS
function renderList(arr) {
  let html = '';

  arr.forEach((item, index) => {
    html += /*html */ `
    <div class="todo-item">
      <span class="todo-name">${item}</span>
      <div class="todo-action">
        <button class="btn bg-warning btn-edit" data-index = ${index})">Edit</button>
        <button class="btn bg-danger btn-delete" data-index = ${index})">Delete</button>
      </div>
    </div>`;
  });

  elTodoList.innerHTML = html;
}


function sortTodos(sort) {
  if (sort === 'default') {
    renderList(TODO_LIST);
  } else {
    let sortedList = TODO_LIST.toSorted((a, b) => {
      a = a.toLowerCase();
      b = b.toLowerCase();

      if (sort === 'asc') {
        return a < b ? -1 : 1;
      } else {
        return a < b ? 1 : -1;
      }
    });
    renderList(sortedList);
  }
}
