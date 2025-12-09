const API = "https://app-py-to-dolist.onrender.com";

async function loadTasks() {
  const resp = await fetch(`${API}/tasks`);
  const data = await resp.json();
  const port = process.env.PORT || 18012 

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(t => {
    let li = document.createElement("li");
    li.innerHTML = `${t.content}
      <button onclick="complete(${t.id})">Completar</button>
      <button onclick="remove(${t.id})">Eliminar</button>`;
    list.appendChild(li);
  });
}
loadTasks();

async function addTask() {
  const content = document.getElementById("input-task").value;
  await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({content})
  });
  loadTasks();
}

async function complete(id) {
  await fetch(`${API}/tasks/${id}/complete`, {method:"PUT"});
  loadTasks();
}

async function remove(id) {
  await fetch(`${API}/tasks/${id}`, {method:"DELETE"});
  loadTasks();
}


