const ctx = document.getElementById('myChart')

const myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Rosso', 'Verde'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [30, 70],
        backgroundColor: ['rgb(0,255,0)', 'rgb(255,0,0)'],
        hoverOffset: 10,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Il mio grafico',
      },
    },
  },
})
