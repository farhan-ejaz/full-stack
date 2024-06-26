let todos = [];
// let todos = [
//     {id : 1, title : 'Learn JavaScript', priority: 'high'},
//     {id : 2, title : 'Learn React', priority: 'medium'},
// ];

function renderTodos() {
  todos = JSON.parse(localStorage.getItem("todos")) || [];

  const todosBody = document.getElementById("tableBody");
  todosBody.innerHTML = "";
  
  todos.forEach((todo) => {
    const todoTr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.className = "d-none";
    tdId.innerText = todo.id;
    todoTr.appendChild(tdId);



    const tdComplete = document.createElement("td");
    const divcomplete = document.createElement('div');
    divcomplete.className = 'form-check';

    const inputComplete = document.createElement('input');
    inputComplete.className = 'form-check-input';
    inputComplete.id = todo.id;
    inputComplete.type = 'checkbox';
    inputComplete.checked = todo.isSelected;
    inputComplete.onchange = completeTodo;

    divcomplete.appendChild(inputComplete);
    tdComplete.appendChild(divcomplete);
    todoTr.appendChild(tdComplete)


    const tdTitle = document.createElement("td");
    
    const title = document.createElement("span");
    title.id="item-"+todo.id;
    if(todo.isSelected){
      title.style='text-decoration: line-through'
    }
    else{
      title.style=''
    }
    title.innerText = todo.title;
    tdTitle.appendChild(title);
    
    const badge = document.createElement("span");
    if(todo.priority =='High'){
        badge.className = "badge bg-danger mx-1";       
    }
    else if(todo.priority =='Medium'){
        badge.className = "badge bg-warning text-dark mx-1";    
    }
    else if(todo.priority =='Low'){
        badge.className = "badge bg-success mx-1";    
    }

    badge.innerText = todo.priority;
    tdTitle.appendChild(badge);
    
    todoTr.appendChild(tdTitle);
    
    const tdPriority = document.createElement("td");
    tdPriority.innerText = todo.priority;
    todoTr.appendChild(tdPriority);
    const tdButtons = document.createElement("td");
    const deleteButton = document.createElement("i");
    deleteButton.id = todo.id;
    deleteButton.className = "fa fa-trash mx-2";
    deleteButton.onclick = deleteTodo;
    tdButtons.appendChild(deleteButton);
    const editButton = document.createElement("i");
    editButton.id = todo.id;
    editButton.className = "fa fa-edit mx-2";
    editButton.onclick = editTodo;
    tdButtons.appendChild(editButton);

    todoTr.appendChild(tdButtons);
    todosBody.appendChild(todoTr);
  });
}

function addTodo() {
  const id = document.getElementById("id").value;
  const title = document.getElementById("title").value;
  const priority = document.getElementById("priority").value;
  const errorMessage = document.getElementById("errorMessage");

  if (title === "" || priority === "") {
    errorMessage.innerText = "Please enter title and priority";
    errorMessage.className = "d-block alert alert-danger";
    return;
  }
  errorMessage.className = "d-none";

  if (id !== "") {
    const todo = todos.find((todo) => todo.id === id);
    todo.title = title;
    todo.priority = priority;
  } else {
    const newTodo = {
      id: new Date().toString(),
      title: title,
      priority: priority,
    };
    todos.push(newTodo);
  }

  saveTodos();
  document.getElementById("id").value = "";
  document.getElementById("title").value = "";
  document.getElementById("priority").value = "";
}

function clearTodo(){
  document.getElementById("id").value = "";
  document.getElementById("title").value = "";
  document.getElementById("priority").value = "";
}

function deleteTodo(event) {
  const todoId = event.target.id;
  todos = todos.filter((todo) => todo.id !== todoId);
  saveTodos();
}

function editTodo(event) {
  const todoId = event.target.id;
  const todo = todos.find((todo) => todo.id === todoId);
  document.getElementById("id").value = todo.id;
  document.getElementById("title").value = todo.title;
  document.getElementById("priority").value = todo.priority;
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
  document.getElementById("id").value = '';
  renderTodos();
}


function completeTodo(event){
    const todoId = event.target.id;
    const todo = todos.find((todo) => todo.id === todoId);
    todo.isSelected = !todo.isSelected;
    saveTodos();
}

renderTodos();
