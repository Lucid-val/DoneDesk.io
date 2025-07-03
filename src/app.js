const taskInput = document.getElementById("taskInput")
const addTaskBtn = document.getElementById("addTaskBtn")
const taskList = document.getElementById("taskList");
const clrTaskBtn = document.getElementById("clrTaskBtn")


function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const taskDiv = document.createElement("div");
  taskDiv.className = "flex items-center justify-between mx-10 mt-5 px-5 py-3 bg-white/30 rounded-lg shadow text-white";

  const task = document.createElement("h1");
  task.className = "text-xl";
  task.textContent = taskText;

  const actionIcons = document.createElement("div");
  actionIcons.className = "flex items-center gap-5";

  const editBtn = document.createElement("button");
  editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square text-blue-400 hover:text-blue-600 text-lg"></i>`;
  editBtn.setAttribute("title", "Edit Task");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash text-red-400 hover:text-red-600 text-lg"></i>`;
  deleteBtn.setAttribute("title", "Delete Task");

  actionIcons.appendChild(editBtn);
  actionIcons.appendChild(deleteBtn);

  taskDiv.appendChild(task);
  taskDiv.appendChild(actionIcons);

  taskList.appendChild(taskDiv);
  taskInput.value = "";


}


addTaskBtn.addEventListener('click',addTask)

taskInput.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter') addTask();
})

clrTaskBtn.addEventListener('click',()=>{
    taskInput.value = "";
})

