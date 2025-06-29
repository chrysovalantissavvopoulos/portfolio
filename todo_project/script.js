document.addEventListener('DOMContentLoaded', () => {
  loadTasks();

  const icon = document.getElementById('mode-icon');
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    icon.textContent = '🌙';  // dark mode icon
  } else {
    icon.textContent = '🌞';  // light mode icon
  }
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    createTask(taskText);
    saveTask(taskText);
    taskInput.value = "";
  }
}

function createTask(text) {
  const li = document.createElement("li");
  li.innerHTML = `${text} <button onclick="deleteTask(this)">🗑️</button>`;
  document.getElementById("taskList").appendChild(li);
}

function deleteTask(button) {
  const li = button.parentElement;
  const taskText = li.firstChild.textContent.trim();
  removeTask(taskText);
  li.remove();
}

function clearAll() {
  if (confirm("Delete all tasks?")) {
    localStorage.removeItem("tasks");
    document.getElementById("taskList").innerHTML = "";
  }
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTask(task));
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const icon = document.getElementById('mode-icon');

  if (document.body.classList.contains('dark-mode')) {
    icon.textContent = '🌙'; // dark mode = σελήνη
    localStorage.setItem("darkMode", "true");
  } else {
    icon.textContent = '🌞'; // light mode = ήλιος
    localStorage.setItem("darkMode", "false");
  }
}
