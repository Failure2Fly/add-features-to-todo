var todosContainer = document.querySelector('#tasks')
var todoItem = document.querySelector('#todoItem')
var todoButton = document.querySelector('#todoButton')
var todoCategory = document.querySelector('#categoryType')
// var categoryTab = document.querySelector('.tab')
var todoDate = document.querySelector('#dateInput')
var count = document.querySelector('#todoCount')
console.log(todoDate)

getTodos()
showTodoAmount()

todoItem.addEventListener('keypress', handleKeyPressOnTodoItem)
todoButton.addEventListener('click', addTodo)
// categoryTab.addEventListener('click', showCategory)

// todoDate.value = moment().add(1, 'day').format('YYYY-MM-DD')

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
            <div class="input-group">
                <span class="input-group-addon">
                 <input type="checkbox" aria-label="..." data-id="${todo.id}">${todo.complete === 'yes' ? 'checked' : ''}
                 </span>
                     <li class="list-group-item">${todo.todo}
                <div class="col-sm-2 text-left">
                <span class="label label-danger">${todo.category.toUpperCase()}</span>
                 </div>
                 <div class="col-sm-2 text-right">
                <span class="label label-default">${moment(todo.due_date).format('YYYY-MM-DD')}</span>
            </div>
                     </li>
            </div>
    </div>`
    todosContainer.innerHTML = todoTemplate + todosContainer.innerHTML
}

function showTodoAmount(todo) {
    todoCount = `
    <ul class="nav nav-pills" role="tablist">
        <li role="presentation"><a href="#">Work<span class="badge"></span></a></li>
        <li role="presentation"><a href="#">Kids<span class="badge"></span></a></li>
        <li role="presentation"><a href="#">Cleaning<span class="badge"></span></a></li>
        <li role="presentation"><a href="#">Home Improvement<span class="badge"></span></a></li>
        <li role="presentation"><a href="#">Errands<span class="badge"></span></a></li>
    </ul>`
    count.innerHTML = todoCount + count.innerHTML 
    // console.log(todoCount)
}

function handleKeyPressOnTodoItem(e) {
    if (e.key === 'Enter') {
        addTodo()
    }
}

function addTodo() {
    var todoTask = todoItem.value.trim()
    var categoryItem = todoCategory.value.trim()
    // var categoryTabItem = cateogryTab.value
    var addDate = todoDate.value.trim()


    if (todoTask !== '' && categoryItem !== '' && addDate !== '') {

        // Clear out or reset fields
        todoItem.value = ''
        todoCategory.value = ''
        todoDate.value = ''
    
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
        body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(showTodo)
    .then(showTodoAmount)
    
    }

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