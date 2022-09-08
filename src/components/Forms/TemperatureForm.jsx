import React, { useState, useContext } from "react";
import TextInput from "./TextInput";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/constants/TemperatureValidation";
import { classNames } from "primereact/utils";

import DataContext from "../../utils/context/DataContext";

export default function TemperatureForm() {
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);

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
    console.log(values.lat);
    console.log(values.lon);

    // setData(values);

    const latData = values.lat;
    setLat(latData);

    const lonData = values.lon;
    setLon(lonData);

    reset();
  }

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
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
  );
}

/* <label htmlFor="lat" className={classNames({ "p-error": errors.name })}>
          Latitude
        </label>
        <Controller
          name="lat"
          control={control}
          rules={{ required: "Latitude is required" }}
          render={({ field, fieldState }) => (
            <InputText
              id={field.name}
              {...field}
              autoFocus
              className={classNames({ "p-invalid": fieldState.error })}
            />
          )}
          
        /> */

// rules={{
//   required: "Latitude is required",
//   pattern: {
//     value: /^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})$/,
//     message: "Invalid latitude, must be a number between -90 and 90",
//   },
// }}

// <form onSubmit={handleSubmit(onSubmit)}>
//   <div className="flex flex-column row-gap-2 md:row-gap-4 ">
//     <div>
//       <input {...register("lat")} placeholder="Latitude" />
//       {/* <TextInput {...register("lat")} id="lat" title="Latitude" /> */}
//     </div>

//     <div>
//       <input {...register("lon")} placeholder="Longitude" />
//       {/* <TextInput {...register("lon")} id="lon" title="Longitude" /> */}
//     </div>

//     <div>
//       <Button
//         className="p-button-raised p-button-secondary"
//         label="Submit"
//         aria-label="Submit"
//       />
//     </div>
//   </div>
// </form>
