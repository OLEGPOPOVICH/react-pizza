/* eslint-disable prettier/prettier */
import { Button } from 'common/components/Button/Button';
import { CheckBox } from 'common/components/CheckBox/CheckBox';
import { RadioButton } from 'common/components/RadioButton/RadioButton';
import { RadioGroup } from 'common/components/RadioGroup/RadioGroup';
import { useAppStateContext } from 'useAppStateContext';

export const PizzaForm = ({ onSubmit }) => {
  const {
    isPizzaData,
    pizzaData,
    updateIngredient,
    totalPrice
  } = useAppStateContext();

  const handleIngredientChange = (e) => {
    const ingredient = e.target;

    updateIngredient({
      value: ingredient.value,
      checked: ingredient.checked,
      buttonType: ingredient.type,
      name: ingredient.name,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  if (!isPizzaData) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <RadioGroup
        label="Размер"
        name="size"
        displayType="line"
        onChange={handleIngredientChange}
      >
        { pizzaData.size.map((item) => (
            <RadioButton
              key={item.value}
              value={item.value}
              checked={item.checked}
              label={item.label}
            />
        ))}
      </RadioGroup>

      <hr />
      <RadioGroup
        label="Тесто"
        name="dough"
        displayType="line"
        onChange={handleIngredientChange}
      >
        { pizzaData.dough.map((item) => (
            <RadioButton
              key={item.value}
              value={item.value}
              checked={item.checked}
            />
        ))}
      </RadioGroup>

      <hr />
      <RadioGroup
        label="Выберите соус"
        name="sauce"
        displayType="line"
        onChange={handleIngredientChange}
      >
        { pizzaData.sauce.map((item) => (
            <RadioButton
              key={item.value}
              value={item.value}
              checked={item.checked}
            />
        ))}
      </RadioGroup>

      <hr />
      <div>
        Добавьте сыр
        <hr />
        { pizzaData.cheese.map((item) => (
            <CheckBox
              key={item.value}
              value={item.value}
              name="cheese"
              checked={item.checked}
              onChange={handleIngredientChange}
            />
        ))}
      </div>

      <div>
        Добавьте овощи
        <hr />
        { pizzaData.veg.map((item) => (
            <CheckBox
              key={item.value}
              value={item.value}
              name="veg"
              checked={item.checked}
              onChange={handleIngredientChange}
            />
        ))}
      </div>
      <hr />
      <div>
        Добавьте мясо
        <hr />
        { pizzaData.meat.map((item) => (
            <CheckBox
              key={item.value}
              value={item.value}
              name="meat"
              checked={item.checked}
              onChange={handleIngredientChange}
            />
        ))}
      </div>

      <Button
        title={`Заказать за ${totalPrice} руб`}
        data-testid="btn-order"
        type="submit"
        typeClass="primary"
      />
    </form>
  );
};
