const ctx = document.getElementById("myChart")

const myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Corrette", "Sbagliate"],
    datasets: [
      {
        label: "Percentuale",
        data: [70, 30],
        backgroundColor: ["rgb(0,255,255)", "#D20094"],
        borderColor: "rgb(0,0,0,0)",
      },
    ],
  },
  options: {
    cutout: "75%",
    responsive: true,
    plugins: {
      legend: {
        labels: {
          position: "right",
          padding: 30,
        },
      },
      title: {
        display: false,
        text: "Il mio grafico",
      },
    },
  },
})
