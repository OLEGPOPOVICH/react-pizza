import { forwardRef } from "react";
import "./index.css";

export const RadioButton = forwardRef(({ label, ...props }, ref) => {
  const labelRadio = label || props.value;

  return (
    <div className="radio__button">
      <input id={labelRadio} ref={ref} className="radio_input" type="radio" {...props} />
      <label htmlFor={labelRadio} className="checkbox_label">
        {labelRadio}
      </label>
    </div>
  );
});
