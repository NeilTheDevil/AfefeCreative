const timeDisplay = document.getElementById('time-display');
const playPauseBtn = document.getElementById('play-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const presetSelect = document.getElementById('preset-select');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const circle = document.querySelector('.progress-ring__circle');

// Set up the SVG circle geometry for animation.
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = 0;

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

let timer;
let initialTime = parseInt(presetSelect.value);
let timeLeft = initialTime;
let isRunning = false;

// Request notification permission on load
if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
    window.addEventListener('click', () => {
        Notification.requestPermission();
    }, { once: true });
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const timeString = `${formattedMinutes}:${formattedSeconds}`;
    
    timeDisplay.textContent = timeString;
    document.title = `${timeString} - Focus Timer`;
    
    const percent = (timeLeft / initialTime) * 100;
    setProgress(percent);
}

function notifyUser() {
    try {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
        audio.play().catch(e => console.log('Audio play failed: ', e));
    } catch(e) {}
    
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification("Time's Up!", {
            body: "Your focus session or break has ended.",
            icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⏰</text></svg>"
        });
    } else {
        alert("Time's up!");
    }
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');
    
    const startTime = Date.now();
    const endTime = startTime + (timeLeft * 1000);
    
    timer = setInterval(() => {
        const now = Date.now();
        const remaining = Math.round((endTime - now) / 1000);
        
        if (remaining <= 0) {
            clearInterval(timer);
            timeLeft = 0;
            isRunning = false;
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
            updateDisplay();
            notifyUser();
            return;
        }
        
        timeLeft = remaining;
        updateDisplay();
    }, 250); // check 4 times a second for smoother visual updates
}

function pauseTimer() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timer);
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
}

function resetTimer() {
    pauseTimer();
    initialTime = parseInt(presetSelect.value);
    timeLeft = initialTime;
    updateDisplay();
}

playPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);

presetSelect.addEventListener('change', () => {
    resetTimer();
});

// Initialize display and logic properly
updateDisplay();
