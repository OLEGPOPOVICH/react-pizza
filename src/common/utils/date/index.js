/* eslint-disable prettier/prettier */
import moment from "moment";

export const getDateFormat = ({
  date,
  format
}) => {
  const currentDate = date ? moment(date) : null;

  if (
    !(format && typeof format === "string")
    && currentDate
  ) {
    return currentDate;
  }

  return currentDate.format(format);
}