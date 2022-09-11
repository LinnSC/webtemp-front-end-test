import { Chart } from "primereact/chart";
import { chartOptions } from "./chartOptions";

export default function TemperatureChart({ data }) {
  return (
    <div className="card mt-8 flex justify-content-center">
      <div className="w-11 md:w-10 lg:w-9 xl:w-6">
        <Chart type="line" data={data} options={chartOptions} />
      </div>
    </div>
  );
}
