/* eslint-disable prettier/prettier */
import { Children, cloneElement } from 'react';
import './styles.css';

export const RadioGroup = ({
  label,
  name,
  displayType,
  onChange,
  children,
}) => (
  <div className="radio-wrapper">
    <div>{label}</div>
    <div className={displayType ? `radio-${displayType}` : ''}>
      {Children.map(children, (radioButton) =>
        cloneElement(radioButton, {
          name,
          onChange,
        })
      )}
    </div>
  </div>
);
