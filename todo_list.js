const input = document.querySelector("input");
const addButtON = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const emptyImage = document.querySelector(".image");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];

showTodos();


function getTodoHtml(todo, index) {
    let checked = todo.status === "completed" ? "checked" : "";
    return `
      <li class="todo">
        <label for="${index}">
          <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
          <span class="${checked}">${todo.name}</span>
        </label>
        <button class="delete-btn" data-index="${index}" onclick="remove(this)">
          <i class='bx bx-x' style='color:black' ></i>
        </button>
      </li>
    `;
  }

function showTodos() {
 
    if(todosJson.length == 0){
        todosHtml.innerHTML= '';
        emptyImage.style.display = 'block';
    }
    else{
        todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
        emptyImage.style.display = 'none';
    }
}

function addTodo(todo) {
    
    input.value = "";
    todosJson.unshift({name:todo, status:"pending"});
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();

}

input.addEventListener("keyup", e=> {
    let todo = input.value.trim();
    if(!todo || e.key != "Enter"){
        return;
    }
    addTodo(todo);
});

addButtON.addEventListener("click", () => {
    let todo = input.value.trim();
    if(!todo){
        return;
    }
    addTodo(todo);
});

function updateStattus(todo){
    let todoName = todo.parentElement.lastElementChild;
    if(todo.checked){
        todoName.classList.add("checked");
    }

    else{
        todoName.classList.remove("checked");
        todoJson[todo.id].status = "pending";
    }
    localStorage.setItem("todos",JSON.stringify(todosjason))
}

function remove(todo){
    const index = todo.dataset.index;
    todosJson.splice(index,1);
    showTodos();
    localStorage.setItem("todos", JSON.stringify(todosJson));
}  



