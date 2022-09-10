import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";

import { chartOptions } from "./chartOptions";

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

export default function TemperatureChart({ data }) {
  return (
    <div className="card mt-8">
      <Chart type="line" data={data} options={chartOptions} />
    </div>
  );
}
