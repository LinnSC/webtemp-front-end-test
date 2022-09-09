import { Chart } from "primereact/chart";

import { chartOptions } from "./chartOptions";

export default function TemperatureChart({ data }) {
  const { tempOptions } = chartOptions();

  return (
    <div className="card">
      <Chart type="line" data={data} options={tempOptions} />
    </div>
  );
}
