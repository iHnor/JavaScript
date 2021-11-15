let tasksList = [
    { title: 'Описать массив задач в JavaScript',description: "Some descript", deadline: '2021-11-21', done: false },
    { title: 'Создать базовый макет страницы для вывода задач', description: "Some descript", deadline: '2021-11-21', done: false },
];

let tasksOnPage = document.getElementById('tasks-On-Page')

function createTask({ title, description, deadline, done }) {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";

    let doneOfTask = document.createElement("input");
    doneOfTask.type = 'checkbox';
    let titleOfTask = document.createElement("h2");
    titleOfTask.innerHTML = title;
    let baseDiv = document.createElement("div");
    baseDiv.id = "base";

    baseDiv.appendChild(doneOfTask);
    baseDiv.appendChild(titleOfTask);

    let descOfTask = document.createElement("p");
    descOfTask.innerHTML = description;
    let deadlineOfTask = document.createElement("h3");
    deadlineOfTask.innerHTML = deadline;
    taskDiv.appendChild(deadlineOfTask);
    taskDiv.appendChild(baseDiv);
    taskDiv.appendChild(descOfTask);

    return taskDiv;
}

function createCheckbox(){
    
}

tasksList.forEach(t => {
    tasksOnPage.appendChild(createTask(t));
});