let tasksList = [
    { id: 0, title: 'Зроби коли зможеш!', done: false },
    { id: 1, title: 'Зроби за сьогоднішній день!', done: true, deadline: '2021-11-17' },
    { id: 2, title: 'Сам здогадайся про що це...', deadline: '2021-11-01', done: false },
    { id: 3, title: 'Описать массив задач в JavaScript', description: "Динамической и асинхронной загрузки частей страницы в виде HTML и данных (обычно в JSON формате)", deadline: '2021-11-21', done: false },
    { id: 4, title: 'Описать массив задач в JavaScript', description: "Динамической и асинхронной загрузки частей страницы в виде HTML и данных (обычно в JSON формате)", deadline: '2021-09-21', done: false }

];

let tasksContainer = document.getElementById('tasks')

function createTask({ id, title, description, deadline, done }) {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.id = id;
    taskDiv.classList.toggle("done-task", done);
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
    let id = tasksList.findIndex(task => task.id === +div.parentNode.id)
    tasksList.splice(id, 1);
    div.parentNode.remove();
}

function clickOnCheckBox() {
    let title = this.parentNode.childNodes[1];
    let deadline = this.parentNode.lastChild;
    let taskNode = this.parentNode.parentNode;

    let id = tasksList.findIndex(task => task.id === +taskNode.id)
    tasksList[id].done = !tasksList[id].done
    // expired-date виправить
    taskNode.classList.toggle('done-task', this.checked)
    if (this.checked) {
        deadline.className = deadline.className.replace("expired-date", '');

    }
    else {
        if (checkDate(deadline.innerHTML))
            deadline.className = "expired-date";
    }
}

function showOnlyUndone(event) {
    let doneTasksHidden = tasksContainer.classList.toggle("hide-done");
    event.textContent = doneTasksHidden ? "Показать все" : "Скрыть выполененые";
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
