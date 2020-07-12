const todoInput  = document.querySelector(".newItem__todoInput");
const todoButton = document.querySelector(".newItem__todoButton");
const todoList   = document.querySelector(".todoContainer__todoList");
const filterOption = document.querySelector(".selectCategory__filters");

// LocalStorage
document.addEventListener('DOMContentLoaded', getTodos);

// Salvando no Localstorage
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
// Removendo do LocalStorage
function removeLocalTodos(todo) {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
// Armazenando os itens
function getTodos() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(todo => {

        const todoDiv = document.createElement("li");
        todoDiv.classList.add("todo");
        todoDiv.classList.add("centered");

        // Criação do item
        const newTodo = document.createElement("div");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");

        // Botão check
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");

        // Botão apagar
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");

        // Formação do item
        todoDiv.appendChild(newTodo);
        todoDiv.appendChild(completedButton);
        todoDiv.appendChild(trashButton);
        // Inserindo item na lista
        todoList.appendChild(todoDiv);

    });
}

// Criação de itens
todoButton.addEventListener("click", event => {

    event.preventDefault();

    const todoDiv = document.createElement("li");
    todoDiv.classList.add("todo");
    todoDiv.classList.add("centered");

    // Criação do item
    const newTodo = document.createElement("div");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    // Save LocalStorage
    saveLocalTodos(todoInput.value);

    // Botão check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");

    // Botão apagar
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    // Formação do item
    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(trashButton);
    // Inserindo item na lista
    todoList.appendChild(todoDiv);

    // Limpar campo ao adicionar
    todoInput.value = "";

});

// Efeitos itens
todoList.addEventListener("click", e => {

    const item = e.target;

    // Deletar item 
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        // Animação quando deleta o item
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", () => {
            todo.remove();
        });
    }

    // Marcar como completa
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

});

// Filtro de itens
filterOption.addEventListener("click", e => {

    const todos = document.querySelectorAll(".todo");

    todos.forEach(todo => {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });

});