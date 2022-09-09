export function chartOptions() {
  let tempOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };

  return {
    tempOptions,
  };
}

// const getMyTheme = () => {
//   let tempOptions = {
//     maintainAspectRatio: false,
//     aspectRatio: 0.6,
//     plugins: {
//       legend: {
//         labels: {
//           color: "#495057",
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: "#495057",
//         },
//         grid: {
//           color: "#ebedef",
//         },
//       },
//       y: {
//         ticks: {
//           color: "#495057",
//         },
//         grid: {
//           color: "#ebedef",
//         },
//       },
//     },
//   };

//   return {
//     tempOptions,
//   };
// };
