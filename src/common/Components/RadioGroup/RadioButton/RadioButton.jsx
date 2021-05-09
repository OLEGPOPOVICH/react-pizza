import React from 'react';

export const RadioButton = (props) => {
  const { label, ...other } = props;

  return (
    <div className="radio-button">
      <label className="radio-button-label">
        <input className="radio-button-input" type="radio" {...other} />
        <span>{label || other.value}</span>
      </label>
    </div>
  );
};

RadioButton.defaultProps = {
  checked: false,
};
