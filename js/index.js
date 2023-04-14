const task = document.querySelector('.form__input');
const toDoList = document.querySelector('.to-do__items');

task.addEventListener('keypress', (event) => {
    event.key == 'Enter' ? submitTask() : false;
})

class Task {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.completed = false;
    }
}

function submitTask() {
    if(task.value.trim() === '') {
        task.value = '';
        return alert('Task não pode ser vazia');
    }

    localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem('tasks') || '[]'), new Task(Date.now(), task.value)]));
    task.value = '';
    
    renderTasks();
}

function editTask(event) {
    const listOfTasks = JSON.parse(localStorage.getItem('tasks'));
    listOfTasks.forEach(task => {
        if(task.id === parseInt(event.parentElement.id)) {
            const newTitle = prompt('Digite o novo titulo da Task');
            if(newTitle == '') {
                return alert('Valor não pode ser vazio');
            }
            if(newTitle == null) {
                return;
            }
            task.title = newTitle;
        }
    })
    localStorage.setItem('tasks', JSON.stringify(listOfTasks));
    renderTasks();
}

function removeTask(event) {
    const listOfTasks = JSON.parse(localStorage.getItem('tasks'));
    let taskIndex = undefined;
    listOfTasks.forEach((task, index) => {
        if(task.id === parseInt(event.parentElement.id)) {
            taskIndex = index;
        }
    })

    listOfTasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(listOfTasks));

    renderTasks();
}

function checkTask(event) {
    const listOfTasks = JSON.parse(localStorage.getItem('tasks'));
    listOfTasks.forEach(task => {
        if(task.id === parseInt(event.parentElement.id)) {
            task.completed = event.checked;
        }
    })
    localStorage.setItem('tasks', JSON.stringify(listOfTasks));
    event.parentElement.classList.toggle('checked');
}

function renderTasks() {
    if (localStorage.getItem("tasks") == null) return;

    const listOfTasks = JSON.parse(localStorage.getItem('tasks'));

    toDoList.innerHTML = '';
    listOfTasks.forEach(task => {
        toDoList.innerHTML += 
        `
        <li id='${task.id}' class="to-do__task">
            <div class="${task.completed ? 'checked': ''}">
                <input type="checkbox" onChange="checkTask(this)" ${task.completed ? 'checked' : ''}>
                <p>${task.title}</p>
            </div>
            <div id='${task.id}'>
                <button onclick="editTask(this)"><img src="./assets/images/edit-3.svg" style="width: 1.3rem"/></button>
                <button onclick="removeTask(this)"><img src="./assets/images/trash.svg" style="width: 1.3rem" /></button>
            </div>
        </li>
        `
    });
}

renderTasks();
