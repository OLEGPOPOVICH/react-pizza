/* eslint-disable prettier/prettier */
const insertCharIntoString = (str, insertNumber, insertString) => {
  let leftStr = str;
  let rightStr = "";

  if (!str && str !== "0") {
    return "";
  }

  if (leftStr.length >= insertNumber) {
    leftStr = str.substr(0, insertNumber - 1) + insertString;
    rightStr = str.substr(insertNumber - 1);
  }

  return `${leftStr}${rightStr}`;
};

export const normalize = {
  cardNumber: (value) =>
    value
      .replace(/\s/g, "")
      .match(/[0-9]{1,4}/g)
      ?.join(" ")
      .substr(0, 19) || ""
  ,
  cardExpiryDate: (value) =>
    insertCharIntoString(
      value
        .replace(/\s/g, "")
        .match(/[0-9]/g)
        ?.join("") || "", 3, "/"
    ).substr(0, 7) || ""
  ,
  codeCVV: (value) =>
    value
      .replace(/\s/g, "")
      .match(/[0-9]/g)
      ?.join("")
      .substr(0, 3) || ""
  ,
};
