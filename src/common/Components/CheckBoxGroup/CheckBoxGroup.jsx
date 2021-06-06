/* eslint-disable prettier/prettier */
import { Children, cloneElement } from "react";
import "./index.css";

export const CheckBoxGroup = ({
  label,
  displayType,
  children,
  ...props
}) => (
  <div className="checkbox__wrapper">
    <div className="margin-8">{label}</div>
    <div className={displayType ? `checkbox-${displayType}` : ""}>
      {Children.map(children, (checkbox) =>
        cloneElement(checkbox, {
          ...props,
        })
      )}
    </div>
  </div>
);