const questions = [
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question: 'What does CPU stand for?',
    correct_answer: 'Central Processing Unit',
    incorrect_answers: [
      'Central Process Unit',
      'Computer Personal Unit',
      'Central Processor Unit',
    ],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question:
      'In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?',
    correct_answer: 'Final',
    incorrect_answers: ['Static', 'Private', 'Public'],
  },
  {
    category: 'Science: Computers',
    type: 'boolean',
    difficulty: 'easy',
    question: 'The logo for Snapchat is a Bell.',
    correct_answer: 'False',
    incorrect_answers: ['True'],
  },
  {
    category: 'Science: Computers',
    type: 'boolean',
    difficulty: 'easy',
    question:
      'Pointers were not used in the original C programming language; they were added later on in C++.',
    correct_answer: 'False',
    incorrect_answers: ['True'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question:
      'What is the most preferred image format used for logos in the Wikimedia database?',
    correct_answer: '.svg',
    incorrect_answers: ['.png', '.jpeg', '.gif'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question: 'In web design, what does CSS stand for?',
    correct_answer: 'Cascading Style Sheet',
    incorrect_answers: [
      'Counter Strike: Source',
      'Corrective Style Sheet',
      'Computer Style Sheet',
    ],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question:
      'What is the code name for the mobile operating system Android 7.0?',
    correct_answer: 'Nougat',
    incorrect_answers: ['Ice Cream Sandwich', 'Jelly Bean', 'Marshmallow'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question: 'On Twitter, what is the character limit for a Tweet?',
    correct_answer: '140',
    incorrect_answers: ['120', '160', '100'],
  },
  {
    category: 'Science: Computers',
    type: 'boolean',
    difficulty: 'easy',
    question: 'Linux was first created as an alternative to Windows XP.',
    correct_answer: 'False',
    incorrect_answers: ['True'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question:
      'Which programming language shares its name with an island in Indonesia?',
    correct_answer: 'Java',
    incorrect_answers: ['Python', 'C', 'Jakarta'],
  },
]

const contenitoreRisposte = document.getElementById('answers')
const domanda = document.getElementsByClassName('domanda-corrente')
const main = document.getElementsByTagName('main')
console.log('MAIN', main)

let tutteLeRisposte = []
let random
let risposteDefinitive = []
const elencoElenchiRisposte = []
let elencoRisposte = []

for (let i = 0; i < questions.length; i++) {
  random = Math.round(Math.random() * questions[i].incorrect_answers.length)
  console.log(random)
  let domandeSbagliate = questions[i].incorrect_answers
  domandeSbagliate.splice(random, 0, questions[i].correct_answer)
  console.log(domandeSbagliate)
  tutteLeRisposte.push(domandeSbagliate)
}

console.log(tutteLeRisposte)

const bottoni = document.getElementsByClassName('bottone-risposte')
const riposta = document.getElementsByClassName('risposta-selezionata')
let seconds2 = 30
let count = 0

setInterval(() => {
  seconds2--
  for (let i = 0; i < domanda.length; i++) {
    domanda[i].innerText = questions[count].question
  }
  if (seconds2 > 30) {
    for (let i = 0; i < tutteLeRisposte[count].length; i++) {
      let bottone = document.createElement('button')
      bottone.classList.add('bottone-risposte')
      bottone.innerText = tutteLeRisposte[count][i]
      bottone.addEventListener('click', function () {
        for (let i = 0; i < bottoni.length; i++) {
          bottoni[i].classList.contains('risposta-selezionata')
          bottoni[i].classList.remove('risposta-selezionata')
        }
        //console.log(tutteLeRisposte[count][i])
        bottone.classList.add('risposta-selezionata')
        //console.log(bottone.innerText)
        if (elencoRisposte.length > 0) {
          elencoRisposte.shift()
        }
        elencoRisposte.push(bottone.innerText)
        console.log(elencoRisposte)
      })
      contenitoreRisposte.appendChild(bottone)
    }
  }
  if (seconds2 === 0) {
    for (let i = bottoni.length - 1; i >= 0; i--) {
      bottoni[i].remove()
      //console.log(i)
    }
  }
  for (let i = 0; i < questions.length; i++) {
    //console.log(bottoni)
    if (seconds2 < 0) {
      elencoElenchiRisposte.push(elencoRisposte)
      //console.log(elencoElenchiRisposte)
      //console.log(elencoElenchiRisposte[count][0])
      if (elencoElenchiRisposte[count][0] === questions[count].correct_answer) {
        console.log('CORRETTO')
      } else {
        console.log('SBAGLIATO')
      }
      seconds2 = 30
      count = count + 1
      //window.location.href = 'results-giada.html'
    }
    if (i > questions.length && seconds2 <= 0) {
      window.location.href = 'results-giada.html'
    }
  }
}, 1000)

const counterDomande = document.getElementById('counter-questions')
let nDomandaPage = document.createElement('p')

for (let i = bottoni.length - 1; i >= 0; i--) {
  let risposta = bottoni[i].innerText
}
