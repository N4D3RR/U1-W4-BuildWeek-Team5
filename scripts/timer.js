const circle = document.getElementById("progress-circle")
const secondsText = document.getElementById("seconds")

const totalSeconds = 30
let seconds = totalSeconds

const startTimer = () => {
  const timer = setInterval(() => {
    seconds--
    secondsText.textContent = seconds

    // Calcola i gradi/secondi già trascorsi (da 0 a 360)
    const percentElapsed = ((totalSeconds - seconds) / totalSeconds) * 100
    const degreesElapsed = (percentElapsed / 100) * 360

    // Mostra solo la parte rimanente
    if (seconds > 0) {
      circle.style.background = conic-gradient(transparent 0deg, transparent ${degreesElapsed}deg, #00bcd4 ${degreesElapsed}deg, #00bcd4 360deg)
    } else {
      clearInterval(timer)
      circle.style.background = "transparent"

      //  Dopo 1 secondo, ricomincia
      setTimeout(() => {
        seconds = totalSeconds
        startTimer()
      }, 1000)
    }
  }, 1000)
}
startTimer() 
