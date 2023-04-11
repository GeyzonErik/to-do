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
            console.log(task);
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
        <li id='${task.id}' class="to-do__task ${task.completed ? 'checked': ''}">
            <input type="checkbox" onChange="checkTask(this)" ${task.completed ? 'checked' : ''}>
            <p>${task.title}</p>
            <div to-do__item-options>
                <button onclick="editTask(this)">Editar</button>
                <button onclick="removeTask(this)">Excluir</button>
            </div>
        </li>
        `
    });
}

renderTasks();