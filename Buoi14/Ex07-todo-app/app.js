//khai báo biến
let isEditing = false;
let editingIndex = -1;
let TODOS = ['Learning', 'eAt', 'code', 'SlEep'];
elmWork = document.getElementById("work")
elmNewname = document.getElementById("new-name");
elmNameTodo = document.getElementById("name-todo")
elmSave = document.getElementById("save")
elmSearch = document.getElementById("btn-search")
elmInputSearch = document.getElementById("input-search")
elmDefault = document.getElementById("btn-Default");
elmASC = document.getElementById("btn-ASC");
elmDESC = document.getElementById("btn-DESC");
elmClear = document.getElementById("btn-clear")
elmCancel = document.getElementById("btn-cancel")
renderList(TODOS);

//Add and Edit
elmSave.addEventListener('click', function () {
  let newname = elmNewname.value.trim();  //xóa khoảng trắng
  if (newname === "") {
    alert("Vui lòng nhập!")
    elmNewname.value = "";
  } else {
    if (isEditing) {
      TODOS[editingIndex] = newname;
      isEditing = false;
      editingIndex = -1;
    } else {
      TODOS.push(newname);
    }
    renderList(TODOS);
    elmNewname.value = "";
  }
})

//Định nghĩa hàm
function renderList(arrayTodo) {
  list_work = '';
  for (let i = 0; i < arrayTodo.length; i++) {
    list_work += `
            <li>
              <span id = "name-todo">`+ arrayTodo[i] + `</span>
              <button type="button" onclick = "editTodo(${i})">Edit</button>
              <button type="button" onclick ="deleteTodo(${i})" >Delete</button>
            </li>`
    elmWork.innerHTML = list_work;
  }
}
// edit
function editTodo(i) {
  elmNewname.value = TODOS[i];
  isEditing = true;
  editingIndex = i;
}
// delete
function deleteTodo(i) {
  if (confirm("Bạn chac chan muon xoa")) {
    TODOS.splice(i, 1)
    console.log(TODOS);
    renderList(TODOS);
  }
}
// Search 
elmSearch.addEventListener('click', function () {
  let searchTodo = elmInputSearch.value.trim().toLowerCase();
  if (searchTodo === "") {
    renderList(TODOS);
  } else {
    let filteredTodos = TODOS.filter(function (todo) {
      return todo.toLowerCase().includes(searchTodo);
    });
    renderList(filteredTodos);
  }
})

//Default
elmDefault.addEventListener('click', function () {
  renderList(TODOS);
})

//Cancel
elmCancel.addEventListener('click', function () {
  elmNewname.value = ""
  isEditing = false;
  editingIndex = -1;
})

//Clear
elmClear.addEventListener('click', function () {
  elmInputSearch.value = ""
})
//ex5-6
