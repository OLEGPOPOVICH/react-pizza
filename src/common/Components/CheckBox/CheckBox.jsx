/* eslint-disable prettier/prettier */
import { forwardRef } from "react";
import "./index.css";

export const CheckBox = forwardRef(({ label, ...props }, ref) => {
  const labelCheckbox = label || props.value;

  return (
    <div className="checkbox__button">
      <input
        id={labelCheckbox}
        ref={ref}
        type="checkbox"
        className="checkbox_input"
        {...props}
      />
      <label htmlFor={labelCheckbox} className="checkbox_label">
        {labelCheckbox}
      </label>
    </div>
  );
});
