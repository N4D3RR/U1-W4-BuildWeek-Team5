window.addEventListener("DOMContentLoaded", function () {
  // DATI DEL QUIZ
  const totalQuestions = 6
  const correctAnswers = 4
  const wrongAnswers = totalQuestions - correctAnswers

  // CALCOLO PERCENTUALI
  const correctPercent = ((correctAnswers / totalQuestions) * 100).toFixed(1)
  const wrongPercent = (100 - correctPercent).toFixed(1)

  // TESTO SUI BLOCCHI LATERALI
  document.getElementById("correct").innerHTML = `
    <h1>Correct:</h1>
    <p><strong>${correctPercent}%</strong></p>
    <p>${correctAnswers}/${totalQuestions} questions</p>
  `

  document.getElementById("wrong").innerHTML = `
    <h1>Wrong:</h1>
    <p><strong>${wrongPercent}%</strong></p>
    <p>${wrongAnswers}/${totalQuestions} questions</p>
  `

  // DIV PER TESTO CENTRALE
  const chartContainer = document.getElementById("grafico")
  const centerText = document.createElement("div")
  centerText.classList.add("chart-center-text")

  centerText.innerHTML = `
    <strong>Congratulations!</strong>
    You passed the exam.<br>
    <small>Check your email<br>(including spam/promotions)</small>
  `

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
    },
  })
})
