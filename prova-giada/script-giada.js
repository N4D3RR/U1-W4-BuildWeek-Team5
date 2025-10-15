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

// Elementi DOM
const contenitoreRisposte = document.getElementById("answers")
const domandaElemento = document.querySelector(".domanda-corrente")
const counter = document.getElementById("counter")
const totalCounter = document.getElementById("total-counter")
const secondsDisplay = document.getElementById("seconds")

let currentQuestion = 0
let userAnswers = []
let timer
let timeLeft = 30

function mostraDomanda(index) {
  // Reset
  contenitoreRisposte.innerHTML = ""
  domandaElemento.innerHTML = questions[index].question
  counter.innerText = index + 1
  totalCounter.innerText = `/ ${questions.length}`

  // Mischia risposte
  const risposte = [...questions[index].incorrect_answers]
  const posizioneCorretta = Math.floor(Math.random() * (risposte.length + 1))
  risposte.splice(posizioneCorretta, 0, questions[index].correct_answer)

  // Crea i bottoni risposta
  risposte.forEach((risposta) => {
    const bottone = document.createElement("button")
    bottone.classList.add("bottone-risposte")
    bottone.innerText = risposta
    bottone.addEventListener("click", () =>
      selezionaRisposta(bottone, risposta)
    )
    contenitoreRisposte.appendChild(bottone)
  })

  // Reset timer
  timeLeft = 30
  secondsDisplay.innerText = timeLeft
  clearInterval(timer)
  timer = setInterval(aggiornaTimer, 1000)
}

function aggiornaTimer() {
  timeLeft--
  secondsDisplay.innerText = timeLeft
  if (timeLeft === 0) {
    selezionaRisposta(null, null) // Nessuna risposta
  }
}

function selezionaRisposta(bottone, risposta) {
  clearInterval(timer)

  if (bottone) {
    // Rimuovi selezione da tutti
    const bottoni = document.querySelectorAll(".bottone-risposte")
    bottoni.forEach((b) => b.classList.remove("risposta-selezionata"))
    bottone.classList.add("risposta-selezionata")
  }

  const rispostaUtente = risposta || "NESSUNA RISPOSTA"
  const corretto = rispostaUtente === questions[currentQuestion].correct_answer

  userAnswers.push({
    domanda: questions[currentQuestion].question,
    rispostaUtente,
    corretta: corretto,
  })

  currentQuestion++

  if (currentQuestion >= questions.length) {
    localStorage.setItem("risultatiQuiz", JSON.stringify(userAnswers))
    window.location.href = "results-giada.html"
  } else {
    mostraDomanda(currentQuestion)
  }
}

// Avvia il quiz
mostraDomanda(currentQuestion)
