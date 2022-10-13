/*Class with all functions about state and render*/
class TodoApp {
  constructor(state) {
    this.state = JSON.parse(localStorage.getItem('stateTodo'));
    if (this.state === null) {
      this.state = {
        filter: 'filter-all',
        todos: [],
      };
    }
    this.renderHTML();
    this.setFilter();
  }

  renderHTML() {
    const output = document.querySelector('.todo-list');
    output.innerHTML = '';
    for (let todo of this.state.todos) {
      const newTodoLi = document.createElement('li');
      newTodoLi.setAttribute('class', 'todo');
      newTodoLi.todoObj = todo;
      output.appendChild(newTodoLi);
      let newTodoHTML = `<label class="container-todos">`;
      newTodoHTML += `<input type="checkbox"`;
      if (todo.done) {
        newTodoHTML += ` checked=${todo.done}`;
      }
      newTodoHTML += `><span class="checkmark"></span>`;
      newTodoHTML += `<span class="todo">${todo.desc}</span></label>`;
      newTodoLi.innerHTML += newTodoHTML;
    }
  }

  setFilter() {
    const filter = '#' + this.state.filter;
    const filterBtn = document.querySelector(filter);
    filterBtn.checked = true;
    this.changeFilter(this.state.filter);
  }

  saveState() {
    localStorage.setItem('stateTodo', JSON.stringify(this.state));
  }

  changeFilter(filterType) {
    const savedTodos = this.state.todos;
    switch (filterType) {
      case 'filter-all':
        this.renderHTML();
        break;
      case 'filter-open':
        this.state.todos = this.state.todos.filter((todo) => !todo.done);
        this.renderHTML();
        this.state.todos = savedTodos;
        break;
      case 'filter-done':
        this.state.todos = this.state.todos.filter((todo) => todo.done);
        this.renderHTML();
        this.state.todos = savedTodos;
        break;
    }
  }
}

const todoApp = new TodoApp();

/*Add new Todo*/
const addButton = document.querySelector('#add-button');
if (addButton === null) {
  console.error('add-button is not avaliable');
}
addButton.addEventListener('click', function () {
  const newTodo = document.querySelector('#new-todo');
  if (newTodo.value.length < 5) {
    return;
  }
  todoApp.state.todos.push({ desc: newTodo.value, done: false });
  newTodo.value = '';
  todoApp.renderHTML();
  todoApp.saveState();
});

/*Delete done Todos with delete-button*/
const deleteButton = document.querySelector('#delete-button');
if (deleteButton === null) {
  console.error('delete-button is not avaliable');
}
deleteButton.addEventListener('click', function () {
  todos = todoApp.state.todos.filter((todo) => !todo.done);
  todoApp.state.todos = todos;
  todoApp.renderHTML();
  todoApp.saveState();
});

const todoList = document.querySelector('.todo-list');

todoList.addEventListener('change', function (e) {
  const todo = e.target.parentElement.parentElement.todoObj;
  const label = e.target.parentElement;
  const todoText = label.querySelector('.todo');
  todo.done = e.target.checked;

  todoApp.saveState();
});

/*select die Gruppe der Filter*/
const filterRadio = document.querySelector('.filter');

filterRadio.addEventListener('change', function (e) {
  const filterType = e.target.value;
  todoApp.state.filter = filterType;
  todoApp.saveState();
  todoApp.changeFilter(filterType);
});
