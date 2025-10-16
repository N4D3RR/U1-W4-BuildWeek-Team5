let numQuestions = parseInt(localStorage.getItem("quizNumQuestions")) || 6 //prendi numero domande
let difficulty = localStorage.getItem("quizDifficulty") || "easy" // prendi difficoltà scelta

//risolve il problema dei codici al posto di parentesi, apostrofi ecc
function decodeHTML(text) {
  const textarea = document.createElement("textarea")
  textarea.innerHTML = text
  return textarea.value
}
//crea l'url con i parametri numqeustions e difficulty e ritorna un array results con le domande
async function fetchData() {
  const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=18&difficulty=${difficulty}`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data // ritorna tutto l’oggetto con results
  } catch (error) {
    console.error("Errore nel fetch:", error)
    return null
  }
}

//funzione PRINCIPALE che aspetta i dati e estrae le domande
async function startQuiz() {
  const dati = await fetchData()
  if (!dati) {
    console.error("Nessun dato ricevuto")
    return
  }
  const questions = dati.results // questo è L'ARRAY di domande
  eseguiTutto(questions)
}

startQuiz()

async function eseguiTutto(arr) {
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
  for (let i = 0; i < arr.length; i++) {
    let random = Math.round(Math.random() * arr[i].incorrect_answers.length)
    let domandeSbagliate = [...arr[i].incorrect_answers]
    domandeSbagliate.splice(random, 0, arr[i].correct_answer)
    tutteLeRisposte.push(domandeSbagliate)
  }

  // FUNZIONE PER MOSTRARE BOTTONI RISPOSTE
  function mostraRisposte() {
    contenitoreRisposte.innerHTML = "" // Pulisci contenitore
    document.getElementById("feedback").innerText = "" // Pulisci feedback

    for (let i = 0; i < tutteLeRisposte[count].length; i++) {
      let bottone = document.createElement("button")
      bottone.classList.add("bottone-risposte")
      bottone.innerText = decodeHTML(tutteLeRisposte[count][i])
      bottone.addEventListener("click", function () {
        for (let j = 0; j < contenitoreRisposte.children.length; j++) {
          contenitoreRisposte.children[j].classList.remove(
            "risposta-selezionata"
          )
        }
        bottone.classList.add("risposta-selezionata")
        bottone.classList.remove("no-hover")
        elencoRisposte[0] = decodeHTML(tutteLeRisposte[count][i])

        console.log(elencoRisposte)
      })
      contenitoreRisposte.appendChild(bottone)
    }
  }
  //VALUTA LE RISPOSTE ALLA FINE DEL TIMER
  const onTimerFinish = function () {
    stopTimer()
    if (elencoRisposte[0] === decodeHTML(arr[count].correct_answer)) {
      document.getElementById("feedback").innerText = "Risposta corretta!"
      document.getElementById("feedback").style.color = "green"
    } else {
      document.getElementById("feedback").innerText =
        " Risposta sbagliata! " +
        " La risposta giusta era: " +
        decodeHTML(arr[count].correct_answer)
      document.getElementById("feedback").style.color = "red"
    }
    if (elencoRisposte[0] === decodeHTML(arr[count].correct_answer)) {
      aggiungiRisposta({ rispostaUtente: elencoRisposte[0], corretta: true })
    } else {
      aggiungiRisposta({ rispostaUtente: elencoRisposte[0], corretta: false })
    }
    setTimeout(() => {
      count++
      document.getElementById("counter").innerText = count + 1 //per aggiornare il numero domanda
      document.getElementById("total-counter").innerText = `/${arr.length}`
      for (let i = 0; i < domanda.length; i++) {
        domanda[i].innerText = decodeHTML(arr[count].question) || ""
      }
      mostraRisposte()
      startTimer(onTimerFinish)
    }, 2000)
  }
  //INIZIALIZZA CONTATORI DOMANDE.   <-----------------------------------------------------------
  document.getElementById("counter").innerText = count + 1
  document.getElementById("total-counter").innerText = `/${arr.length}`
  // MOSTRA PRIMA DOMANDA E RISPOSTE SUBITO
  for (let i = 0; i < domanda.length; i++) {
    domanda[i].innerText = decodeHTML(arr[count].question)
  }
  mostraRisposte()
  startTimer(onTimerFinish)

  // AL CLICK SU AVANTI
  avanti.addEventListener("click", function () {
    avanti.disabled = true
    stopTimer()

    // funzione feedback giusto/ sbagliato green/red
    if (elencoRisposte[0] === decodeHTML(arr[count].correct_answer)) {
      document.getElementById("feedback").innerText = "Right answer!"
      document.getElementById("feedback").style.color = "green"
    } else {
      document.getElementById("feedback").innerText =
        "Wrong answer! " +
        " The correct answer was: " +
        arr[count].correct_answer
      document.getElementById("feedback").style.color = "red"
    }

    if (elencoRisposte[0] === decodeHTML(arr[count].correct_answer)) {
      aggiungiRisposta({ rispostaUtente: elencoRisposte[0], corretta: true })
    } else {
      aggiungiRisposta({ rispostaUtente: elencoRisposte[0], corretta: false })
    }
    setTimeout(() => {
      count++
      document.getElementById("counter").textContent = count + 1 //aggiorna counter domande anche premendo tasto avanti
      // aggiorna domanda nel DOM
      //all'ultima domanda, manda a results
      if (count >= arr.length) {
        window.location.href = "/PROVA NAD/3results.html"
      }
      for (let i = 0; i < domanda.length; i++) {
        domanda[i].innerText = decodeHTML(arr[count].question) || ""
      }
      mostraRisposte()

      startTimer(onTimerFinish)
      avanti.disabled = false
    }, 2000)
  })
}
