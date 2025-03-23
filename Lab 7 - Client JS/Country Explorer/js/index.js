const form = document.querySelector('#form');
const todolistContainer
    = document.querySelector('#todolist-container');
const clearTodos = document.querySelector('#clear-todos');

let todos = (localStorage.todos ? JSON.parse(localStorage.todos) : []);
renderTodos();
// Add event listener to form
form.addEventListener('submit', handleSubmit)

clearTodos.addEventListener('click', handleClearTodos);

function handleClearTodos() {
    todos = [];
    delete localStorage.todos
    renderTodos();
}

function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const todo = Object.fromEntries(data);
    todo.id = `id-${Date.now()}`;
    console.log(todo);

    todos.push(todo);
    renderTodos();
    form.reset();

    // save the todos into local storage
    localStorage.todos = JSON.stringify(todos);
}
function renderTodos() {
    todolistContainer.innerHTML = todos.map(todo => renderTodo(todo)).join('');
}

function renderTodo(todo) {
    console.log(todo);

    return ` <div class="form-group todo" id="${todo.id}">
                <p class="todo-title ${todo.completed ? 'strike' : ''}" id="">${todo.title}</p>
                <input class="completed icon" type="checkbox"
                onclick="" ${todo.completed ? 'checked' : ''}>
                <i class="fa fa-trash icon" onclick="deleteTodo('${todo.id}')"></i>
            </div> `;
}

function deleteTodo(id) {
    document.querySelector(`#${id}`).remove();
}