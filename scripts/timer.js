const circle = document.getElementById("progress-circle")
const secondsText = document.getElementById("seconds")

const totalSeconds = 30
let seconds = totalSeconds

const startTimer = () => {
  // Mostra subito il numero iniziale
  secondsText.textContent = seconds

  const timer = setInterval(() => {
    seconds--
    secondsText.textContent = seconds

    // Calcola i gradi/secondi già trascorsi (da 0 a 360)
    const percentElapsed = ((totalSeconds - seconds) / totalSeconds) * 100
    const degreesElapsed = (percentElapsed / 100) * 360

    // Aggiorna il cerchio
    if (seconds > 0) {
      circle.style.background = `conic-gradient(transparent 0deg, transparent ${degreesElapsed}deg, #00bcd4 ${degreesElapsed}deg, #00bcd4 360deg)`
    } else {
      // Quando arriva a 0, ferma il timer e resetta
      clearInterval(timer)
      circle.style.background = "transparent"

      // Dopo 1 secondo, riparte da 30
      setTimeout(() => {
        seconds = totalSeconds
        startTimer()
      }, 1000)
    }
  }, 1000)
}

startTimer()
