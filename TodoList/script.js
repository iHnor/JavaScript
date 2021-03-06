// let tasksList = [
//     { id: 0, title: 'Зроби коли зможеш!', done: false },
//     { id: 1, title: 'Зроби за сьогоднішній день!', done: false, deadline: '2021-11-18' },
//     { id: 2, title: 'Сам здогадайся про що це...', deadline: '2021-11-01', done: true },
//     { id: 4, title: 'Описать массив задач в JavaScript', description: "Динамической и асинхронной загрузки частей страницы в виде HTML и данных (обычно в JSON формате)", deadline: '2021-09-21', done: false }

// ];

let tasksContainer = document.getElementById('tasks')

function createAndAppendTaskNode({ id, title, description, deadline, done }) {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.id = id;
    taskDiv.classList.toggle("done-task", done);
    taskDiv.appendChild(createTitleContainer(title, done, deadline));
    taskDiv.appendChild(createFooterContainer(description))

    tasksContainer.appendChild(taskDiv)
}

function createFooterContainer(description) {
    let footerDiv = document.createElement("div");
    footerDiv.className = "description-delete";
    footerDiv.appendChild(createDescription(description));
    footerDiv.appendChild(createButton());

    return footerDiv;
}

function createDeadline(deadline, done) {
    let deadlineOfTask = document.createElement("h3");
    if (deadline !== undefined) {
        if (isExpired(deadline) && !done)
            deadlineOfTask.className = "expired-date"
        deadlineOfTask.innerHTML = formatDate(deadline);

    }
    return deadlineOfTask;
}
function formatDate(deadline) {
    let date = deadline.split('-');
    return `${date[2]}.${date[1]}`;
}
function createTitleContainer(title, done, deadline) {
    let baseDiv = document.createElement("div");
    baseDiv.className = "base";
    baseDiv.appendChild(createCheckBox(done));
    baseDiv.appendChild(createTitle(title));
    baseDiv.appendChild(createDeadline(deadline, done));

    return baseDiv;
}

function createTitle(title) {
    let titleOfTask = document.createElement("h2");
    titleOfTask.innerHTML = title;

    return titleOfTask;
}

function createCheckBox(done) {
    let doneOfTask = document.createElement("input");
    doneOfTask.type = 'checkbox';
    if (done)
        doneOfTask.checked = 'checked';

    doneOfTask.onclick = clickOnCheckBox;

    return doneOfTask;
}

function createDescription(desc) {
    let descOfTask = document.createElement("p");
    if (desc !== undefined)
        descOfTask.innerHTML = desc;

    return descOfTask;
}

function createButton() {
    let button = document.createElement("button");
    button.textContent = "X";

    button.onclick = clickOnDeleteButton;
    return button;
}

function clickOnDeleteButton() {
    let div = this.parentNode
    deleteTask(div);
    div.parentNode.remove();
}

function deleteTask(div) {
    fetch(tasksEndpoint + '/' + div.parentNode.id, {
        method: 'DELETE'
    })
        .then(response => response.json())
}

async function getElementById(taskId) {
    return await fetch(tasksEndpoint + '/' + taskId, {
        method: 'GET'
    })
        .then(response => response.json())
}

function changeDoneValue(taskId, done) {

    fetch(tasksEndpoint + '/' + taskId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ done })
    })
        .then(response => response.json())
}

async function clickOnCheckBox() {
    let deadline = this.parentNode.lastChild;
    let taskNode = this.parentNode.parentNode;
    let taskId = +taskNode.id;
    let task = await getElementById(taskId);
    task.done = !task.done;
    changeDoneValue(taskId, task.done);
    taskNode.classList.toggle('done-task', task.done);
    deadline.classList.toggle('expired-date', !task.done && isExpired(task.deadline));
}

function showOnlyUndone(event) {
    let doneTasksHidden = tasksContainer.classList.toggle("hide-done");
    event.textContent = doneTasksHidden ? "Показать все" : "Скрыть выполненные";
}

function removeTasks(tasks) {
    tasks.forEach(t => {
        t.remove();
    })
}

function isExpired(deadline) {
    let today = new Date();
    return new Date(deadline).setHours(23, 59, 59) < today;
}

const tasksEndpoint = 'http://localhost:3000/tasks';
const tasksForm = document.forms['task'];

tasksForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(tasksForm);
    let task = Object.fromEntries(formData.entries());
    task = createTask(task);
    if (task.title.length !== 0) {
        postTask(task)
            .then(createAndAppendTaskNode)
            .then(_ => tasksForm.reset());
    }
    else {
        alert("Неможливо додати пусту задачу")
    }
})

function postTask(task) {
    return fetch(tasksEndpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
        .then(response => response.json())

}

function createTask({ title, description, deadline }) {
    let task = { title, description, done: false };
    task.deadline = deadline || undefined;
    return task;
}


fetch(tasksEndpoint)
    .then(response => response.json())
    .then(tasks => tasks.forEach(createAndAppendTaskNode))