// DOM Elements
let countDownTimer = document.getElementById("countdown-timer");
let countDownTimeText = document.getElementById("countdown-time-text");
let sessionNumberText = document.getElementById("session-number");
let sessionTimeText = document.getElementById("session-time");
let breakTimeText = document.getElementById("break-time");
let increaseSessionTimeButton = document.getElementById(
    "increase-session-time-button"
);
let decreaseSessionTimeButton = document.getElementById(
    "decrease-session-time-button"
);
let increaseBreakTimeButton = document.getElementById(
    "increase-break-time-button"
);
let decreaseBreakTimeButton = document.getElementById(
    "decrease-break-time-button"
);
let toggleClockButton = document.getElementById("toggle-clock-button");

// Global variables
const clock = {
    started: false,
    time: {
        minutes: 0,
        seconds: 0,
    },
    session: {
        index: 1,
        time: 0,
    },
    break: {
        time: 0,
        started: false,
    },
    reset() {
        this.started = false;
        this.time.minutes = 0;
        this.time.seconds = 0;
        this.session.index = 1;
        this.break.started = false;
    },
};
let updateTimeIntervalId;

function toggleTime(e) {
    // Increase or Decrease the Session or break Times

    if (e === increaseSessionTimeButton) clock.session.time++;
    else if (e === decreaseSessionTimeButton) clock.session.time--;
    else if (e === increaseBreakTimeButton) clock.break.time++;
    else if (e === decreaseBreakTimeButton) clock.break.time--;

    if (clock.session.time < 0) clock.session.time = 0;
    if (clock.break.time < 0) clock.break.time = 0;

    sessionTimeText.innerHTML = clock.session.time;
    breakTimeText.innerHTML = clock.break.time;
}

function toggleClockState() {
    clock.started = !clock.started;
    updateClockState();
}

function updateClockState() {
    if (clock.started) {
        toggleClockButton.innerHTML = "Pause";
        updateTimeIntervalId = setInterval(updateTime, 1000);
        disableTimeToggleButtons(true);
        return;
    }
    toggleClockButton.innerHTML = "Start";
    clearInterval(updateTimeIntervalId);
}

function updateTime() {
    let isBreakTime = clock.break.started;
    let inc = isBreakTime ? -1 : 1;

    clock.time.seconds += inc;
    if (clock.time.seconds < 0 || clock.time.seconds >= 60) {
        clock.time.seconds = isBreakTime ? 59 : 0;
        clock.time.minutes += inc;
    }

    if (clock.time.minutes < 0 || clock.time.minutes >= clock.session.time) {
        isBreakTime = !isBreakTime;
        clock.break.started = isBreakTime;
        if (isBreakTime) {
            clock.time.minutes = clock.break.time;
        } else {
            clock.time.minutes = 0;
            clock.time.seconds = 0;
            clock.session.index++;
        }
    }
    updateSessionText();
    updateCountDownText();
}

function updateCountDownText() {
    let color = getClockColor();
    countDownTimeText.style.color = countDownTimer.style.borderColor = color;
    countDownTimeText.innerHTML = `${clock.time.minutes
        .toString()
        .padStart(2, "0")}:${clock.time.seconds.toString().padStart(2, "0")}`;
}

function getClockColor() {
    return clock.break.started ? "#ff1744" : "#00b7eb";
}

function resetClock() {
    clock.reset();
    disableTimeToggleButtons(false);
    updateCountDownText();
    updateClockState();
    updateSessionText();
}

function updateSessionText() {
    sessionNumberText.innerHTML = clock.break.started
        ? "Break Time"
        : "Session " + clock.session.index;
}

function disableTimeToggleButtons(disable) {
    increaseSessionTimeButton.disabled = disable;
    decreaseSessionTimeButton.disabled = disable;
    increaseBreakTimeButton.disabled = disable;
    decreaseBreakTimeButton.disabled = disable;
}
