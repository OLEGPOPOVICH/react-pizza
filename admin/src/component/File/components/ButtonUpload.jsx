import { forwardRef } from "react";

export const ButtonUpload = forwardRef(({
  name,
  onChange
}, ref) => (
  <input
    ref={ref}
    type="file"
    name={name || "file"}
    onChange={onChange}
  />
));

