const circle = document.getElementById("progress-circle");
const secondsText = document.getElementById("seconds");

const totalSeconds = 30;
let seconds = totalSeconds;
let timer;

const startTimer = (onFinish) => {
  clearInterval(timer);
  seconds = totalSeconds;
  secondsText.textContent = seconds;
  circle.style.background = "transparent";

  timer = setInterval(() => {
    seconds--;
    secondsText.textContent = seconds;

    const percentElapsed = ((totalSeconds - seconds) / totalSeconds) * 100;
    const degreesElapsed = (percentElapsed / 100) * 360;

    if (seconds > 0) {
      circle.style.background = `conic-gradient(transparent 0deg, transparent ${degreesElapsed}deg, #00bcd4 ${degreesElapsed}deg, #00bcd4 360deg)`;
    } else {
      clearInterval(timer);
      circle.style.background = "transparent";
      if (onFinish) onFinish();
    }
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timer);
};
