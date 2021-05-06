const setChecked = ({
  buttons,
  buttonType,
  currentValue,
  currentChecked
}) => {
  if (!(
    Array.isArray(buttons)
    && buttons.length
    && buttonType
    && currentValue
    && currentChecked !== undefined
  )) {
    console.error("Не переданы все обязательные параметры!")
    return;
  }

  buttons.forEach((button) => {
    if (button.value === currentValue) {
      button.selected = currentChecked;
    } else if (buttonType === 'radio'){
      button.selected = !currentChecked;
    }
  })
}

const getValueSelectedRadioButton = ({
  buttons
}) => {
  if (!(
    Array.isArray(buttons)
    && buttons.length
  )) {
    console.error("Не передан обязательный параметр!")
    return;
  }

  const selectedButton = buttons.filter((button) => button.selected);

  return selectedButton.length ? selectedButton[0].value : '';
}


export const utilsComponent = {
  setChecked,
  getValueSelectedRadioButton
}