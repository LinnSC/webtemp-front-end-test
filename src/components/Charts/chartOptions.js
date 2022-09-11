const labelsColor = "#084a42";
const ticksColor = "#0b655b";
const gridColor = "#C2D6D8";

export const chartOptions = {
  maintainAspectRatio: false,
  aspectRatio: 0.5,
  plugins: {
    legend: {
      labels: {
        color: labelsColor,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: ticksColor,
      },
      grid: {
        color: gridColor,
      },
    },
    y: {
      ticks: {
        color: ticksColor,
      },
      grid: {
        color: gridColor,
      },
    },
  },
};
