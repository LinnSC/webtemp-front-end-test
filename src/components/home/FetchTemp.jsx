import React, { useState, useEffect, useContext } from "react";
import Heading from "../layout/Heading";
import { TbTemperatureCelsius } from "react-icons/tb";
import { BASE_URL, LAT_PARAM, LON_PARAM } from "../../utils/constants/api";
import Moment from "react-moment";
import Paragraph from "../layout/Paragraph";
import DataContext from "../../utils/context/DataContext";
import TextInput from "../Forms/TextInput";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/constants/TemperatureValidation";
import { classNames } from "primereact/utils";
import { Chart } from "primereact/chart";
import TemperatureChart from "../Charts/TemperatureChart";
import axios from "axios";

export default function RenderTemperature() {
  const [temp, setTemp] = useState([]);
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
    reset,
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  function onSubmit(values) {
    const latData = values.lat;
    setLat(latData);

    const lonData = values.lon;
    setLon(lonData);

    // reset();

    chart();
  }

  // Chart
  const [chartData, setChartData] = useState({});
  const [time, setTime] = useState([]);
  const [temperature, setTemperature] = useState([]);

  const weatherUrl = BASE_URL + LAT_PARAM + lat + LON_PARAM + lon;

  const chart = () => {
    let timeArray = [];
    let temperatureArray = [];
    axios
      .get(weatherUrl)
      .then((data) => {
        const results = data.data.properties.timeseries;

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <span className="error-msg">{errors[name].message}</span>
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-column row-gap-2 md:row-gap-4 "
      >
        <div>
          <TextInput
            label="Latitude"
            className={classNames({ "p-error": errors.name })}
            control={control}
            name="lat"
          />
          {getFormErrorMessage("lat")}
        </div>
        <div>
          <TextInput
            label="Longitude"
            className={classNames({ "p-error": errors.name })}
            control={control}
            name="lon"
          />
          {getFormErrorMessage("lon")}
        </div>

        <Button type="submit" label="Submit" />
      </form>
      <TemperatureChart data={chartData} />
    </>
  );
}

// <ul>
// {temp.slice(0, 24).map((temp) => {
//   return (
//     <li key={temp.time}>
//       <Paragraph>
//         {temp.data.instant.details.air_temperature}
//         <TbTemperatureCelsius />
//       </Paragraph>
//       <Paragraph>
//         {temp.time}

//       </Paragraph>
//     </li>
//   );
// })}
//
