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
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
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

const contenitoreRisposte = document.getElementById("answers")
const domanda = document.getElementsByClassName("domanda-corrente")
const avanti = document.getElementById("bottone-avanti")

let tutteLeRisposte = []
let elencoRisposte = []
let count = 0
let seconds2 = 30

localStorage.removeItem("risposte")
if (!localStorage.getItem("risposte")) {
  localStorage.setItem("risposte", JSON.stringify([]))
}

const aggiungiRisposta = function (risp) {
  const elencoElenchiRisposte =
    JSON.parse(localStorage.getItem("risposte")) || []
  elencoElenchiRisposte.push(risp)
  localStorage.setItem("risposte", JSON.stringify(elencoElenchiRisposte))
  console.log(elencoElenchiRisposte)
  console.log(`Valore "${risp}" aggiunto!`)
}

// PREPARA TUTTE LE RISPOSTE MISCHIATE
for (let i = 0; i < questions.length; i++) {
  let random = Math.round(Math.random() * questions[i].incorrect_answers.length)
  let domandeSbagliate = [...questions[i].incorrect_answers]
  domandeSbagliate.splice(random, 0, questions[i].correct_answer)
  tutteLeRisposte.push(domandeSbagliate)
}

// FUNZIONE PER MOSTRARE BOTTONI RISPOSTE
function mostraRisposte() {
  contenitoreRisposte.innerHTML = "" // Pulisci contenitore
  for (let i = 0; i < tutteLeRisposte[count].length; i++) {
    let bottone = document.createElement("button")
    bottone.classList.add("bottone-risposte")
    bottone.innerText = tutteLeRisposte[count][i]
    bottone.addEventListener("click", function () {
      for (let j = 0; j < contenitoreRisposte.children.length; j++) {
        contenitoreRisposte.children[j].classList.remove("risposta-selezionata")
      }
      bottone.classList.add("risposta-selezionata")
      elencoRisposte[0] = bottone.innerText
      console.log(elencoRisposte)
    })
    contenitoreRisposte.appendChild(bottone)
  }
}

const onTimerFinish = function () {
  if (elencoRisposte[0] === questions[count].correct_answer) {
    aggiungiRisposta({ rispostaUtente: elencoRisposte[0], corretta: true })
  } else {
    aggiungiRisposta({ rispostaUtente: elencoRisposte[0], corretta: false })
  }
  count++
  for (let i = 0; i < domanda.length; i++) {
    domanda[i].innerText = questions[count]?.question || ""
  }
  mostraRisposte()
  startTimer(onTimerFinish)
}
// MOSTRA PRIMA DOMANDA E RISPOSTE SUBITO
for (let i = 0; i < domanda.length; i++) {
  domanda[i].innerText = questions[count].question
}
mostraRisposte()
startTimer(onTimerFinish)

// AL CLICK SU AVANTI
avanti.addEventListener("click", function () {
  stopTimer()
  if (elencoRisposte[0] === questions[count].correct_answer) {
    aggiungiRisposta({ rispostaUtente: elencoRisposte[0], corretta: true })
  } else {
    aggiungiRisposta({ rispostaUtente: elencoRisposte[0], corretta: false })
  }
  count++
  //all'ultima domanda, manda a results
  if (count >= questions.length) {
    window.location.href = "/prova-soluzione/results-g.html"
  }
  for (let i = 0; i < domanda.length; i++) {
    domanda[i].innerText = questions[count]?.question || ""
  }
  mostraRisposte()

  startTimer(onTimerFinish)
})
