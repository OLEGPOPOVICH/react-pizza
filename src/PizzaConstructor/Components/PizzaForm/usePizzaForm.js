/* eslint-disable prettier/prettier */
export const usePizzaForm = (pizzaData = {}) => {
  const getTotalPricePizza = () => {
    const pizzaDataList = Object.values(pizzaData);

    return pizzaDataList
      .flat()
      .reduce((acc, pizza) => (acc += pizza.checked ? +pizza.price : 0), 0);
  };

  return {
    pizzaData,
    getTotalPricePizza,
  };
};
