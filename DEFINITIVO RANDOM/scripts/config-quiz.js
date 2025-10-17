// Variabili globali per la configurazione
let selectedDifficulty = ""
let selectedQuestions = 10

// Elementi DOM
const difficultyButtons = document.querySelectorAll(".difficulty-btn")
const numberInput = document.getElementById("numQuestions")
const startBtn = document.getElementById("bottone-inizio")
const errorMessage = document.getElementById("error-message")

// Gestione selezione difficoltà
difficultyButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Rimuovi selezione da tutti i bottoni
    difficultyButtons.forEach((b) => b.classList.remove("selected"))

    // Aggiungi selezione al bottone cliccato
    this.classList.add("selected")
    selectedDifficulty = this.dataset.difficulty

    checkFormValidity()
  })
})

// Gestione input numero domande
numberInput.addEventListener("input", function () {
  selectedQuestions = parseInt(this.value)
  validateNumber()
  checkFormValidity()
})

// Funzioni per i bottoni +/-
function changeNumber(change) {
  const currentValue = parseInt(numberInput.value)
  const newValue = currentValue + change

  if (newValue >= 5 && newValue <= 10) {
    numberInput.value = newValue
    selectedQuestions = newValue
    validateNumber()
    checkFormValidity()
  }
}

// Validazione numero
function validateNumber() {
  errorMessage.textContent = ""

  if (selectedQuestions < 5 || selectedQuestions > 10) {
    errorMessage.textContent = "The number must be between 5 and 10"
    return false
  }
  if (isNaN(selectedQuestions)) {
    errorMessage.textContent = "Insert a valid number"
    return false
  }
  return true
}

// Controlla se il form è valido
function checkFormValidity() {
  const isValid = selectedDifficulty !== "" && validateNumber()
  startBtn.disabled = !isValid
}

// Avvia il quiz
startBtn.addEventListener("click", function () {
  if (selectedDifficulty && validateNumber()) {
    // Salva le configurazioni nel localStorage
    localStorage.setItem("quizDifficulty", selectedDifficulty)
    localStorage.setItem("quizNumQuestions", selectedQuestions.toString())

    // Vai alla pagina del quiz
    window.location.href = "3.quiz.html"
  }
})

// Inizializzazione
document.addEventListener("DOMContentLoaded", function () {
  selectedQuestions = parseInt(numberInput.value)
  checkFormValidity()
})
