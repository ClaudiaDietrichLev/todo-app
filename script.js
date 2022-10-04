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
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.done;
        checkbox.className = "checkbox"
        toDoLi.appendChild(checkbox);

        toDoLi.todoObj = todo;

        const todoText = document.createTextNode(todo.desc);
        toDoLi.appendChild(todoText);
        console.log(toDoLi);
        output.appendChild(toDoLi);
    }
}

renderTodos();

addBtn.addEventListener("click", addTodo);

function addTodo (){
    if (newTodo.value.length < 3){
        return;
    }
    const ToDo = newTodo.value;
    stateTodo.todos.push({desc: ToDo, done: false});
    newTodo.value = "";
    renderHTML();
    console.log (stateTodo)
}


const list = document.querySelector(".output");

list.addEventListener("change", function (e) {
    const todo = e.target.parentElement.todoObj;
    todo.done = e.target.checked;
})