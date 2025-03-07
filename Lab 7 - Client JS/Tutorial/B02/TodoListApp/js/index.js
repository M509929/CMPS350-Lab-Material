// first step to check if this file linked

// get the references to the elements you want to manipulate    

const form = document.querySelector('#form');
const todoListContainer = document.querySelector('#todolist-container');
const clearTodos = document.querySelector('#clear-todos');

// add event listener to the form
form.addEventListener('submit', handleSubmit);
clearTodos.addEventListener('click', handleClearTodos);

// create a function to handle the submit event
let todos = localStorage.todos ? JSON.parse(localStorage.todos) : [];

renderTodos();

function handleSubmit(e) {
    e.preventDefault();
    // const data = new FormData(form);
    const data = new FormData(e.target);
    console.log(data);

    const todo = Object.fromEntries(data);
    todo.id = `id-${Date.now()}`;
    todos.push(todo);

    // step 1: save the todos to the local storage
    localStorage.todos = JSON.stringify(todos);

    renderTodos();
    form.reset();
}

function renderTodos() {
    todoListContainer.innerHTML = todos.map(todo => covertToCard(todo)).join('');
}

function covertToCard(todo) {
    return ` 
        <div class="form-group todo" id="${todo.id}">
            <p class="todo-title ${todo.completed ? 'strike' : ''}" id="">${todo.title}</p>
            <input class="completed icon" type="checkbox" onclick="" ${todo.completed ? 'checked' : ''}
                onchange="toggleCompleted('${todo.id}')">
            <i class="fa fa-trash icon" onclick="deleteTodo('${todo.id}')"></i>
        </div>
            `;
}

function handleClearTodos() {
    todos = [];
    delete localStorage.todos;
    renderTodos();
}

function deleteTodo(id) {
    const index = todos.findIndex(todo => todo.id === id);
    todos.splice(index, 1);
    renderTodos();
}

function toggleCompleted(id) {
    const index = todos.findIndex(todo => todo.id === id);
    todos[index].completed = !todos[index].completed;
    renderTodos();
}