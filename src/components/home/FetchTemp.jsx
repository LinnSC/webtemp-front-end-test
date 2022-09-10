import React, { useState, useEffect } from "react";
import { BASE_URL, LAT_PARAM, LON_PARAM } from "../../utils/constants/api";
import TextInput from "../Forms/TextInput";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/constants/TemperatureValidation";
import { classNames } from "primereact/utils";
import TemperatureChart from "../Charts/TemperatureChart";
import AlertMessage from "../common/AlertMessage";
import TemperatureForm from "../Forms/TemperatureForm";

export default function RenderTemperature() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState("0");
  const [lon, setLon] = useState("0");

  //   Form
  const defaultValues = {
    lat: "",
    lon: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    // reset,
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
      // setLoading(true);
      async function fetchTemperature() {
        let timeArray = [];
        let temperatureArray = [];

        try {
          const response = await fetch(weatherUrl);
          console.log(response);
          console.log(weatherUrl);

          if (response.ok) {
            const json = await response.json();

            const results = json.properties.timeseries;
            console.log(results);

            const time = results.slice(0, 24).map((x) => x.time);
            const temperature = results
              .slice(0, 24)
              .map((x) => x.data.instant.details.air_temperature);

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
                  borderColor: "#42A5F5",
                },
              ],
            });
          } else {
            setError("An error occured.");
          }
        } catch (error) {
          setError(error.toString());
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
    <>
      <TemperatureForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        errorMsgLat={getFormErrorMessage("lat")}
        errorMsgLon={getFormErrorMessage("lon")}
      />
      {error ? <AlertMessage severity="error" text={error} /> : ""}

      <TemperatureChart data={chartData} />
    </>
  );
}
