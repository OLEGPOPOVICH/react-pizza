/* eslint-disable react/button-has-type */
/* eslint-disable prettier/prettier */
import "./index.css";

export const Button = ({
  btnType,
  btnClassName,
  title,
  disabled,
  ...other
}) => (
  <button
    className={btnClassName}
    type={btnType || "button"}
    disabled={disabled}
    {...other}
  >{title}</button>
);
