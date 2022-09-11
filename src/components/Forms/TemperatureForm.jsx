import TextInput from "./TextInput";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../constants/TemperatureValidation";
import PropTypes from "prop-types";

const defaultValue = "0";
const latName = "lat";
const lonName = "lon";

export default function TemperatureForm({ onSubmit }) {
  const defaultValues = {
    lat: defaultValue,
    lon: defaultValue,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && (
        <small className="p-error block mt-2">{errors[name].message}</small>
      )
    );
  };

  return (
    <div className="flex justify-content-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-column justify-content-center row-gap-3 md:row-gap-5 w-12 sm:w-8 lg:w-6 xl:w-4"
      >
        <div className="flex flex-column">
          <TextInput label="Latitude" control={control} name={latName} />
          {getFormErrorMessage(latName)}
        </div>
        <div>
          <TextInput label="Longitude" control={control} name={lonName} />
          {getFormErrorMessage(lonName)}
        </div>

        <Button type="submit" label="Submit" className="mt-2 md:mt-0" />
      </form>
    </div>
  );
}

TemperatureForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
