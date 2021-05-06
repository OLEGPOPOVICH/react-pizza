import React from "react";
import { getRandomString } from "../../../utils";

export const RadioButton = ({
  value,
  label,
  name,
  checked,
  onChange
}) => {

  const idRadio = getRandomString();

  const hadlerOnChange = (e) => {
    const current = e.target;

    if (onChange) {
      onChange({
        component: {
          value: current.value,
          name: current.name,
          checked: current.checked,
          type: current.type
        }
      })
    }
  }

  return (
    <div className="radio-button">
      <input
        className="radio-button-input"
        id={idRadio}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={hadlerOnChange}
      />
      <label
        className="radio-button-label"
        htmlFor={idRadio}
      >{label}</label>
    </div>
  )
}

RadioButton.defaultProps = {
  checked: false
}