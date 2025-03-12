// 1. get the references of the DOM elements you will be working with

const form = document.querySelector('#form');
const todoListContainer = document.querySelector('#todolist-container');
const clearTodos = document.querySelector('#clear-todos');


// 2. add event listeners to the DOM elements
form.addEventListener('submit', handleAddTodo);
clearTodos.addEventListener('click', handleClearTodos);

let todos = localStorage.todos ? JSON.parse(localStorage.todos) : [];

renderTodos();
// step 3: define the event handlers

function handleAddTodo(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data);

    const todo = Object.fromEntries(data);
    todo.id = `id-${Date.now()}`;
    todos.push(todo);

    localStorage.todos = JSON.stringify(todos);

    renderTodos()
    form.reset();


}

function handleClearTodos(e) {
    todos = [];
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

function renderTodos() {
    todoListContainer.innerHTML = todos.map(todo => todoToHTML(todo)).join('');
}

function todoToHTML(todo) {
    return `
            <div class="form-group todo" id="${todo.id}">
                        <p class="todo-title ${todo.completed ? 'strike' : ''}" id="" >${todo.title}</p>
                        <input class="completed icon" type="checkbox"
                        onclick="toggleCompleted('${todo.id}')" 
                        ${todo.completed ? 'checked' : ''}

                        >
                        <i class="fa fa-trash icon" onclick="deleteTodo('${todo.id}')"></i>
            </div>
`
}

