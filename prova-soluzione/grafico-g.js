const risposte = JSON.parse(localStorage.getItem("risposte")) || []

console.log("Valori salvati:", risposte)

window.addEventListener("DOMContentLoaded", function () {
  // DATI DEL QUIZ  - - - - MODIFICATO PER PRENDERE DATI DAL LOCALSTORAGE
  const totalQuestions = risposte.length
  const correctAnswers = risposte.filter((r) => r.corretta).length
  const wrongAnswers = risposte.filter((r) => !r.corretta).length

  // CALCOLO PERCENTUALI
  const correctPercent = ((correctAnswers / totalQuestions) * 100).toFixed(1)
  const wrongPercent = (100 - correctPercent).toFixed(1)

  // TESTO SUI BLOCCHI LATERALI
  document.getElementById("correct").innerHTML = `
    <p class="titolo-results">Correct</p>
    <p class="percentuale">${correctPercent}%</p>
    <p class="n-domande">${correctAnswers}/${totalQuestions} questions</p>
  `

  document.getElementById("wrong").innerHTML = `
    <p class="titolo-results">Wrong</p>
    <p class="percentuale">${wrongPercent}%</p>
    <p class="n-domande">${wrongAnswers}/${totalQuestions} questions</p>
  `

  // DIV PER TESTO CENTRALE
  const chartContainer = document.getElementById("grafico")
  const centerText = document.createElement("div")
  centerText.classList.add("chart-center-text")

  if (correctAnswers > wrongAnswers) {
    centerText.innerHTML = `
      <strong>Congratulations!</strong><br>
      You passed the exam.<br>
      <small>Check your email<br>(including spam/promotions)</small>
    `
  } else {
    centerText.innerHTML = `
      <strong>Peccato!</strong><br>
      Non hai superato il test.<br>
      <small>Riprova quando ti senti pronto</small>
    `
  }

  chartContainer.appendChild(centerText)

  // GRAFICO
  const ctx = document.getElementById("myChart")

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Correct", "Wrong"],
      datasets: [
        {
          data: [correctAnswers, wrongAnswers],
          backgroundColor: ["#00FFFF", "#D20094"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      cutout: "70%",
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
      title: {
        display: true,
        text: "Il mio grafico",
      },
    },
  })
})
