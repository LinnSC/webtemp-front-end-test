import React, { useState, useContext } from "react";
import TextInput from "./TextInput";
import { Button } from "primereact/button";
import FormStyles from "./form.module.scss";

import PropTypes from "prop-types";

export default function TemperatureForm({
  onSubmit,
  control,
  errorMsgLat,
  errorMsgLon,
}) {
  return (
    <div className="flex  justify-content-center ">
      <form
        onSubmit={onSubmit}
        className="flex flex-column justify-content-center row-gap-2 md:row-gap-4  w-12 sm:w-10 lg:w-7 xl:w-6"
      >
        <div className="flex flex-column">
          <TextInput label="Latitude" control={control} name="lat" />
          {errorMsgLat}
        </div>
        <div>
          <TextInput label="Longitude" control={control} name="lon" />
          {errorMsgLon}
        </div>

        <Button type="submit" label="Submit" />
      </form>
    </div>
  );
}

TemperatureForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
};
