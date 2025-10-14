window.addEventListener("DOMContentLoaded"),
  function () {
    // DATI DEL QUIZ

    // CALCOLO PERCENTUALI

    // TESTO SUI BLOCCHI LATERALI
    document.getElementById("correct").innerHTML = `
    <p class="titolo-results">Correct<p>
    <p class="percentuale">${correctPercent}%</p>
    <p class="n-domande">${correctAnswers}/${totalQuestions} questions</p>
  `;

    document.getElementById("wrong").innerHTML = `
    <p class="titolo-results">Wrong</p>
    <p class="percentuale">${wrongPercent}%</p>
    <p class="n-domande">${wrongAnswers}/${totalQuestions} questions</p>
  `;

    // DIV PER TESTO CENTRALE
    const chartContainer = document.getElementById("grafico");
    const centerText = document.createElement("div");
    centerText.classList.add("chart-center-text");

    centerText.innerHTML = `
    <strong>Congratulations!</strong>
    You passed the exam.<br>
    <small>Check your email<br>(including spam/promotions)</small>`;

    // GRAFICO
    const ctx = document.getElementById("myChart");

    new Chart(ctx),
      {
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
      };
  };
