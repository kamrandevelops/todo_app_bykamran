// Get the necessary DOM elements
const newTodoInput = document.getElementById('new-todo');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

// Array to store the todo items
let todos = [];

// Function to render the todo list
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      toggleTodoCompleted(index);
    });

    const span = document.createElement('span');
    span.textContent = todo.text;
    if (todo.completed) {
      span.style.textDecoration = 'line-through';
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTodo(index);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

// Function to add a new todo
function addTodo() {
  const todoText = newTodoInput.value.trim();
  if (todoText) {
    todos.push({ text: todoText, completed: false });
    newTodoInput.value = '';
    renderTodos();
  }
}

// Function to toggle a todo's completion status
function toggleTodoCompleted(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

// Function to delete a todo
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Event listeners
addTodoButton.addEventListener('click', addTodo);
newTodoInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

// Load todos from localStorage on page load
const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
todos = savedTodos;
renderTodos();

// Save todos to localStorage whenever the todo list changes
window.addEventListener('beforeunload', () => {
  localStorage.setItem('todos', JSON.stringify(todos));
});