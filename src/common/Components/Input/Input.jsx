/* eslint-disable prettier/prettier */
import { forwardRef } from "react";
import "./index.css";

export const Input = forwardRef(({
  label,
  error,
  ...props
}, ref) => (
  <div className="input__wrapper margin-bottom-16">
    {label &&
      <div className="input_label margin-bottom-8 ">
        {label}
      </div>
    }
    <input ref={ref} {...props} />
    <div className="input_error">
      {error && error.message}
    </div>
  </div>
));

