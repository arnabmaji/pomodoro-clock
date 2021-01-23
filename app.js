// DOM Elements
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
        time: 1,
    },
    break: {
        time: 1,
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
    /*
     * Update Count Down Time Text based on the session and break time
     */

    if (clock.break.started) {
        clock.time.seconds--;
        if (clock.time.seconds < 0) {
            clock.time.seconds = 59;
            clock.time.minutes--;
        }
        if (clock.time.minutes < 0) {
            // break time over, switch to session time
            clock.break.started = false;
            clock.time.minutes = 0;
            clock.time.seconds = 0;
            clock.session.index++;
        }
    } else {
        clock.time.seconds++;
        if (clock.time.seconds == 60) {
            clock.time.seconds = 0;
            clock.time.minutes++;
        }
        if (clock.time.minutes == clock.session.time) {
            // session time, switch to break time
            clock.break.started = true;
            clock.time.minutes = clock.break.time;
        }
    }
    updateSessionText();
    updateCountDownText();
}

function updateCountDownText() {
    countDownTimeText.innerHTML = `${clock.time.minutes
        .toString()
        .padStart(2, "0")}:${clock.time.seconds.toString().padStart(2, "0")}`;
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
