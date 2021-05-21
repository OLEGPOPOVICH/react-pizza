/* eslint-disable prettier/prettier */
import { CheckBox, RadioButton, RadioGroup, Button } from 'Common/Components';
import { useHistory } from 'react-router-dom';
import { UPDATE_TOPPINGS, CREATE_NEW_ORDER } from 'reducer';
import { useAppStateContext } from 'useAppStateContext';
import { getDoughPizza, getIngredientsPizza, getSaucePizza, getSizePizza, getTotalPrice } from 'utils';

export const PizzaForm = () => {
  const { state, pizzaData, dispatch } = useAppStateContext();
  const history = useHistory();
  const totalPrice = getTotalPrice(state.pizzaData);

  const handleChangesIngredient = (e) => {
    dispatch({
      type: UPDATE_TOPPINGS,
      payload: {
        value: e.target.value,
        checked: e.target.checked,
        buttonType: e.target.type,
        name: e.target.name,
      },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { size, dough, sauce, ...ingredients } = pizzaData;
    const numberOrder = state.orders.length;

    dispatch({
      type: CREATE_NEW_ORDER,
      payload: {
        number: numberOrder + 1,
        date: new Date(),
        size: getSizePizza(size),
        dough: getDoughPizza(dough),
        sauce: getSaucePizza(sauce),
        price: totalPrice,
        ingredients: getIngredientsPizza(ingredients),
        statsu: 1,
      },
    });

    history.push('/order');
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

      <Button
        title={`Заказать за ${totalPrice} руб`}
        data-testid="btn-order"
        type="submit"
        typeClass="primary"
      />
    </form>
  );
};
