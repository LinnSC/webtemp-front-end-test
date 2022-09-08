import React from "react";
import PropTypes from "prop-types";
import { InputText } from "primereact/inputtext";
import { Controller } from "react-hook-form";
import { classNames } from "primereact/utils";

// export default function TextInput({ value, onChange, title, id }) {
//   return (
//     <>
//       <label htmlFor={id} className="block input-label">
//         {title}
//       </label>
//       <InputText className="block" id={id} value={value} onChange={onChange} />
//     </>
//   );
// }

// TextInput.propTypes = {
//   title: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
//   onChange: PropTypes.func,
//   value: PropTypes.node,
// };

export default function TextInput({ label, className, control, name }) {
  return (
    <>
      <label htmlFor={name} className={className}>
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
            autoFocus
            className={classNames({ "p-invalid": fieldState.error })}
          />
        )}
      />
    </>
  );
}

// TextInput.propTypes = {
//   title: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
//   onChange: PropTypes.func,
//   value: PropTypes.node,
// };
