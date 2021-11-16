let tasksList = [
    { id: 1, title: 'Зроби коли зможеш!', done: false },
    { id: 2, title: 'Сам здогадайся про що це...', deadline: '2021-11-01', done: false },
    { id: 3, title: 'Описать массив задач в JavaScript', description: "Динамической и асинхронной загрузки частей страницы в виде HTML и данных (обычно в JSON формате)", deadline: '2021-11-21', done: false },

];

let tasksContainer = document.getElementById('tasks')


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
        deadlineOfTask.innerHTML = formatDeadline(deadline);

    }
    return deadlineOfTask;
}
function formatDeadline(deadline) {
    let date = deadline.split('-');
    return `${date[2]}.${date[1]}`;
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

    if (this.checked) {
        title.className = "done-task";
        deadline.className = deadline.className.replace("expired-date", '');
    }
    else {
        title.className = title.className.replace('done-task', "")
        if (checkDate(deadline.innerHTML))
            deadline.className = "expired-date";
    }
}

function checkDate(date) {
    if (new Date(date) < new Date())
        return true;
    return false;
}

tasksList.forEach(t => {
    tasksContainer.appendChild(createTask(t));
});
