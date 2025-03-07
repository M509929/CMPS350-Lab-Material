// 1. check you js is linked
// console.log('It is linked');

// 2. get the references to the elements we want to interact with
const form = document.querySelector('#form');
const todolistContainer = document.querySelector('#todolist-container');
const clearTodos = document.querySelector('#clear-todos');

// 3. add the event listener to the form
form.addEventListener('submit', handleSubmit);
clearTodos.addEventListener('click', handleClearTodos);

let todos = localStorage.todos ? JSON.parse(localStorage.todos) : []
renderTodos();

// 4. create the function that will handle the submit event

function handleSubmit(e) {
    //    const data = new FormData(event.target);
    e.preventDefault();
    const data = new FormData(form);
    const todo = Object.fromEntries(data);
    todo.id = `id-${Date.now()}`;

    todos.push(todo);

    localStorage.todos = JSON.stringify(todos);

    renderTodos();
    form.reset();


}

// 5. helper function to generate the todo item
function convertToCard(todo) {
    return ` <div class="form-group todo" id="">
                    <p class="todo-title ${todo.completed ? 'strike' : ''}" id="${todo.id}" >${todo.title}</p>
                    <input class="completed icon" type="checkbox"
                    onclick="" ${todo.completed ? 'checked' : ''} 
                    onchange="toggleCompleted('${todo.id}')">
                    <i class="fa fa-trash icon" onclick="deleteTodo(${todo.id})"></i>
            </div>`;

}

function renderTodos() {
    todolistContainer.innerHTML = todos.map(todo => convertToCard(todo)).join('');
}

function toggleCompleted(id) {
    const index = todos.findIndex(todo => todo.id === id);
    todos[index].completed = !todos[index].completed;
    localStorage.todos = JSON.stringify(todos);
    renderTodos();
}

function deleteTodo(id) {
    const index = todos.findIndex(todo => todo.id === id);
    todos.splice(index, 1);
    localStorage.todos = JSON.stringify(todos);
    renderTodos();
}

function handleClearTodos(event) {
    todos = [];
    delete localStorage.todos;
    renderTodos();
}