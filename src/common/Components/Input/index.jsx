/* eslint-disable prettier/prettier */
import './index.css';

export const Input = ({
  label,
  value,
  type,
  onChange
}) => (
  <div className="input__wrapper margin-bottom-16">
    <div className="input_label margin-bottom-8 ">
      {label}
    </div>
    <input
      type={type}
      value={value || ''}
      onChange={onChange}
    />
  </div>
)

