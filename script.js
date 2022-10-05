const stateTodo = {
    filter: "all",
    todos: [
        {desc: "Learn HTML",
        done: true},
        {desc: "Learn CSS",
        done: false},
        {desc: "Learn JavaScript",
        done: false},
    ]
}

const newTodo = document.querySelector("#new-todo");
if (newTodo === null) {
    console.error ("new-todo is not avaliable");
}
const addBtn = document.querySelector("#add-button");
if (addBtn === null) {
    console.error ("new-todo is not avaliable");
}

function renderTodos(){
    const output = document.querySelector(".output");
    output.innerHTML = "";

    for (let todo of stateTodo.todos){
        let toDoLi = document.createElement("li");
        const label = document.createElement("label");
        label.className = "container-todos";
        const span = document.createElement("span");
        span.className = "checkmark"
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.done;
        toDoLi.appendChild(label);
        const todoText = document.createTextNode(todo.desc);
        label.appendChild(todoText);
        label.appendChild(checkbox);
        label.appendChild(span);

        toDoLi.todoObj = todo;

        
        console.log(toDoLi);
        output.appendChild(toDoLi);
    }
}

renderTodos();

addBtn.addEventListener("click", addTodo);

function addTodo (){
    if (newTodo.value.length < 5){
        return;
    }
    const ToDo = newTodo.value;
    stateTodo.todos.push({desc: ToDo, done: false});
    newTodo.value = "";
    renderTodos();
    console.log (stateTodo)
}


const list = document.querySelector(".output");

list.addEventListener("change", function (e) {
    const todo = e.target.parentElement.todoObj;
    todo.done = e.target.checked;
})