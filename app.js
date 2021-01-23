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
        time: 20,
    },
    break: {
        time: 5,
        started: false,
    },
};

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
    // Start or pause the clock

    clock.started = !clock.started;

    if (clock.started) {
        // clock is on
        toggleClockButton.innerHTML = "Pause";
        setInterval(updateCountDownText, 1000);

        // disable all the time toggle related buttons
        increaseSessionTimeButton.disabled = true;
        decreaseSessionTimeButton.disabled = true;
        increaseBreakTimeButton.disabled = true;
        decreaseBreakTimeButton.disabled = true;
    } else {
        // clock is off
        toggleClockButton.innerHTML = "Start";
    }
}

function updateCountDownText() {
    clock.time.seconds++;
    if (clock.time.seconds == 60) {
        clock.time.seconds = 0;
        clock.time.minutes++;
    }

    if (clock.time.minutes == clock.session.time) {
        // start break time
    }

    countDownTimeText.innerHTML = `${clock.time.minutes
        .toString()
        .padStart(2, "0")}:${clock.time.seconds.toString().padStart(2, "0")}`;
}
