let tasksList = [
    { title: 'Описать массив задач в JavaScript', description: "Some descript", deadline: '2021-11-21', done: false },
    { title: 'Создать базовый макет страницы для вывода задач', deadline: '2021-11-01', done: true },
];

let tasksOnPage = document.getElementById('tasks-On-Page')


function createTask({ title, description, deadline, done }) {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.appendChild(createDeadline(deadline, done));
    taskDiv.appendChild(createBaseDiv(title, done));
    taskDiv.appendChild(createDescription(description));

    return taskDiv;
}

function createDeadline(deadline, done) {
    let deadlineOfTask = document.createElement("h3");
    if (new Date(deadline) < (new Date()) && !done)
        deadlineOfTask.className = "expired-date"
    deadlineOfTask.innerHTML = deadline;

    return deadlineOfTask;
}

function createBaseDiv(title, done) {
    let baseDiv = document.createElement("div");
    baseDiv.id = "base";
    baseDiv.appendChild(createCheckBox(done));
    baseDiv.appendChild(createTitle(title, done));

    return baseDiv;
}

function createTitle(title, done){
    let titleOfTask = document.createElement("h2");
    titleOfTask.innerHTML = title;
    if(done) titleOfTask.className = "done-task";

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

function clickOnCheckBox(){
    let checkBox = this.parentNode.firstChild;    
    let title = this.parentNode.lastChild;
    
    if (checkBox.checked){
        title.className = "done-task";
    }
    else {
        title.className = title.className.replace('done-task', "")
        // перевірка дати
    }
}

tasksList.forEach(t => {
    tasksOnPage.appendChild(createTask(t));
});
