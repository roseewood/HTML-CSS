// Todo array stored in memory
let todos = [];
let currentFilter = "all";

// DOM elements
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");
const clearCompletedBtn = document.getElementById("clearCompleted");
const filterBtns = document.querySelectorAll(".filter-btn");

// Initialize app
function init() {
  addBtn.addEventListener("click", addTodo);
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
  });
  clearCompletedBtn.addEventListener("click", clearCompleted);

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      currentFilter = e.target.dataset.filter;
      renderTodos();
    });
  });

  renderTodos();
}

// Add new todo
function addTodo() {
  const text = todoInput.value.trim();

  if (text === "") {
    todoInput.focus();
    return;
  }

  const todo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(todo);
  todoInput.value = "";
  todoInput.focus();
  renderTodos();
}

// Toggle todo completion
function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

// Delete todo
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

// Clear completed todos
function clearCompleted() {
  todos = todos.filter((todo) => !todo.completed);
  renderTodos();
}

// Get filtered todos
function getFilteredTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  } else if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }
  return todos;
}

// Render todos
function renderTodos() {
  const filteredTodos = getFilteredTodos();

  if (filteredTodos.length === 0) {
    todoList.innerHTML = `
            <div class="empty-state">
                <p>No tasks to show</p>
                <small>Add a task to get started!</small>
            </div>
        `;
  } else {
    todoList.innerHTML = filteredTodos
      .map(
        (todo) => `
            <li class="todo-item ${
              todo.completed ? "completed" : ""
            }" data-id="${todo.id}">
                <div class="checkbox" onclick="toggleTodo(${todo.id})"></div>
                <span class="todo-text">${escapeHtml(todo.text)}</span>
                <button class="delete-btn" onclick="deleteTodo(${
                  todo.id
                })">Delete</button>
            </li>
        `
      )
      .join("");
  }

  updateTaskCount();
}

// Update task count
function updateTaskCount() {
  const activeTodos = todos.filter((todo) => !todo.completed).length;
  taskCount.textContent = `${activeTodos} ${
    activeTodos === 1 ? "task" : "tasks"
  } remaining`;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Start the app
init();
