export const CheckBox = (props) => {
  const { label, ...other } = props;

  return (
    <div className="checkbox-wrapper">
      <label className="checkbox-label">
        <input type="checkbox" className="checkbox-input" {...other} />
        <span>{label || other.value}</span>
      </label>
    </div>
  );
};

CheckBox.defaultProps = {
  checked: false,
};
