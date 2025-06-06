const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task");

async function fetchTodos() {
  const res = await fetch("/todos");
  const todos = await res.json();
  todoList.innerHTML = "";
  todos.forEach((todo, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="todo-index">${idx + 1}.</span>
      <input type="checkbox" ${todo.completed === "selesai" ? "checked" : ""} data-id="${todo.id}" class="toggle-checkbox">
      <span style="${todo.completed === "selesai" ? 'text-decoration:line-through;color:gray;' : ''}">
        ${todo.task}
      </span>
      <button data-id="${todo.id}" class="edit-btn">Edit</button>
      <button data-id="${todo.id}" class="delete-btn">Hapus</button>
    `;
    // Toggle completed
    li.querySelector(".toggle-checkbox").onchange = async () => {
      await fetch(`/todos/${todo.id}/toggle`, { method: "PATCH" });
      fetchTodos();
    };
    // Edit
    li.querySelector(".edit-btn").onclick = async () => {
      const newTask = prompt("Edit todo:", todo.task);
      if (newTask && newTask.trim() !== "") {
        await fetch(`/todos/${todo.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task: newTask })
        });
        fetchTodos();
      }
    };
    // Delete
    li.querySelector(".delete-btn").onclick = async () => {
      if (confirm("Hapus todo ini?")) {
        await fetch(`/todos/${todo.id}`, { method: "DELETE" });
        fetchTodos();
      }
    };
    todoList.appendChild(li);
  });
}

todoForm.onsubmit = async (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  if (!task) return;
  await fetch("/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task })
  });
  taskInput.value = "";
  fetchTodos();
};

fetchTodos();