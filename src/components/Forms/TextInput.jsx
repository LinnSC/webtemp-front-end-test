import React from "react";
import PropTypes from "prop-types";
import { InputText } from "primereact/inputtext";
import { Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import FormStyles from "./Form.module.scss";

export default function TextInput({ label, control, name }) {
  return (
    <div className="flex flex-column">
      <label htmlFor={name} className={`mb-2 ${FormStyles.inputLabel}`}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required: "This is required" }}
        render={({ field, fieldState }) => (
          <InputText
            id={field.name}
            {...field}
            className={classNames({ "p-invalid": fieldState.error })}
          />
        )}
      />
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
