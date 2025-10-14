window.addEventListener("DOMContentLoaded", function () {
  // DATI DEL QUIZ

  // CALCOLO PERCENTUALI

  // TESTO SUI BLOCCHI LATERALI
  document.getElementById("correct").innerHTML = `
    <h1>Correct:</h1>
    <p><strong>${correctPercent}%</strong></p>
    <p>${correctAnswers}/${totalQuestions} questions</p>

  document.getElementById("wrong").innerHTML = `
    <h1>Wrong:</h1>
    <p><strong>${wrongPercent}%</strong></p>
    <p>${wrongAnswers}/${totalQuestions} questions</p>

  // DIV PER TESTO CENTRALE

  centerText.innerHTML = `
    <strong>Congratulations!</strong>
    You passed the exam.<br>
    <small>Check your email<br>(including spam/promotions)</small>


  // GRAFICO

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
