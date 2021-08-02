export const Label = ({label}) => {
  if (!label) {
    return null;
  }

  return (
    <label>{label}</label>
  );
};
