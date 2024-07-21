const timerDisplay = document.querySelector('.timer-display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');

let workInterval = 25 * 60; // 25 minutes in seconds
let shortBreak = 5 * 60; // 5 minutes in seconds
let longBreak = 15 * 60; // 15 minutes in seconds
let timerInterval;
let isPaused = false;
let currentTimer = workInterval;

function updateTimerDisplay() {
  const minutes = Math.floor(currentTimer / 60);
  const seconds = currentTimer % 60;
  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  isPaused = false;
  timerInterval = setInterval(() => {
    if (currentTimer > 0 && !isPaused) {
      currentTimer--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      // Handle end of timer (e.g., play sound, switch to next phase)
    }
  }, 1000);
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;
}

function pauseTimer() {
  isPaused = true;
  pauseButton.textContent = 'Resume';
}

function resumeTimer() {
  isPaused = false;
  pauseButton.textContent = 'Pause';
}

function resetTimer() {
  clearInterval(timerInterval);
  currentTimer = workInterval;
  updateTimerDisplay();
  isPaused = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', () => {
  if (isPaused) {
    resumeTimer();
  } else {
    pauseTimer();
  }
});
resetButton.addEventListener('click', resetTimer);

updateTimerDisplay();
