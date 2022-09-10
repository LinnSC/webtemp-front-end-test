export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: true,
    },
    title: {
      display: true,
      text: "Temperature per hour",
    },
  },
};

const tempOptions = {
  maintainAspectRatio: false,
  aspectRatio: 0.5,
  plugins: {
    legend: {
      labels: {
        color: "#0b655b",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#0b655b",
      },
      grid: {
        color: "#C2D6D8",
      },
    },
    y: {
      ticks: {
        color: "#0b655b",
      },
      grid: {
        color: "#C2D6D8",
      },
    },
  },
};
