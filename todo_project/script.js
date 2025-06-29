document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  loadDarkMode();
});

// ========== TASK CRUD ==========

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const task = { text: taskText, completed: false };
    createTask(task);
    saveTask(task);
    taskInput.value = "";
  }
}

function createTask(task) {
  const li = document.createElement("li");
  li.className = task.completed ? "completed" : "";

  const span = document.createElement("span");
  span.textContent = task.text;
  span.onclick = () => toggleComplete(task.text);

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.onclick = () => editTask(task.text);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.onclick = () => deleteTask(task.text);

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  document.getElementById("taskList").appendChild(li);
}

function editTask(oldText) {
  const newText = prompt("Edit task:", oldText);
  if (newText && newText.trim() !== "") {
    const tasks = getTasks();
    const index = tasks.findIndex(t => t.text === oldText);
    tasks[index].text = newText.trim();
    saveTasksToStorage(tasks);
    renderTasks();
  }
}

function toggleComplete(text) {
  const tasks = getTasks();
  const index = tasks.findIndex(t => t.text === text);
  tasks[index].completed = !tasks[index].completed;
  saveTasksToStorage(tasks);
  renderTasks();
}

function deleteTask(text) {
  let tasks = getTasks();
  tasks = tasks.filter(t => t.text !== text);
  saveTasksToStorage(tasks);
  renderTasks();
}

function clearAll() {
  if (confirm("Delete all tasks?")) {
    localStorage.removeItem("tasks");
    renderTasks();
  }
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  saveTasksToStorage(tasks);
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  renderTasks();
}

function renderTasks(filter = "all") {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  let tasks = getTasks();

  if (filter === "active") tasks = tasks.filter(t => !t.completed);
  else if (filter === "completed") tasks = tasks.filter(t => t.completed);

  tasks.forEach(task => createTask(task));
}

// ========== FILTER BUTTONS ==========

function setFilter(filter) {
  renderTasks(filter);
}

// ========== DARK MODE ==========

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const icon = document.getElementById('mode-icon');
  const isDark = document.body.classList.contains('dark-mode');
  icon.textContent = isDark ? '🌙' : '🌞';
  localStorage.setItem("darkMode", isDark);
}

function loadDarkMode() {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    document.getElementById('mode-icon').textContent = '🌙';
  }
}
