let tasksList = [
    { title: 'Описать массив задач в JavaScript', description: "Some descript", deadline: '2021-11-21', done: false },
    { title: 'Создать базовый макет страницы для вывода задач', description: "Some descript", deadline: '2021-11-21', done: false },
];

let tasksOnPage = document.getElementById('tasks-On-Page')

function createTask({ title, description, deadline, done }) {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.appendChild(deadlineOfTask(deadline));
    taskDiv.appendChild(baseDiv(title, done));
    taskDiv.appendChild(descOfTask(description));

    return taskDiv;
}

function createDescription(desc){
    let descOfTask = document.createElement("p");
    descOfTask.innerHTML = desc;

    return descOfTask;
}

function createDeadline(deadline) {
    let deadlineOfTask = document.createElement("h3");
    deadlineOfTask.innerHTML = deadline;
    return deadlineOfTask;
}

function createBaseDiv(title, done) {
    let doneOfTask = document.createElement("input");
    doneOfTask.type = 'checkbox';

    let titleOfTask = document.createElement("h2");
    titleOfTask.innerHTML = title;

    let baseDiv = document.createElement("div");
    baseDiv.id = "base";

    baseDiv.appendChild(doneOfTask);
    baseDiv.appendChild(titleOfTask);

    return baseDiv;
}

tasksList.forEach(t => {
    tasksOnPage.appendChild(createTask(t));
});