import { usePizzaSammary } from './usePizzaSammary';

export const PizzaSammary = (appState = {}) => {
  const {
    pizzaData,
    getSizePizza,
    getDoughPizza,
    getSaucePizza,
    getIngredientsPizza,
  } = usePizzaSammary(appState.pizzaData);

  if (!Object.values(pizzaData).length) {
    return null;
  }

  return (
    <>
      <h2>Твоя пицца</h2>
      <div>
        {getSizePizza()} на {getDoughPizza({ declText: true })} тесте
      </div>
      <ul data-testid="ingredients">
        <li>{getSaucePizza()} соус</li>
        {getIngredientsPizza({ htmlWrap: 'li' })}
      </ul>
    </>
  );
};
