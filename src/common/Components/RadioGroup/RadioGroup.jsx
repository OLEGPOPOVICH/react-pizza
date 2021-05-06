import { Children, cloneElement } from "react";
import './styles.css';

const renderRadioButton = (
  radioButtons,
  valueRadioGroup,
  nameRadioGroup,
  onChangeRadioGroup
) => {
  return Children.map(radioButtons, (radioButton) => {
    return cloneElement(radioButton, {
      name: nameRadioGroup,
      checked: radioButton.props.value === valueRadioGroup,
      onChange: onChangeRadioGroup
    });
  });
}

export const RadioGroup = ({
  value,
  label,
  name,
  type,
  onChange,
  children
}) => {

  return (
    <div className="radio-wrapper">
      <div>{label}</div>
      <div className={type ? `radio-${type}` : ''}>
        {
          renderRadioButton(
            children,
            value,
            name,
            onChange
          )
        }
      </div>
    </div>
  )
}