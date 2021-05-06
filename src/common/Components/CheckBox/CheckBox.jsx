import { getRandomString } from "../../utils";

export const CheckBox = ({
  name,
  value,
  label,
  checked,
  onChange
}) => {
  const idCheckBox = getRandomString();

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
    <div className="checkbox-wrapper">
      <input
        id={idCheckBox}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        className="checkbox-input"
        onChange={hadlerOnChange}
      />
      <label
        htmlFor={idCheckBox}
        className="checkbox-label"
      >
        {label}
      </label>
    </div>
  )
}