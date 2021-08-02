export const FileError = ({
  className,
  error
}) => {
  if (!error) {
    return null;
  }

  return (
    <div className={className}>{error}</div>
  );
};