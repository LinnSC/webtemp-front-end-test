import React, { useState, useEffect } from "react";
import { BASE_URL, LAT_PARAM, LON_PARAM } from "../../utils/constants/api";
import { USER_AGENT } from "../../utils/constants/headers";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/constants/TemperatureValidation";
import TemperatureChart from "../Charts/TemperatureChart";
import AlertMessage from "../common/AlertMessage";
import TemperatureForm from "../Forms/TemperatureForm";
import Loader from "../common/Loader";

const header = {
  headers: {
    "User-Agent": `${USER_AGENT}`,
  },
};
const defaultValue = "0";
const errorMessage = "An error occured";

export default function RenderWeather() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(defaultValue);
  const [lon, setLon] = useState(defaultValue);

  //   Form
  const defaultValues = {
    lat: defaultValue,
    lon: defaultValue,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  function onSubmit(values) {
    const latData = values.lat;
    setLat(latData);

    const lonData = values.lon;
    setLon(lonData);
  }

  // Chart
  const [chartData, setChartData] = useState({});
  const weatherUrl = BASE_URL + LAT_PARAM + lat + LON_PARAM + lon;

  useEffect(
    function () {
      async function fetchTemperature() {
        let timeArray = [];
        let temperatureArray = [];

        try {
          const response = await fetch(weatherUrl, header);

          if (response.ok) {
            const json = await response.json();

            const results = json.properties.timeseries;

            const time = results.slice(0, 24).map((res) => res.time);
            const temperature = results
              .slice(0, 24)
              .map((res) => res.data.instant.details.air_temperature);

            timeArray.push(time);
            temperatureArray.push(temperature);

            setChartData({
              labels: timeArray,
              datasets: [
                {
                  label: "Temperature per hour",
                  data: temperatureArray,
                  fill: false,
                  tension: 0.1,
                  borderColor: "#E5B073",
                  backgroundColor: "rgba(229, 176, 115, 0.919)",
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
    [weatherUrl]
  );

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && (
        <small className="p-error block mt-2">{errors[name].message}</small>
      )
    );
  };

  return (
    <div className="flex flex-column column-gap-8">
      <TemperatureForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        errorMsgLat={getFormErrorMessage("lat")}
        errorMsgLon={getFormErrorMessage("lon")}
      />

      {error ? <AlertMessage severity="error" text={error} /> : ""}
      {loading ? <Loader /> : <TemperatureChart data={chartData} />}
    </div>
  );
}
