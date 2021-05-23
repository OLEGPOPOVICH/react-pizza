/* eslint-disable prettier/prettier */
import { useAppStateContext } from '../../../../useAppStateContext';
import {
  getSizePizza,
  getDoughPizza,
  getSaucePizza,
  getIngredientsPizza
} from '../../../../utils';

export const PizzaSummary = () => {
  const { pizzaData } = useAppStateContext();
  const { size, dough, sauce, ...ingredients } = pizzaData;
  const pizzaSize = getSizePizza(size);
  const pizzaDough = getDoughPizza(dough, { declText: true });
  const pizzaSauce = getSaucePizza(sauce);
  const pizzaIngredients = getIngredientsPizza(ingredients, { htmlWrap: 'li' });

  if (!Object.values(pizzaData).length) {
    return null;
  }

  return (
    <>
      <h2>Твоя пицца</h2>
      <div>
        {pizzaSize} на {pizzaDough} тесте
      </div>
      <ul data-testid="ingredients">
        <li>{pizzaSauce} соус</li>
        {pizzaIngredients}
      </ul>
    </>
  );
};
