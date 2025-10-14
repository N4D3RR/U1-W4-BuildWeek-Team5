const circle = document.getElementById("progress-circle");
const secondsText = document.getElementById("seconds");

let seconds = 30;
const totalSeconds = 30;

const timer = setInterval(() => {
  seconds--;
  secondsText.textContent = seconds;

  // Calcola i gradi/secondi già trascorsi (da 0 a 360)
  const percentElapsed = ((totalSeconds - seconds) / totalSeconds) * 100;
  const degreesElapsed = (percentElapsed / 100) * 360;

  // Mostra solo la parte rimanente
  if (seconds > 0) {
    circle.style.background = `conic-gradient(transparent 0deg, transparent ${degreesElapsed}deg, #00bcd4 ${degreesElapsed}deg, #00bcd4 360deg)`;
  } else {
    circle.style.background = "transparent";
  }

  if (seconds === 0) {
    clearInterval(timer);
  }
}, 1000);
