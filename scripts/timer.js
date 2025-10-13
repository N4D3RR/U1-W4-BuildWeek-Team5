const circle = document.getElementById("progress-circle")
const secondsText = document.getElementById("seconds")
let seconds = 30

circle.style.animation = "none"
circle.offsetHeight
circle.style.animation = "progress 30s linear forwards"

const timer = setInterval(() => {
  seconds--
  secondsText.textContent = seconds
  if (seconds === 0) clearInterval(timer)
}, 1000)
