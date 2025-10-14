// Detect current page
const currentPage = window.location.pathname

// -----------------------------
// Se siamo in results.html, mostra il grafico e il messaggio dinamico
// -----------------------------
if (currentPage.includes("results.html")) {
  const score = parseInt(localStorage.getItem("score")) || 0
  const wrong = 100 - score

  // Aggiorna il messaggio in base al punteggio
  const summary = document.getElementById("summary")
  if (score >= 60) {
    summary.textContent = "Great job! You passed the test!"
  } else {
    summary.textContent = "Keep trying! Practice makes perfect."
  }

  // Inserisce il testo nei div "Correct" e "Wrong"
  document.getElementById("correct").innerHTML += `<h2>${score}%</h2>`
  document.getElementById("wrong").innerHTML += `<h2>${wrong}%</h2>`

  // Crea il grafico a torta
  const ctx = document.getElementById("myChart").getContext("2d")

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Correct", "Wrong"],
      datasets: [
        {
          label: "Quiz Results",
          data: [score, wrong],
          backgroundColor: ["#4CAF50", "#F44336"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Your Performance",
        },
      },
    },
  })

  // Stop qui se siamo in results
  return
}

// -----------------------------
// QUIZ TIMER + RISPOSTE (solo per le pagine quiz)
// -----------------------------

const circle = document.getElementById("progress-circle")
const secondsText = document.getElementById("seconds")

let seconds = 30
const totalSeconds = 30

const timer = setInterval(() => {
  seconds--
  secondsText.textContent = seconds

  const percentElapsed = ((totalSeconds - seconds) / totalSeconds) * 100
  const degreesElapsed = (percentElapsed / 100) * 360

  if (seconds > 0) {
    circle.style.background = `conic-gradient(transparent 0deg, transparent ${degreesElapsed}deg, #00bcd4 ${degreesElapsed}deg, #00bcd4 360deg)`
  } else {
    circle.style.background = "transparent"
  }

  if (seconds === 0) {
    clearInterval(timer)
    handleTimeExpired()
  }
}, 1000)

// -----------------------------
// Gestione risposte
// -----------------------------
const buttons = document.querySelectorAll("#answers button")
let answered = false

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (answered) return
    answered = true

    button.classList.add("selected")

    const isCorrect = button.classList.contains("true") ? 1 : 0
    const totalScore = parseInt(localStorage.getItem("totalScore") || 0)
    localStorage.setItem("totalScore", totalScore + isCorrect)

    goToNextPage()
  })
})

// -----------------------------
// Se scade il tempo e l’utente non ha risposto
// -----------------------------
function handleTimeExpired() {
  if (answered) return

  const totalScore = parseInt(localStorage.getItem("totalScore") || 0)
  localStorage.setItem("totalScore", totalScore + 0)

  goToNextPage()
}

// -----------------------------
// Redirect alla pagina successiva
// -----------------------------
function goToNextPage() {
  const quizPages = [
    "/prova quiz/quiz copy.html",
    "/prova quiz/quiz copy 2.html",
    "/prova quiz/quiz copy 3.html",
    "/prova quiz/quiz copy 4.html",
    "/prova quiz/quiz copy 5.html",
    "/prova quiz/quiz copy 6.html",
    "/prova quiz/quiz copy 7.html",
    "/prova quiz/quiz copy 8.html",
    "/prova quiz/quiz copy 9.html",
    "/prova quiz/quiz copy 10.html",
  ]

  const currentIndex = quizPages.indexOf(currentPage)
  const nextIndex = currentIndex + 1

  if (nextIndex < quizPages.length) {
    window.location.href = quizPages[nextIndex]
  } else {
    const totalScore = parseInt(localStorage.getItem("totalScore") || 0)
    const totalQuestions = quizPages.length
    const percentage = Math.round((totalScore / totalQuestions) * 100)
    localStorage.setItem("score", percentage)
    window.location.href = "/prova quiz/results.html"
  }
}
