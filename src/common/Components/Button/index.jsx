/* eslint-disable react/button-has-type */
/* eslint-disable prettier/prettier */
import './index.css';

export const Button = ({
  type,
  typeClass,
  title,
  disabled,
  ...other
}) => (
  <div className="wrapper__button">
    <button
      className={disabled ? 'button-disabled' : `button-${typeClass}`}
      type={type || 'button'}
      disabled={disabled}
      {...other}
    >{title}</button>
  </div>
)
