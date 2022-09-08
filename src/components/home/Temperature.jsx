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

function Temperature() {
  const [temp, setTemp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useContext(DataContext);

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
    // console.log(values.lat);
    // console.log(values.lon);

    setData(values);

    // const latData = values.lat;
    // setLat(latData);

    // const lonData = values.lon;
    // setLon(lonData);

    reset();

    const LAT = data.lat;
    const LON = data.lon;

    const weatherUrl = BASE_URL + LAT_PARAM + LAT + LON_PARAM + LON;

    async function fetchTemperature() {
      try {
        const response = await fetch(weatherUrl);

        if (response.ok) {
          const json = await response.json();

          const data = json.properties.timeseries;
          console.log(json);
          console.log(data);

          console.log(weatherUrl);

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

    // if (error) {
    //   return (
    //     <div>
    //       <h2>{error}</h2>
    //     </div>
    //   );
    // }
  }

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
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

export default Temperature;
