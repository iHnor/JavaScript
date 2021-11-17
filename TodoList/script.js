let tasksList = [
    { id: 1, title: 'Зроби коли зможеш!', done: false },
    { id: 1, title: 'Зроби за сьогоднішній день!', done: false, deadline: '2021-11-17' },
    { id: 2, title: 'Сам здогадайся про що це...', deadline: '2021-11-01', done: false },
    { id: 3, title: 'Описать массив задач в JavaScript', description: "Динамической и асинхронной загрузки частей страницы в виде HTML и данных (обычно в JSON формате)", deadline: '2021-11-21', done: false },
    { id: 4, title: 'Описать массив задач в JavaScript', description: "Динамической и асинхронной загрузки частей страницы в виде HTML и данных (обычно в JSON формате)", deadline: '2021-09-21', done: false }

];

let tasksContainer = document.getElementById('tasks')
let showbtn = false;


function createTask({ id, title, description, deadline, done }) {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.id = id;
    taskDiv.appendChild(createTitleContainer(title, done, deadline));
    taskDiv.appendChild(createFooterContainer(description))

    return taskDiv;
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
        if (checkDate(deadline) && !done)
            deadlineOfTask.className = "expired-date"
        deadlineOfTask.innerHTML = formatDate(deadline);

    }
    return deadlineOfTask;
}
function formatDate(deadline) {
    let date = deadline.split('-');
    return `${date[1]}/${date[2]}/${date[0]}`;
}

function createTitleContainer(title, done, deadline) {
    let baseDiv = document.createElement("div");
    baseDiv.className = "base";
    baseDiv.appendChild(createCheckBox(done));
    baseDiv.appendChild(createTitle(title, done));
    baseDiv.appendChild(createDeadline(deadline, done));

    return baseDiv;
}

function createTitle(title, done) {
    let titleOfTask = document.createElement("h2");
    titleOfTask.innerHTML = title;
    if (done) titleOfTask.className = "done-task";

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
    let id = tasksList.findIndex(task => task.id === +div.parentNode.id)
    tasksList.splice(id, 1);
    div.parentNode.remove();
}

function clickOnCheckBox() {
    let title = this.parentNode.childNodes[1];
    let deadline = this.parentNode.lastChild;

    let id = tasksList.findIndex(task => task.id === +this.parentNode.parentNode.id)
    tasksList[id].done = !tasksList[id].done

    if (this.checked) {
        title.className = "done-task";
        deadline.className = deadline.className.replace("expired-date", '');
        if (showbtn)
            this.parentNode.parentNode.className = 'hide-content'
    }
    else {
        title.className = title.className.replace('done-task', "")
        if (checkDate(deadline.innerHTML))
            deadline.className = "expired-date";
    }
}


function showOnlyUndone(event) {
    
    if (showbtn){
        let tasks = document.querySelectorAll('.hide-content')
        event.textContent = "Tолько открытые";
        allTasks(tasks);
    }
    else {
        let tasks = document.querySelectorAll('.task')
        event.textContent = "Все";
        onlyOpen(tasks)
    }
    showbtn = !showbtn;
}

function allTasks(tasks){
    tasks.forEach(t => {
        t.className = 'task';
    })
}


function onlyOpen(tasks) {
    tasks.forEach(t => {
        let isDone = t.firstChild.firstChild.checked;
        if (isDone)
            t.className = 'hide-content'
    })
}

function removeTasks(tasks) {
    tasks.forEach(t => {
        t.remove();
    })
}

function checkDate(date) {
    let today = new Date();
    if (new Date(date).setHours(23, 59, 59) < today)
        return true;
    return false;
}

tasksList.forEach(t => {
    tasksContainer.appendChild(createTask(t));
});
