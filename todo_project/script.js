// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach(addTaskToList);

  // Apply theme
  const isDark = localStorage.getItem("theme") === "dark";
  if (isDark) {
    document.body.classList.add("dark-mode");
  }
});

const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const addButton = document.getElementById("add-task");

// Add task
addButton.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task !== "") {
    addTaskToList(task);
    saveTask(task);
    taskInput.value = "";
  }
});

function addTaskToList(task) {
  const li = document.createElement("li");
  li.textContent = task;
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Toggle dark mode
const toggleBtn = document.getElementById("toggle-theme");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", mode);
});
