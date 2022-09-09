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
import TemperatureChart from "../Charts/TemperatureChart";

export default function RenderTemperature() {
  const [temp, setTemp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState("0");
  const [lon, setLon] = useState("0");
  // const [data, setData] = useContext(DataContext);

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
    // setData(values);

    const latData = values.lat;
    setLat(latData);

    const lonData = values.lon;
    setLon(lonData);

    reset();

    const weatherUrl = BASE_URL + LAT_PARAM + lat + LON_PARAM + lon;

    async function fetchTemperature() {
      try {
        const response = await fetch(weatherUrl);

        if (response.ok) {
          const json = await response.json();

          const data = json.properties.timeseries;

          setTemp(data);
        } else {
          setError("An error occured.");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchTemperature();

    // if (loading) {
    //   return <div className="loader"></div>;
    // }

    if (error) {
      return (
        <div>
          <h2>{error}</h2>
        </div>
      );
    }
  }

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <span className="error-msg">{errors[name].message}</span>
    );
  };

  // const temperature = temp.map((x) => x.time);

  const temperature = ["11", "2", "8", "14", "15", "10", "20", "30"];

  const time = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
  ];
  const [tempData] = useState({
    labels: time,
    datasets: [
      {
        label: "Temperature",
        data: temperature,
        fill: false,
        borderColor: "#42A5F5",
      },
    ],
  });

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
      <TemperatureChart data={tempData} />

      <ul>
        {temp.slice(0, 24).map((temp) => {
          return (
            <li key={temp.time}>
              <Paragraph>
                {temp.data.instant.details.air_temperature}
                <TbTemperatureCelsius />
              </Paragraph>
              <Paragraph>
                {temp.time}
                {/* <Moment format="hh:mm DD/MM/YYYY">{temp.time}</Moment> */}
              </Paragraph>
            </li>
          );
        })}
      </ul>
    </>
  );
}
