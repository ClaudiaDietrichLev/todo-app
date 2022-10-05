const stateTodo = {
    filter: "filter-all",
    todos: [
        {desc: "Learn HTML",
        done: true},
        {desc: "Learn CSS",
        done: false},
        {desc: "Learn JavaScript",
        done: false},
    ]
}

/*Todos in an array */
let todos = stateTodo.todos;

/*Select the Input-Field for new Todos*/
const newTodo = document.querySelector("#new-todo");
if (newTodo === null) {
    console.error ("new-todo is not avaliable");
}

/*select Add-Button*/
const addBtn = document.querySelector("#add-button");
if (addBtn === null) {
    console.error ("add-button is not avaliable");
}

/*select DeleteButton*/
const deleteBtn = document.querySelector(".remove");
if (deleteBtn === null) {
    console.error ("delete-button is not avaliable");
}

/*select die Gruppe der Filter*/
const filterRadio = document.querySelector(".filter");

/*Filter aus dem State-Array auslesen und auswählen*/
setFilter();

/*Die Todos werden gerendert*/
renderTodos(todos);

filterRadio.addEventListener("change", function (e){
    const filterType = e.target.value;
    switch (filterType) {
        case "filter-all":
            renderTodos(todos);
            break;
        case "filter-open":
            const todoOpen = todos.filter(todo => !todo.done);
            renderTodos(todoOpen);
            break;
        case "filter-done":
            const todoDone = todos.filter(todo => todo.done);
            renderTodos(todoDone);
            break;
    }
});

addBtn.addEventListener("click", addTodo);

deleteBtn.addEventListener("click", function (){
    todos = todos.filter(todo => !todo.done);
    renderTodos(todos);
})

const list = document.querySelector("#todo-list");

list.addEventListener("change", function (e) {
    const todo = e.target.parentElement.parentElement.todoObj;
    const label = e.target.parentElement;
    const todoText = label.querySelector(".todo");
    todo.done = e.target.checked;
    if (todo.done){
        todoText.classList.add('todo-done');
    } else {
        todoText.classList.remove('todo-done');
    }
})




function setFilter () {
    const filter = "#" + stateTodo.filter;
    const filterBtn = document.querySelector(filter);
    filterBtn.checked = true;     
}

function renderTodos(todos){
    const output = document.querySelector("#todo-list");
    output.innerHTML = "";

    for (let todo of todos){
        let toDoLi = document.createElement("li");

        const label = document.createElement("label");
        label.setAttribute("class","container-todos");
        
        const span = document.createElement("span");
        span.setAttribute("class","checkmark");
        
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.checked = todo.done;

        const todoText = document.createElement("span");
        todoText.setAttribute("class", "todo");
        if (checkbox.checked){
            todoText.setAttribute("class", "todo todo-done");
        }
        todoText.innerText = todo.desc;

        label.appendChild(todoText);
        label.appendChild(checkbox);
        label.appendChild(span);
        
        toDoLi.appendChild(label);
        toDoLi.todoObj = todo;

        output.appendChild(toDoLi);
    }
}


function addTodo (){
    if (newTodo.value.length < 5){
        return;
    }
    const ToDo = newTodo.value;
    stateTodo.todos.push({desc: ToDo, done: false});
    newTodo.value = "";
    renderTodos(todos);
}

