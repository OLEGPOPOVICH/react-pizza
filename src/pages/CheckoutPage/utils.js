export const checkFormCompleted = (errors, fieldsForm) => {
  const isErrors = Object.values(errors).length;
  let isEmptyFields = true;

  const valuesFieldsForm = Object.values(fieldsForm);

  if (valuesFieldsForm.length) {
    isEmptyFields = !valuesFieldsForm.every((value) => value !== "");
  }

  return !(isErrors || isEmptyFields);
};
