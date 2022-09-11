import React, { useState, useEffect } from "react";
import { BASE_URL, LAT_PARAM, LON_PARAM } from "../constants/api";
import { header } from "../constants/headers";
import TemperatureChart from "../Charts/TemperatureChart";
import AlertMessage from "../common/AlertMessage";
import TemperatureForm from "../Forms/TemperatureForm";
import Loader from "../common/Loader";

const defaultValue = "0";
const errorMessage = "An error occured";
const labelText = "Temperature per hour";

export default function RenderWeather() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(defaultValue);
  const [lon, setLon] = useState(defaultValue);

  //   Form
  function onSubmit(values) {
    const latData = values.lat;
    setLat(latData);

    const lonData = values.lon;
    setLon(lonData);
  }

  // Chart
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const WEATHER_URL = BASE_URL + LAT_PARAM + lat + LON_PARAM + lon;

  useEffect(
    function () {
      async function fetchTemperature() {
        try {
          const response = await fetch(WEATHER_URL, header);

          if (response.ok) {
            const json = await response.json();

            const results = json.properties.timeseries;

            const time = results.slice(0, 24).map((res) => res.time);
            const temperature = results
              .slice(0, 24)
              .map((res) => res.data.instant.details.air_temperature);

            setChartData({
              labels: time,
              datasets: [
                {
                  label: labelText,
                  data: temperature,
                  fill: false,
                  borderColor: "#E5B073",
                  backgroundColor: "rgba(229, 176, 115, 0.919)",
                  tension: 0.5,
                },
              ],
            });
          } else {
            setError(errorMessage);
          }
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchTemperature();
    },
    [WEATHER_URL]
  );

  return (
    <div className="flex flex-column column-gap-8">
      <TemperatureForm onSubmit={onSubmit} />

      {error ? <AlertMessage severity="error" text={error} /> : ""}
      {loading ? <Loader /> : <TemperatureChart data={chartData} />}
    </div>
  );
}
