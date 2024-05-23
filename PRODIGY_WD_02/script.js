// script.js
let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 10);
        startStopBtn.innerHTML = '<i class="fas fa-pause"></i>';
        running = true;
    } else {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        startStopBtn.innerHTML = '<i class="fas fa-play"></i>';
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    startTime = null;
    difference = null;
    running = false;
    display.textContent = '00:00:00';
    startStopBtn.innerHTML = '<i class="fas fa-play"></i>';
    laps = [];
    lapsList.innerHTML = '';
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
    if (running) {
        laps.push(formatTime(updatedTime));
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${laps[laps.length - 1]}`;
        lapsList.appendChild(lapItem);
    }
}

startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
