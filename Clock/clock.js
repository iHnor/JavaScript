function getCurrentTime(){
    let now = new Date();
    let time = now.toTimeString().split(' ')[0];
    return time;
}


let clock = document.getElementById('clock')
function updateClock(){
    clock.innerText = getCurrentTime();
}

setInterval(updateClock, 1000);