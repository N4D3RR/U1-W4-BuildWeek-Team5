// Domande del quiz
const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
]

const circle = document.getElementById("progress-circle")
const secondsText = document.getElementById("seconds")
const contenitoreRisposte = document.getElementById("answers")
const domanda = document.querySelector(".domanda-corrente")

const totalSeconds = 30
let seconds = totalSeconds
let currentQuestion = 0
let timer

let risposteUtente = []

function mostraDomanda(index) {
  domanda.innerText = questions[index].question
  contenitoreRisposte.innerHTML = ""

  const risposte = [...questions[index].incorrect_answers]
  const random = Math.floor(Math.random() * (risposte.length + 1))
  risposte.splice(random, 0, questions[index].correct_answer)

  risposte.forEach((risposta) => {
    const btn = document.createElement("button")
    btn.classList.add("bottone-risposte")
    btn.innerText = risposta
    btn.onclick = () => selezionaRisposta(btn, risposta)
    contenitoreRisposte.appendChild(btn)
  })
}

function selezionaRisposta(btn, risposta) {
  document
    .querySelectorAll(".bottone-risposte")
    .forEach((b) => b.classList.remove("risposta-selezionata"))
  btn.classList.add("risposta-selezionata")
  risposteUtente[currentQuestion] = risposta
}

function startTimer() {
  seconds = totalSeconds
  secondsText.textContent = seconds

  timer = setInterval(() => {
    seconds--
    secondsText.textContent = seconds

    const percentElapsed = ((totalSeconds - seconds) / totalSeconds) * 100
    const degreesElapsed = (percentElapsed / 100) * 360
    circle.style.background = `conic-gradient(transparent 0deg, transparent ${degreesElapsed}deg, #00bcd4 ${degreesElapsed}deg, #00bcd4 360deg)`

    if (seconds <= 0) {
      clearInterval(timer)
      nextQuestion()
    }
  }, 1000)
}

function nextQuestion() {
  if (!risposteUtente[currentQuestion]) risposteUtente[currentQuestion] = null
  currentQuestion++

  if (currentQuestion < questions.length) {
    mostraDomanda(currentQuestion)
    startTimer()
  } else {
    fineQuiz()
  }
}

function fineQuiz() {
  clearInterval(timer)

  // Calcola punteggio
  let corrette = 0
  let sbagliate = 0

  questions.forEach((q, i) => {
    if (risposteUtente[i] === q.correct_answer) {
      corrette++
    } else {
      sbagliate++
    }
  })

  // Salva tutto in localStorage
  localStorage.setItem("risposteUtente", JSON.stringify(risposteUtente))
  localStorage.setItem("corrette", corrette)
  localStorage.setItem("sbagliate", sbagliate)

  // Passa alla pagina dei risultati
  window.location.href = "results-giada.html"
}

function startQuiz() {
  mostraDomanda(currentQuestion)
  startTimer()
}

startQuiz()
