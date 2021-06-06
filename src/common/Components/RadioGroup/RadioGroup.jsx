/* eslint-disable prettier/prettier */
import { Children, cloneElement } from "react";
import "./styles.css";

export const RadioGroup = ({
  label,
  displayType,
  children,
  ...props
}) => (
  <div className="radio__wrapper">
    <div className="margin-8">{label}</div>
    <div className={displayType ? `radio-${displayType}` : ""}>
      {Children.map(children, (radioButton) =>
        cloneElement(radioButton, {
          ...props,
        })
      )}
    </div>
  </div>
);
