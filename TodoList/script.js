let tasksList = [
    { title: 'Описать массив задач в JavaScript', description: "Some descript", deadline: '2021-11-21', done: true },
    { title: 'Создать базовый макет страницы для вывода задач', deadline: '2021-11-21', done: false },
];

let tasksOnPage = document.getElementById('tasks-On-Page')

function createTask({ title, description, deadline, done }) {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.appendChild(createDeadline(deadline));
    taskDiv.appendChild(createBaseDiv(title, done));
    taskDiv.appendChild(createDescription(description));

    return taskDiv;
}

function createDeadline(deadline) {
    let deadlineOfTask = document.createElement("h3");
    deadlineOfTask.innerHTML = deadline;
    return deadlineOfTask;
}

function createBaseDiv(title, done) {
    let baseDiv = document.createElement("div");
    baseDiv.id = "base";
    baseDiv.appendChild(createCheckBox(done));
    baseDiv.appendChild(createTitle(title));

    return baseDiv;
}

function createTitle(title){
    let titleOfTask = document.createElement("h2");
    titleOfTask.innerHTML = title;

    return titleOfTask;
}

function createCheckBox(done) {
    let doneOfTask = document.createElement("input");
    doneOfTask.type = 'checkbox';
    if (done)
        doneOfTask.checked = 'checked';
    
    return doneOfTask;
}

function createDescription(desc) {
    let descOfTask = document.createElement("p");
    if (desc !== undefined)
        descOfTask.innerHTML = desc;

    return descOfTask;
}

tasksList.forEach(t => {
    tasksOnPage.appendChild(createTask(t));
});