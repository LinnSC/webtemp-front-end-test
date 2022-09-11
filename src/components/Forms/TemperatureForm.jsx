import TextInput from "./TextInput";
import { Button } from "primereact/button";

import PropTypes from "prop-types";

export default function TemperatureForm({
  onSubmit,
  control,
  errorMsgLat,
  errorMsgLon,
}) {
  return (
    <div className="flex justify-content-center ">
      <form
        onSubmit={onSubmit}
        className="flex flex-column justify-content-center row-gap-3 md:row-gap-5 w-12 sm:w-8 lg:w-6 xl:w-4"
      >
        <div className="flex flex-column">
          <TextInput label="Latitude" control={control} name="lat" />
          {errorMsgLat}
        </div>
        <div>
          <TextInput label="Longitude" control={control} name="lon" />
          {errorMsgLon}
        </div>

        <Button type="submit" label="Submit" className="mt-2 md:mt-0" />
      </form>
    </div>
  );
}

TemperatureForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
};
