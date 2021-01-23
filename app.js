// DOM Elements
let countDownTime = document.getElementById("countdown-time-text");
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

// Global variables
const clock = {
    time: {
        minutes: 10,
        seconds: 0,
    },
    session: {
        index: 1,
        time: 20,
    },
    break: {
        time: 5,
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
