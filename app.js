// Document Element ID 
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clrTaskBtn = document.getElementById("clrTaskBtn");
const clrAllBtn = document.getElementById("clrAllBtn");

// --------------------- Helper Functions ---------------------

function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function deleteTask(id) {
  return getTasksFromLocalStorage().filter(task => task.id !== id);
}

function updateTask(updatedTask) {
  return getTasksFromLocalStorage().map(task =>
    task.id === updatedTask.id ? updatedTask : task
  );
}

function updateClearAllButtonState() {
  const tasks = getTasksFromLocalStorage();
  clrAllBtn.disabled = tasks.length === 0;
}

// --------------------- Render Single Task ---------------------

function renderTask(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "flex items-center justify-between mx-10 mt-5 px-5 py-3 bg-white/30 rounded-lg shadow text-white";

  const taskText = document.createElement("h1");
  taskText.className = "text-xl";
  taskText.textContent = task.text;

  if (task.completed) {
    taskText.classList.add("line-through", "opacity-70", "text-gray-200");
  }

  const actionIcons = document.createElement("div");
  actionIcons.className = "flex items-center gap-5";

  // ✅ Check Button
  const checkBtn = document.createElement("button");
  checkBtn.innerHTML = `<i class="fa-solid fa-circle-check text-green-400 hover:text-green-600 text-lg"></i>`;
  checkBtn.title = "Mark As Completed";

  checkBtn.addEventListener("click", () => {
    task.completed = !task.completed;
    saveTasksToLocalStorage(updateTask(task));
    taskText.classList.toggle("line-through");
    taskText.classList.toggle("opacity-70");
    taskText.classList.toggle("text-gray-200");
  });

  // ✏️ Edit Button
  const editBtn = document.createElement("button");
  editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square text-blue-400 hover:text-blue-600 text-xl"></i>`;
  editBtn.title = "Edit Task";

  editBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = task.text;
    input.className = "text-black px-2 py-1 rounded w-1/2 focus:outline-none focus:ring-3 focus:ring-indigo-500 bg-white";
    taskText.replaceWith(input);
    input.focus();

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        task.text = input.value.trim() || task.text;
        saveTasksToLocalStorage(updateTask(task));
        input.replaceWith(taskText);
        taskText.textContent = task.text;
      }
    });

    input.addEventListener("blur", () => {
      task.text = input.value.trim() || task.text;
      saveTasksToLocalStorage(updateTask(task));
      input.replaceWith(taskText);
      taskText.textContent = task.text;
    });
  });

  // 🗑️ Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash text-red-400 hover:text-red-600 text-lg"></i>`;
  deleteBtn.title = "Delete Task";

  deleteBtn.addEventListener("click", () => {
    taskDiv.remove();
    saveTasksToLocalStorage(deleteTask(task.id));
    updateClearAllButtonState();
  });

  // Append all action buttons
  actionIcons.appendChild(checkBtn);
  actionIcons.appendChild(editBtn);
  actionIcons.appendChild(deleteBtn);

  // Final append
  taskDiv.appendChild(taskText);
  taskDiv.appendChild(actionIcons);
  taskList.appendChild(taskDiv);
}

// --------------------- Add New Task ---------------------

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  const tasks = getTasksFromLocalStorage();
  tasks.push(newTask);
  saveTasksToLocalStorage(tasks);
  renderTask(newTask);

  taskInput.value = "";
  updateClearAllButtonState();
}

// --------------------- Load Tasks on Page Load ---------------------

function renderTasksFromLocalStorage() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(renderTask);
  updateClearAllButtonState();
}

// --------------------- Clear All Button ---------------------

clrAllBtn.addEventListener("click", () => {
  const confirmClr = confirm("Are you sure you want to clear all tasks?");
  if (confirmClr) {
    localStorage.removeItem("tasks");
    taskList.innerHTML = "";
    updateClearAllButtonState();
  }
});

// --------------------- Event Listeners ---------------------

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

clrTaskBtn.addEventListener("click", () => {
  taskInput.value = "";
});

// On Page Load
window.addEventListener("DOMContentLoaded", renderTasksFromLocalStorage);
