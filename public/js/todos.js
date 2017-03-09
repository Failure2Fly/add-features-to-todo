var todosContainer = document.querySelector('#tasks')
var todoItem = document.querySelector('#todoItem')
var todoButton = document.querySelector('#todoButton')
var todoCategory = document.querySelector('#categoryType')
// var categoryTab = document.querySelector('.tab')
var todoDate = document.querySelector('#date-input')
var count = document.querySelector('#todoCount')

getTodos()

todoItem.addEventListener('keypress', handleKeyPressOnTodoItem)
todoButton.addEventListener('click', addTodo)
// categoryTab.addEventListener('click', showCategory)

function getTodos() {
    fetch('http://localhost:3000/api/v1/todos')
    .then(response => response.json())
    .then(loopTodos)
}

function loopTodos(todos) {
    todosContainer.innerHTML = ''
    todos.forEach(showTodo)
}

function showTodo(todo) {
    var todoTemplate = `
    <div class="row-todo-list">
        <div>
    <div class="input-group">
      <span class="input-group-addon">
        <input type="checkbox" aria-label="...">
      </span>
      <li class="list-group-item">${todo.todo}</li>
    </div>
  </div>`
    todosContainer.innerHTML = todoTemplate + todosContainer.innerHTML
}

function showTodoAmount(todo) {
    var todoCount = `
    <ul class="nav nav-pills" role="tablist">
        <li role="presentation"><a href="#">Work<span class="badge"></span></a></li>
        <li role="presentation"><a href="#">Kids<span class="badge"></span></a></li>
        <li role="presentation"><a href="#">Cleaning<span class="badge"></span></a></li>
        <li role="presentation"><a href="#">Home Improvement<span class="badge"></span></a></li>
        <li role="presentation"><a href="#">Errands<span class="badge"></span>$</a></li>
    </ul>`
    count.innerHTML = todoCount + count.innerHTML 
    console.log(todoCount)
}

function handleKeyPressOnTodoItem(e) {
    if (e.key === 'Enter') {
        addTodo()
    }
}

function addTodo() {
    var todoTask = todoItem.value
    var categoryItem = todoCategory.value
    // var categoryTabItem = cateogryTab.value
    var addDate = todoDate.value
    

    var body = {
        todo: todoTask,
        completed: false,
        category: categoryItem,
        due_date: addDate
    }

    fetch('http://localhost:3000/api/v1/todos', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(showTodoAmount())
    .then(showTodo)
}

// function showCategory() {
//     fetch('http://localhost:3000/api/v1/todos', {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(body)
//     })
//     .then(response => response.json())
//     return 
// }