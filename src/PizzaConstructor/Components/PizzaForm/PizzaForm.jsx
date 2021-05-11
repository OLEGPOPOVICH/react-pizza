/* eslint-disable prettier/prettier */
import { CheckBox, RadioButton, RadioGroup } from '../../../common/Components';
import { usePizzaForm } from './usePizzaForm';

export const PizzaForm = ({ appState, dispatch }) => {
  const { pizzaData, getTotalPricePizza } = usePizzaForm(appState.pizzaData);

  const onSubmit = (e) => {
    e.preventDefault();
    alert(`Ваш заказ на ${getTotalPricePizza()} руб`);
  };

  const handleChangesIngredient = (e) => {
    dispatch({
      type: e.target.name,
      payload: {
        value: e.target.value,
        checked: e.target.checked,
        buttonType: e.target.type,
      },
    });
  };

  if (!Object.values(pizzaData).length) {
    return null;
  }

  return (
    <form onSubmit={onSubmit}>
      <RadioGroup
        label="Размер"
        name="size"
        displayType="line"
        onChange={handleChangesIngredient}
      >
        {pizzaData.size &&
          pizzaData.size.map((item) => (
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
        onChange={handleChangesIngredient}
      >
        {pizzaData.dough &&
          pizzaData.dough.map((item) => (
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
        onChange={handleChangesIngredient}
      >
        {pizzaData.sauce &&
          pizzaData.sauce.map((item) => (
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
        {pizzaData.cheese &&
          pizzaData.cheese.map((item) => (
            <CheckBox
              key={item.value}
              value={item.value}
              name="cheese"
              checked={item.checked}
              onChange={handleChangesIngredient}
            />
          ))}
      </div>

      <div>
        Добавьте овощи
        <hr />
        {pizzaData.veg &&
          pizzaData.veg.map((item) => (
            <CheckBox
              key={item.value}
              value={item.value}
              name="veg"
              checked={item.checked}
              onChange={handleChangesIngredient}
            />
          ))}
      </div>
      <hr />
      <div>
        Добавьте мясо
        <hr />
        {pizzaData.meat &&
          pizzaData.meat.map((item) => (
            <CheckBox
              key={item.value}
              value={item.value}
              name="meat"
              checked={item.checked}
              onChange={handleChangesIngredient}
            />
          ))}
      </div>
      <hr />
      <button data-testid="btn-order" type="submit">
        Заказать за {getTotalPricePizza()} руб
      </button>
    </form>
  );
};
